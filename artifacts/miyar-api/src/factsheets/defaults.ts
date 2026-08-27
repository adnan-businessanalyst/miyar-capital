import type { PageFactsheetRow } from "../db/schema.js";

export const FACTSHEET_SLUGS = [
  "equity-management",
  "private-markets",
  "real-assets",
  "murabaha-fund",
] as const;

export type FactsheetSlug = (typeof FACTSHEET_SLUGS)[number];

export type FactsheetDefault = {
  slug: FactsheetSlug;
  pagePath: string;
  pageLabelEn: string;
  pageLabelAr: string;
  titleEn: string;
  titleAr: string;
  rows: PageFactsheetRow[];
  ctaShow: boolean;
  ctaLabelEn: string;
  ctaLabelAr: string;
};

const DOWNLOAD_EN = "Download Factsheet ↓";
const DOWNLOAD_AR = "تحميل نشرة الحقائق ↓";

export const FACTSHEET_DEFAULTS: FactsheetDefault[] = [
  {
    slug: "equity-management",
    pagePath: "/asset-management/equity-management",
    pageLabelEn: "Equity Management",
    pageLabelAr: "إدارة الأسهم",
    titleEn: "PRODUCT OVERVIEW",
    titleAr: "نظرة عامة على المنتج",
    ctaShow: false,
    ctaLabelEn: DOWNLOAD_EN,
    ctaLabelAr: DOWNLOAD_AR,
    rows: [
      {
        labelEn: "Asset Class",
        labelAr: "فئة الأصول",
        valueEn: "Listed Equities",
        valueAr: "أسهم مدرجة",
      },
      {
        labelEn: "Risk Level",
        labelAr: "مستوى المخاطر",
        valueEn:
          "High — subject to market volatility and potential capital loss",
        valueAr: "مرتفع — عرضة لتقلبات السوق واحتمال خسارة رأس المال",
      },
      {
        labelEn: "Liquidity",
        labelAr: "السيولة",
        valueEn: "High — securities traded on regulated exchanges",
        valueAr: "مرتفعة — أوراق مالية متداولة في أسواق منظّمة",
      },
      {
        labelEn: "Investor Type",
        labelAr: "نوع المستثمر",
        valueEn:
          "Investors seeking long-term capital growth with higher risk tolerance",
        valueAr:
          "الباحث عن نمو رأس المال طويل الأجل مع قدرة أعلى على تحمّل المخاطر",
      },
      {
        labelEn: "Structure",
        labelAr: "الهيكل",
        valueEn:
          "Discretionary portfolio / segregated account, or public equity fund units",
        valueAr: "محفظة تديرية / حساب منفصل، أو وحدات في صندوق أسهم عام",
      },
    ],
  },
  {
    slug: "private-markets",
    pagePath: "/asset-management/private-markets",
    pageLabelEn: "Private Markets",
    pageLabelAr: "الأسواق الخاصة",
    titleEn: "PRODUCT OVERVIEW",
    titleAr: "نظرة عامة على المنتج",
    ctaShow: false,
    ctaLabelEn: DOWNLOAD_EN,
    ctaLabelAr: DOWNLOAD_AR,
    rows: [
      {
        labelEn: "Asset Class",
        labelAr: "فئة الأصول",
        valueEn:
          "Private Markets (Private Equity, Private Credit, Co-Investment)",
        valueAr: "أسواق خاصة (ملكية خاصة، ائتمان خاص، استثمار مشترك)",
      },
      {
        labelEn: "Risk Level",
        labelAr: "مستوى المخاطر",
        valueEn: "High",
        valueAr: "مرتفع",
      },
      {
        labelEn: "Liquidity",
        labelAr: "السيولة",
        valueEn:
          "Illiquid — long-term capital commitment with limited or no redemption",
        valueAr:
          "غير سائلة — التزام رأسمالي طويل الأجل باسترداد محدود أو معدوم",
      },
      {
        labelEn: "Investor Type",
        labelAr: "نوع المستثمر",
        valueEn: "Qualified investors only",
        valueAr: "المستثمرون المؤهلون فقط",
      },
      {
        labelEn: "Structure",
        labelAr: "الهيكل",
        valueEn: "Closed-ended private funds and deal-by-deal vehicles",
        valueAr: "صناديق خاصة مغلقة وأدوات على أساس صفقة بصفقة",
      },
    ],
  },
  {
    slug: "real-assets",
    pagePath: "/asset-management/real-assets",
    pageLabelEn: "Real Assets",
    pageLabelAr: "الأصول العقارية",
    titleEn: "PRODUCT OVERVIEW",
    titleAr: "نظرة عامة على المنتج",
    ctaShow: false,
    ctaLabelEn: DOWNLOAD_EN,
    ctaLabelAr: DOWNLOAD_AR,
    rows: [
      {
        labelEn: "Asset Class",
        labelAr: "فئة الأصول",
        valueEn: "Real Assets (Real Estate)",
        valueAr: "أصول عقارية (عقارات)",
      },
      {
        labelEn: "Risk Level",
        labelAr: "مستوى المخاطر",
        valueEn: "Moderate to High",
        valueAr: "متوسط إلى مرتفع",
      },
      {
        labelEn: "Liquidity",
        labelAr: "السيولة",
        valueEn: "Low — long-term holding periods",
        valueAr: "منخفضة — فترات تملّك طويلة الأجل",
      },
      {
        labelEn: "Investor Type",
        labelAr: "نوع المستثمر",
        valueEn: "Qualified / Institutional",
        valueAr: "مؤهل / مؤسسي",
      },
      {
        labelEn: "Structure",
        labelAr: "الهيكل",
        valueEn: "Private funds and direct investment vehicles",
        valueAr: "صناديق خاصة وأدوات استثمار مباشر",
      },
    ],
  },
  {
    slug: "murabaha-fund",
    pagePath: "/asset-management/liquidity-fixed-income/murabaha-fund",
    pageLabelEn: "Miyar Murabaha Fund",
    pageLabelAr: "صندوق معيار للمرابحة",
    titleEn: "Fund Facts",
    titleAr: "حقائق الصندوق",
    ctaShow: true,
    ctaLabelEn: "Download Factsheet &amp; Terms and Conditions ↓",
    ctaLabelAr: "تحميل نشرة الحقائق والشروط والأحكام ↓",
    rows: [
      {
        labelEn: "Asset Class",
        labelAr: "فئة الأصل",
        valueEn: "Money Market",
        valueAr: "أسواق النقد",
      },
      {
        labelEn: "Risk Level",
        labelAr: "مستوى المخاطر",
        valueEn: "Low",
        valueAr: "منخفض",
      },
      {
        labelEn: "Liquidity",
        labelAr: "السيولة",
        valueEn: "Daily",
        valueAr: "يومية",
      },
      {
        labelEn: "Investor Type",
        labelAr: "نوع المستثمر",
        valueEn: "Public — individuals and institutions",
        valueAr: "عام — أفراد ومؤسسات",
      },
      {
        labelEn: "Structure",
        labelAr: "الهيكل",
        valueEn: "Shariah-compliant",
        valueAr: "متوافق مع الشريعة",
      },
    ],
  },
];

export function isFactsheetSlug(value: string): value is FactsheetSlug {
  return (FACTSHEET_SLUGS as readonly string[]).includes(value);
}

export function defaultFor(slug: string): FactsheetDefault | undefined {
  return FACTSHEET_DEFAULTS.find((item) => item.slug === slug);
}
