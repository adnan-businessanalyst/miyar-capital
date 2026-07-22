# Miyar Capital

Marketing website for Miyar Capital, an independent Saudi CMA-regulated investment firm (Asset Management + Investment Banking), with a bilingual EN/AR interface and RTL support.

## Run & Operate

- `pnpm --filter @workspace/miyar-capital run typecheck` — typecheck the site
- `pnpm --filter @workspace/miyar-capital run build` — Next.js production build (Vercel/CI)
- `pnpm --filter @workspace/miyar-capital run dev` — local Next.js server (`http://localhost:3001`)
- See `artifacts/miyar-capital/README.md` for DB, forms, admin, and env setup

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Next.js App Router + React (Server Components by default)
- Postgres (Drizzle), Resend, reCAPTCHA v3 for contact forms
- Styling: plain CSS in `artifacts/miyar-capital/src/index.css` (Tailwind not used)
- Fonts: Cormorant Garamond + DM Sans (loaded in root layout)

## Where things live

- `artifacts/miyar-capital/src/app/` — App Router routes, API handlers, admin
- `artifacts/miyar-capital/src/views/` — marketing page components
- `artifacts/miyar-capital/src/index.css` — design system (tokens, layout, RTL)
- `artifacts/miyar-capital/src/i18n/` — `LanguageContext` (EN/AR + RTL) and translations
- `artifacts/miyar-capital/src/components/` — Header, Footer, PageHero, forms, shared blocks
- `artifacts/miyar-capital/public/docs/` — public PDF downloads
- Source prototype: `attached_assets/remixed-1e234082_1783242009522.html`

## Architecture decisions

- Migrated from Vite + wouter SPA to Next.js; SEO uses App Router static generation / metadata (no Playwright prerender).
- i18n covers translated keys (home, nav, headings). Non-home subpage body copy is largely EN-only.
- `RichText` renders trusted, static translation strings containing inline `<em>`/`<strong>` via `dangerouslySetInnerHTML` — never user input.
- Language toggle sets `dir`/`lang` on `<body>`; RTL layout and Arabic fonts are handled in CSS.

## Product

A bilingual (EN/AR) marketing site with homepage plus Asset Management, Investment Banking, fund product pages, DPM, Private Markets, contact API, and an authenticated admin submissions panel.

## User preferences

- Prefers clean code.

## Gotchas

- Styling is plain CSS, not Tailwind — add styles in `index.css`, don't reach for utility classes.
- Do not put page components under `src/pages/` (Next Pages Router conflict); use `src/views/`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See `artifacts/miyar-capital/README.md` for fullstack setup
