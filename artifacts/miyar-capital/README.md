# Miyar Capital (Next.js frontend)

Marketing site + admin UI. Backend lives in `@workspace/miyar-api`.

## Architecture

| App | Path | Role |
|-----|------|------|
| Frontend | `artifacts/miyar-capital` | Pages, styles, admin UI |
| API | `artifacts/miyar-api` | Contact, admin auth, report PDFs, Postgres, SMTP, reCAPTCHA (production) |

Browser calls **same-origin** `/api/*`. Next.js rewrites those to `API_INTERNAL_URL` (default `http://127.0.0.1:4000`) so admin cookies stay `SameSite=Lax`.

Financial report PDFs, disclosures, and homepage hero CTA/promo are managed in Admin
(`/my-access-nimda/reports`, `/my-access-nimda/disclosures`, `/my-access-nimda/homepage`)
and served by the API.
## Local setup

```bash
# from repo root
pnpm install

# API
cp artifacts/miyar-api/.env.example artifacts/miyar-api/.env
# fill DATABASE_URL_STAGING, VERCEL_URL_*, SMTP, ADMIN_*, FRONTEND_ORIGIN

# Frontend
cp artifacts/miyar-capital/.env.example artifacts/miyar-capital/.env.local
# set RECAPTCHA_SITE_KEY on production Vercel (Config); leave NEXT_PUBLIC_API_URL empty
# API_INTERNAL_URL=http://127.0.0.1:4000
# RAILWAY_URL_STAGING / RAILWAY_URL_PRODUCTION = hosted APIs

cd artifacts/miyar-api
pnpm db:push          # or pnpm db:migrate
pnpm dev              # :4000

# other terminal
cd artifacts/miyar-capital
pnpm media:manifest
pnpm dev              # :3001
```

Or from root (two terminals): `pnpm dev:api` and `pnpm dev:web`.

## Forms

Shared `POST /api/contact` (proxied to API): `name`, `email`, `phone?`, `subject?`, `message`, `sourcePage`, `recaptchaToken?`.

Wired: homepage, RegisterInterest, Who We Are, IB Register Interest.

## Admin

- `/my-access-nimda` login → API session cookie `miyar_admin_session`
- `/my-access-nimda/submissions` list + detail + mark-as-read

## Env (frontend only)

See `.env.example`. Secrets stay on the API.

## Deploy notes

- **Frontend:** Vercel (Root Directory `artifacts/miyar-capital`). Set `APP_ENV` and both `RAILWAY_URL_STAGING` / `RAILWAY_URL_PRODUCTION` (or a single `API_INTERNAL_URL` on that project). Leave `NEXT_PUBLIC_API_URL` empty.
- **API:** Railway. Set `APP_ENV` and both `VERCEL_URL_STAGING` / `VERCEL_URL_PRODUCTION` (or a single `FRONTEND_ORIGIN` on that service).
- Clear any stale Vite **Output Directory** (`dist/public`) in Vercel.

## Remaining TODOs

- Richer per-page metadata / more Server Components / `next/image`
- Production rate limiting (API limiter is in-memory)
- Signed/private PDFs later
