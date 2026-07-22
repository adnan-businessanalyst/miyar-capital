/**
 * Optimize public/media in place (sharp images + ffmpeg videos).
 *
 * Usage (from artifacts/miyar-capital):
 *   node ./scripts/optimize-media.mjs
 *
 * Then:
 *   node ./scripts/generate-media-manifest.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const mediaRoot = path.join(root, "public", "media");

/** @type {string} */
let ffmpegPath;
try {
  ffmpegPath = require("ffmpeg-static");
} catch {
  ffmpegPath = "";
}
if (!ffmpegPath || !fs.existsSync(ffmpegPath)) {
  console.error("ffmpeg-static binary missing. Run pnpm install with allowBuilds.ffmpeg-static=true");
  process.exit(1);
}

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const VIDEO_EXT = new Set([".mp4"]);
const SKIP_DIRS = new Set(["brand"]); // keep SVG logos untouched

/** Max long edge by folder / basename pattern */
function maxEdgeFor(relPosix) {
  if (relPosix.startsWith("members/") || relPosix.startsWith("executives/")) return 800;
  if (relPosix.startsWith("page-hero/")) return 1600;
  if (relPosix.startsWith("footer/")) return 1600;
  if (relPosix.startsWith("hero/")) return 1600;
  if (/wm-|man_on_phone|app-phone/.test(relPosix)) return 1000;
  return 1400;
}

function qualityFor(relPosix) {
  if (relPosix.startsWith("members/") || relPosix.startsWith("executives/")) return 78;
  return 80;
}

function videoProfile(relPosix) {
  if (relPosix.startsWith("hero/")) {
    return { maxH: 1080, crf: 30, label: "hero" };
  }
  if (/app-phone-screen/.test(relPosix)) {
    return { maxH: 720, crf: 30, label: "phone" };
  }
  return { maxH: 720, crf: 30, label: "section" };
}

function walk(dir, rel = "", out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name.toLowerCase() === "readme.md") continue;
    const full = path.join(dir, entry.name);
    const nextRel = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      const top = nextRel.split("/")[0].toLowerCase();
      if (SKIP_DIRS.has(top)) continue;
      walk(full, nextRel, out);
      continue;
    }
    out.push({ full, rel: nextRel.replace(/\\/g, "/") });
  }
  return out;
}

function fmtMb(n) {
  return (n / (1024 * 1024)).toFixed(2);
}

