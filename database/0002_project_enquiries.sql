-- Run in the Supabase SQL editor (or via your migration tool) BEFORE deploying the new forms.
-- Stores /start-a-project submissions. Browser roles get no access; only server code
-- (service role) can read or write, matching guide_download_requests.

create table if not exists public.project_enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(btrim(full_name)) between 2 and 120),
  email text not null check (char_length(btrim(email)) between 3 and 255),
  company text check (company is null or char_length(company) <= 120),
  help_type text not null check (help_type in
    ('hooze-ai','automation','ai-application','custom-software','integration','not-sure')),
  message text not null check (char_length(btrim(message)) between 20 and 2000),
  contact_method text not null default 'email' check (contact_method in ('email','whatsapp','call')),
  phone text check (phone is null or char_length(btrim(phone)) between 6 and 30),
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists project_enquiries_email_created_idx
  on public.project_enquiries (email, created_at desc);

revoke all on table public.project_enquiries from anon, authenticated;
grant all on table public.project_enquiries to service_role;
alter table public.project_enquiries enable row level security;
