// Server-only. One person, one contact row — a project enquiry and a resource
// request from the same email address link to the same contact instead of
// creating unrelated records, so a business owner's history stays together.
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type Attribution = {
  utmSource?: string | null | undefined;
  utmMedium?: string | null | undefined;
  utmCampaign?: string | null | undefined;
  utmContent?: string | null | undefined;
  landingPage?: string | null | undefined;
  referrer?: string | null | undefined;
};

type ContactInput = {
  name: string;
  email: string;
  phone?: string | null;
  businessName?: string | null;
  businessType?: string | null;
  attribution?: Attribution;
};

/** Finds a contact by email (case-insensitive) or creates one. Existing
 * blank fields are backfilled from this submission; fields the contact
 * already has are left alone — a later, thinner form (e.g. the resource
 * form) should never erase richer data captured earlier. */
export async function findOrCreateContact(input: ContactInput): Promise<string> {
  const email = input.email.trim().toLowerCase();

  const { data: existing, error: lookupError } = await supabaseAdmin
    .from("contacts")
    .select("id, name, phone, business_name, business_type")
    .eq("email", email)
    .maybeSingle();

  if (lookupError) throw new Error("Could not look up contact record.");

  if (existing) {
    const patch: {
      phone?: string;
      business_name?: string;
      business_type?: string;
    } = {};
    if (!existing.phone && input.phone) patch.phone = input.phone;
    if (!existing.business_name && input.businessName) patch.business_name = input.businessName;
    if (!existing.business_type && input.businessType) patch.business_type = input.businessType;
    if (Object.keys(patch).length > 0) {
      const { error: updateError } = await supabaseAdmin
        .from("contacts")
        .update(patch)
        .eq("id", existing.id);
      if (updateError) throw new Error("Could not update contact record.");
    }
    return existing.id;
  }

  const { data: created, error: insertError } = await supabaseAdmin
    .from("contacts")
    .insert({
      name: input.name,
      email,
      phone: input.phone || null,
      business_name: input.businessName || null,
      business_type: input.businessType || null,
      first_utm_source: input.attribution?.utmSource || null,
      first_utm_medium: input.attribution?.utmMedium || null,
      first_utm_campaign: input.attribution?.utmCampaign || null,
      first_utm_content: input.attribution?.utmContent || null,
      first_landing_page: input.attribution?.landingPage || null,
      first_referrer: input.attribution?.referrer || null,
    })
    .select("id")
    .single();

  if (insertError || !created) throw new Error("Could not create contact record.");
  return created.id;
}

export async function recordConsent(params: {
  contactId: string;
  consentType: "enquiry_response" | "resource_delivery" | "marketing";
  status: boolean;
  textVersion: string;
  source?: string;
}): Promise<void> {
  const { error } = await supabaseAdmin.from("consent_records").insert({
    contact_id: params.contactId,
    consent_type: params.consentType,
    consent_status: params.status,
    consent_text_version: params.textVersion,
    source: params.source ?? "website",
  });
  // Consent logging failure should not be silently swallowed, but it also
  // should not take down a submission that otherwise succeeded — surface it
  // to server logs for follow-up instead.
  if (error) console.error("[consent] failed to record consent", error);
}
