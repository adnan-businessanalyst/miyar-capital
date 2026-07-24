/**
 * Encode attached hero-bg source into public/media/hero tablet + mobile MP4s.
 * Desktop hero-desktop.mp4 is left untouched.
 *
 * Usage: node ./scripts/encode-hero-small.mjs [path-to-source.mp4]
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
if (!ffmpeg || !fs.existsSync(ffmpeg)) {
  console.error("ffmpeg-static missing");
  process.exit(1);
}

const defaultSrc = path.join(
  "C:",
  "Users",
  "AdnanAkhonbaySMART",
  "OneDrive - Smart Technology Solutions",
  "Desktop",
  "miyar assets",
  "hero-bg.MP4",
);
const src = process.argv[2] ? path.resolve(process.argv[2]) : defaultSrc;
if (!fs.existsSync(src)) {
  console.error("Source missing:", src);
  process.exit(1);
}

fs.mkdirSync(heroDir, { recursive: true });

function encode(outName, maxH, crf) {
  const out = path.join(heroDir, outName);
  console.log(`Encoding ${outName} (max ${maxH}p, crf ${crf})…`);
  execFileSync(
    ffmpeg,
    [
      "-y",
      "-i",
      src,
      "-vf",
      `scale=-2:'min(${maxH},ih)'`,
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
      out,
    ],
    { stdio: "inherit" },
  );
  console.log(`  → ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
  return out;
}

const tabletMp4 = encode("hero-tablet.mp4", 1080, 30);
encode("hero-mobile.mp4", 720, 32);

const tmpJpg = path.join(heroDir, "_poster.tmp.jpg");
execFileSync(ffmpeg, ["-y", "-i", tabletMp4, "-frames:v", "1", "-q:v", "3", tmpJpg], {
  stdio: "inherit",
});

await sharp(tmpJpg)
  .resize({ width: 1200, height: 1600, fit: "inside", withoutEnlargement: true })
  .webp({ quality: 78 })
  .toFile(path.join(heroDir, "hero-tablet.webp"));
await sharp(tmpJpg)
  .resize({ width: 900, height: 1600, fit: "inside", withoutEnlargement: true })
  .webp({ quality: 76 })
  .toFile(path.join(heroDir, "hero-mobile.webp"));
fs.unlinkSync(tmpJpg);
console.log("Updated hero-tablet.webp + hero-mobile.webp posters");

// Keep source reference under src/assets/hero
const assetsHero = path.join(root, "src", "assets", "hero");
fs.mkdirSync(assetsHero, { recursive: true });
fs.copyFileSync(src, path.join(assetsHero, "hero-bg-source.MP4"));
fs.copyFileSync(path.join(heroDir, "hero-tablet.mp4"), path.join(assetsHero, "hero-tablet.mp4"));
fs.copyFileSync(path.join(heroDir, "hero-mobile.mp4"), path.join(assetsHero, "hero-mobile.mp4"));
console.log("Copied to src/assets/hero for backup");
