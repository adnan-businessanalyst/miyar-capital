import { z } from "zod";

export const homepageHeroSchema = z.object({
  ctaShow: z.boolean(),
  ctaHref: z.string().trim().min(1).max(500),
  ctaLabelEn: z.string().trim().min(1).max(200),
  ctaLabelAr: z.string().trim().max(200).optional().default(""),
  promoShow: z.boolean(),
  promoHref: z.string().trim().min(1).max(500),
  promoTitleEn: z.string().trim().min(1).max(300),
  promoTitleAr: z.string().trim().max(300).optional().default(""),
  promoBodyEn: z.string().trim().min(1).max(2000),
  promoBodyAr: z.string().trim().max(2000).optional().default(""),
});

export type HomepageHeroPayload = z.infer<typeof homepageHeroSchema>;

export const DEFAULT_HOMEPAGE_HERO: HomepageHeroPayload = {
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
