# Front-page hero background assets

Hardcoded responsive hero media for the home page (`FrontPage` / `HeroBackground`).

**Served from:** `artifacts/miyar-capital/public/media/hero/` → `/media/hero/...`

## Files

| File | Breakpoint | Notes |
|------|------------|--------|
| `hero-mobile.mp4` (+ `.webp` poster) | ≤560px | Vertical clip from `hero-bg` source |
| `hero-tablet.mp4` (+ `.webp` poster) | 561–900px | Same source, higher res |
| `hero-desktop.mp4` (+ `.webp` poster) | ≥901px | Primary landscape desktop hero |
| `hero-desktop-alt.mp4` (+ `.webp` poster) | ≥901px | Optional second desktop clip (rotates after the first ends) |

## Behaviour

- Exact basenames matter (`hero-mobile`, `hero-tablet`, `hero-desktop`, `hero-desktop-alt`).
- Video is used only when that **exact** size’s `.mp4` exists (desktop video is not downloaded on phones).
- On desktop, when both `hero-desktop` and `hero-desktop-alt` exist, clips play in sequence (no loop per clip).
- Still posters (`.webp`) are used as `poster` and as a fallback if video is missing.
- After adding/replacing files, run: `pnpm media:manifest` (or restart `pnpm dev`).

To re-encode a new small-screen source:

```bash
node ./scripts/encode-hero-small.mjs "path/to/source.mp4"
pnpm media:manifest
```

To re-encode the alternate desktop clip:

```bash
node ./scripts/encode-hero-desktop-alt.mjs "path/to/desk-top-hero-video.mp4"
pnpm media:manifest
```
