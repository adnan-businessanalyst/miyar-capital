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

/**
 * Pick one URL from an import.meta.glob result.
 * Optionally match a basename (filename without extension).
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

/** Glob brace list for Vite import.meta.glob image patterns. */
export const IMAGE_GLOB_EXTS =
  "{svg,SVG,avif,AVIF,webp,WEBP,jpg,JPG,jpeg,JPEG,png,PNG}";
