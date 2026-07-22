/**
 * Scans public/media and writes src/site/mediaManifest.json
 * for Next.js static URL resolution (replaces Vite import.meta.glob).
 *
 * Shape: { [folder]: { [basename]: { image?: string, video?: string, files: Record<ext, url> } } }
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const mediaRoot = path.join(root, "public", "media");
const outFile = path.join(root, "src", "site", "mediaManifest.json");

const IMAGE_EXT = new Set([".svg", ".avif", ".webp", ".jpg", ".jpeg", ".png"]);
const IMAGE_PREF = [".svg", ".avif", ".webp", ".jpg", ".jpeg", ".png"];

/**
 * @typedef {{ image?: string, video?: string, files: Record<string, string> }} Entry
 * @type {Record<string, Record<string, Entry>>}
 */
const byDir = {};

function walk(dir, rel = "") {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const nextRel = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      walk(full, nextRel);
      continue;
    }
    if (entry.name.startsWith(".") || entry.name.toLowerCase() === "readme.md") continue;
    const ext = path.extname(entry.name).toLowerCase();
    const base = path.basename(entry.name, path.extname(entry.name));
    const folder = (rel.split("/")[0] || "_root").toLowerCase();
    const url = `/media/${nextRel.replace(/\\/g, "/")}`;
    if (!byDir[folder]) byDir[folder] = {};
    if (!byDir[folder][base]) byDir[folder][base] = { files: {} };
    const slot = byDir[folder][base];
    slot.files[ext] = url;
    if (ext === ".mp4") {
      slot.video = url;
    } else if (IMAGE_EXT.has(ext)) {
      const cur = slot.image;
      if (!cur) {
        slot.image = url;
      } else {
        const curExt = path.extname(cur).toLowerCase();
        if (IMAGE_PREF.indexOf(ext) < IMAGE_PREF.indexOf(curExt)) {
          slot.image = url;
        }
      }
    }
  }
}

walk(mediaRoot);
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(byDir, null, 2) + "\n");
console.log(`Wrote ${outFile}`);
