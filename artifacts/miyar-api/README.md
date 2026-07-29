# Miyar API

Standalone Node backend for Miyar Capital (Hono + Drizzle + Postgres + Resend).

## Endpoints

| Method | Path | Auth |
|--------|------|------|
| `GET` | `/health` | public |
| `POST` | `/api/contact` | public (+ reCAPTCHA) |
| `GET` | `/api/reports` | public (optional `?section=annual\|financial`) |
| `GET` | `/api/reports/:id/file` | public (`?download=1` for attachment; `?lang=ar` for Arabic PDF) |
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

## PDFs / financial reports

Report metadata and English/Arabic PDF bytes are stored in Postgres (`reports` table)
via the admin panel (`/my-access-nimda/reports` on the frontend). Public pages load them from
`GET /api/reports` and serve files from `GET /api/reports/:id/file` (add `?lang=ar`
for the Arabic PDF). Arabic site mode uses Arabic title, date, file name, and PDF.

After pulling schema changes: `pnpm db:push` (or `pnpm db:migrate`) in this package.
