import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { findOrCreateContact, recordConsent } from "@/lib/contacts.server";
import { sendAndLogEmail } from "@/lib/email/gmail-smtp.server";
import { resourceEmail } from "@/lib/email/templates";

const CONSENT_TEXT_VERSION = "2026-09-16";
const RESOURCE_SLUG = "business-automation-starter-kit";

const resourceRequestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  businessName: z.string().trim().max(120).optional().default(""),
  businessType: z.string().trim().max(120).optional().default(""),
  businessChallenge: z.string().trim().max(500).optional().default(""),
  resourceConsent: z.literal(true),
  marketingConsent: z.boolean().optional().default(false),
  website: z.string().max(0).optional().default(""),
  utmSource: z.string().trim().max(120).optional().nullable(),
  utmMedium: z.string().trim().max(120).optional().nullable(),
  utmCampaign: z.string().trim().max(120).optional().nullable(),
  utmContent: z.string().trim().max(120).optional().nullable(),
  landingPage: z.string().trim().max(300).optional().nullable(),
  referrer: z.string().trim().max(500).optional().nullable(),
});

export const submitResourceRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => resourceRequestSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website)
      return {
        ok: true,
        downloadUrl: "/resources/business-automation-starter-kit.pdf",
      };

    const { getRequest } = await import("@tanstack/react-start/server");
    const request = getRequest();
    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const email = data.email.toLowerCase();
    const encoded = new TextEncoder().encode(`resource:${forwarded}:${email}`);
    const digest = await crypto.subtle.digest("SHA-256", encoded);
    const fingerprint = Array.from(new Uint8Array(digest), (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin
      .from("resource_requests")
      .select("id", { count: "exact", head: true })
      .eq("request_fingerprint", fingerprint)
      .gte("created_at", since);
    if ((count ?? 0) >= 5) throw new Error("Too many requests. Please try again later.");

    const contactId = await findOrCreateContact({
      name: data.name,
      email,
      businessName: data.businessName || null,
      businessType: data.businessType || null,
      attribution: {
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        utmContent: data.utmContent,
        landingPage: data.landingPage,
        referrer: data.referrer,
      },
    });

    const { data: inserted, error } = await supabaseAdmin
      .from("resource_requests")
      .insert({
        contact_id: contactId,
        resource_slug: RESOURCE_SLUG,
        business_challenge: data.businessChallenge || null,
        request_fingerprint: fingerprint,
        utm_source: data.utmSource || null,
        utm_medium: data.utmMedium || null,
        utm_campaign: data.utmCampaign || null,
        utm_content: data.utmContent || null,
        landing_page: data.landingPage || null,
        referrer: data.referrer || null,
      })
      .select("id")
      .single();
    if (error || !inserted) throw new Error("Your request could not be saved. Please try again.");

    await recordConsent({
      contactId,
      consentType: "resource_delivery",
      status: true,
      textVersion: CONSENT_TEXT_VERSION,
    });
    if (data.marketingConsent) {
      await recordConsent({
        contactId,
        consentType: "marketing",
        status: true,
        textVersion: CONSENT_TEXT_VERSION,
      });
    }

    // The download is also handed to the visitor immediately in the UI, so
    // a slow or failed email never blocks access to the resource itself —
    // email is a convenience copy, not the only delivery path.
    const email_content = resourceEmail({ name: data.name });
    const result = await sendAndLogEmail({
      relatedTable: "resource_requests",
      relatedId: inserted.id,
      emailType: "resource_delivery",
      to: email,
      ...email_content,
    });

    await supabaseAdmin
      .from("resource_requests")
      .update({
        delivery_status: result.ok ? "sent" : "failed",
        delivered_at: result.ok ? new Date().toISOString() : null,
      })
      .eq("id", inserted.id);

    return {
      ok: true,
      downloadUrl: "/resources/business-automation-starter-kit.pdf",
    };
  });
