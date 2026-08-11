/**
 * Discretionary Portfolio Management page copy (EN + AR).
 * Imported by `views/DPM.tsx` — not CMS-managed.
 * Route: /asset-management/dpm
 *
 * Bodies may include `<br>` for paragraph breaks (rendered via RichText).
 */

export type DpmSectionId = "intro" | "mandates" | "cycle";

export interface DpmCardItem {
  num: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface DpmStepItem {
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface DpmContent {
  sectionOrder: DpmSectionId[];
  hero: {
    titleEn: string;
    titleAr: string;
    crumbAmEn: string;
    crumbAmAr: string;
    crumbPageEn: string;
    crumbPageAr: string;
  };
  mandates: {
    tagEn: string;
    tagAr: string;
    headingEn: string;
    headingAr: string;
    leadEn: string;
    leadAr: string;
    items: DpmCardItem[];
  };
  cycle: {
    tagEn: string;
    tagAr: string;
    headingEn: string;
    headingAr: string;
    steps: DpmStepItem[];
    ctaEn: string;
    ctaAr: string;
  };
}

export const DPM_PAGE: DpmContent = {
  sectionOrder: ["intro", "mandates", "cycle"],

  hero: {
    titleEn: "Portfolios managed to your policy — not to a product shelf.",
    titleAr: "محافظ تُدار وفق سياستك — لا وفق رفّ منتجات.",
    crumbAmEn: "Asset Management",
    crumbAmAr: "إدارة الأصول",
    crumbPageEn: "Discretionary Portfolio Management",
    crumbPageAr: "الإدارة التقديرية للمحافظ",
  },

  mandates: {
    tagEn: "DPM",
    tagAr: "الإدارة التقديرية",
    headingEn: "Mandate types.",
    headingAr: "أنواع التفويضات.",
    leadEn:
      "Each mandate begins with a written Investment Policy Statement and a documented suitability assessment before any capital is deployed.",
    leadAr:
      "يبدأ كل تفويض ببيان سياسة استثمار مكتوب وتقييم ملاءمة موثّق قبل نشر أي رأس مال.",
    items: [
      {
        num: "A",
        titleEn: "Liquidity Management",
        titleAr: "إدارة السيولة",
        bodyEn: "Cash and money-market mandates for treasuries.",
        bodyAr: "تفويضات نقد وأسواق نقد لخزائن الشركات.",
      },
      {
        num: "B",
        titleEn: "Income Portfolios",
        titleAr: "محافظ الدخل",
        bodyEn: "Fixed-income and yield-oriented mandates.",
        bodyAr: "تفويضات دخل ثابت وموجّهة نحو العائد.",
      },
      {
        num: "C",
        titleEn: "Saudi Equity",
        titleAr: "أسهم سعودية",
        bodyEn: "Active equity mandates under conviction.",
        bodyAr: "تفويضات أسهم نشطة مبنية على القناعة.",
      },
      {
        num: "D",
        titleEn: "Multi-Asset",
        titleAr: "متعدد الأصول",
        bodyEn: "Diversified across all four pillars.",
        bodyAr: "تنويع عبر الركائز الأربع.",
      },
    ],
  },

  cycle: {
    tagEn: "The Cycle",
    tagAr: "دورة العمل",
    headingEn: "How a mandate runs.",
    headingAr: "كيف يسير التفويض.",
    steps: [
      {
        titleEn: "Classify",
        titleAr: "التصنيف",
        bodyEn: "Client classification &amp; KYC.",
        bodyAr: "تصنيف العميل ومعرفة العميل.",
      },
      {
        titleEn: "IPS",
        titleAr: "بيان السياسة",
        bodyEn: "Written investment policy.",
        bodyAr: "سياسة استثمار مكتوبة.",
      },
      {
        titleEn: "Deploy",
        titleAr: "التنفيذ",
        bodyEn: "Allocation across pillars.",
        bodyAr: "تخصيص عبر الركائز.",
      },
      {
        titleEn: "Review",
        titleAr: "المراجعة",
        bodyEn: "Scheduled review cycle.",
        bodyAr: "دورة مراجعة مجدولة.",
      },
      {
        titleEn: "Report",
        titleAr: "التقرير",
        bodyEn: "Transparent CMA-aligned reporting.",
        bodyAr: "تقارير شفافة متوافقة مع هيئة السوق المالية.",
      },
    ],
    ctaEn: "Request a Portfolio Consultation",
    ctaAr: "اطلب استشارة محفظة",
  },
};
