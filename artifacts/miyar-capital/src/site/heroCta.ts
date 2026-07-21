/**
 * Hardcoded front-page hero CTA button ("Explore Our Services").
 * Edit visibility, labels (EN/AR), and destination here.
 * Style the button in CSS (`.btn.btn-gold.fp-round` / hero styles) — not Site Manager.
 */

export interface HeroCtaConfig {
  show: boolean;
  href: string;
  labelEn: string;
  labelAr: string;
}

export const HERO_CTA: HeroCtaConfig = {
  show: true,
  href: "#what-we-do",
  labelEn: "Explore Our Services",
  labelAr: "استكشف خدماتنا",
};
