# Miyar Capital

Marketing website for Miyar Capital, an independent Saudi CMA-regulated investment firm (Asset Management + Investment Banking), with a bilingual EN/AR interface and RTL support.

## Staging vs production

| | Staging | Production |
|---|---|---|
| GitHub | This repo (`origin`) — the only place we push from this machine | [TheProvenX/miyar-capital](https://github.com/TheProvenX/miyar-capital) |
| How it updates | `git push origin main` | Import / refresh from the staging repo (do **not** push here from this laptop) |
| Hosts | Staging Neon + Railway + Vercel | Separate production Neon + Railway + Vercel |

**Day to day:** commit and push only to the current GitHub remote (`origin`). Never add TheProvenX as a push remote on this machine.

**Refresh production GitHub** (on the TheProvenX account):

1. Open [Import a repository](https://github.com/new/import).
2. Source URL: the staging clone URL (`https://github.com/adnan-businessanalyst/miyar-capital.git`, or whatever `git remote get-url origin` prints).
3. Owner: **TheProvenX**, name: `miyar-capital`.
4. If `TheProvenX/miyar-capital` already exists, either delete it first and import again, or import into a temp name and swap.

GitHub Import copies whatever is **on staging `main` at that moment**. Push laptop work to staging first, then import.

**Deploy:** connect staging Vercel/Railway to this GitHub repo; connect production Vercel/Railway to TheProvenX.

Keep both sides in env and set `APP_ENV` on each host (`staging` or `production`). Do not rely on Railway/Vercel’s own “production” flag — a staging project still deploys as production.

| Pair | Where to enter | Variables |
|---|---|---|
| Neon | `artifacts/miyar-api/.env` | `DATABASE_URL_STAGING`, `DATABASE_URL_PRODUCTION` |
| Vercel (site) | `artifacts/miyar-api/.env` | `VERCEL_URL_STAGING`, `VERCEL_URL_PRODUCTION` |
| Railway (API) | `artifacts/miyar-capital/.env.local` | `RAILWAY_URL_STAGING`, `RAILWAY_URL_PRODUCTION` |

Local `pnpm dev` keeps `FRONTEND_ORIGIN` / `API_INTERNAL_URL` on localhost. Hosted Railway CORS uses the Vercel URL for that `APP_ENV`. Hosted Vercel rewrites `/api` to the Railway URL for that `APP_ENV`. Apply production schema with `pnpm --filter miyar-api db:push:production`.

## Run & operate

- `pnpm --filter @workspace/miyar-capital run typecheck` — typecheck the site
- `pnpm --filter @workspace/miyar-api run typecheck` — typecheck the API
- `pnpm --filter @workspace/miyar-capital run build` — Next.js production build
- `pnpm --filter @workspace/miyar-api run build` — API TypeScript build
- `pnpm --filter @workspace/miyar-api run dev` — API on `:4000`
- `pnpm --filter @workspace/miyar-capital run dev` — site on `:3001`
- See `artifacts/miyar-capital/README.md` and `artifacts/miyar-api/README.md`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: Next.js App Router + React
- Backend: Hono API (`artifacts/miyar-api`) — Postgres (Drizzle), Office 365 SMTP, reCAPTCHA v3 (production only)
- Styling: plain CSS in `artifacts/miyar-capital/src/index.css`

## Where things live

- `artifacts/miyar-capital/src/app/` — App Router pages + admin UI
- `artifacts/miyar-capital/src/views/` — marketing page components
- `artifacts/miyar-api/` — contact, admin auth, DB, email
- `artifacts/miyar-capital/public/docs/` — public PDF downloads
- `artifacts/miyar-capital/public/media/` — optimized images/videos

## Architecture decisions

- Backend extracted from Next Route Handlers into a standalone API package.
- Frontend proxies `/api/*` to the API (same-origin cookies for admin).
- Public PDFs stay on the frontend under `/docs`.

## Gotchas

- Styling is plain CSS, not Tailwind — add styles in `index.css`.
- Do not put page components under `src/pages/` (Next Pages Router conflict); use `src/views/`.
- Form/admin secrets belong in `miyar-api/.env`, not the Next client bundle.
