/**
 * Executive Team portraits under public/media/executives/.
 * Drop files named exec-1 … exec-7 (.svg | .avif | .webp | .jpg | .jpeg | .png).
 */

import { mediaUrl } from "./resolveAssetUrl";

export const EXECUTIVE_IMAGES = {
  exec_1: mediaUrl("executives", "exec-1"),
  exec_2: mediaUrl("executives", "exec-2"),
  exec_3: mediaUrl("executives", "exec-3"),
  exec_4: mediaUrl("executives", "exec-4"),
  exec_5: mediaUrl("executives", "exec-5"),
  exec_6: mediaUrl("executives", "exec-6"),
  exec_7: mediaUrl("executives", "exec-7"),
} as const;

export const EXECUTIVE_PHOTOS = [
  EXECUTIVE_IMAGES.exec_1,
  EXECUTIVE_IMAGES.exec_2,
  EXECUTIVE_IMAGES.exec_3,
  EXECUTIVE_IMAGES.exec_4,
  EXECUTIVE_IMAGES.exec_5,
  EXECUTIVE_IMAGES.exec_6,
  EXECUTIVE_IMAGES.exec_7,
] as const;
