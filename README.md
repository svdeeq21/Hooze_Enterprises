# Hooze Enterprises website

TanStack Start (React 19 + Vite 8 + Tailwind v4) site. Originally exported from Lovable; now set up to run on its own machine.

## Run it on your PC

Requires **Node 20+** (22 recommended). Works on Windows, macOS and Linux.

```sh
npm install        # .npmrc sets legacy-peer-deps; plain `npm install` otherwise crashes on the rolldown override
npm run dev        # http://localhost:5173
```

Other commands:

| Command | What it does |
| --- | --- |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint (+ Prettier) |
| `npm test` | Unit and integrity tests (schemas, rate limiter, routes, links, assets, business facts) |
| `npm run build:node` | Production build as a Node server (`.output/`) |
| `npm run start` | Serve that build: `http://localhost:3000` (set `PORT` to change) |
| `npm run preview` | `build:node` then `start` |
| `npm run build` | Lovable's default build (Cloudflare Worker target). Builds fine, but cannot be run locally with `vite preview` |
| `npm run guide:pdf` | Regenerate the starter-kit PDF (needs Python + `pip install reportlab`) |

### Forms in local development

With no `SUPABASE_SERVICE_ROLE_KEY` set, both forms (free guide, `/start-a-project`) still work in `npm run dev`:
submissions are appended to `.data/guide-requests.jsonl` and `.data/project-enquiries.jsonl` (git-ignored).
**In a production build, missing storage keys make the forms show an error instead of pretending to succeed.**

## Environment variables

Copy `.env.example` to `.env.local` (git-ignored) and fill in. On your host (Vercel etc.) set the same names in project settings.

- `VITE_SITE_URL` final public URL (used for canonical links, sitemap, social cards)
- `VITE_SUPABASE_*`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` your Supabase project
- `SUPABASE_SERVICE_ROLE_KEY` **server only, never `VITE_`-prefixed**
- Optional: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `LEAD_NOTIFY_EMAIL` emails you on every new lead

The `.env` file that came from Lovable points at the Lovable-managed dev database. Replace it with your own production project.

## Database

Run these in the Supabase SQL editor, in order, **before deploying**:

1. `drizzle/migrations/0000_guide_download_requests.sql` (already applied if you use the existing Lovable project)
2. `database/0001_guide_phone_optional_and_consent.sql`
3. `database/0002_project_enquiries.sql`

Browser roles have no access to either table; only server code using the service-role key reads or writes.

## Where things live

- `src/lib/site-config.ts` **all contact details, URLs and case-study facts** (search for `CONFIRM`)
- `src/routes/` pages: `/`, `/about`, `/start-a-project`, `/work/praise-dynasty-whatsapp-sales-system`, `/privacy`, `/sitemap.xml`
- `src/components/site/` header, footer, forms, Hooze AI walkthrough
- `src/lib/*.functions.ts` server functions for the two forms; `src/lib/leads.server.ts` storage + notification
- `public/downloads/` the starter-kit PDF; `design-source/` original large images (not shipped)

See `AUDIT-STATUS.md` for what has been verified and what still needs your input.
