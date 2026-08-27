# Miyar API

Standalone Node backend for Miyar Capital (Hono + Drizzle + Postgres + Office 365 SMTP).

## Endpoints

| Method | Path | Auth |
|--------|------|------|
| `GET` | `/health` | public |
| `POST` | `/api/contact` | public (+ reCAPTCHA in production) |
| `GET` | `/api/reports` | public (optional `?section=annual\|financial`) |
| `GET` | `/api/reports/:id/file` | public (`?download=1` for attachment; `?lang=ar` for Arabic PDF) |
| `GET` | `/api/homepage-hero` | public |
| `GET` | `/api/admin/homepage-hero` | session |
| `PUT` | `/api/admin/homepage-hero` | session (CTA + promo show/href/labels EN+AR) |
| `GET` | `/api/disclosures` | public |
| `GET` | `/api/disclosures/:id/file` | public (`?download=1`; `?lang=ar` for Arabic PDF) |
| `GET` | `/api/admin/disclosures` | session |
| `POST` | `/api/admin/disclosures` | session (multipart: title, titleAr, body, bodyAr, fileName, fileNameAr, file, fileAr) |
| `PATCH` | `/api/admin/disclosures/:id` | session (multipart; file / fileAr optional) |
| `DELETE` | `/api/admin/disclosures/:id` | session |
| `GET` | `/api/admin/reports` | session |
| `POST` | `/api/admin/reports` | session (multipart: section, title, titleAr, date, dateAr, fileName, fileNameAr, file, fileAr) |
| `PATCH` | `/api/admin/reports/:id` | session (multipart; file / fileAr optional) |
| `DELETE` | `/api/admin/reports/:id` | session |
| `POST` | `/api/admin/login` | password |
| `POST` | `/api/admin/logout` | session |
| `GET` | `/api/admin/me` | session |
| `GET` | `/api/admin/submissions` | session |
| `GET` | `/api/admin/submissions/:id` | session |
| `POST` | `/api/admin/submissions/:id/read` | session |

## Local setup

```bash
cp artifacts/miyar-api/.env.example artifacts/miyar-api/.env
# fill DATABASE_URL_STAGING, VERCEL_URL_STAGING / VERCEL_URL_PRODUCTION,
# SMTP, admin, FRONTEND_ORIGIN (localhost)
# add DATABASE_URL_PRODUCTION when the production Neon exists

cd artifacts/miyar-api
pnpm db:push   # staging Neon (APP_ENV=staging)
pnpm dev       # http://localhost:4000
```

Schema against production Neon (does not swap `.env`):

```bash
cd artifacts/miyar-api
pnpm db:push:production
pnpm db:apply-contact:production
pnpm db:apply-contact-page-title:production
pnpm db:apply-contact-message-length:production
pnpm db:apply-job-applications:production
pnpm db:apply-admin-credentials:production
pnpm db:apply-page-factsheets:production
```

The API picks Neon + the Vercel origin from `APP_ENV` (`staging` | `production`). Scripts named `*:production` force the production database. `/health` returns `env` and `site`.

## Cookie / CORS strategy (recommended)

Prefer **same-origin reverse proxy**: the Next frontend rewrites `/api/*` to this API (`API_INTERNAL_URL`).  
Browsers talk only to the frontend origin, so admin cookies use `SameSite=Lax` and work on localhost HTTP.

Cross-origin without a proxy: set `COOKIE_SAME_SITE=none` (HTTPS required) and list the frontend in `FRONTEND_ORIGIN`.

## Email / DNS

Outbound mail uses Office 365 SMTP (`SMTP_USER` / `SMTP_PASS`). Forms still persist if SMTP is not filled in yet. reCAPTCHA is enforced only when `APP_ENV=production`.

## PDFs / financial reports

Report metadata and English/Arabic PDF bytes are stored in Postgres (`reports` table)
via the admin panel (`/my-access-nimda/reports` on the frontend). Public pages load them from
`GET /api/reports` and serve files from `GET /api/reports/:id/file` (add `?lang=ar`
for the Arabic PDF). Arabic site mode uses Arabic title, date, file name, and PDF.

After pulling schema changes: `pnpm db:push` for staging, `pnpm db:push:production` for production.
