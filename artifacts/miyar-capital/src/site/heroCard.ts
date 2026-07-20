/**
 * Hardcoded front-page hero promotional card.
 * Edit labels, link, visibility, and styles here — not in Site Manager / CMS.
 *
 * Optional image: place `hero-card.jpg` (or .png / .webp) in `src/assets/hero/`.
 */

const cardImageModules = import.meta.glob(
  "../assets/hero/hero-card.{jpg,jpeg,JPG,JPEG,png,webp}",
  { eager: true, import: "default" },
) as Record<string, string>;

/** Resolved local card image URL, or empty if the file is missing. */
export const HERO_CARD_IMAGE = Object.values(cardImageModules)[0] ?? "";

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
  offsetX: 0,
  offsetY: 0,
};
