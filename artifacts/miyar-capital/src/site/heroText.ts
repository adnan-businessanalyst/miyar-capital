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
    { hEn: "Merit", hAr: "الجدارة",
      pEn: "We believe that what motivates us is to achieve the highest return on investment, as our profitability principle is only achieved when you profit.", pAr: "مؤمنين بان ما يحفزنا هو ان نحقق العائد الاعلى على الاستثمار ، حيث ان مبدء ربحيتنا لا يتحقق الا في حال ربحك." },
    { hEn: "Integrity", hAr: "الصدق",
      pEn: "Investment return safely matters to us more than return on investment.",
      pAr: "عودة الاستثمار بشكل أمن يهمنا اكثر من العائد على الاستثمار." },
    { hEn: "Your Interests First", hAr: "مصلحتك أولاً",
      pEn: "Miyar Capital employees are keen to understand your investment goals clearly because you are the cornerstone of this relationship.",
      pAr: "يحرص موظفين معيار المالية على فهم اهدافك الاستثمارية بشكل واضح لانك عمود الاساس لهذه العلاقة." },
    { hEn: "Alignment", hAr: "المحاذاة",
      pEn: "Performance is the first and most important standard that we are keen to provide.",
      pAr: "الاداء هو المعيار الاول والاهم الذي نحرص على تقديمه." },
    { hEn: "Responsibility", hAr: "المسؤولية",
      pEn: "Our vision will only be achieved with the participation of our clients and we always remember that, so our keenness to provide the best service is our passion.",
      pAr: "رؤيتنا لن تتحقق الا بمشاركة عملائنا ونحن نتذكر ذلك دائما , لذلك حرصنا على تقديم افضل خدمة هو شغفنا." },
  ],
};
