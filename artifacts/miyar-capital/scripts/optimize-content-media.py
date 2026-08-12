"""
Optimize public/media/content images to best-practice web sizes.

Targets (2x retina for typical layout widths):
- Intro split images (pi-intro ~780px): max 1600w
- Premium card headers (~640px): max 1280w
- General photos: max 1400w
- Square marks: max 1000w
"""

from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "media" / "content"

# basename -> max width
TARGETS: dict[str, int] = {
    "ra-intro": 1600,
    "pe-intro": 1600,
    "ra-diversity": 1280,
    "ra-geo-network": 1280,
    "app-bg": 1400,
    "service-investment-banking": 1400,
    "service-asset-management": 1200,
    "private_offers": 1200,
    "wm-independent-thinking": 1000,
    "wm-long-term-partnership": 1000,
    "wm-tailored-strategies": 1000,
    "wm-transparent-reporting": 1000,
    "man_on_phone": 600,
    "app-phone-screen": 1280,
    "client-dpm": 1280,
    "client-ifo": 1280,
}

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".avif"}
SKIP_EXT = {".svg", ".mp4"}


def save_webp(im: Image.Image, dest: Path, quality: int = 80) -> None:
    if im.mode in ("P", "LA"):
        im = im.convert("RGBA")
    elif im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGB")
    # Drop unused alpha for smaller files when fully opaque
    if im.mode == "RGBA":
        alpha = im.getchannel("A")
        if alpha.getextrema() == (255, 255):
            im = im.convert("RGB")
    im.save(dest, "WEBP", quality=quality, method=6)


def optimize_one(src: Path, max_w: int) -> tuple[int, int]:
    before = src.stat().st_size
    with Image.open(src) as im:
        im.load()
        w, h = im.size
        if w > max_w:
            nh = max(1, round(h * (max_w / w)))
            im = im.resize((max_w, nh), Image.Resampling.LANCZOS)
        dest = src.with_suffix(".webp")
        # Write to temp then replace
        tmp = dest.with_suffix(".webp.tmp")
        save_webp(im, tmp, quality=80)
        if dest.exists() and dest.resolve() != src.resolve():
            # Replacing an existing webp from another format source
            pass
        tmp.replace(dest)
        after = dest.stat().st_size
        if src.suffix.lower() != ".webp" and src.resolve() != dest.resolve():
            src.unlink(missing_ok=True)
        elif src.suffix.lower() == ".webp" and src.resolve() == dest.resolve():
            # already replaced in place via tmp
            pass
        return before, after


def main() -> None:
    if not ROOT.is_dir():
        raise SystemExit(f"Missing {ROOT}")

    # Group by basename
    by_base: dict[str, list[Path]] = {}
    for p in ROOT.iterdir():
        if not p.is_file() or p.name.startswith("."):
            continue
        if p.suffix.lower() in SKIP_EXT:
            continue
        if p.suffix.lower() not in IMAGE_EXTS:
            continue
        base = p.stem
        by_base.setdefault(base, []).append(p)

    total_before = 0
    total_after = 0

    for base, files in sorted(by_base.items()):
        max_w = TARGETS.get(base, 1400)
        # Prefer heaviest / raster source to re-encode
        files_sorted = sorted(files, key=lambda f: f.stat().st_size, reverse=True)
        src = files_sorted[0]
        # If multiple formats, optimize from largest and drop extras after
        before = sum(f.stat().st_size for f in files)
        b, a = optimize_one(src, max_w)
        # Remove leftover non-webp siblings
        for f in files:
            if f.suffix.lower() != ".webp" and f.exists():
                f.unlink(missing_ok=True)
            elif f.suffix.lower() == ".webp" and f.name != f"{base}.webp" and f.exists():
                # keep only canonical basename.webp
                pass
        webp = ROOT / f"{base}.webp"
        after = webp.stat().st_size if webp.exists() else a
        total_before += before
        total_after += after
        saved = before - after
        print(
            f"{base:32} maxW={max_w:<5} "
            f"{before/1024:8.1f}KB -> {after/1024:7.1f}KB  "
            f"({saved/1024:+.1f} KB)"
        )

    print(
        f"\nTOTAL  {total_before/1024/1024:.2f} MB -> {total_after/1024/1024:.2f} MB  "
        f"(saved {(total_before-total_after)/1024/1024:.2f} MB)"
    )


if __name__ == "__main__":
    main()
