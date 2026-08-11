import fs from "node:fs";
import path from "node:path";

const IMAGE_EXTS = new Set([
  ".svg",
  ".avif",
  ".webp",
  ".jpg",
  ".jpeg",
  ".png",
]);

export type ResolvedPublicMedia = {
  url: string;
  ext: string;
  mtimeMs: number;
};

/**
 * Resolve `public/media/{folder}/{basename}.*` at runtime.
 * When several extensions exist, the newest file wins so replacements show up
 * without regenerating the media manifest.
 */
export function resolvePublicMedia(
  folder: string,
  basename: string,
): ResolvedPublicMedia | null {
  const safeFolder = folder.replace(/[^a-z0-9_-]/gi, "");
  const safeBase = basename.replace(/[^a-z0-9_-]/gi, "");
  if (!safeFolder || !safeBase) return null;

  const dir = path.join(process.cwd(), "public", "media", safeFolder);
  if (!fs.existsSync(dir)) return null;

  let best: ResolvedPublicMedia | null = null;

  for (const name of fs.readdirSync(dir)) {
    const ext = path.extname(name).toLowerCase();
    const base = path.basename(name, path.extname(name));
    if (base !== safeBase || !IMAGE_EXTS.has(ext)) continue;

    const full = path.join(dir, name);
    const mtimeMs = fs.statSync(full).mtimeMs;
    if (!best || mtimeMs > best.mtimeMs) {
      best = {
        url: `/media/${safeFolder}/${name}`,
        ext,
        mtimeMs,
      };
    }
  }

  return best;
}
