// Server-only helpers for storing and announcing leads. Import dynamically from handlers.
import type { Database } from "@/integrations/supabase/types";

type GuideRow = Database["public"]["Tables"]["guide_download_requests"]["Insert"];
type EnquiryRow = Database["public"]["Tables"]["project_enquiries"]["Insert"];

const hasSupabaseAdmin = () =>
  Boolean(process.env["SUPABASE_URL"] && process.env["SUPABASE_SERVICE_ROLE_KEY"]);

/**
 * Local development without a service-role key: append to .data/<name>.jsonl so the forms
 * can be tested end to end on your PC. This branch is compiled out of production builds.
 */
async function writeDevLead(name: string, row: object) {
  if (!import.meta.env.DEV) throw new Error("Lead storage is not configured.");
  const { mkdir, appendFile } = await import("node:fs/promises");
  await mkdir(".data", { recursive: true });
  await appendFile(
    `.data/${name}.jsonl`,
    JSON.stringify({ ...row, created_at: new Date().toISOString() }) + "\n",
  );
  console.info(`[dev] No SUPABASE_SERVICE_ROLE_KEY set; saved lead to .data/${name}.jsonl`);
}

/** Returns true when a record from this email was already stored recently. */
export async function recentDuplicate(
  table: "guide_download_requests" | "project_enquiries",
  email: string,
  withinMinutes: number,
): Promise<boolean> {
  if (!hasSupabaseAdmin()) return false;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const since = new Date(Date.now() - withinMinutes * 60_000).toISOString();
  const { data, error } = await supabaseAdmin
    .from(table)
    .select("id")
    .eq("email", email)
    .gte("created_at", since)
    .limit(1);
  if (error) {
    console.error("Duplicate check failed.", error.code);
    return false;
  }
  return (data?.length ?? 0) > 0;
}

export async function insertGuideRequest(row: GuideRow) {
  if (!hasSupabaseAdmin()) return writeDevLead("guide-requests", row);
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("guide_download_requests").insert(row);
  if (error) throw new Error(`guide insert failed (${error.code})`);
}

export async function insertProjectEnquiry(row: EnquiryRow) {
  if (!hasSupabaseAdmin()) return writeDevLead("project-enquiries", row);
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("project_enquiries").insert(row);
  if (error) throw new Error(`enquiry insert failed (${error.code})`);
}

/**
 * Optional email alert to the business owner via Resend. Does nothing unless all three
 * variables are set. Plain text only (visitor input is never rendered as HTML). Failures
 * are logged and never block the visitor's submission.
 */
export async function notifyOwner(subject: string, lines: string[]) {
  const key = process.env["RESEND_API_KEY"];
  const to = process.env["LEAD_NOTIFY_EMAIL"];
  const from = process.env["RESEND_FROM_EMAIL"];
  if (!key || !to || !from) return;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, text: lines.join("\n") }),
    });
    if (!response.ok) console.error("Owner notification failed.", response.status);
  } catch (error) {
    console.error("Owner notification failed.", error);
  }
}
