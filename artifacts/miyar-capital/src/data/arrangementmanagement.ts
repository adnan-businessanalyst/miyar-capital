/**
 * Arrangement Management page copy (EN + AR).
 * Imported by `views/ArrangementManagement.tsx` — not CMS-managed.
 *
 * Service showcase blocks may include RichText markup in AR/EN strings.
 * English service copy is intentionally blank for manual fill.
 */

export type ArrangementManagementSectionId =
  | "hero"
  | "intro"
  | "services"
  | "detail"
  | "interest";

export type ArrangementServiceBlockId =
  | "capital-markets"
  | "sukuk-debt"
  | "ma"
  | "bank-financing";

export interface ArrangementArrowItem {
  labelEn: string;
  labelAr: string;
  /** Visual tone for the arrow chip */
  tone: "navy" | "teal" | "black" | "mist" | "slate";
}

export interface ArrangementSukukRow {
  num: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
  tone: "mist" | "navy" | "slate";
}

export interface ArrangementMaCell {
  labelEn: string;
  labelAr: string;
  tone: "navy" | "blue" | "mist" | "slate" | "black" | "charcoal";
}

export interface ArrangementBankCard {
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
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
    subtitleEn: string;
    subtitleAr: string;
    capitalMarkets: {
      id: ArrangementServiceBlockId;
      titleEn: string;
      titleAr: string;
      bodyEn: string;
      bodyAr: string;
      arrows: ArrangementArrowItem[];
    };
    sukukDebt: {
      id: ArrangementServiceBlockId;
      titleEn: string;
      titleAr: string;
      rows: ArrangementSukukRow[];
    };
    ma: {
      id: ArrangementServiceBlockId;
      titleEn: string;
      titleAr: string;
      subtitleEn: string;
      subtitleAr: string;
      cells: ArrangementMaCell[];
    };
    bankFinancing: {
      id: ArrangementServiceBlockId;
      titleEn: string;
      titleAr: string;
      bodyEn: string;
      bodyAr: string;
      highlightEn: string;
      highlightAr: string;
      cards: ArrangementBankCard[];
    };
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

export const ARRANGEMENT_MANAGEMENT: ArrangementManagementContent = {
  sectionOrder: ["hero", "intro", "services", "detail", "interest"],

  hero: {
    titleEn: "Arrangement Management",
    titleAr: "إدارة المصرفية الاستثمارية",
    crumbEn: "Investment Banking / Arrangement Management",
    crumbAr: "المصرفية الاستثمارية / إدارة المصرفية الاستثمارية",
  },

  intro: {
    tagEn: "Arrangement & Advisory",
    tagAr: "الترتيب والمشورة",
    headingEn: "",
    headingAr: "",
    bodyEn:
      "Miyar Capital offers investment banking services designed to meet the requirements of targeted clients, through a team with practical experience in managing and executing investment banking projects to the highest standards, by governing financial services and accessing multiple funding sources that give the client negotiating power in every project.",
    bodyAr:
      "تقدم معيار المالية خدمات المصرفية الاستثمارية و المصممة لتلبية متطلبات العملاء المستهدفين ، من خلال فريق عمل يرتكز على خبرة عملية في إدارة المشاريع المصرفية الاستثمارية و تنفيذها بأعلى المعايير ، عن طريق حوكمة الخدمات المالية و الوصول الى مصادر تمويلية متعددة تمنح العميل قوة تفاوضية في كل مشروع.",
    imageAltEn: "Arrangement management",
    imageAltAr: "إدارة المصرفية الاستثمارية",
  },

  services: {
    headingEn: "Arrangement Management Services",
    headingAr: "خدماتنا",
    subtitleEn: "",
    subtitleAr: "المالية",

    capitalMarkets: {
      id: "capital-markets",
      titleEn: "",
      titleAr: "أسواق رأس المال",
      bodyEn: "",
      bodyAr:
        "طرح مُهيكَل يحقق السيولة المستهدفة للمساهمين ويعكس القيمة العادلة للشركة",
      arrows: [
        {
          labelEn: "",
          labelAr: "ترتيب الطروحات العامة الأولية و الطروحات الخاصة",
          tone: "navy",
        },
        {
          labelEn: "",
          labelAr: "الإدراج المباشر",
          tone: "teal",
        },
        {
          labelEn: "",
          labelAr: "التنسيق الكامل مع هيئة السوق المالية",
          tone: "mist",
        },
        {
          labelEn: "",
          labelAr: "إدارة عمليات زيادة رأس المال",
          tone: "black",
        },
        {
          labelEn: "",
          labelAr: "إصدار حقوق الأولوية للمساهمين",
          tone: "slate",
        },
      ],
    },

    sukukDebt: {
      id: "sukuk-debt",
      titleEn: "",
      titleAr: "الصكوك وأدوات الدين",
      rows: [
        {
          num: "01",
          titleEn: "",
          titleAr: "إدارة الإصدار",
          bodyEn: "",
          bodyAr: "ترتيب الطروحات العامة الأولية | الطروحات الخاصة",
          tone: "mist",
        },
        {
          num: "02",
          titleEn: "",
          titleAr: "التوافق الشرعي",
          bodyEn: "",
          bodyAr:
            "العمل مع المستشارين لضمان الامتثال الكامل للمتطلبات التنظيمية و الشرعية",
          tone: "navy",
        },
        {
          num: "03",
          titleEn: "",
          titleAr: "الهيكلة",
          bodyEn: "",
          bodyAr:
            "تصميم الهيكل الشرعي والمالي الأنسب للصكوك وفق طبيعة الأصل وأهداف الإصدار",
          tone: "slate",
        },
      ],
    },

    ma: {
      id: "ma",
      titleEn: "",
      titleAr: "الاندماج و الاستحواذ M&A",
      subtitleEn: "",
      subtitleAr: "الاستشارات الاستراتيجية",
      cells: [
        {
          labelEn: "",
          labelAr: "تحليل وتقييم فرص الاستحواذ والاندماج",
          tone: "navy",
        },
        {
          labelEn: "",
          labelAr: "دعم العملاء في تحديد الأهداف الاستراتيجية",
          tone: "blue",
        },
        {
          labelEn: "",
          labelAr: "إجراء العناية الواجبة المالية و القانونية",
          tone: "mist",
        },
        {
          labelEn: "",
          labelAr: "هيكلة الصفقة بما يحقق كفاءة مالية و قانونية",
          tone: "slate",
        },
        {
          labelEn: "",
          labelAr: "إدارة التفاوض وتقريب وجهات النظر بين الأطراف",
          tone: "black",
        },
        {
          labelEn: "",
          labelAr: "الإشراف على التوثيق وإغلاق الصفقة",
          tone: "charcoal",
        },
      ],
    },

    bankFinancing: {
      id: "bank-financing",
      titleEn: "",
      titleAr: "ترتيب التمويل البنكي",
      bodyEn: "",
      bodyAr:
        "تقدم معيار المالية، ضمن خدماتها في المصرفية الاستثمارية، استشارات متخصصة في ترتيب تسهيلات التمويل البنكي وذلك للشركات الساعية لتمويل مشاريعها التوسعية و إعادة هيكلة نماذجها المالية من خلال علاقتنا الممتدة مع المؤسسات التمويلية",
      highlightEn: "",
      highlightAr:
        "نؤمن لعملائنا وصولاً أوسع لمصادر التمويل بشروط أكثر تنافسية",
      cards: [
        {
          titleEn: "",
          titleAr: "الكفاءة في التنفيذ",
          bodyEn: "",
          bodyAr:
            "إدارة العملية بالكامل لضمان الحصول على التمويل في الإطار الزمني المستهدف",
        },
        {
          titleEn: "",
          titleAr: "الوصول إلى الممولين",
          bodyEn: "",
          bodyAr:
            "قاعدة واسعة من العلاقات مع البنوك التجارية و الصناديق الاستثمارية والمؤسسات التمويلية",
        },
        {
          titleEn: "",
          titleAr: "التفاوض",
          bodyEn: "",
          bodyAr:
            "التفاوض على متطلبات تمويلية مثلى: التسعير / جدول السداد / الضمانات",
        },
      ],
    },
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
