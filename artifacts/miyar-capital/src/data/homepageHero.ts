export interface HomepageHero {
  ctaShow: boolean;
  ctaHref: string;
  ctaLabelEn: string;
  ctaLabelAr: string;
  promoShow: boolean;
  promoHref: string;
  promoTitleEn: string;
  promoTitleAr: string;
  promoBodyEn: string;
  promoBodyAr: string;
}

export const DEFAULT_HOMEPAGE_HERO: HomepageHero = {
  ctaShow: true,
  ctaHref: "#what-we-do",
  ctaLabelEn: "Explore Our Services",
  ctaLabelAr: "استكشف خدماتنا",
  promoShow: true,
  promoHref: "/asset-management/liquidity-fi",
  promoTitleEn: "Sukuk Offerings",
  promoTitleAr: "عروض الصكوك",
  promoBodyEn:
    "We offer a range of Sukuk offerings to meet the needs of our clients.",
  promoBodyAr: "نقدم عروض مختلفة من السكوك لتلبية احتياجات عملائنا.",
};
