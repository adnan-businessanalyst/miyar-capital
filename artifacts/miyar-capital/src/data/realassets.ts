/**
 * Real Assets page copy (EN + AR).
 * Imported by `views/RealAssets.tsx` — not CMS-managed.
 * Route: /asset-management/real-assets
 *
 * Bodies may include `<br>` for paragraph breaks (rendered via RichText).
 */

export type RealAssetsSectionId = "intro" | "offer" | "diversification";

export type RealAssetsListCardIconId = "layers" | "map";

export interface RealAssetsListItem {
  labelEn: string;
  labelAr: string;
}

export interface RealAssetsMeta {
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
}

export interface RealAssetsListCard {
  icon: RealAssetsListCardIconId;
  /** Visual header media key: architecture photo or geo network SVG. */
  media: "architecture" | "geo";
  titleEn: string;
  titleAr: string;
  items: RealAssetsListItem[];
}

export interface RealAssetsContent {
  sectionOrder: RealAssetsSectionId[];
  hero: {
    titleEn: string;
    titleAr: string;
    crumbAmEn: string;
    crumbAmAr: string;
    crumbPageEn: string;
    crumbPageAr: string;
    meta: RealAssetsMeta[];
  };
  intro: {
    eyebrowEn: string;
    eyebrowAr: string;
    headingEn: string;
    headingAr: string;
    bodyEn: string;
    bodyAr: string;
  };
  diversification: RealAssetsListCard;
  geography: RealAssetsListCard;
}

export const REAL_ASSETS: RealAssetsContent = {
  sectionOrder: ["intro", "offer", "diversification"],

  hero: {
    titleEn: "Tangible assets. Durable returns. Inflation resilience.",
    titleAr: "أصول ملموسة. عوائد مستدامة. حماية من التضخم.",
    crumbAmEn: "Asset Management",
    crumbAmAr: "إدارة الأصول",
    crumbPageEn: "Real Assets",
    crumbPageAr: "الأصول الحقيقية",
    meta: [
      {
        labelEn: "Focus",
        labelAr: "التركيز",
        valueEn: "Real Estate · Infrastructure",
        valueAr: "العقارات · البنية التحتية",
      },
      {
        labelEn: "Coverage",
        labelAr: "التغطية",
        valueEn: "MENA · Global Markets",
        valueAr: "الشرق الأوسط وشمال أفريقيا · الأسواق العالمية",
      },
      {
        labelEn: "Approach",
        labelAr: "النهج",
        valueEn: "Long-term · Value-driven",
        valueAr: "طويل الأمد · قائم على القيمة",
      },
    ],
  },

  intro: {
    eyebrowEn: "",
    eyebrowAr: "",
    headingEn: "Real Assets",
    headingAr: "أصول العقارات",
    bodyEn:
      "Real assets offer clients access to tangible, income-generating investments that diversify portfolios and provide a hedge against inflation. We source, structure, and manage real estate and other real asset opportunities with a long-term, value-driven approach.",
    bodyAr:
      "تتيح الأصول الحقيقية للعملاء الوصول إلى استثمارات ملموسة مدرّة للدخل تسهم في تنويع المحافظ وتوفر تحوطاً ضد التضخم. نقوم باستقطاب وهيكلة وإدارة فرص العقارات وغيرها من الأصول الحقيقية بنهج طويل الأمد قائم على القيمة.",
  },

  diversification: {
    icon: "layers",
    media: "architecture",
    titleEn: "Asset Diversity",
    titleAr: "تنوع الأصول",
    items: [
      { labelEn: "Residential units", labelAr: "الوحدات السكنية" },
      { labelEn: "Offices", labelAr: "المكاتب" },
      { labelEn: "Retail", labelAr: "متاجر التجزئة" },
      { labelEn: "Hospitality", labelAr: "قطاع الضيافة" },
      { labelEn: "Industrial", labelAr: "القطاعات الصناعية" },
      { labelEn: "Education", labelAr: "التعليم" },
      { labelEn: "Entertainment", labelAr: "قطاع الترفيه" },
      { labelEn: "Mixed-use real estate", labelAr: "العقارات متعددة الاستخدامات" },
    ],
  },

  geography: {
    icon: "map",
    media: "geo",
    titleEn: "Geographic Coverage",
    titleAr: "التغطية الجغرافية",
    items: [
      { labelEn: "MENA", labelAr: "الشرق الأوسط وشمال أفريقيا" },
      { labelEn: "Americas", labelAr: "الأمريكتان" },
      { labelEn: "Europe", labelAr: "أوروبا" },
      { labelEn: "Asia", labelAr: "آسيا" },
      { labelEn: "Australia", labelAr: "أستراليا" },
    ],
  },
};
