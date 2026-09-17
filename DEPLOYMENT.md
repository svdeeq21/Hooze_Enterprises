# Deployment guide

This is a first-pass, engineering-grade handoff — not a claim that the system is production-ready. Read "What was and wasn't verified" at the bottom before launch.

## 1. Create the production Supabase project

Use a **separate** project from any Lovable-connected dev project — do not reuse `ajmvchxisrrxgrswtibq`.

1. Create a new Supabase project.
2. Run the migrations in `supabase/migrations/` against it, in order (via the Supabase SQL editor, or `supabase db push` with the CLI linked to the new project). The last one, `20260916000000_crm_foundation.sql`, adds `contacts`, `consent_records`, `resource_requests`, `email_deliveries`, `enquiry_notes`, `site_events`, and links `project_enquiries` to `contacts`.
3. In Authentication settings, **disable public sign-ups** (or otherwise restrict them) — Supabase Auth alone doesn't limit who can create an account, so admin access ultimately depends on `ADMIN_EMAILS` (below) *and* on not letting strangers self-register.
4. Create one Supabase Auth user (email + password) for yourself, with the same email you'll put in `ADMIN_EMAILS`.
5. Copy `SUPABASE_URL`, the publishable key, and the **service role** key (Settings → API) — the service role key is a secret, never a `VITE_`-prefixed variable.
6. Regenerate `src/integrations/supabase/types.ts` from the real project (`supabase gen types typescript --project-id <ref> > src/integrations/supabase/types.ts`) and remove the "hand-maintained" note at the top of that file once you do. It was hand-written here because no live project existed yet to generate against — worth a diff check against the migration before trusting it blindly.

## 2. Set up Gmail SMTP

Email is sent via Gmail SMTP (`nodemailer`), not Resend — Resend requires a domain verified with them before it will let you send from an address on it, and this project doesn't have a custom domain yet. Gmail SMTP sidesteps that: it sends as the Gmail account you authenticate with, so there's nothing to verify beyond owning the account.

1. Decide which Gmail account will send mail — e.g. `hoozeenterprises@gmail.com`. This can be a plain free Gmail account or a Google Workspace address on a custom domain.
2. Turn on 2-Step Verification for that account (Google Account → Security) — required before it will issue App Passwords.
3. Generate an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords): choose "Mail" as the app, generate, and copy the 16-character password. This — not the account's normal login password — is `GMAIL_APP_PASSWORD`.
4. Decide the internal-notification inbox (where new-enquiry alerts land). It can be the same address as `GMAIL_USER`, since that address only needs to *receive* mail for that purpose.

**Limits to know about:** a free Gmail account caps outbound mail at 500/day (2,000/day on Google Workspace) — comfortably above this site's expected volume, but worth knowing if enquiry/resource-request traffic ever grows a lot. Mail sent this way also lacks the SPF/DKIM/DMARC setup a dedicated-domain ESP gives you, so it's somewhat more likely to be filtered as bulk mail by strict spam filters than Resend/SES/Postmark mail would be — acceptable for now, worth revisiting if deliverability becomes a problem.

Until `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set, sends will fail, get logged to `email_deliveries` with `status: failed`, and never block a form submission (see `.env.example`).

## 3. Environment variables

Copy `.env.example` → `.env` for local dev, and set the same keys in the Vercel project (Settings → Environment Variables) for Production and Preview:

| Variable | Notes |
|---|---|
| `SUPABASE_URL`, `VITE_SUPABASE_URL` | new prod project |
| `SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PUBLISHABLE_KEY` | not secret |
| `SUPABASE_SERVICE_ROLE_KEY` | **secret** — server-only, never `VITE_`-prefixed |
| `SITE_URL` | absolute origin, no trailing slash — used for canonical URLs, sitemap, and links in emails |
| `GMAIL_USER` | secret-ish — the sending Gmail address; also the default recipient of internal notifications |
| `GMAIL_APP_PASSWORD` | **secret** — a Google App Password for `GMAIL_USER`, not its login password |
| `GMAIL_FROM_NAME` | optional — display name on outgoing mail; defaults to "Hooze Enterprises" |
| `GMAIL_INTERNAL_NOTIFICATION_EMAIL` | optional — where new-enquiry alerts land; defaults to `GMAIL_USER` |
| `ADMIN_EMAILS` | comma-separated allowlist for `/admin` — every admin server function refuses everyone if this is unset |

## 4. Domain

`SITE_URL` defaults to `https://hoozeenterprises.vercel.app` if unset, and falls back further to Vercel's own `VERCEL_URL` on preview deployments. **If a custom domain is attached to the Vercel project**, set `SITE_URL` to that domain explicitly — canonical URLs, the sitemap, and email links otherwise keep pointing at the `.vercel.app` address.

## 5. Deploy to Vercel

The nitro build target is pinned to `vercel` in `vite.config.ts` (it was previously falling back to a Cloudflare Workers output when built outside Lovable's own environment — fixed and verified in this pass). Connect the repository to Vercel as normal; no extra `vercel.json` should be needed. Confirm after the first deploy that the build log shows `preset: vercel`, not `cloudflare-module`.

## 6. Manual test checklist before calling this launch-ready

None of this was exercised against a live Supabase/Resend/Vercel environment in this pass — see the honesty note below. Before launch, actually do all of these against the real deployed site:

- [ ] Submit `/start-a-project` end to end — enquiry appears in Supabase, confirmation email arrives, internal notification email arrives, reference number shown matches the stored row.
- [ ] Submit the same enquiry (same email + problem text) twice within two minutes — confirm only one row is created.
- [ ] Submit `/get-the-guide` — resource request saved, contact created/reused correctly, email arrives, on-page download link works.
- [ ] Temporarily break `GMAIL_APP_PASSWORD` and confirm both forms still save successfully and show the failure in `/admin/email-deliveries`, without hanging or erroring the form.
- [ ] Confirm the honeypot (`website` field) silently no-ops a submission.
- [ ] Try to query `contacts`, `project_enquiries`, or `resource_requests` from the browser with the publishable key directly (e.g. via the Supabase JS client in devtools) — confirm it returns nothing.
- [ ] Sign in to `/admin/login` with the allowlisted account; confirm a non-allowlisted Supabase Auth account is rejected by the server function even if it can sign in.
- [ ] Update an enquiry's status and add a note from `/admin/enquiries/$id`; confirm it persists.
- [ ] Check `/sitemap.xml` and `/robots.txt` resolve against the real domain and that `/admin` is disallowed.
- [ ] Run Lighthouse / PageSpeed against the deployed homepage on mobile.
- [ ] Submit Search Console verification and the sitemap once the real domain is live.

## What was and wasn't verified in this pass

**Verified:** the project builds cleanly (`npm run build`, nitro → Vercel Build Output API format), `npx tsc --noEmit` is clean, `npm run lint` is clean (aside from 6 pre-existing, unrelated shadcn/ui `react-refresh` warnings), and the client-side JS bundle was grep-checked to confirm no server secrets, service-role client, or Resend/admin logic leak into it.

**Not verified**, because this sandbox has no route to a live Supabase project, no Gmail App Password to authenticate with, no Vercel deployment, and (it turned out) no working local HTTP server binding to test against directly: any actual email delivery, any real database read/write against Supabase, Supabase Auth sign-in, or a real browser rendering of any page. The manual checklist above is exactly the gap between "compiles and type-checks" and "works" — please run it before pointing real traffic at this.
