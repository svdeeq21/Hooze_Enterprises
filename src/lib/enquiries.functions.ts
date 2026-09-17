import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { findOrCreateContact, recordConsent } from "@/lib/contacts.server";
import { sendAndLogEmail, getInternalNotificationAddress } from "@/lib/email/gmail-smtp.server";
import { enquiryConfirmationEmail, internalNotificationEmail } from "@/lib/email/templates";

const CONSENT_TEXT_VERSION = "2026-09-16";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  businessName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  whatsapp: z.string().trim().max(40).optional().default(""),
  projectType: z.enum([
    "custom-software",
    "business-automation",
    "intelligent-system",
    "digital-product",
    "not-sure",
  ]),
  problem: z.string().trim().min(30).max(3000),
  currentTools: z.string().trim().max(500).optional().default(""),
  budgetRange: z.string().trim().max(80).optional().default(""),
  timeline: z.string().trim().max(80).optional().default(""),
  preferredContact: z.enum(["email", "whatsapp"]),
  consent: z.literal(true),
  website: z.string().max(0).optional().default(""),
  utmSource: z.string().trim().max(120).optional().nullable(),
  utmMedium: z.string().trim().max(120).optional().nullable(),
  utmCampaign: z.string().trim().max(120).optional().nullable(),
  utmContent: z.string().trim().max(120).optional().nullable(),
  landingPage: z.string().trim().max(300).optional().nullable(),
  referrer: z.string().trim().max(500).optional().nullable(),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true, reference: "n/a" };

    const { getRequest } = await import("@tanstack/react-start/server");
    const request = getRequest();
    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const email = data.email.toLowerCase();
    const encoded = new TextEncoder().encode(`${forwarded}:${email}`);
    const digest = await crypto.subtle.digest("SHA-256", encoded);
    const fingerprint = Array.from(new Uint8Array(digest), (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin
      .from("project_enquiries")
      .select("id", { count: "exact", head: true })
      .eq("request_fingerprint", fingerprint)
      .gte("created_at", since);
    if ((count ?? 0) >= 3) throw new Error("Too many enquiries. Please try again later.");

    // Duplicate-submission guard: the exact same email + problem text within
    // the last two minutes is treated as a double-click/double-submit, not a
    // second genuine enquiry — return the existing record instead of a copy.
    const recentSince = new Date(Date.now() - 2 * 60 * 1000).toISOString();
    const { data: recentDuplicate } = await supabaseAdmin
      .from("project_enquiries")
      .select("id")
      .eq("email", email)
      .eq("problem", data.problem)
      .gte("created_at", recentSince)
      .maybeSingle();
    if (recentDuplicate)
      return {
        ok: true,
        reference: recentDuplicate.id.slice(0, 8).toUpperCase(),
      };

    const contactId = await findOrCreateContact({
      name: data.name,
      email,
      phone: data.whatsapp || null,
      businessName: data.businessName,
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
      .from("project_enquiries")
      .insert({
        name: data.name,
        business_name: data.businessName,
        email,
        contact_id: contactId,
        whatsapp: data.whatsapp || null,
        project_type: data.projectType,
        problem: data.problem,
        current_tools: data.currentTools || null,
        budget_range: data.budgetRange || null,
        timeline: data.timeline || null,
        preferred_contact: data.preferredContact,
        consent: data.consent,
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
    if (error || !inserted) throw new Error("Your enquiry could not be saved. Please try again.");

    await recordConsent({
      contactId,
      consentType: "enquiry_response",
      status: true,
      textVersion: CONSENT_TEXT_VERSION,
    });

    const reference = inserted.id.slice(0, 8).toUpperCase();

    // Email delivery happens after the record is safely saved. It is awaited
    // (bounded by the 10s per-email timeout in sendAndLogEmail) rather than
    // truly fire-and-forget, because serverless platforms including Vercel
    // can freeze/terminate a function as soon as its response is sent —
    // detached promises are not guaranteed to finish. The enquiry is already
    // safely stored by this point either way, so the bounded wait here only
    // affects how soon the confirmation screen appears, never whether the
    // enquiry itself was saved.
    const confirmation = enquiryConfirmationEmail({
      name: data.name,
      businessName: data.businessName,
      projectType: data.projectType,
      problem: data.problem,
      reference,
    });
    const notification = internalNotificationEmail({
      reference,
      name: data.name,
      businessName: data.businessName,
      email,
      whatsapp: data.whatsapp || "",
      projectType: data.projectType,
      problem: data.problem,
      budgetRange: data.budgetRange || "",
      timeline: data.timeline || "",
      preferredContact: data.preferredContact,
      source: data.utmSource || "direct",
    });

    await Promise.allSettled([
      sendAndLogEmail({
        relatedTable: "project_enquiries",
        relatedId: inserted.id,
        emailType: "enquiry_confirmation",
        to: email,
        ...confirmation,
      }),
      sendAndLogEmail({
        relatedTable: "project_enquiries",
        relatedId: inserted.id,
        emailType: "internal_notification",
        to: getInternalNotificationAddress(),
        ...notification,
      }),
    ]);

    return { ok: true, reference };
  });
