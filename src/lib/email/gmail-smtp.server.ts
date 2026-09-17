// Server-only. Thin wrapper around Gmail SMTP (via nodemailer) that always
// logs to email_deliveries, never throws past the caller (a failed email
// must never fail the form submission that already saved to the database),
// and never hangs a serverless function waiting on an upstream provider.
//
// Why Gmail SMTP instead of Resend: Resend refuses to send from an address
// unless its domain is verified with them, and this project doesn't have a
// custom domain yet. Gmail SMTP has no such requirement — it sends as the
// Gmail account you authenticate with (an address you already own and can
// verify by logging in), so there's nothing to verify beyond having the
// account and an App Password. The trade-off: Gmail enforces a per-day
// sending cap (500/day on a free @gmail.com account, 2,000/day on Google
// Workspace) and mail sent this way is somewhat more likely to be flagged
// as bulk mail by strict spam filters than mail from an ESP with SPF/DKIM/
// DMARC on a dedicated domain. Fine for this site's current volume; worth
// revisiting (Resend, SES, Postmark, etc. on a verified domain) if daily
// enquiry + resource-request volume ever approaches the cap.
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const SEND_TIMEOUT_MS = 10_000;

let cachedTransporter: Transporter | null | undefined;

function getTransporter(): Transporter | null {
  if (cachedTransporter !== undefined) return cachedTransporter;

  const user = process.env["GMAIL_USER"];
  const pass = process.env["GMAIL_APP_PASSWORD"];
  if (!user || !pass) {
    cachedTransporter = null;
    return cachedTransporter;
  }

  cachedTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
  return cachedTransporter;
}

function getSenderAddress(): string {
  // Gmail SMTP requires the From address to be the authenticated account
  // itself (or a verified "Send mail as" alias on that account) — it can't
  // be an arbitrary address the way a domain-verified ESP allows. So the
  // display name is configurable, but the address is always GMAIL_USER.
  const user = process.env["GMAIL_USER"];
  const displayName = process.env["GMAIL_FROM_NAME"] || "Hooze Enterprises";
  if (!user) return "PLACEHOLDER_GMAIL_USER_NOT_CONFIGURED@example.com";
  return `${displayName} <${user}>`;
}

function getInternalNotificationAddress(): string {
  // Defaults to the same Gmail inbox that sends the mail — that address
  // only needs to receive mail, so this is a sane default even before a
  // separate inbox is configured.
  return (
    process.env["GMAIL_INTERNAL_NOTIFICATION_EMAIL"] ||
    process.env["GMAIL_USER"] ||
    "PLACEHOLDER_INTERNAL_EMAIL_NOT_CONFIGURED@example.com"
  );
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Email send timed out after ${ms}ms`)), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer!);
  }
}

type SendParams = {
  relatedTable: "project_enquiries" | "resource_requests";
  relatedId: string;
  emailType: "enquiry_confirmation" | "internal_notification" | "resource_delivery";
  to: string;
  subject: string;
  html: string;
  text: string;
};

export type SendResult = { ok: true; id: string | null } | { ok: false; error: string };

/** Sends one email and unconditionally writes a row to email_deliveries,
 * whether it succeeds or fails. Never throws — callers get a result object
 * back so a failed send never turns into an unhandled rejection. */
export async function sendAndLogEmail(params: SendParams): Promise<SendResult> {
  const transporter = getTransporter();

  if (!transporter) {
    const error = "GMAIL_USER / GMAIL_APP_PASSWORD is not configured.";
    await logDelivery({
      ...params,
      status: "failed",
      providerMessageId: null,
      errorMessage: error,
    });
    return { ok: false, error };
  }

  try {
    const info = await withTimeout(
      transporter.sendMail({
        from: getSenderAddress(),
        to: params.to,
        subject: params.subject,
        html: params.html,
        text: params.text,
      }),
      SEND_TIMEOUT_MS,
    );

    await logDelivery({
      ...params,
      status: "sent",
      providerMessageId: info.messageId ?? null,
      errorMessage: null,
    });
    return { ok: true, id: info.messageId ?? null };
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : "Unknown email delivery error.";
    await logDelivery({
      ...params,
      status: "failed",
      providerMessageId: null,
      errorMessage: message,
    });
    return { ok: false, error: message };
  }
}

async function logDelivery(
  params: SendParams & {
    status: "sent" | "failed";
    providerMessageId: string | null;
    errorMessage: string | null;
  },
) {
  const { error } = await supabaseAdmin.from("email_deliveries").insert({
    related_table: params.relatedTable,
    related_id: params.relatedId,
    email_type: params.emailType,
    recipient: params.to,
    status: params.status,
    provider_message_id: params.providerMessageId,
    error_message: params.errorMessage,
  });
  if (error) console.error("[email_deliveries] failed to log delivery", error);
}

export { getInternalNotificationAddress };
