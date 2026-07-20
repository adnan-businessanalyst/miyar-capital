# Front-page hero background assets

Hardcoded responsive hero media for the home page (`FrontPage`). These files are **not** managed in Site Manager — drop them in this folder.

**Path:** `artifacts/miyar-capital/src/assets/hero/`

## Upload these files

| File | Breakpoint | Target resolution | Approx. file size |
|------|------------|-------------------|-------------------|
| `hero-mobile.jpg` | ≤560px | 1080 × 1920 (portrait) | 150–350 KB |
| `hero-mobile.mp4` | ≤560px | 1080 × 1920 | 1.5–4 MB |
| `hero-tablet.jpg` | 561–900px | 1600 × 1200 (4:3) or 1920 × 1280 | 250–500 KB |
| `hero-tablet.mp4` | 561–900px | same as tablet still | 3–7 MB |
| `hero-desktop.jpg` | ≥901px | 2560 × 1440 (16:9) | 400 KB–1 MB |
| `hero-desktop.mp4` | ≥901px | 2560 × 1440 | 6–12 MB |

## Behaviour

- Exact filenames matter.
- Video is preferred when that size’s `.mp4` exists; otherwise the matching `.jpg` is used via `<picture>`.
- Missing sizes fall back **desktop → tablet → mobile**.
- Export JPG at ~70–80% quality; MP4 H.264, muted-friendly loop (~8–15s), no audio needed.
- After adding files, refresh the Vite dev server if they do not appear immediately.
