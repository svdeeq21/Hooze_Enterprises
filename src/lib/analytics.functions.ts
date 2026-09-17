import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const EVENT_TYPES = [
  "project_form_started",
  "project_form_submitted",
  "resource_form_started",
  "resource_form_submitted",
  "email_subscribed",
  "whatsapp_clicked",
  "contact_email_clicked",
] as const;

export type SiteEventType = (typeof EVENT_TYPES)[number];

const eventSchema = z.object({
  eventType: z.enum(EVENT_TYPES),
  sessionId: z.string().trim().min(1).max(100),
  utmSource: z.string().trim().max(120).optional().nullable(),
  utmMedium: z.string().trim().max(120).optional().nullable(),
  utmCampaign: z.string().trim().max(120).optional().nullable(),
  utmContent: z.string().trim().max(120).optional().nullable(),
  landingPage: z.string().trim().max(300).optional().nullable(),
  referrer: z.string().trim().max(500).optional().nullable(),
  // Small, non-identifying context only (e.g. { projectType: "custom-software" }).
  metadata: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
});

/** Fire-and-forget, first-party event log. Deliberately collects no email,
 * name, or free-text PII — only event type, session id, campaign attribution
 * and a small metadata object. Never throws to the caller: a broken
 * analytics call must never surface as a visible error. */
export const logSiteEvent = createServerFn({ method: "POST" })
  .inputValidator((input) => eventSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("site_events").insert({
      event_type: data.eventType,
      session_id: data.sessionId,
      utm_source: data.utmSource || null,
      utm_medium: data.utmMedium || null,
      utm_campaign: data.utmCampaign || null,
      utm_content: data.utmContent || null,
      landing_page: data.landingPage || null,
      referrer: data.referrer || null,
      metadata: data.metadata ?? null,
    });
    if (error) console.error("[site_events] insert failed", error);
    return { ok: true };
  });
