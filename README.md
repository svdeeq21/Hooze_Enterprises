# Hooze Enterprises — website

A business-acquisition and lead-management website for Hooze Enterprises, built with TanStack Start, React, TypeScript, Supabase and Gmail SMTP (via nodemailer), deployed on Vercel.

This started as a Lovable export and is being taken independent of Lovable — see `DEPLOYMENT.md` for the full setup and launch checklist before shipping this to production.

## What this site does

- Marketing pages (home, solutions, work, about) built around real business outcomes.
- **Start a project** — a full project-enquiry form with server-side validation, spam/rate-limiting, contact linking, and automatic confirmation + internal-notification emails via Gmail SMTP.
- **Get the guide** — a free lead magnet (the Business Automation Starter Kit, `public/resources/business-automation-starter-kit.pdf`) with a short, low-friction form and its own consent tier.
- A shared **contacts** model so the same person's enquiry and resource request link to one record instead of creating duplicates, with UTM/referrer attribution captured on both.
- A first-party, privacy-conscious **event log** (`site_events`) for form-funnel and channel attribution — no third-party analytics.
- A password-protected **admin section** (`/admin`) for managing enquiries, resource requests, and email delivery failures, gated by Supabase Auth plus an explicit email allowlist.

## Local development

```sh
npm install
cp .env.example .env   # fill in real values — see DEPLOYMENT.md
npm run dev
```

## Quality checks

```sh
npm run build   # vite build (nitro, pinned to the "vercel" preset)
npx tsc --noEmit -p tsconfig.json
npm run lint
```

## Built with

- TanStack Start (React 19, TypeScript)
- Supabase (Postgres, Auth, RLS)
- Gmail SMTP via nodemailer (transactional email)
- Tailwind CSS
