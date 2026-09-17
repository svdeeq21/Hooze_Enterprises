# Hooze Enterprises rebuild

## Done in this pass
- [x] Preserve the Hooze visual identity and brand assets
- [x] Rebuild buyer-focused homepage, Solutions hub, Work hub, About page
- [x] Route metadata rebuilt on a shared `seo()` helper — absolute canonical URLs, OG/Twitter tags, a real 1200x630 share image
- [x] Consolidated sitemap.xml + robots.txt (single dynamic source, admin disallowed)
- [x] Contacts / consent_records / resource_requests / email_deliveries / enquiry_notes / site_events data model, RLS-locked to service_role only
- [x] Rebuilt project-enquiry flow: contact linking, attribution, duplicate-submit guard, confirmation + internal-notification emails via Gmail SMTP, delivery status logged
- [x] New free-resource lead-capture flow ("Get the guide") with its own three-tier consent and a real, first-draft PDF guide
- [x] First-party analytics event log with UTM/referrer capture — no third-party analytics
- [x] Admin section (`/admin`): dashboard, enquiry list/detail/status/notes, resource requests, failed email deliveries — Supabase Auth + email allowlist
- [x] Privacy and Terms pages rewritten to describe the three consent tiers and Gmail SMTP/analytics/admin access accurately
- [x] Deploy target pinned to Vercel's nitro preset (was silently defaulting to Cloudflare)
- [x] Fixed a pre-existing broken image import in `about.tsx`

## Explicitly deferred (see DEPLOYMENT.md §Scope)
- [ ] Full Hooze CRM portal
- [ ] AI chatbot on the website
- [ ] AI lead scoring
- [ ] Complex marketing automation
- [ ] Full blog CMS
- [ ] Multi-resource library
- [ ] Customer login portal / payment processing

## Still needs a real value before launch
- [ ] Replace illustrative project visuals with approved real screenshots
- [ ] Supply real `GMAIL_USER` + `GMAIL_APP_PASSWORD` (and optionally `GMAIL_INTERNAL_NOTIFICATION_EMAIL`)
- [ ] Create the separate production Supabase project, apply migrations, set `ADMIN_EMAILS`
- [ ] Legal/regulatory review of the first-pass Privacy Policy / Terms / consent wording
- [ ] Run the manual test pass in `DEPLOYMENT.md` end-to-end against the real production project before declaring this launch-ready
