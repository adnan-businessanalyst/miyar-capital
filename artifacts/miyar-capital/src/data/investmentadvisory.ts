/**
 * Investment Advisory page copy (EN + AR).
 * Imported by `views/InvestmentAdvisory.tsx` — not CMS-managed.
 */

export type InvestmentAdvisorySectionId =
  | "hero"
  | "pillars"
  | "services"
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

export interface InvestmentAdvisoryServiceCard {
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
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
  services: {
    headingEn: string;
    headingAr: string;
    topicEn: string;
    topicAr: string;
    bodyEn: string;
    bodyAr: string;
    highlightEn: string;
    highlightAr: string;
    cards: InvestmentAdvisoryServiceCard[];
  };
  steps: InvestmentAdvisoryStep[];
}

export const INVESTMENT_ADVISORY: InvestmentAdvisoryContent = {
  sectionOrder: ["hero", "pillars", "services", "process", "interest"],

  hero: {
    titleEn: "Investment Advisory",
    titleAr: "المستشار المالي",
    crumbEn: "Investment Banking / Investment Advisory",
    crumbAr: "المصرفية الاستثمارية / المستشار المالي",
  },

  intro: {
    headingEn: "Investment Advisory",
    headingAr: "المستشار المالي",
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
      bodyAr: "لاتوجد مصلحة مؤسسية تتقدم على نجاح العميل",
    },
    {
      icon: "trust",
      titleEn: "Performance Is Standard",
      titleAr: "الأداء معيار",
      bodyEn: "Focus on measurable outputs",
      bodyAr: "التركيز على المخرجات القابلة للقياس",
    },
    {
      icon: "partnership",
      titleEn: "Partnership, Not Work",
      titleAr: "شراكة لا عمل",
      bodyEn: "We act as a consulting partner with the client",
      bodyAr: "نعمل كشريك استشاري مع المعميل",
    },
  ],

  services: {
    headingEn: "Our Services",
    headingAr: "خدماتنا",
    topicEn: "Financial Consulting & Valuation",
    topicAr: "الاستشارات المالية والتقييم",
    bodyEn: "",
    bodyAr: "",
    highlightEn: "",
    highlightAr: "",
    cards: [
      {
        titleEn: "Financial Planning",
        titleAr: "التخطيط المالي",
        bodyEn:
          "We work on identifying future financial objectives and building a comprehensive financial plan covering the short, medium, and long term, through an in-depth study of the current financial position and available capabilities, and an analysis of risks and investment opportunities, with the aim of achieving our clients' aspirations",
        bodyAr:
          "نعمل على تحديد الأهداف المالية المستقبلية، وبناء خطة مالية متكاملة تغطي المدى القصير والمتوسط والبعيد، من خلال دراسة معمقة للوضع المالي الحالي والإمكانيات المتاحة، وتحليل المخاطر والفرص الاستثمارية، بهدف تحقيق طموحات العملاء",
      },
      {
        titleEn: "Financial Restructuring",
        titleAr: "اعادة الهيكلة المالية",
        bodyEn:
          "We work on restructuring our clients' financial positions in alignment with their strategic objectives, through an in-depth analysis and study of their current financial and operational status, identifying strengths and weaknesses, and diagnosing the financial and operational challenges affecting the continuity of their business, in order to design innovative and sustainable financial solutions that enable clients to overcome financial crises, maintain business continuity, and strengthen their competitive position",
        bodyAr:
          "نعمل على إعادة هيكلة الأوضاع المالية للعملاء بما يتوافق مع أهدافهم الاستراتيجية، وذلك من خلال تحليل ودراسة معمقة للوضع المالي والتشغيلي الحالي، وتحديد مكامن القوة والضعف، وتشخيص التحديات المالية والتشغيلية التي تواجه استمرارية أعمالهم، وصولاً إلى تصميم حلول مالية مبتكرة ومستدامة تمكن العملاء من تجاوز الأزمات المالية، والحفاظ على استمرارية أعمالهم، وتعزيز مركزهم التنافسي",
      },
      {
        titleEn: "Financial Valuation",
        titleAr: "التقييم المالي",
        bodyEn:
          "We provide financial valuation services in accordance with the best professional standards and practices, through a comprehensive analysis of the financial and operational position of enterprises, and a study of the relevant economic and market factors, with the aim of determining the fair value of assets and businesses in a manner that supports our clients' investment, financing, and strategic decision-making",
        bodyAr:
          "نقدم خدمات التقييم المالي وفق أفضل المعايير والممارسات المهنية، من خلال تحليل شامل للوضع المالي والتشغيلي للمنشآت، ودراسة العوامل الاقتصادية والسوقية ذات الصلة، بهدف تحديد القيمة العادلة للأصول والأعمال بما يدعم اتخاذ القرارات الاستثمارية والتمويلية والاستراتيجية للعملاء",
      },
    ],
  },

  steps: [
    {
      n: "01",
      imageKey: 1,
      bodyEn:
        "Meeting the client and determining their objectives, risk tolerance, and investment constraints.",
      bodyAr: "لقاء العميل وتحديد أهدافه الاستراتيجية",
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
      bodyAr: "مرحلة التنفيذ و الاغلاق",
      altEn: "Investment advisory process step 5",
      altAr: "خطوة عملية الاستشارات المالية 5",
    },
  ],
};
