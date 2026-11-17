CREATE TABLE public.guide_download_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(btrim(full_name)) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (char_length(btrim(email)) BETWEEN 3 AND 255),
  phone text NOT NULL CHECK (char_length(btrim(phone)) BETWEEN 6 AND 30),
  created_at timestamptz NOT NULL DEFAULT now()
);
REVOKE ALL ON TABLE public.guide_download_requests FROM anon, authenticated;
GRANT ALL ON TABLE public.guide_download_requests TO service_role;
ALTER TABLE public.guide_download_requests ENABLE ROW LEVEL SECURITY;