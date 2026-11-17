-- Run in the Supabase SQL editor (or via your migration tool) BEFORE deploying the new forms.
-- Makes the phone number optional and records marketing consent separately.

alter table public.guide_download_requests alter column phone drop not null;
alter table public.guide_download_requests drop constraint if exists guide_download_requests_phone_check;
alter table public.guide_download_requests
  add constraint guide_download_requests_phone_check
  check (phone is null or char_length(btrim(phone)) between 6 and 30);
alter table public.guide_download_requests
  add column if not exists marketing_consent boolean not null default false;

create index if not exists guide_download_requests_email_created_idx
  on public.guide_download_requests (email, created_at desc);