async function optimizeImage(file) {
  const ext = path.extname(file.full).toLowerCase();
  if (!IMAGE_EXT.has(ext)) return null;
  // Already-small avif/svg left alone if under target; still re-export webp when raster
  if (ext === ".avif") {
    const st = fs.statSync(file.full);
    if (st.size < 120 * 1024) return { skipped: true, reason: "small-avif" };
  }

  const maxEdge = maxEdgeFor(file.rel);
  const quality = qualityFor(file.rel);
  const base = file.full.slice(0, -ext.length);
  const webpOut = `${base}.webp`;
  const tmp = `${webpOut}.tmp`;

  const pipeline = sharp(file.full, { failOn: "none" }).rotate();
  const meta = await pipeline.metadata();
  const w = meta.width || 0;
  const h = meta.height || 0;
  let img = sharp(file.full, { failOn: "none" }).rotate();
  if (w > maxEdge || h > maxEdge) {
    img = img.resize({
      width: w >= h ? maxEdge : undefined,
      height: h > w ? maxEdge : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }
  await img.webp({ quality, effort: 5 }).toFile(tmp);

  const before = fs.statSync(file.full).size;
  const after = fs.statSync(tmp).size;
  fs.renameSync(tmp, webpOut);

  // Remove original raster if we wrote a different webp path
  if (path.resolve(file.full) !== path.resolve(webpOut)) {
    fs.unlinkSync(file.full);
  }

  return { kind: "image", before, after, out: webpOut, maxEdge };
}

function optimizeVideo(file) {
  const ext = path.extname(file.full).toLowerCase();
  if (!VIDEO_EXT.has(ext)) return null;
  const { maxH, crf } = videoProfile(file.rel);
  const before = fs.statSync(file.full).size;
  const tmp = `${file.full}.opt.mp4`;
  const posterBase = file.full.slice(0, -ext.length);
  const posterOut = `${posterBase}.webp`;

  const scale = `scale=-2:'min(${maxH},ih)'`;
  execFileSync(
    ffmpegPath,
    [
      "-y",
      "-i",
      file.full,
      "-vf",
      scale,
      "-an",
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      String(crf),
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      tmp,
    ],
    { stdio: "pipe" },
  );

  // Poster still (first frame) if missing
  if (!fs.existsSync(posterOut) && !fs.existsSync(`${posterBase}.jpg`)) {
    const posterTmp = `${posterOut}.tmp.jpg`;
    try {
      execFileSync(
        ffmpegPath,
        ["-y", "-i", tmp, "-frames:v", "1", "-q:v", "3", posterTmp],
        { stdio: "pipe" },
      );
      // convert poster jpg → webp via sharp sync path later? use sharp async outside
      fs.renameSync(posterTmp, `${posterBase}.poster.jpg`);
    } catch {
      /* optional */
    }
  }

  const after = fs.statSync(tmp).size;
  // Keep smaller result; if somehow larger, keep original
  if (after < before) {
    fs.renameSync(tmp, file.full);
    return { kind: "video", before, after, out: file.full, maxH, crf };
  }
  fs.unlinkSync(tmp);
  return { kind: "video", before, after: before, out: file.full, skippedLarger: true };
}

async function convertPosterJpgs() {
  const files = walk(mediaRoot).filter((f) => f.rel.endsWith(".poster.jpg"));
  for (const f of files) {
    const webp = f.full.replace(/\.poster\.jpg$/i, ".webp");
    if (fs.existsSync(webp)) {
      fs.unlinkSync(f.full);
      continue;
    }
    const tmp = `${webp}.tmp`;
    await sharp(f.full).resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).webp({ quality: 78 }).toFile(tmp);
    fs.renameSync(tmp, webp);
    fs.unlinkSync(f.full);
  }
}

async function main() {
  const files = walk(mediaRoot);
  let beforeTotal = 0;
  let afterTotal = 0;
  const results = [];

  for (const f of files) {
    beforeTotal += fs.statSync(f.full).size;
  }

  console.log(`Optimizing ${files.length} files under public/media (before ${fmtMb(beforeTotal)} MB)…`);

  for (const f of files) {
    const ext = path.extname(f.full).toLowerCase();
    try {
      if (IMAGE_EXT.has(ext)) {
        const r = await optimizeImage(f);
        if (r && !r.skipped) {
          results.push({ rel: f.rel, ...r });
          console.log(
            `IMG  ${f.rel}  ${fmtMb(r.before)} → ${fmtMb(r.after)} MB  (max ${r.maxEdge})`,
          );
        }
      } else if (VIDEO_EXT.has(ext)) {
        const r = optimizeVideo(f);
        if (r) {
          results.push({ rel: f.rel, ...r });
          console.log(
            `VID  ${f.rel}  ${fmtMb(r.before)} → ${fmtMb(r.after)} MB  (${r.maxH}p crf${r.crf}${r.skippedLarger ? " keep-orig" : ""})`,
          );
        }
      }
    } catch (err) {
      console.error(`FAIL ${f.rel}:`, err?.message || err);
    }
  }

  await convertPosterJpgs();

  // Recompute totals from current tree
  const afterFiles = walk(mediaRoot);
  for (const f of afterFiles) {
    // include brand skipped earlier — recount full media root
  }
  afterTotal = 0;
  function walkAll(dir, rel = "", acc = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const full = path.join(dir, entry.name);
      const nextRel = rel ? `${rel}/${entry.name}` : entry.name;
      if (entry.isDirectory()) walkAll(full, nextRel, acc);
      else if (entry.name.toLowerCase() !== "readme.md") acc.push(full);
    }
    return acc;
  }
  const all = walkAll(mediaRoot);
  for (const full of all) afterTotal += fs.statSync(full).size;

  console.log(`\nDone. public/media ≈ ${fmtMb(beforeTotal)} → ${fmtMb(afterTotal)} MB`);
  console.log(`Processed ${results.length} media files.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
