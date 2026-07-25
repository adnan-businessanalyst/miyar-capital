/**
 * Encode desk-top-hero-video.mp4 → public/media/hero/hero-desktop-alt.mp4
 * Usage: node ./scripts/encode-hero-desktop-alt.mjs [source.mp4]
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
const heroDir = path.join(root, "public", "media", "hero");
const ffmpeg = require("ffmpeg-static");

const defaultSrc = path.join(
  "C:",
  "Users",
  "AdnanAkhonbaySMART",
  "OneDrive - Smart Technology Solutions",
  "Desktop",
  "miyar assets",
  "desk-top-hero-video.mp4",
);
const src = process.argv[2] ? path.resolve(process.argv[2]) : defaultSrc;

if (!ffmpeg || !fs.existsSync(ffmpeg)) {
  console.error("ffmpeg-static missing");
  process.exit(1);
}
if (!fs.existsSync(src)) {
  console.error("Source missing:", src);
  process.exit(1);
}

fs.mkdirSync(heroDir, { recursive: true });
const out = path.join(heroDir, "hero-desktop-alt.mp4");

console.log("Encoding hero-desktop-alt.mp4 from", src);
execFileSync(
  ffmpeg,
  [
    "-y",
    "-i",
    src,
    "-vf",
    "scale=-2:'min(1080,ih)'",
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "30",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    out,
  ],
  { stdio: "inherit" },
);
console.log(`  → ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);

const tmp = path.join(heroDir, "_alt-poster.tmp.jpg");
execFileSync(
  ffmpeg,
  ["-y", "-i", out, "-frames:v", "1", "-update", "1", "-q:v", "3", tmp],
  { stdio: "inherit" },
);
await sharp(tmp)
  .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
  .webp({ quality: 78 })
  .toFile(path.join(heroDir, "hero-desktop-alt.webp"));
fs.unlinkSync(tmp);
console.log("Wrote hero-desktop-alt.webp poster");
