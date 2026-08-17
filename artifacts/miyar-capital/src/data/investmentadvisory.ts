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
    titleAr: "مستشار المالية",
    crumbEn: "Investment Banking / Investment Advisory",
    crumbAr: "المصرفية الاستثمارية / مستشار المالية",
  },

  intro: {
    headingEn: "Investment Advisory",
    headingAr: "مستشار المالية",
    bodyEn:
      "Miyar Capital believes the first step in investment advisory services is to understand the client's needs, objectives, and constraints.",
    bodyAr:
      "تؤمن معيار المالية بأن الخطوة الأولى في خدمات الاستشارات المالية هي فهم احتياجات العميل وأهدافه وقيوده.",
    backgroundAriaEn: "Investment advisory background",
    backgroundAriaAr: "خلفية مستشار الاستثمار",
  },

  pillars: [
    {
      icon: "priority",
      titleEn: "Client Success First",
      titleAr: "نجاح العميل أولاً",
      bodyEn:
        "No corporate interest takes precendence over the success of the client",
      bodyAr:
        "لاتوجد مصلحة مؤسسية تتقدم على نجاح العميل",
    },
    {
      icon: "trust",
      titleEn: "Performance Is Standard",
      titleAr: "الأداء معيار",
      bodyEn:
        "Focus on measurable outputs",
      bodyAr:
        "التركيز على المخرجات القابلة للقياس",
    },
    {
      icon: "partnership",
      titleEn: "Partnership, Not Work",
      titleAr: "شراكة لا عمل",
      bodyEn:
        "We act as a consulting partner with the client",
      bodyAr:
        "نعمل كشريك استشاري مع المعميل",
    },
  ],

  steps: [
    {
      n: "01",
      imageKey: 1,
      bodyEn:
        "Meeting the client and determining their objectives, risk tolerance, and investment constraints.",
      bodyAr:
        "لقاء العميل وتحديد أهدافه الاستراتيجية",
      altEn: "Investment advisory process step 1",
      altAr: "خطوة عملية الاستشارات المالية 1",
    },
    {
      n: "02",
      imageKey: 2,
      bodyEn:
        "Analyzing client assets, liabilities, and cash flows and determining investment objectives and strategy.",
      bodyAr:
        "تحليل أصول العميل والتزاماته وتدفقاته النقدية وتحديد الأهداف المستقبلية",
      altEn: "Investment advisory process step 2",
      altAr: "خطوة عملية الاستشارات المالية 2",
    },
    {
      n: "03",
      imageKey: 3,
      bodyEn:
        "Determining and selecting the appropriate strategic asset allocation and ideal portfolio managers.",
      bodyAr:
        "حوكمة الخدمة المالية بما يتناسب مع أهداف العميل الاستراتيجية و المستقبلية",
      altEn: "Investment advisory process step 3",
      altAr: "خطوة عملية الاستشارات المالية 3",
    },
    {
      n: "04",
      imageKey: 4,
      bodyEn: "Implementation phase and beginning investment.",
      bodyAr: "مرحلة التخطيط والاعداد",
      altEn: "Investment advisory process step 4",
      altAr: "خطوة عملية الاستشارات المالية 4",
    },
    {
      n: "05",
      imageKey: 5,
      bodyEn:
        "Monitoring, analysis, and evaluation phase of investment portfolio components and performance, and correction if necessary.",
      bodyAr:
        "مرحلة التنفيذ و الاغلاق",
      altEn: "Investment advisory process step 5",
      altAr: "خطوة عملية الاستشارات المالية 5",
    },
  ],
};
