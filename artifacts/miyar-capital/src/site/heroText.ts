/**
 * Hardcoded front-page hero copy + letter animation.
 * Style (colour, font-size, weight) lives in `src/index.css` under `.fp-hero-*`.
 * Not managed by Site Manager / CMS.
 */

export interface HeroLetterCopy {
  hEn: string;
  hAr: string;
  pEn: string;
  pAr: string;
}

export interface HeroTextConfig {
  /** Milliseconds between letter transitions in the MIYAR eyebrow. */
  animationSpeedMs: number;
  /** Fallback heading/paragraph when a letter’s fields are blank. */
  fallbackH1En: string;
  fallbackH1Ar: string;
  fallbackPEn: string;
  fallbackPAr: string;
  /** One entry per letter of MIYAR (index 0 = M … 4 = R). */
  letters: HeroLetterCopy[];
}

export const HERO_TEXT: HeroTextConfig = {
  animationSpeedMs: 2200,
  fallbackH1En: "Your Interests First",
  fallbackH1Ar: "مصلحتك أولاً",
  fallbackPEn:
    "Miyar Capital employees are keen to understand your investment goals, because we consider them the cornerstone of every relationship we build.",
  fallbackPAr:
    "يحرص موظفو معيار المالية على فهم أهدافك الاستثمارية، لأننا نعتبرها حجر الأساس لكل علاقة نبنيها.",
  letters: [
    { hEn: "", hAr: "", pEn: "", pAr: "" },
    { hEn: "", hAr: "", pEn: "", pAr: "" },
    { hEn: "", hAr: "", pEn: "", pAr: "" },
    { hEn: "", hAr: "", pEn: "", pAr: "" },
    { hEn: "", hAr: "", pEn: "", pAr: "" },
  ],
};
