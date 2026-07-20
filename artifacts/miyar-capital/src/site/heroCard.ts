/**
 * Hardcoded front-page hero promotional card.
 * Edit labels, link, visibility, and styles here — not in Site Manager / CMS.
 *
 * Optional image: place `hero-card.svg` (or .avif / .webp / .jpg / .jpeg / .png)
 * in `src/assets/hero/`.
 */

import { resolveAssetUrl } from "./resolveAssetUrl";

const cardImageModules = import.meta.glob(
  "../assets/hero/hero-card.{svg,SVG,avif,AVIF,webp,WEBP,jpg,JPG,jpeg,JPEG,png,PNG}",
  { eager: true, import: "default" },
) as Record<string, string>;

/** Resolved local card image URL, or empty if the file is missing. */
export const HERO_CARD_IMAGE = resolveAssetUrl(cardImageModules);

export interface HeroCardConfig {
  /** Show the promotional card in the hero. */
  show: boolean;
  /** Show the card image when a local asset (or this flag) is enabled. */
  showImage: boolean;
  href: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
  /** Empty string = use CSS default. */
  background: string;
  headingColor: string;
  headingFont: string;
  textColor: string;
  /** Max width in px; 0 = CSS default. */
  width: number;
  /** Height in px; 0 = auto. */
  height: number;
  offsetX: number;
  offsetY: number;
}

export const HERO_CARD: HeroCardConfig = {
  show: true,
  showImage: false,
  href: "/private-markets",
  titleEn: "Riyadh Residences",
  titleAr: "مساكن الرياض",
  bodyEn:
    "A residential development marketing mandate — a smart, modern offering built for comfortable living.",
  bodyAr:
    "تفويض تسويق لمشروع تطوير سكني — عرض عصري وذكي مصمم لحياة مريحة.",
  background: "",
  headingColor: "",
  headingFont: "",
  textColor: "",
  width: 0,
  height: 0,
  offsetX: -3,
  /** Desktop only (cleared under 1101px). Negative = up. Less negative = lower on screen. */
  offsetY: -120,
};
