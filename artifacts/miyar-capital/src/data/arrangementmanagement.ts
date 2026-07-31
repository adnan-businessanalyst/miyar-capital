/**
 * Arrangement Management page copy (EN + AR).
 * Imported by `views/ArrangementManagement.tsx` — not CMS-managed.
 */

export type ArrangementManagementSectionId =
  | "hero"
  | "intro"
  | "services"
  | "detail"
  | "interest";

export interface ArrangementManagementService {
  titleEn: string;
  titleAr: string;
  itemsEn: string[];
  itemsAr: string[];
}

export interface ArrangementManagementDetailCard {
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface ArrangementManagementContent {
  sectionOrder: ArrangementManagementSectionId[];
  hero: {
    titleEn: string;
    titleAr: string;
    crumbEn: string;
    crumbAr: string;
  };
  intro: {
    tagEn: string;
    tagAr: string;
    headingEn: string;
    headingAr: string;
    bodyEn: string;
    bodyAr: string;
    imageAltEn: string;
    imageAltAr: string;
  };
  services: {
    headingEn: string;
    headingAr: string;
    items: ArrangementManagementService[];
  };
  detail: {
    headingEn: string;
    headingAr: string;
    tablistAriaEn: string;
    tablistAriaAr: string;
    prevAriaEn: string;
    prevAriaAr: string;
    nextAriaEn: string;
    nextAriaAr: string;
    prevCardAriaEn: string;
    prevCardAriaAr: string;
    nextCardAriaEn: string;
    nextCardAriaAr: string;
    cards: ArrangementManagementDetailCard[];
  };
}

const SHARED_ITEMS_EN = [
  "IPO Readiness",
  "Diagnostic Studies",
  "Economic feasibility studies",
  "Financial valuation",
  "Financial due diligence",
];

const SHARED_ITEMS_AR = [
  "جاهزية الطرح العام الأولي",
  "دراسات تشخيصية",
  "دراسات الجدوى الاقتصادية",
  "التقييم المالي",
  "العناية الواجبة المالية",
];

export const ARRANGEMENT_MANAGEMENT: ArrangementManagementContent = {
  sectionOrder: ["hero", "intro", "services", "detail", "interest"],

  hero: {
    titleEn: "Arrangement Management",
    titleAr: "إدارة المصرفية الاستثمارية",
    crumbEn: "Investment Banking / Arrangement Management",
    crumbAr: "المصرفية الاستثمارية / إدارة المصرفية الاستثمارية",
  },

  intro: {
    tagEn: "Arrangement & Management",
    tagAr: "الترتيب والإدارة",
    headingEn: "Comprehensive Investment Management",
    headingAr: "إدارة استثمارية شاملة",
    bodyEn:
      "At Miyar Capital, we provide professional arrangement and management services designed to meet the diverse needs of investors and partners. Our approach is grounded in market expertise, disciplined strategy, and full compliance with the Capital Market Authority (CMA) regulations. We focus on structuring investment opportunities that create long-term value while maintaining transparency and integrity at every step.",
    bodyAr:
      "في معيار المالية نقدّم خدمات ترتيب وإدارة احترافية مصمّمة لتلبية الاحتياجات المتنوعة للمستثمرين والشركاء. يرتكز نهجنا على خبرة السوق واستراتيجية منضبطة والامتثال الكامل لأنظمة هيئة السوق المالية. نركّز على هيكلة الفرص الاستثمارية التي تخلق قيمة طويلة الأجل مع الحفاظ على الشفافية والنزاهة في كل خطوة.",
    imageAltEn: "Arrangement management",
    imageAltAr: "إدارة المصرفية الاستثمارية",
  },

  services: {
    headingEn: "Arrangement Management Services",
    headingAr: "خدمات إدارة المصرفية الاستثمارية",
    items: [
      {
        titleEn: "Business Consultations",
        titleAr: "الاستشارات التجارية",
        itemsEn: SHARED_ITEMS_EN,
        itemsAr: SHARED_ITEMS_AR,
      },
      {
        titleEn: "Financial Consulting",
        titleAr: "الاستشارات المالية",
        itemsEn: SHARED_ITEMS_EN,
        itemsAr: SHARED_ITEMS_AR,
      },
      {
        titleEn: "Debt Advisory",
        titleAr: "استشارات الدين",
        itemsEn: SHARED_ITEMS_EN,
        itemsAr: SHARED_ITEMS_AR,
      },
      {
        titleEn: "Capital Markets",
        titleAr: "أسواق المال",
        itemsEn: SHARED_ITEMS_EN,
        itemsAr: SHARED_ITEMS_AR,
      },
    ],
  },

  detail: {
    headingEn: "More Detailed Information",
    headingAr: "معلومات أكثر تفصيلاً",
    tablistAriaEn: "Detail cards",
    tablistAriaAr: "بطاقات التفاصيل",
    prevAriaEn: "Previous detail card",
    prevAriaAr: "بطاقة التفاصيل السابقة",
    nextAriaEn: "Next detail card",
    nextAriaAr: "بطاقة التفاصيل التالية",
    prevCardAriaEn: "Previous: {title}",
    prevCardAriaAr: "السابق: {title}",
    nextCardAriaEn: "Next: {title}",
    nextCardAriaAr: "التالي: {title}",
    cards: [
      {
        titleEn: "Capital Increase through a Rights Offering",
        titleAr: "زيادة رأس المال عبر إصدار حقوق أولوية",
        bodyEn:
          "Miyar Capital supports companies in increasing capital through a Rights Offering to their existing shareholders, while adhering to the Shariah controls related to such operations.",
        bodyAr:
          "تدعم معيار المالية الشركات في زيادة رأس المال عبر إصدار حقوق أولوية لمساهميها الحاليين، مع الالتزام بالضوابط الشرعية المتعلقة بهذه العمليات.",
      },
      {
        titleEn: "Debt Restructuring Solutions",
        titleAr: "حلول إعادة هيكلة الديون",
        bodyEn:
          "We provide comprehensive debt restructuring services to help companies optimize their capital structure and improve financial stability.",
        bodyAr:
          "نقدّم خدمات شاملة لإعادة هيكلة الديون لمساعدة الشركات على تحسين هيكل رأس المال وتعزيز الاستقرار المالي.",
      },
      {
        titleEn: "Merger & Acquisition Advisory",
        titleAr: "استشارات الاندماج والاستحواذ",
        bodyEn:
          "Our team offers expert guidance on M&A transactions, ensuring compliance with Islamic finance principles while maximizing value.",
        bodyAr:
          "يقدّم فريقنا إرشاداً متخصصاً في معاملات الاندماج والاستحواذ، مع ضمان الامتثال لمبادئ التمويل الإسلامي وتعظيم القيمة.",
      },
      {
        titleEn: "IPO & Capital Markets",
        titleAr: "الطرح العام وأسواق المال",
        bodyEn:
          "We assist companies in accessing capital markets through IPOs and other capital market instruments in compliance with Shariah requirements.",
        bodyAr:
          "نساعد الشركات على الوصول إلى أسواق المال عبر الطروحات العامة وغيرها من أدوات السوق بما يتوافق مع متطلبات الشريعة.",
      },
      {
        titleEn: "Strategic Financial Advisory",
        titleAr: "الاستشارات المالية الاستراتيجية",
        bodyEn:
          "Our consultants provide strategic financial advice to help organizations achieve their growth objectives sustainably.",
        bodyAr:
          "يقدّم مستشارونا نصائح مالية استراتيجية لمساعدة المؤسسات على تحقيق أهداف النمو بشكل مستدام.",
      },
      {
        titleEn: "Project Finance Structuring",
        titleAr: "هيكلة تمويل المشاريع",
        bodyEn:
          "We structure project finance solutions that align with Islamic finance principles and project requirements.",
        bodyAr:
          "نُهيكل حلول تمويل المشاريع بما يتوافق مع مبادئ التمويل الإسلامي ومتطلبات المشروع.",
      },
    ],
  },
};
