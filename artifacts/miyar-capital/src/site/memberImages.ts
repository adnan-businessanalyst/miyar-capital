/**
 * Board member portraits under public/media/members/.
 * Drop files named member-1 … member-7 (.svg | .avif | .webp | .jpg | .jpeg | .png).
 */

import { mediaUrl } from "./resolveAssetUrl";

export const MEMBER_IMAGES = {
  member_1: mediaUrl("members", "member-1"),
  member_2: mediaUrl("members", "member-2"),
  member_3: mediaUrl("members", "member-3"),
  member_4: mediaUrl("members", "member-4"),
  member_5: mediaUrl("members", "member-5"),
  member_6: mediaUrl("members", "member-6"),
  member_7: mediaUrl("members", "member-7"),
} as const;

export const BOARD_MEMBER_PHOTOS = [
  MEMBER_IMAGES.member_1,
  MEMBER_IMAGES.member_2,
  MEMBER_IMAGES.member_3,
  MEMBER_IMAGES.member_4,
  MEMBER_IMAGES.member_5,
  MEMBER_IMAGES.member_6,
  MEMBER_IMAGES.member_7,
] as const;
