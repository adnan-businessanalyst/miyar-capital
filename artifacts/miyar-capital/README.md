# Miyar Capital (Next.js)

App Router fullstack site: marketing pages + contact API + admin submissions panel.

## Stack

- Next.js App Router (React Server Components by default)
- Postgres via Drizzle ORM (`postgres` driver — Neon-ready)
- Resend for form notification email
- Google reCAPTCHA v3 (optional in local/dev if secret unset)

## Local setup

```bash
# from repo root
pnpm install
cp artifacts/miyar-capital/.env.example artifacts/miyar-capital/.env.local
# fill DATABASE_URL, Resend, admin, captcha keys

cd artifacts/miyar-capital
pnpm db:push          # or: pnpm db:migrate
pnpm media:manifest   # rebuilds public/media URL map
pnpm dev              # http://localhost:3001
```

### Database

Schema lives in `src/server/db/schema.ts`. SQL migration: `drizzle/0000_contact_submissions.sql`.

- `pnpm db:push` — push schema to Neon/Postgres (good for early setup)
- `pnpm db:migrate` — apply SQL migrations via drizzle-kit

### Forms

Shared `POST /api/contact` contract (Zod): `name`, `email`, `phone?`, `subject?`, `message`, `sourcePage`, `recaptchaToken?`.

Wired in phase 1:

- Homepage contact (`/`)
- `RegisterInterest` component (fund / advisory / arrangement pages)
- Who We Are interest form
- IB Register Interest (`/investment-banking/register-interest`)

Each submission is inserted into `contact_submissions` and emailed via Resend to `CONTACT_TO_EMAIL`.

### PDFs

Place files under `public/docs/` (served at `/docs/...`). Wire download links when files exist. Structure is ready for signed/private downloads later.

### Admin

- Login: `/admin` (password = `ADMIN_PASSWORD`, session HMAC cookie via `ADMIN_SESSION_SECRET`)
- List: `/admin/submissions`
- Detail: `/admin/submissions/[id]` (optional mark-as-read)

No public API lists submissions.

### Email / DNS

Configure SPF + DKIM for the sending domain in the Resend dashboard before production use of `CONTACT_FROM_EMAIL`.

### Media

Source assets under `src/assets/` are copied to `public/media/` and indexed by `scripts/generate-media-manifest.mjs` (runs on `predev` / `prebuild`). After adding files, re-copy and regenerate:

```bash
# from artifacts/miyar-capital (example)
# copy new files into public/media/... then:
pnpm media:manifest
```

## Env vars

See `.env.example`. Never commit real secrets.

## Vercel deploy

- Framework: **Next.js** (do not use a static/Vite output directory).
- In Project Settings → Build & Development Settings, leave **Output Directory** empty (or ensure overrides are off). A leftover Vite value like `dist/public` will break deploys.
- Prefer Root Directory `artifacts/miyar-capital`, or deploy from the monorepo root with the root `vercel.json` (`pnpm --filter @workspace/miyar-capital run build`).
- Repo `vercel.json` sets `"outputDirectory": null` so Next.js uses `.next`.

## Remaining TODO (phase 1 leftovers)

- SEO polish: richer per-route `generateMetadata` (many routes use a simple title)
- Convert high-traffic pages from client components toward Server Components where possible
- `next/image` adoption for media
- Private/signed PDF ACL
- Full CMS-in-Postgres for page copy (out of scope)
- Production rate limiting (current limiter is in-memory per instance)
- Page view components live under `src/views/` (not `src/pages/`) so Next.js does not treat them as the Pages Router
