import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const ffmpeg = require("ffmpeg-static");

const heroWebp = "public/media/hero/hero-desktop.webp";
const deskMp4 = "public/media/hero/hero-desktop.mp4";

if (!fs.existsSync(heroWebp) && fs.existsSync(deskMp4)) {
  const tmp = "public/media/hero/hero-desktop.tmp.jpg";
  execFileSync(ffmpeg, ["-y", "-i", deskMp4, "-frames:v", "1", tmp], { stdio: "inherit" });
  await sharp(tmp)
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(heroWebp);
  fs.unlinkSync(tmp);
}

if (fs.existsSync(heroWebp)) {
  await sharp(heroWebp)
    .resize({ width: 900, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 76 })
    .toFile("public/media/hero/hero-mobile.webp");
  await sharp(heroWebp)
    .resize({ width: 1200, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile("public/media/hero/hero-tablet.webp");
  console.log("Wrote hero-mobile.webp + hero-tablet.webp");
}

const phone = "public/media/content/app-phone-screen.mp4";
if (fs.existsSync(phone)) {
  const tmp = `${phone}.tmp.mp4`;
  execFileSync(
    ffmpeg,
    [
      "-y",
      "-i",
      phone,
      "-vf",
      "scale=-2:'min(720,ih)'",
      "-an",
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      "32",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      tmp,
    ],
    { stdio: "inherit" },
  );
  const before = fs.statSync(phone).size;
  const after = fs.statSync(tmp).size;
  console.log(`phone ${before} -> ${after}`);
  if (after < before) fs.renameSync(tmp, phone);
  else fs.unlinkSync(tmp);
}
