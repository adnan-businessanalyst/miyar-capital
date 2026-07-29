# Miyar Capital (Next.js frontend)

Marketing site + admin UI. Backend lives in `@workspace/miyar-api`.

## Architecture

| App | Path | Role |
|-----|------|------|
| Frontend | `artifacts/miyar-capital` | Pages, styles, admin UI |
| API | `artifacts/miyar-api` | Contact, admin auth, report PDFs, Postgres, Resend, reCAPTCHA |

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
# fill DATABASE_URL, Resend, ADMIN_*, RECAPTCHA_SECRET_KEY, FRONTEND_ORIGIN

# Frontend
cp artifacts/miyar-capital/.env.example artifacts/miyar-capital/.env.local
# set NEXT_PUBLIC_RECAPTCHA_SITE_KEY; leave NEXT_PUBLIC_API_URL empty
# API_INTERNAL_URL=http://127.0.0.1:4000

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

- **Frontend:** Vercel (Root Directory `artifacts/miyar-capital`). Add rewrite `/api/:path*` → your API URL (also set `API_INTERNAL_URL` for RSC fetches).
- **API:** Railway / Render / Fly (Node). Set env from `miyar-api/.env.example`. Default documented host: Railway.
- Clear any stale Vite **Output Directory** (`dist/public`) in Vercel.

## Remaining TODOs

- Richer per-page metadata / more Server Components / `next/image`
- Production rate limiting (API limiter is in-memory)
- Signed/private PDFs later
