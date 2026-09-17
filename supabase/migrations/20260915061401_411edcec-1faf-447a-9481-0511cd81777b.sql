CREATE TABLE public.project_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  business_name text NOT NULL CHECK (char_length(business_name) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (char_length(email) <= 255),
  whatsapp text CHECK (whatsapp IS NULL OR char_length(whatsapp) <= 40),
  project_type text NOT NULL CHECK (project_type IN ('custom-software', 'business-automation', 'intelligent-system', 'digital-product', 'not-sure')),
  problem text NOT NULL CHECK (char_length(problem) BETWEEN 30 AND 3000),
  current_tools text CHECK (current_tools IS NULL OR char_length(current_tools) <= 500),
  budget_range text CHECK (budget_range IS NULL OR char_length(budget_range) <= 80),
  timeline text CHECK (timeline IS NULL OR char_length(timeline) <= 80),
  preferred_contact text NOT NULL DEFAULT 'email' CHECK (preferred_contact IN ('email', 'whatsapp')),
  consent boolean NOT NULL CHECK (consent = true),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'discovery', 'proposal', 'won', 'lost')),
  source text NOT NULL DEFAULT 'website',
  request_fingerprint text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.project_enquiries TO service_role;

ALTER TABLE public.project_enquiries ENABLE ROW LEVEL SECURITY;

CREATE INDEX project_enquiries_rate_limit_idx
  ON public.project_enquiries (request_fingerprint, created_at DESC);

CREATE OR REPLACE FUNCTION public.set_project_enquiry_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_project_enquiry_updated_at
BEFORE UPDATE ON public.project_enquiries
FOR EACH ROW
EXECUTE FUNCTION public.set_project_enquiry_updated_at();