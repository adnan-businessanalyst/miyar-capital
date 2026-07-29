# Miyar Capital

Marketing website for Miyar Capital, an independent Saudi CMA-regulated investment firm (Asset Management + Investment Banking), with a bilingual EN/AR interface and RTL support.

## Run & Operate

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
- Backend: Hono API (`artifacts/miyar-api`) — Postgres (Drizzle), Resend, reCAPTCHA v3
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
