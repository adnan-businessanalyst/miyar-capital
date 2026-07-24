# Front-page hero background assets

Hardcoded responsive hero media for the home page (`FrontPage` / `HeroBackground`).

**Served from:** `artifacts/miyar-capital/public/media/hero/` → `/media/hero/...`

## Files

| File | Breakpoint | Notes |
|------|------------|--------|
| `hero-mobile.mp4` (+ `.webp` poster) | ≤560px | Vertical clip from `hero-bg` source |
| `hero-tablet.mp4` (+ `.webp` poster) | 561–900px | Same source, higher res |
| `hero-desktop.mp4` (+ `.webp` poster) | ≥901px | Existing landscape desktop hero |

## Behaviour

- Exact basenames matter (`hero-mobile`, `hero-tablet`, `hero-desktop`).
- Video is used only when that **exact** size’s `.mp4` exists (desktop video is not downloaded on phones).
- Still posters (`.webp`) are used as `poster` and as a fallback if video is missing.
- After adding/replacing files, run: `pnpm media:manifest` (or restart `pnpm dev`).

To re-encode a new small-screen source:

```bash
node ./scripts/encode-hero-small.mjs "path/to/source.mp4"
pnpm media:manifest
```
