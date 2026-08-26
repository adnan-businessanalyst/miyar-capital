/**
 * Discretionary Portfolio Management page copy (EN + AR).
 * Imported by `views/DPM.tsx` and `views/DiscretionaryPortfolioManagement.tsx` — not CMS-managed.
 * Route: /asset-management/dpm
 *
 * Bodies may include RichText markup: `<br>`, `<strong>`, `<em>`,
 * `<span class="rt-navy|rt-accent|rt-muted|rt-white">…</span>` (rendered via RichText).
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
    titleEn: "Discretionary Portfolio Management",
    titleAr: "إدارة المحافظ الإستثمارية الخاصة ",
    crumbAmEn: "Asset Management",
    crumbAmAr: "إدارة الأصول",
    crumbPageEn: "Discretionary Portfolio Management",
    crumbPageAr: "إدارة المحافظ الإستثمارية الخاصة",
  },

  mandates: {
    tagEn: "Mandate types",
    tagAr: "أنواع التفويضات",
    headingEn: "Portfolios managed to your policy — not to a product shelf.",
    headingAr: "محافظ تُدار وفق سياستك الاستثمارية، لا وفق منتجاتٍ عامه.",
    leadEn:
      "Each mandate begins with a written Investment Policy Statement and a documented suitability assessment before any capital is deployed.",
    leadAr:
      "يبدأ كل تفويض ببيان سياسة استثمار مكتوب وتقييم ملاءمة موثّق قبل توظيف أي رأس مال.",
    items: [
      {
        num: "A",
        titleEn: "Liquidity Management",
        titleAr: "إدارة السيولة",
        bodyEn: "Cash and money-market mandates for treasuries.",
        bodyAr: "تفويضات النقد وأسواق النقد لخزائن الشركات.",
      },
      {
        num: "B",
        titleEn: "Income Portfolios",
        titleAr: "محافظ تستهدف الدخل",
        bodyEn: "Fixed-income and yield-oriented mandates.",
        bodyAr: "تفاويض الدخل الثابت والتفاويض المستهدِفة للعائد.",
      },
      {
        num: "C",
        titleEn: "Saudi Equity",
        titleAr: "أسهم الملكية الخاصة السعودية",
        bodyEn: "Active equity mandates under conviction.",
        bodyAr: "تفاويض الملكية الخاصة النشطةالقائمة على اقتناعٍ راسخ.",
      },
      {
        num: "D",
        titleEn: "Multi-Asset",
        titleAr: "متعدد الأصول",
        bodyEn: "Diversified across all four pillars.",
        bodyAr: "متنوعة على الركائز الأربع.",
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
        titleEn: "Investment Policy Statement (IPS)",
        titleAr: "بيان سياسات الاستثمار وممارساته",
        bodyEn: "Written investment policy.",
        bodyAr: "يبدأ كل تفويض ببيانٍ مكتوب لسياسات الاستثمار وممارساته وتقييم ملاءمة موثّق قبل توظيف أي رأس مال.",
      },
      {
        titleEn: "Deploy",
        titleAr: "توظيف",
        bodyEn: "Allocation across pillars.",
        bodyAr: "تخصيص متوزع على الركائز.",
      },
      {
        titleEn: "Review",
        titleAr: "المراجعة",
        bodyEn: "Scheduled review cycle.",
        bodyAr: "المراجعة الدورية للأداء.",
      },
      {
        titleEn: "Report",
        titleAr: "التقرير",
        bodyEn: "Transparent CMA-aligned reporting.",
        bodyAr: "تقارير شفافة متوافقة مع هيئة السوق المالية.",
      },
    ],
    ctaEn: "Request a Portfolio Consultation",
    ctaAr: "اطلب استشارة لمحفظتك",
  },
};
