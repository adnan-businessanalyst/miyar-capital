# Miyar API

Standalone Node backend for Miyar Capital (Hono + Drizzle + Postgres + Resend).

## Endpoints

| Method | Path | Auth |
|--------|------|------|
| `GET` | `/health` | public |
| `POST` | `/api/contact` | public (+ reCAPTCHA) |
| `POST` | `/api/admin/login` | password |
| `POST` | `/api/admin/logout` | session |
| `GET` | `/api/admin/me` | session |
| `GET` | `/api/admin/submissions` | session |
| `GET` | `/api/admin/submissions/:id` | session |
| `POST` | `/api/admin/submissions/:id/read` | session |

## Local setup

```bash
cp artifacts/miyar-api/.env.example artifacts/miyar-api/.env
# fill DATABASE_URL, Resend, admin, captcha secret, FRONTEND_ORIGIN

cd artifacts/miyar-api
pnpm db:push   # or pnpm db:migrate
pnpm dev       # http://localhost:4000
```

## Cookie / CORS strategy (recommended)

Prefer **same-origin reverse proxy**: the Next frontend rewrites `/api/*` to this API (`API_INTERNAL_URL`).  
Browsers talk only to the frontend origin, so admin cookies use `SameSite=Lax` and work on localhost HTTP.

Cross-origin without a proxy: set `COOKIE_SAME_SITE=none` (HTTPS required) and list the frontend in `FRONTEND_ORIGIN`.

## Email / DNS

Configure SPF + DKIM for the sending domain in the Resend dashboard before production use of `CONTACT_FROM_EMAIL`.

## PDFs

Public disclosure PDFs are served by the **frontend** at `artifacts/miyar-capital/public/docs/` → `/docs/...`.
