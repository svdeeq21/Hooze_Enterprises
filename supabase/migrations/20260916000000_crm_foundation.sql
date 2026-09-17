-- CRM foundation: contacts, consent, resource requests, email delivery log,
-- enquiry notes, and a first-party site-events table for attribution/analytics.
-- All tables are RLS-enabled with a single service_role policy — there is no
-- public/anon access to any of this data. Every read/write happens through a
-- TanStack server function running with the service-role key, never from the
-- browser directly.

-- 1. contacts ---------------------------------------------------------------
CREATE TABLE public.contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 150),
  email text NOT NULL CHECK (char_length(email) <= 255),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 40),
  business_name text CHECK (business_name IS NULL OR char_length(business_name) <= 150),
  business_type text CHECK (business_type IS NULL OR char_length(business_type) <= 120),
  first_touch_at timestamptz NOT NULL DEFAULT now(),
  first_utm_source text,
  first_utm_medium text,
  first_utm_campaign text,
  first_utm_content text,
  first_landing_page text,
  first_referrer text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX contacts_email_key ON public.contacts (lower(email));

GRANT ALL ON public.contacts TO service_role;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Trusted website services manage contacts"
  ON public.contacts FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_contacts_updated_at
BEFORE UPDATE ON public.contacts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 2. link project_enquiries to contacts + attribution ------------------------
ALTER TABLE public.project_enquiries
  ADD COLUMN contact_id uuid REFERENCES public.contacts(id) ON DELETE SET NULL,
  ADD COLUMN utm_source text,
  ADD COLUMN utm_medium text,
  ADD COLUMN utm_campaign text,
  ADD COLUMN utm_content text,
  ADD COLUMN landing_page text,
  ADD COLUMN referrer text;

CREATE INDEX project_enquiries_contact_id_idx ON public.project_enquiries (contact_id);

-- 3. consent_records ----------------------------------------------------------
CREATE TABLE public.consent_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid NOT NULL REFERENCES public.contacts(id) ON DELETE CASCADE,
  consent_type text NOT NULL CHECK (consent_type IN ('enquiry_response', 'resource_delivery', 'marketing')),
  consent_status boolean NOT NULL,
  consent_text_version text NOT NULL,
  source text NOT NULL DEFAULT 'website',
  consented_at timestamptz NOT NULL DEFAULT now(),
  withdrawn_at timestamptz
);

CREATE INDEX consent_records_contact_id_idx ON public.consent_records (contact_id);
CREATE INDEX consent_records_type_idx ON public.consent_records (consent_type, consent_status);

GRANT ALL ON public.consent_records TO service_role;
ALTER TABLE public.consent_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Trusted website services manage consent records"
  ON public.consent_records FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 4. resource_requests --------------------------------------------------------
CREATE TABLE public.resource_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid NOT NULL REFERENCES public.contacts(id) ON DELETE CASCADE,
  resource_slug text NOT NULL DEFAULT 'business-automation-starter-kit',
  business_challenge text CHECK (business_challenge IS NULL OR char_length(business_challenge) <= 500),
  source text NOT NULL DEFAULT 'website',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  landing_page text,
  referrer text,
  request_fingerprint text NOT NULL,
  delivery_status text NOT NULL DEFAULT 'pending' CHECK (delivery_status IN ('pending', 'sent', 'failed')),
  delivered_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX resource_requests_contact_id_idx ON public.resource_requests (contact_id);
CREATE INDEX resource_requests_rate_limit_idx ON public.resource_requests (request_fingerprint, created_at DESC);

GRANT ALL ON public.resource_requests TO service_role;
ALTER TABLE public.resource_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Trusted website services manage resource requests"
  ON public.resource_requests FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 5. email_deliveries ----------------------------------------------------------
CREATE TABLE public.email_deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  related_table text NOT NULL CHECK (related_table IN ('project_enquiries', 'resource_requests')),
  related_id uuid NOT NULL,
  email_type text NOT NULL CHECK (email_type IN ('enquiry_confirmation', 'internal_notification', 'resource_delivery')),
  recipient text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  provider_message_id text,
  error_message text,
  attempt_count integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX email_deliveries_related_idx ON public.email_deliveries (related_table, related_id);
CREATE INDEX email_deliveries_status_idx ON public.email_deliveries (status);

GRANT ALL ON public.email_deliveries TO service_role;
ALTER TABLE public.email_deliveries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Trusted website services manage email deliveries"
  ON public.email_deliveries FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE TRIGGER set_email_deliveries_updated_at
BEFORE UPDATE ON public.email_deliveries
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 6. enquiry_notes ------------------------------------------------------------
CREATE TABLE public.enquiry_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id uuid NOT NULL REFERENCES public.project_enquiries(id) ON DELETE CASCADE,
  author_email text NOT NULL,
  note text NOT NULL CHECK (char_length(note) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX enquiry_notes_enquiry_id_idx ON public.enquiry_notes (enquiry_id);

GRANT ALL ON public.enquiry_notes TO service_role;
ALTER TABLE public.enquiry_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Trusted website services manage enquiry notes"
  ON public.enquiry_notes FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 7. site_events (first-party, privacy-conscious analytics) -------------------
CREATE TABLE public.site_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL CHECK (event_type IN (
    'project_form_started', 'project_form_submitted',
    'resource_form_started', 'resource_form_submitted',
    'email_subscribed', 'whatsapp_clicked', 'contact_email_clicked'
  )),
  session_id text NOT NULL,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  landing_page text,
  referrer text,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX site_events_type_idx ON public.site_events (event_type, created_at DESC);
CREATE INDEX site_events_session_idx ON public.site_events (session_id, created_at DESC);

GRANT ALL ON public.site_events TO service_role;
ALTER TABLE public.site_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Trusted website services manage site events"
  ON public.site_events FOR ALL TO service_role USING (true) WITH CHECK (true);
