/**
 * Discretionary Portfolio Management page copy (EN + AR).
 * Imported by `views/DiscretionaryPortfolioManagement.tsx` — not CMS-managed.
 * Route: /asset-management/Discretionary-portfolio-management
 */

export const DPM_EST_PATH =
  "/asset-management/Discretionary-portfolio-management";

export type DpmEstSectionId =
  | "hero"
  | "overview"
  | "portfolios"
  | "serve"
  | "cycle"
  | "governance"
  | "risk";

export interface DpmEstMeta {
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
}

export interface DpmEstCard {
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface DpmEstContent {
  sectionOrder: DpmEstSectionId[];
  hero: {
    titleEn: string;
    titleAr: string;
    subtitleEn: string;
    subtitleAr: string;
    crumbHomeEn: string;
    crumbHomeAr: string;
    crumbAmEn: string;
    crumbAmAr: string;
    crumbPageEn: string;
    crumbPageAr: string;
    meta: DpmEstMeta[];
  };
  overview: {
    titleEn: string;
    titleAr: string;
    bodyEn: string;
    bodyAr: string;
  };
  portfolios: {
    titleEn: string;
    titleAr: string;
    items: DpmEstCard[];
  };
  serve: {
    titleEn: string;
    titleAr: string;
    items: DpmEstCard[];
  };
  cycle: {
    titleEn: string;
    titleAr: string;
    steps: DpmEstCard[];
  };
  governance: {
    titleEn: string;
    titleAr: string;
    bodyEn: string;
    bodyAr: string;
  };
  risk: {
    titleEn: string;
    titleAr: string;
    bodyEn: string;
    bodyAr: string;
  };
}

export const DPM_EST: DpmEstContent = {
  sectionOrder: [
    "hero",
    "overview",
    "portfolios",
    "serve",
    "cycle",
    "governance",
    "risk",
  ],

  hero: {
    titleEn: "Discretionary Portfolio Management",
    titleAr: "الإدارة التقديرية للمحافظ",
    subtitleEn:
      "Portfolios managed to a written investment policy for each client.",
    subtitleAr: "محافظ تُدار وفق سياسة استثمار مكتوبة لكل عميل.",
    crumbHomeEn: "Home",
    crumbHomeAr: "الرئيسية",
    crumbAmEn: "Asset Management",
    crumbAmAr: "إدارة الأصول",
    crumbPageEn: "Discretionary Portfolio Management",
    crumbPageAr: "الإدارة التقديرية للمحافظ",
    meta: [
      {
        labelEn: "Category",
        labelAr: "الفئة",
        valueEn: "Client Solutions",
        valueAr: "حلول العملاء",
      },
      {
        labelEn: "Management Type",
        labelAr: "نوع الإدارة",
        valueEn: "Discretionary / Advisory",
        valueAr: "تقديرية / استشارية",
      },
      {
        labelEn: "Investor Type",
        labelAr: "نوع المستثمر",
        valueEn: "Institutions, qualified and high-net-worth",
        valueAr: "مؤسسات ومؤهلون وأصحاب ملاءة",
      },
    ],
  },

  overview: {
    titleEn: "Overview",
    titleAr: "نظرة عامة",
    bodyEn:
      "Miyar Capital manages client portfolios to a written Investment Policy Statement agreed with each client, defining objectives, risk tolerance, eligible asset classes, liquidity requirements and benchmarks. Each portfolio is built and managed on that policy, not a standard model.",
    bodyAr:
      "تُدير معيار المالية محافظ العملاء وفق بيان سياسة استثمار مكتوب يُتّفق عليه مع كل عميل، يحدّد الأهداف ومستوى تحمّل المخاطر وفئات الأصول المؤهّلة ومتطلبات السيولة والمؤشرات المرجعية. وتُبنى كل محفظة وتُدار على أساس هذه السياسة، لا على نموذج موحّد.",
  },

  portfolios: {
    titleEn: "Portfolio Types",
    titleAr: "أنواع المحافظ",
    items: [
      {
        titleEn: "Liquidity portfolios",
        titleAr: "محافظ السيولة",
        bodyEn:
          "Money-market and Murabaha for short-term liquidity management.",
        bodyAr: "أدوات نقدية ومرابحة لإدارة السيولة قصيرة الأجل.",
      },
      {
        titleEn: "Income portfolios",
        titleAr: "محافظ الدخل",
        bodyEn: "Fixed-income and Sukuk oriented to periodic income.",
        bodyAr: "دخل ثابت وصكوك موجّهة للدخل الدوري.",
      },
      {
        titleEn: "Equity portfolios",
        titleAr: "محافظ الأسهم",
        bodyEn: "Active Saudi equity, including the unconstrained strategy.",
        bodyAr: "أسهم سعودية نشطة، تشمل الاستراتيجية غير المقيّدة.",
      },
      {
        titleEn: "Multi-asset portfolios",
        titleAr: "المحافظ متعددة الأصول",
        bodyEn: "Allocated across asset classes to the client's policy.",
        bodyAr: "موزّعة عبر فئات الأصول وفق سياسة العميل.",
      },
    ],
  },

  serve: {
    titleEn: "Who We Serve",
    titleAr: "لمن نخدم",
    items: [
      {
        titleEn: "Government &amp; quasi-government entities",
        titleAr: "الجهات الحكومية وشبه الحكومية",
        bodyEn:
          "Investment programmes built on statutory requirements, liquidity policies and defined risk parameters.",
        bodyAr:
          "برامج استثمارية مبنية على المتطلبات النظامية وسياسات السيولة ومعايير مخاطر محدّدة.",
      },
      {
        titleEn: "Corporates",
        titleAr: "الشركات",
        bodyEn:
          "Portfolios managing liquidity and surplus cash while keeping it available for operational needs.",
        bodyAr:
          "محافظ لإدارة السيولة والفوائض النقدية مع إتاحتها للاحتياجات التشغيلية.",
      },
      {
        titleEn: "Family offices &amp; private wealth",
        titleAr: "المكاتب العائلية والثروات الخاصة",
        bodyEn:
          "Portfolios aligned with family governance and succession objectives.",
        bodyAr: "محافظ متوائمة مع حوكمة الأسرة وأهداف التعاقب.",
      },
      {
        titleEn: "Endowments &amp; foundations",
        titleAr: "الأوقاف والمؤسسات الخيرية",
        bodyEn:
          "Perpetual-horizon portfolios oriented to generating distributions while preserving the real value of the corpus.",
        bodyAr:
          "محافظ ذات أفق دائم موجّهة لتوليد توزيعات مع الحفاظ على القيمة الحقيقية للأصل.",
      },
    ],
  },

  cycle: {
    titleEn: "The Cycle",
    titleAr: "دورة العمل",
    steps: [
      {
        titleEn: "Classify",
        titleAr: "التصنيف",
        bodyEn: "Client classification, KYC and suitability assessment.",
        bodyAr: "تصنيف العميل وإجراءات «اعرف عميلك» وتقييم الملاءمة.",
      },
      {
        titleEn: "Investment policy",
        titleAr: "سياسة الاستثمار",
        bodyEn:
          "A written Investment Policy Statement defining objectives, constraints and benchmark.",
        bodyAr:
          "وضع بيان سياسة استثمار مكتوب يحدّد الأهداف والقيود والمؤشر المرجعي.",
      },
      {
        titleEn: "Allocate",
        titleAr: "التخصيص",
        bodyEn: "Strategic and tactical allocation across asset classes.",
        bodyAr: "توزيع استراتيجي وتكتيكي عبر فئات الأصول.",
      },
      {
        titleEn: "Review",
        titleAr: "المراجعة",
        bodyEn: "Periodic portfolio review and rebalancing to policy.",
        bodyAr: "مراجعة دورية للمحفظة وإعادة التوازن وفق السياسة.",
      },
      {
        titleEn: "Report",
        titleAr: "التقارير",
        bodyEn:
          "Regular position-level reporting to the client's governance framework.",
        bodyAr: "تقارير منتظمة على مستوى المراكز وفق إطار حوكمة العميل.",
      },
    ],
  },

  governance: {
    titleEn: "Governance &amp; Reporting",
    titleAr: "الحوكمة والتقارير",
    bodyEn:
      "Portfolios are held in segregated accounts with independent custody, under the oversight of the investment committee. Clients receive periodic reporting covering performance, allocation and compliance against the agreed policy, with Shariah reporting where applicable.",
    bodyAr:
      "تُدار المحافظ في حسابات منفصلة مع حفظ مستقل، وتحت إشراف لجنة الاستثمار. ويحصل العملاء على تقارير دورية تشمل الأداء وتوزيع المحفظة وحالة الالتزام مقارنةً بالسياسة المتّفق عليها، مع التقارير الشرعية عند الاقتضاء.",
  },

  risk: {
    titleEn: "Risk Note",
    titleAr: "تنويه المخاطر",
    bodyEn:
      "The value of investments may fall as well as rise, and past performance is not a reliable indicator of future results. Eligibility is subject to client classification and a suitability assessment. The service is offered solely under its official, Compliance-approved agreements and documents.",
    bodyAr:
      "قد تنخفض قيمة الاستثمارات كما قد ترتفع، والأداء السابق ليس مؤشراً موثوقاً للنتائج المستقبلية. الأهلية مشروطة بتصنيف العميل وتقييم الملاءمة. وتُقدَّم الخدمة حصراً وفق اتفاقياتها ومستنداتها الرسمية المعتمدة.",
  },
};
