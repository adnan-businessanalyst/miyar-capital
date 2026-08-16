/**
 * Investment Banking page copy (EN + AR).
 * Imported by `views/InvestmentBanking.tsx` — not CMS-managed.
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
    headingEn: string;
    headingAr: string;
    parasEn: string[];
    parasAr: string[];
    /** Words wrapped in <strong> within overview paragraphs. */
    emphasizeEn: string[];
    emphasizeAr: string[];
  };
  advise: {
    tagEn: string;
    tagAr: string;
    headingEn: string;
    headingAr: string;
    parasEn: string[];
    parasAr: string[];
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
      "Advisory and arrangement services across capital markets, transactions and financing.",
    descriptionAr:
      "خدمات الاستشارات والترتيب عبر أسواق المال والمعاملات والتمويل.",
    meta: [
      {
        labelEn: "Service",
        labelAr: "الخدمة",
        valueEn: "Advising",
        valueAr: "الاستشارات",
      },
      {
        labelEn: "Capability",
        labelAr: "القدرة",
        valueEn: "Arranging",
        valueAr: "الترتيب",
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
    headingEn: "What We Do",
    headingAr: "ما نقدّمه",
    parasEn: [
      "Our Investment Banking division advises companies, founders and shareholders on the decisions that shape their capital structure and ownership — raising equity, accessing the debt markets, buying or selling businesses, and structuring investment opportunities.",
      "We operate under two regulated activities: advising, where we provide analysis and recommendations on securities and transactions, and arranging, where we manage and execute the process of bringing a transaction to completion. Every engagement is built around a defined objective, a structured process and clear deliverables.",
    ],
    parasAr: [
      "تقدّم إدارة المصرفية الاستثمارية لدينا الاستشارات للشركات والمؤسسين والمساهمين حول القرارات التي تشكّل هيكل رأس المال والملكية — جمع حقوق الملكية، والوصول إلى أسواق الدين، وشراء أو بيع الأعمال، وهيكلة الفرص الاستثمارية.",
      "نعمل ضمن نشاطين منظمين: الاستشارات، حيث نقدّم التحليل والتوصيات بشأن الأوراق المالية والمعاملات، والترتيب، حيث ندير وننفّذ عملية إتمام الصفقة. يُبنى كل ارتباط حول هدف محدد وعملية منظمة ومخرجات واضحة.",
    ],
    emphasizeEn: ["advising", "arranging"],
    emphasizeAr: ["الاستشارات", "الترتيب"],
  },

  advise: {
    tagEn: "INVESTMENT ADVISORY",
    tagAr: "الاستشارات الاستثمارية",
    headingEn: "How We Advise",
    headingAr: "كيف نقدّم الاستشارات",
    parasEn: [
      "We advise clients on transactions involving securities and corporate ownership: capital raises, listings, mergers and acquisitions, financings and valuations. Advisory work includes analysis of the company's position, evaluation of the available options, and a recommendation on structure, timing and terms — supported by documented financial analysis.",
      "Advisory mandates take two forms:",
    ],
    parasAr: [
      "نقدّم الاستشارات للعملاء في المعاملات المتعلقة بالأوراق المالية وملكية الشركات: جمع رأس المال، والإدراج، والاندماج والاستحواذ، والتمويل، والتقييم. يشمل العمل الاستشاري تحليل وضع الشركة وتقييم الخيارات المتاحة وتوصية بشأن الهيكل والتوقيت والشروط — مدعومة بتحليل مالي موثّق.",
      "تأخذ التفويضات الاستشارية شكلين:",
    ],
    cards: [
      {
        titleEn: "Standalone Advisory",
        titleAr: "استشارات مستقلة",
        bodyEn:
          "A defined deliverable in its own right — an independent valuation, a feasibility study, a listing-readiness assessment or a capital-structure review.",
        bodyAr:
          "مخرج محدد بذاته — تقييم مستقل، أو دراسة جدوى، أو تقييم جاهزية الإدراج، أو مراجعة لهيكل رأس المال.",
      },
      {
        titleEn: "Transaction Advisory",
        titleAr: "استشارات المعاملات",
        bodyEn:
          "The first phase of a transaction we go on to arrange — the analysis and recommendation that shape the structure before execution begins.",
        bodyAr:
          "المرحلة الأولى من معاملة نتولى ترتيبها لاحقاً — التحليل والتوصية اللذان يشّكلان الهيكل قبل بدء التنفيذ.",
      },
    ],
  },

  method: {
    tagEn: "INVESTMENT ADVISORY APPROACH",
    tagAr: "منهج الاستشارات الاستثمارية",
    headingEn: "A Consistent Method",
    headingAr: "منهج ثابت",
    steps: [
      {
        num: "01",
        titleEn: "Understand the Objective",
        titleAr: "فهم الهدف",
        bodyEn:
          "Every engagement begins with the client's goal — a sale, a raise, a listing, a financing — and the constraints around it: timeline, ownership preferences, regulatory position.",
        bodyAr:
          "يبدأ كل ارتباط بهدف العميل — بيع، أو جمع رأس مال، أو إدراج، أو تمويل — والقيود المحيطة به: الجدول الزمني، وتفضيلات الملكية، والوضع التنظيمي.",
      },
      {
        num: "02",
        titleEn: "Analyse the Position",
        titleAr: "تحليل الوضع",
        bodyEn:
          "We build the financial picture: valuation, capital structure, cash flows and readiness, using documented assumptions and recognised methodologies.",
        bodyAr:
          "نبني الصورة المالية: التقييم وهيكل رأس المال والتدفقات النقدية والجاهزية، باستخدام افتراضات موثّقة ومنهجيات معتمدة.",
      },
      {
        num: "03",
        titleEn: "Evaluate the Options",
        titleAr: "تقييم الخيارات",
        bodyEn:
          "We set out the realistic paths available, with the trade-offs of each — structure, pricing, timing, execution risk — so the decision is made on a complete picture.",
        bodyAr:
          "نعرض المسارات الواقعية المتاحة مع مقايضات كل منها — الهيكل والتسعير والتوقيت ومخاطر التنفيذ — لاتخاذ القرار على صورة مكتملة.",
      },
      {
        num: "04",
        titleEn: "Recommend and Plan",
        titleAr: "التوصية والتخطيط",
        bodyEn:
          "We deliver a clear recommendation and an execution roadmap: workstreams, advisors required, regulatory steps and timeline.",
        bodyAr:
          "نقدّم توصية واضحة وخارطة طريق للتنفيذ: مسارات العمل والمستشارون المطلوبون والخطوات التنظيمية والجدول الزمني.",
      },
    ],
  },

  execute: {
    tagEn: "ARRANGEMENT & MANAGEMENT",
    tagAr: "الترتيب والإدارة",
    headingEn: "Executing the Transaction",
    headingAr: "تنفيذ المعاملة",
    bodyEn:
      "When a client proceeds to a transaction, we arrange and manage it through to completion. This covers preparing transaction materials, identifying and engaging counterparties or investors, coordinating legal, audit and due-diligence workstreams, managing regulatory filings and negotiating terms — acting throughout on the client's side of the transaction.",
    bodyAr:
      "عندما يمضي العميل في معاملة، نرتّبها ونديرها حتى الإتمام. يشمل ذلك إعداد مواد المعاملة وتحديد الأطراف المقابلة أو المستثمرين وإشراكهم، وتنسيق مسارات العمل القانونية والتدقيق والعناية الواجبة، وإدارة الإيداعات التنظيمية والتفاوض على الشروط — مع العمل طوال الوقت إلى جانب العميل.",
  },

  products: {
    tagEn: "OUR PRODUCTS",
    tagAr: "منتجاتنا",
    headingEn: "Five Service Lines",
    headingAr: "خمس خطوط خدمات",
    viewServiceEn: "View service →",
    viewServiceAr: "عرض الخدمة ←",
    items: [
      {
        titleEn: "Capital Markets Advisory",
        titleAr: "استشارات أسواق المال",
        bodyEn:
          "IPO and Nomu readiness, rights issues, capital increases and private placements.",
        bodyAr:
          "جاهزية الطرح العام ونمو، وإصدارات حقوق الأولوية، وزيادة رأس المال، والطرح الخاص.",
        href: "/investment-banking/capital-markets-advisory",
      },
      {
        titleEn: "Mergers & Acquisitions",
        titleAr: "الاندماج والاستحواذ",
        bodyEn:
          "Buy-side, sell-side, mergers, divestments and shareholder exits.",
        bodyAr:
          "جانب الشراء وجانب البيع والاندماجات والتخارج وخروج المساهمين.",
        href: "/investment-banking/mergers-acquisitions",
      },
      {
        titleEn: "Debt & Financing Arrangement",
        titleAr: "ترتيب الدين والتمويل",
        bodyEn:
          "Financing strategy, Sukuk and private credit structuring, refinancing and restructuring.",
        bodyAr:
          "استراتيجية التمويل وهيكلة الصكوك والتمويل الخاص وإعادة التمويل وإعادة الهيكلة.",
        href: "/investment-banking/debt-financing-arrangement",
      },
      {
        titleEn: "Valuation & Financial Advisory",
        titleAr: "التقييم والاستشارات المالية",
        bodyEn:
          "Valuation, feasibility, modelling and due-diligence support.",
        bodyAr:
          "التقييم والجدوى والنمذجة ودعم العناية الواجبة.",
        href: "/investment-banking/valuation-financial-advisory",
      },
      {
        titleEn: "Real Estate & Private Arrangements",
        titleAr: "العقارات والترتيبات الخاصة",
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
      "Tell us your objective — a raise, a sale, a listing or a financing — and we will help you define the path.",
    bodyAr:
      "أخبرنا بهدفك — جمع رأس مال أو بيع أو إدراج أو تمويل — وسنساعدك على تحديد المسار.",
    buttonEn: "START A CONVERSATION",
    buttonAr: "ابدأ الحوار",
  },
};
