/**
 * Investment Advisory page copy (EN + AR).
 * Imported by `views/InvestmentAdvisory.tsx` — not CMS-managed.
 */

export type InvestmentAdvisorySectionId =
  | "hero"
  | "pillars"
  | "process"
  | "interest";

export type InvestmentAdvisoryIconId = "priority" | "trust" | "partnership";

export interface InvestmentAdvisoryPillar {
  icon: InvestmentAdvisoryIconId;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface InvestmentAdvisoryStep {
  n: string;
  /** Index into IA_PROCESS_IMAGES (1-based keys in contentImages). */
  imageKey: 1 | 2 | 3 | 4 | 5;
  bodyEn: string;
  bodyAr: string;
  altEn: string;
  altAr: string;
}

export interface InvestmentAdvisoryContent {
  sectionOrder: InvestmentAdvisorySectionId[];
  hero: {
    titleEn: string;
    titleAr: string;
    crumbEn: string;
    crumbAr: string;
  };
  intro: {
    headingEn: string;
    headingAr: string;
    bodyEn: string;
    bodyAr: string;
    backgroundAriaEn: string;
    backgroundAriaAr: string;
  };
  pillars: InvestmentAdvisoryPillar[];
  steps: InvestmentAdvisoryStep[];
}

export const INVESTMENT_ADVISORY: InvestmentAdvisoryContent = {
  sectionOrder: ["hero", "pillars", "process", "interest"],

  hero: {
    titleEn: "Investment Advisory",
    titleAr: "مستشار الاستثمار",
    crumbEn: "Investment Banking / Investment Advisory",
    crumbAr: "المصرفية الاستثمارية / مستشار الاستثمار",
  },

  intro: {
    headingEn: "Investment Advisory",
    headingAr: "مستشار الاستثمار",
    bodyEn:
      "Miyar Capital believes the first step in investment advisory services is to understand the client's needs, objectives, and constraints.",
    bodyAr:
      "تؤمن معيار المالية بأن الخطوة الأولى في خدمات الاستشارات الاستثمارية هي فهم احتياجات العميل وأهدافه وقيوده.",
    backgroundAriaEn: "Investment advisory background",
    backgroundAriaAr: "خلفية مستشار الاستثمار",
  },

  pillars: [
    {
      icon: "priority",
      titleEn: "Priority",
      titleAr: "الأولوية",
      bodyEn:
        "Unit-holders' profits and benefits come first, then our partners.",
      bodyAr:
        "أرباح ومصالح مالكي الوحدات تأتي أولاً، ثم شركاؤنا.",
    },
    {
      icon: "trust",
      titleEn: "Trust",
      titleAr: "الثقة",
      bodyEn:
        "We do not create any investment product except what we would be satisfied investing in.",
      bodyAr:
        "لا نُنشئ أي منتج استثماري إلا ما نرتاح للاستثمار فيه بأنفسنا.",
    },
    {
      icon: "partnership",
      titleEn: "Partnership",
      titleAr: "الشراكة",
      bodyEn:
        "Act like your partners, not like the traditional fund managers.",
      bodyAr:
        "نتعامل كشركاء، لا كمديري صناديق تقليديين.",
    },
  ],

  steps: [
    {
      n: "01",
      imageKey: 1,
      bodyEn:
        "Meeting the client and determining their objectives, risk tolerance, and investment constraints.",
      bodyAr:
        "لقاء العميل وتحديد أهدافه وتحمل المخاطر والقيود الاستثمارية.",
      altEn: "Investment advisory process step 1",
      altAr: "خطوة عملية الاستشارات الاستثمارية 1",
    },
    {
      n: "02",
      imageKey: 2,
      bodyEn:
        "Analyzing client assets, liabilities, and cash flows and determining investment objectives and strategy.",
      bodyAr:
        "تحليل أصول العميل والتزاماته وتدفقاته النقدية وتحديد الأهداف والاستراتيجية الاستثمارية.",
      altEn: "Investment advisory process step 2",
      altAr: "خطوة عملية الاستشارات الاستثمارية 2",
    },
    {
      n: "03",
      imageKey: 3,
      bodyEn:
        "Determining and selecting the appropriate strategic asset allocation and ideal portfolio managers.",
      bodyAr:
        "تحديد واختيار التخصيص الاستراتيجي المناسب للأصول ومديري المحافظ المثاليين.",
      altEn: "Investment advisory process step 3",
      altAr: "خطوة عملية الاستشارات الاستثمارية 3",
    },
    {
      n: "04",
      imageKey: 4,
      bodyEn: "Implementation phase and beginning investment.",
      bodyAr: "مرحلة التنفيذ وبدء الاستثمار.",
      altEn: "Investment advisory process step 4",
      altAr: "خطوة عملية الاستشارات الاستثمارية 4",
    },
    {
      n: "05",
      imageKey: 5,
      bodyEn:
        "Monitoring, analysis, and evaluation phase of investment portfolio components and performance, and correction if necessary.",
      bodyAr:
        "مرحلة مراقبة وتحليل وتقييم مكونات المحفظة الاستثمارية وأدائها، والتصحيح عند الحاجة.",
      altEn: "Investment advisory process step 5",
      altAr: "خطوة عملية الاستشارات الاستثمارية 5",
    },
  ],
};
