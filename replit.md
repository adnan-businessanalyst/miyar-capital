# Miyar Capital

Marketing website for Miyar Capital, an independent Saudi CMA-regulated investment firm (Asset Management + Investment Banking), with a bilingual EN/AR interface and RTL support.

## Run & Operate

- `pnpm --filter @workspace/miyar-capital run typecheck` — typecheck the site
- `pnpm --filter @workspace/miyar-capital run build` — Vite only (use this on Vercel/CI)
- `pnpm --filter @workspace/miyar-capital run build:prerender` — Vite + Playwright prerender for local SEO HTML (needs Chromium)
- Preview via the `artifacts/miyar-capital: web` workflow (do not run `pnpm dev` at the workspace root)

## Prerender (SEO)

- Optional / local only. Default `build` does not run Playwright (Vercel lacks Chromium system libs).
- `build:prerender` / `scripts/prerender.mjs` serves `dist/public`, opens each route in headless Chromium, and writes real HTML (`/about-us` → `dist/public/about-us/index.html`).
- Skips automatically when `VERCEL=1` or `SKIP_PRERENDER=1`.
- Route list: `scripts/prerender-routes.mjs` — add a path there whenever you add a marketing `Route` in `App.tsx`.
- SPA fallback: `artifacts/miyar-capital/public/_redirects` (Cloudflare Pages) and root `vercel.json` (Vercel). Existing prerendered files are served first.
- Language defaults to English in prerendered HTML; Arabic is client-only after the language toggle.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite (static site, no backend)
- Routing: wouter
- Styling: plain CSS in `artifacts/miyar-capital/src/index.css` (Tailwind not used)
- Fonts: Fraunces (serif), Archivo (sans), Noto Naskh Arabic — loaded in `index.html`

## Where things live

- `artifacts/miyar-capital/src/index.css` — the entire design system (tokens, layout, RTL rules)
- `artifacts/miyar-capital/src/i18n/` — `LanguageContext` (EN/AR + RTL toggle) and `translations.ts` (EN/AR dictionaries)
- `artifacts/miyar-capital/src/pages/` — one file per route (Home, AssetManagement, InvestmentBanking, ProductTemplate, DPM, PrivateMarkets)
- `artifacts/miyar-capital/src/components/` — shared chrome (TopBar, Header, Footer, Disclaimer, Brand) and reusable blocks (Pillars, Steps, RichText)
- Source prototype: `attached_assets/remixed-1e234082_1783242009522.html`

## Architecture decisions

- Faithful recreation of a static HTML prototype; only the polished multi-page site was ported. The prototype's CMS builder and test pages were intentionally skipped.
- i18n covers the source's translated keys (home, nav, headings). Non-home subpage body copy is EN-only, matching the source prototype.
- `RichText` renders trusted, static translation strings containing inline `<em>`/`<strong>` via `dangerouslySetInnerHTML` — never user input.
- Language toggle sets `dir`/`lang` on `<body>`; RTL layout and Arabic fonts are handled purely in CSS.

## Product

A bilingual (EN/AR) marketing site with a homepage plus dedicated pages for Asset Management, Investment Banking, a reusable fund product template (Murabaha), DPM, and Private Markets. Navy/gold luxury-finance aesthetic with nav dropdowns and an RTL language toggle.

## User preferences

- Prefers clean code.

## Gotchas

- Styling is plain CSS, not Tailwind — add styles in `index.css`, don't reach for utility classes.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
