import mediaManifest from "./mediaManifest.json";

type Entry = {
  image?: string;
  video?: string;
  files: Record<string, string>;
};

type Manifest = Record<string, Record<string, Entry>>;

const manifest = mediaManifest as Manifest;

/** Preferred order when multiple files share the same basename. */
export const IMAGE_EXT_PREFERENCE = [
  ".svg",
  ".avif",
  ".webp",
  ".jpg",
  ".jpeg",
  ".png",
  ".mp4",
] as const;

/** Resolve preferred image URL under /media/{folder}/{basename}.* */
export function mediaUrl(folder: string, basename: string): string {
  return manifest[folder]?.[basename]?.image ?? "";
}

/** Resolve video URL under /media/{folder}/{basename}.mp4 */
export function mediaVideoUrl(folder: string, basename: string): string {
  return manifest[folder]?.[basename]?.video ?? "";
}

/**
 * Legacy helper for import.meta.glob-style maps.
 * Prefer `mediaUrl` / `mediaVideoUrl` in new code.
 */
export function resolveAssetUrl(
  modules: Record<string, string>,
  basename?: string,
): string {
  let entries = Object.entries(modules);
  if (basename) {
    entries = entries.filter(([path]) => {
      const file = path.split(/[/\\]/).pop() ?? path;
      const name = file.replace(/\.[^.]+$/, "");
      return name === basename;
    });
  }
  for (const ext of IMAGE_EXT_PREFERENCE) {
    const hit = entries.find(([key]) => key.toLowerCase().endsWith(ext));
    if (hit) return hit[1];
  }
  return entries[0]?.[1] ?? "";
}

export const IMAGE_GLOB_EXTS =
  "{svg,SVG,avif,AVIF,webp,WEBP,jpg,JPG,jpeg,JPEG,png,PNG}";
