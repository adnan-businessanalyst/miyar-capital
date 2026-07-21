/**
 * Executive Team portraits under src/assets/executives/.
 * Drop files named exec-1 … exec-7 with any of:
 * .svg | .avif | .webp | .jpg | .jpeg | .png
 * Preference: svg → avif → webp → jpg → jpeg → png.
 *
 * LTR order: exec-1 (CEO) … exec-7 (6th card from the left).
 */

import { resolveAssetUrl } from "./resolveAssetUrl";

const executiveModules = import.meta.glob(
  "../assets/executives/*.{svg,SVG,avif,AVIF,webp,WEBP,jpg,JPG,jpeg,JPEG,png,PNG}",
  { eager: true, import: "default" },
) as Record<string, string>;

function executive(basename: string): string {
  return resolveAssetUrl(executiveModules, basename);
}

export const EXECUTIVE_IMAGES = {
  exec_1: executive("exec-1"),
  exec_2: executive("exec-2"),
  exec_3: executive("exec-3"),
  exec_4: executive("exec-4"),
  exec_5: executive("exec-5"),
  exec_6: executive("exec-6"),
  exec_7: executive("exec-7"),
} as const;

/** Ordered list matching EXECUTIVE_TEAM LTR display order. */
export const EXECUTIVE_PHOTOS = [
  EXECUTIVE_IMAGES.exec_1,
  EXECUTIVE_IMAGES.exec_2,
  EXECUTIVE_IMAGES.exec_3,
  EXECUTIVE_IMAGES.exec_4,
  EXECUTIVE_IMAGES.exec_5,
  EXECUTIVE_IMAGES.exec_6,
  EXECUTIVE_IMAGES.exec_7,
] as const;
