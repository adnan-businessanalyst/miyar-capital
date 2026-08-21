/**
 * Investment Banking page copy (EN + AR).
 * Imported by `views/InvestmentBanking.tsx` — not CMS-managed.
 *
 * Body / paragraph strings support RichText markup:
 * `<br>`, `<strong>`, `<em>`,
 * `<span class="rt-navy|rt-accent|rt-muted|rt-white">…</span>`,
 * or inline `style="color:…"`.
 */

export type InvestmentBankingSectionId =
  | "hero"
  | "overview"
  | "advise"
  | "method"
  | "execute"
  | "products"
  | "lifecycle"
  | "cta";

export interface InvestmentBankingCard {
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface InvestmentBankingMethodStep {
  num: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface InvestmentBankingProduct {
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
  href: string;
}

export interface InvestmentBankingLifecycleStep {
  num: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface InvestmentBankingMetaFact {
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
}

export interface InvestmentBankingContent {
  sectionOrder: InvestmentBankingSectionId[];
  hero: {
    titleEn: string;
    titleAr: string;
    crumbEn: string;
    crumbAr: string;
    descriptionEn: string;
    descriptionAr: string;
    meta: InvestmentBankingMetaFact[];
  };
  overview: {
    tagEn: string;
    tagAr: string;
    // headingEn: string;
    // headingAr: string;
    parasEn: string[];
    parasAr: string[];
    /** Words wrapped in <strong> within overview paragraphs. */
    emphasizeEn: string[];
    emphasizeAr: string[];
  };
  advise: {
    tagEn: string;
    tagAr: string;
    // headingEn: string;
    // headingAr: string;
    // parasEn: string[];
    // parasAr: string[];
    cards: InvestmentBankingCard[];
  };
  method: {
    tagEn: string;
    tagAr: string;
    headingEn: string;
    headingAr: string;
    steps: InvestmentBankingMethodStep[];
  };
  execute: {
    tagEn: string;
    tagAr: string;
    headingEn: string;
    headingAr: string;
    bodyEn: string;
    bodyAr: string;
    cards: InvestmentBankingCard[];
  };
  products: {
    tagEn: string;
    tagAr: string;
    headingEn: string;
    headingAr: string;
    viewServiceEn: string;
    viewServiceAr: string;
    items: InvestmentBankingProduct[];
  };
  lifecycle: {
    tagEn: string;
    tagAr: string;
    headingEn: string;
    headingAr: string;
    steps: InvestmentBankingLifecycleStep[];
  };
  cta: {
    tagEn: string;
    tagAr: string;
    headingEn: string;
    headingAr: string;
    bodyEn: string;
    bodyAr: string;
    buttonEn: string;
    buttonAr: string;
  };
}

export const INVESTMENT_BANKING: InvestmentBankingContent = {
  sectionOrder: [
    "hero",
    "overview",
    "advise",
    "method",
    "execute",
    "products",
    "lifecycle",
  ],

  hero: {
    titleEn: "Investment Banking",
    titleAr: "المصرفية الاستثمارية",
    crumbEn: "Investment Banking",
    crumbAr: "المصرفية الاستثمارية",
    descriptionEn:
      "Consulting services in arrangement and advice across capital markets, transactions and financial financing",
    descriptionAr:
      "الخدمات الاستشارية في الترتيب والمشورة عبر أسواق المال و المعاملات و التمويل المالي",
    meta: [
      {
        labelEn: "Consulting Services",
        labelAr: "الخدمات الإستشارية",
        valueEn: "Capital Market | Debt and Sukuk Market | Merger and Acquisition | Arranging Bank Facilities | Financial Consulting",
        valueAr: "أسواق رأس المال | أسواق أدوات الدين و الصكوك | |الاندماج و الاستحواذ | ترتيب | التسهيلات البنكية | الاستشارات المالية ",
      },
      {
        labelEn: "Market",
        labelAr: "السوق",
        valueEn: "Saudi Arabia",
        valueAr: "المملكة العربية السعودية",
      },
    ],
  },

  overview: {
    tagEn: "OVERVIEW",
    tagAr: "نظرة عامة",
    parasEn: [
      "The Investment Banking Department acts as a consultant partner to clients in structuring and implementing financial solutions that achieve their strategic objectives, through a deep understanding of each client's needs and a thorough analysis of their requirements.",
      "We offer integrated financial solutions that meet each client's aspirations and support their growth trajectory.",
    ],
    parasAr: [
      "تعمل إدارة المصرفية الاستثمارية كشريك استشاري للعملاء في هيكلة وتنفيذ الحلول المالية التي تحقق أهدافهم الاستراتيجية، وذلك من خلال الفهم العميق لاحتياجات كل عميل وتحليل متطلباته بدقة.<br>نقدم حلولاً مالية متكاملة تُواكب تطلعات كل عميل وتدعم مسيرته نحو النمو.",
    ],
    emphasizeEn: ["advising", "arranging"],
    emphasizeAr: ["الاستشارات", "الترتيب"],
  },

  advise: {
    tagEn: "Scope Of Financial Services",
    tagAr: "نطاق الخدمات المالية",
    cards: [
      {
        titleEn: "Capital Markets ",
        titleAr: "أسواق رأس المال",
        bodyEn:
          "PUBLIC AND PRIVATE OFFERINGS<BR>DIRECT LISTING<BR>CAPITAL RAISING",
        bodyAr:
          "الطروحات العامة و الخاصة<br>الإدراج المباشر<br>زيادات رأس المال"
      },
      {
        titleEn: "Sukuk & Debt Instruments Advisory",
        titleAr: "الصكوك و أدوات الدين",
        bodyEn:
          "STRUCTURING AND ISSUING SHARIA-COMPLIANT INSTRUMENTS AND SECURITIES",
        bodyAr:
          "هيكلة و إصدار الصكوك و الأدوات المتوافقة مع الشريعه الإسلامية",
      },
      {
        titleEn: "Mergers & Acquisitions",
        titleAr: "الإندماج و الإستحواذ M&A",
        bodyEn:
          "CONSULTING AND EXECUTING MERGERS AND ACQUISITIONS DEALS TO ACHIEVE STRATEGIC GOALS",
        bodyAr:
          "استشارات وتنفيذ صفقات الإندماج و الإستحواذ لتحقيق الأهداف الاستراتيجية",
      },
      {
        titleEn: "Arranging Bank Financcing",
        titleAr: "ترتيب التمويل البنكي",
        bodyEn:
          "ARRANGING CREDIT FACILITIES THROUGH A WIDE RANGE OF FINANCING ENTITIES",
        bodyAr:
          "ترتيب التسهيلات الائتمانية عبر قاعدة واسعة من الجهات التمويلية",
      },
      {
        titleEn: "Financial Consulting & Valuation",
        titleAr: "الإستشارات المالية و التقييم",
        bodyEn:
          "ASSET AND COMPANY VALUATION<BR>SPECIALIZED STRATEGIC FINANCIAL ADVICE",
        bodyAr:
          "تقييم الأصول و الشركات<br>المشورة المالية و الاستراتيجية",
      },
    ],
  },

  method: {
    tagEn: "FINANCIAL SERVICES CONSULTING METHODOLOGY",
    tagAr: "منهجية إستشارات الخدمات المالية",
    headingEn: "Adaptation & Strategic Understanding - Assessment & Due Diligence - Implementation & Closure",
    headingAr: "التكييف و الفهم الإستراتيجي - التقييم و العناية الواجبة - التنفيذ و الإغلاق",
    steps: [
      {
        num: "01",
        titleEn: "Client Understanding",
        titleAr: "فهم العميل",
        bodyEn:
          "Defining the client's goals & needs accoriding to fianncial, organizational, & economic criteria",
        bodyAr:
          "تحديد أهداف و إحتياجات العميل وفقاً لمعايير مالية و تنظيمية ولإقتصادية",
      },
      {
        num: "02",
        titleEn: "Project Analysis",
        titleAr: "تحليل المشروع",
        bodyEn:
          "Evaluating the financial, legal, and service governance aspects in accordance with client objectives and relevant regulations",
        bodyAr:
          "تقييم الجوانب المالية و القانونية و حوكمة الخدمة بما يتوافق مع أهداف العميل والأنظمة المعنية",
      },
      {
        num: "03",
        titleEn: "Project Structure",
        titleAr: "هيكلة المشروع",
        bodyEn:
          "Designing solutions and basic requirements according to the client's goals and need",
        bodyAr:
          "تصميم الحلول و المتطلبات الأساسية وفقاً لأهداف و أحتياجات العميل",
      },

      {
        num: "04",
        titleEn: "Document Preparation",
        titleAr: "إعداد المستندات",
        bodyEn:
          "Preparing the required documents and presentations and communicating with target audiences to market the project.",
        bodyAr:
          "إعداد المستندات و العروض المطلوبة و التواصل مع الأطراف المستهدفة لتسويق المشروع",
      },
      {
        num: "05",
        titleEn: "Implementation",
        titleAr: "التنفيذ",
        bodyEn:
          "Project implementation, coordination with relevant parties, and obtaining regulatroy approvals.",
        bodyAr:
          "تنفيذ المشروع و التنسيق مع الأطراف ذات الصلة، و الحصول على الموافقات النظامية",
      },
      {
        num: "06",
        titleEn: "Closure",
        titleAr: "الإغلاق",
        bodyEn:
          "By completing the scope of work and providing support after project closure",
        bodyAr:
          "بإكمال نطاق العمل و تقديم الدعم بعد إغلاق المشروع",
      },
    ],
  },

  execute: {
    tagEn: "ARRANGEMENT & ADVISORY",
    tagAr: "الترتيب والمشورة",
    headingEn: "",
    headingAr: "",
    bodyEn:
      "When a client proceeds with a transaction, we arrange it until closure.",
    bodyAr:
      "عندما يمضي العميل في معاملة نرتبها حتى الإغلاق",
    cards: [
      {
        titleEn: "",
        titleAr: "",
        bodyEn: "Identifying and engaging counterparties or investors",
        bodyAr: "تحديد الأطراف المقابلة أو المستثمرين وإشراكهم",
      },
      {
        bodyEn: "Coordinating legal, audit and due-diligence workstreams",
        bodyAr: "تنسيق مسارات العمل القانونية والتدقيق والعناية الواجبة",
        titleEn: "",
        titleAr: "",
      },
      {
        bodyEn: "Working alongside the client throughout",
        bodyAr: "العمل طوال الوقت إلى جانب العميل",
        titleEn: "",
        titleAr: "",
      },
    ],
  },

  products: {
    tagEn: "OUR SERVICES",
    tagAr: "خدماتنا",
    headingEn: "",
    headingAr: "",
    viewServiceEn: "View service →",
    viewServiceAr: "عرض الخدمة ←",
    items: [
      {
        titleEn: "Capital Market Advisory",
        titleAr: "استشارات أسواق المال",
        bodyEn:
          "IPO an dNomu readiness, rights issues, capital increases and private placements.",
        bodyAr:
          "جاهزية الطرح العام ونمو، وإصدارات حقوق الأولوية، وزيادة رأس المال، والطرح الخاص.",
        href: "/investment-banking/capital-markets-advisory",
      },
      {
        titleEn: "Mergers & Acquisitions",
        titleAr: "أسواق رأس المال",
        bodyEn:
          "Bu-yside, sell-side, mergers, divestments and shareholder exits.",
        bodyAr:
          "جانب الشراء وجانب البيع والاندماجات والتخارج وخروج المساهمين.",
        href: "/investment-banking/mergers-acquisitions",
      },
      {
        titleEn: "Debt & Financing Arrangement",
        titleAr: "الصكوك و أدوات الدين",
        bodyEn:
          "Financing strategy, Sukuk and private credit structuring, refinancing and restructuring.",
        bodyAr:
          "استراتيجية التمويل وهيكلة الصكوك والتمويل الخاص وإعادة التمويل وإعادة الهيكلة.",
        href: "/investment-banking/debt-financing-arrangement",
      },
      {
        titleEn: "Valuation & Financial Advisory",
        titleAr: "الاندماج و الاستحواذ",
        bodyEn:
          "Valuation, feasibility, modeling and due diligence support.",
        bodyAr:
          "التقييم والجدوى والنمذجة ودعم العناية الواجبة.",
        href: "/investment-banking/valuation-financial-advisory",
      },
      {
        titleEn: "Real Estate & Private Arrangements",
        titleAr: "الاستشارات المالية و التقييم",
        bodyEn:
          "Structuring and arranging real-estate and private-market opportunities.",
        bodyAr:
          "هيكلة وترتيب الفرص العقارية وأسواق الاستثمار الخاص.",
        href: "/investment-banking/real-estate-private-arrangements",
      },
    ],
  },

  lifecycle: {
    tagEn: "TRANSACTION LIFECYCLE",
    tagAr: "دورة حياة المعاملة",
    headingEn: "From First Discussion to Completion",
    headingAr: "من أول نقاش حتى الإتمام",
    steps: [
      {
        num: "01",
        titleEn: "Engage",
        titleAr: "الارتباط",
        bodyEn: "Initial discussion, objective definition and engagement scope.",
        bodyAr: "النقاش الأولي وتحديد الهدف ونطاق الارتباط.",
      },
      {
        num: "02",
        titleEn: "Assess",
        titleAr: "التقييم",
        bodyEn: "Financial analysis, valuation and readiness review.",
        bodyAr: "التحليل المالي والتقييم ومراجعة الجاهزية.",
      },
      {
        num: "03",
        titleEn: "Structure",
        titleAr: "الهيكلة",
        bodyEn:
          "Transaction design: instrument, terms, participants and regulatory pathway.",
        bodyAr:
          "تصميم المعاملة: الأداة والشروط والمشاركون والمسار التنظيمي.",
      },
      {
        num: "04",
        titleEn: "Prepare",
        titleAr: "الإعداد",
        bodyEn:
          "Transaction materials, due-diligence coordination and regulatory filings.",
        bodyAr:
          "مواد المعاملة وتنسيق العناية الواجبة والإيداعات التنظيمية.",
      },
      {
        num: "05",
        titleEn: "Execute",
        titleAr: "التنفيذ",
        bodyEn:
          "Counterparty or investor engagement, negotiation and subscription or signing.",
        bodyAr:
          "إشراك الطرف المقابل أو المستثمر والتفاوض والاكتتاب أو التوقيع.",
      },
      {
        num: "06",
        titleEn: "Complete",
        titleAr: "الإتمام",
        bodyEn: "Closing, settlement and post-completion support.",
        bodyAr: "الإغلاق والتسوية والدعم بعد الإتمام.",
      },
    ],
  },

  cta: {
    tagEn: "GET IN TOUCH",
    tagAr: "تواصل معنا",
    headingEn: "Start a conversation with our Investment Banking team",
    headingAr: "ابدأ حواراً مع فريق المصرفية الاستثمارية",
    bodyEn:
      "Tell us your objective and we will help you define the path.",
    bodyAr:
      "أخبرنا بهدفك وسنساعدك على تحديد المسار.",
    buttonEn: "START A CONVERSATION",
    buttonAr: "ابدأ الحوار",
  },
};
