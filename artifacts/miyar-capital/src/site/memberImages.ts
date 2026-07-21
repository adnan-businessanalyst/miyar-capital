/**
 * Board member portraits under src/assets/members/.
 * Drop files named member-1 … member-7 with any of:
 * .svg | .avif | .webp | .jpg | .jpeg | .png
 * Preference: svg → avif → webp → jpg → jpeg → png.
 *
 * LTR order: member-1 (Chairman) … member-7 (6th card from the left).
 */

import { resolveAssetUrl } from "./resolveAssetUrl";

const memberModules = import.meta.glob(
  "../assets/members/*.{svg,SVG,avif,AVIF,webp,WEBP,jpg,JPG,jpeg,JPEG,png,PNG}",
  { eager: true, import: "default" },
) as Record<string, string>;

function member(basename: string): string {
  return resolveAssetUrl(memberModules, basename);
}

export const MEMBER_IMAGES = {
  member_1: member("member-1"),
  member_2: member("member-2"),
  member_3: member("member-3"),
  member_4: member("member-4"),
  member_5: member("member-5"),
  member_6: member("member-6"),
  member_7: member("member-7"),
} as const;

/** Ordered list matching BOARD_MEMBERS LTR display order. */
export const BOARD_MEMBER_PHOTOS = [
  MEMBER_IMAGES.member_1,
  MEMBER_IMAGES.member_2,
  MEMBER_IMAGES.member_3,
  MEMBER_IMAGES.member_4,
  MEMBER_IMAGES.member_5,
  MEMBER_IMAGES.member_6,
  MEMBER_IMAGES.member_7,
] as const;
