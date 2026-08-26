/**
 * Equity Management page copy (EN + AR).
 * Imported by `views/EquityManagement.tsx` — not CMS-managed.
 * Route: /asset-management/equity-management
 *
 * Bodies may include RichText markup: `<br>`, `<strong>`, `<em>`,
 * `<span class="rt-navy|rt-accent|rt-muted|rt-white">…</span>` (rendered via RichText).
 */

export type EquityManagementSectionId =
  | "intro"
  | "offer"
  | "capabilities"
  | "what-we-offer"
  | "examples";

export type EquityManagementOfferIconId = "local" | "regional";

export interface EquityManagementOfferItem {
  icon: EquityManagementOfferIconId;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface EquityManagementMeta {
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
}

export interface EquityManagementCapability {
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface EquityManagementExampleItem {
  titleEn: string;
  titleAr: string;
  sectorEn: string;
  sectorAr: string;
  bodyEn: string;
  bodyAr: string;
  /** سنة الاستحواذ */
  acquisitionYearEn: string;
  acquisitionYearAr: string;
  /** نسبة الاستحواذ */
  stakeEn: string;
  stakeAr: string;
  /** النطاق الجغرافي */
  geographyEn: string;
  geographyAr: string;
  /** المرحلة */
  stageEn: string;
  stageAr: string;
}

export interface EquityManagementContent {
  sectionOrder: EquityManagementSectionId[];
  hero: {
    titleEn: string;
    titleAr: string;
    crumbAmEn: string;
    crumbAmAr: string;
    crumbPageEn: string;
    crumbPageAr: string;
  };
  intro: {
    eyebrowEn: string;
    eyebrowAr: string;
    headingEn: string;
    headingAr: string;
    bodyEn: string;
    bodyAr: string;
  };
  productOverview: {
    headingEn: string;
    headingAr: string;
    rows: EquityManagementMeta[];
  };
  capabilities: {
    headingEn: string;
    headingAr: string;
    items: EquityManagementCapability[];
  };
  offers: {
    headingEn: string;
    headingAr: string;
    items: EquityManagementOfferItem[];
  };
  examples: {
    headingEn: string;
    headingAr: string;
    introEn: string;
    introAr: string;
    labels: {
      acquisitionYearEn: string;
      acquisitionYearAr: string;
      stakeEn: string;
      stakeAr: string;
      geographyEn: string;
      geographyAr: string;
      stageEn: string;
      stageAr: string;
    };
    items: EquityManagementExampleItem[];
  };
  contact: {
    titleEn: string;
    titleAr: string;
    bodyEn: string;
    bodyAr: string;
    buttonEn: string;
    buttonAr: string;
  };
  disclaimer: {
    leadEn: string;
    leadAr: string;
    bodyEn: string;
    bodyAr: string;
  };
}

export const EQUITY_MANAGEMENT: EquityManagementContent = {
  // Temporarily hidden: "what-we-offer" (ما نقدّمه), "examples" (أمثلة من استثماراتنا)
  sectionOrder: ["intro", "offer", "capabilities"],

  hero: {
    titleEn: "Private Equity",
    titleAr: "إدارة الأسهم",
    crumbAmEn: "Asset Management",
    crumbAmAr: "إدارة الأصول",
    crumbPageEn: "Equity Management",
    crumbPageAr: "إدارة الأسهم",
  },

  intro: {
    eyebrowEn: "",
    eyebrowAr: "",
    headingEn: "How We Manage Equities",
    headingAr: "كيف ندير الأسهم",
    bodyEn:
      "Our equity strategies combine in-depth research with disciplined portfolio construction, seeking long-term capital growth. The Saudi market is the core of our coverage, and we select opportunities aligned with each client's objectives, risk tolerance and investment horizon.",
    bodyAr:
      "تجمع استراتيجياتنا في إدارة الأسهم بين البحث المعمّق والانضباط في بناء المحفظة، سعياً إلى تنمية رأس المال على المدى الطويل. ويشكّل السوق السعودي محور تغطيتنا، حيث نختار الفرص التي تتوافق مع أهداف عملائنا ومستوى تحمّلهم للمخاطر وآفاقهم الاستثمارية.",
  },

  productOverview: {
    headingEn: "PRODUCT OVERVIEW",
    headingAr: "نظرة عامة على المنتج",
    rows: [
      {
        labelEn: "Asset Class",
        labelAr: "فئة الأصول",
        valueEn: "Listed Equities",
        valueAr: "أسهم مدرجة",
      },
      {
        labelEn: "Risk Level",
        labelAr: "مستوى المخاطر",
        valueEn:
          "High — subject to market volatility and potential capital loss",
        valueAr:
          "مرتفع — عرضة لتقلبات السوق واحتمال خسارة رأس المال",
      },
      {
        labelEn: "Liquidity",
        labelAr: "السيولة",
        valueEn: "High — securities traded on regulated exchanges",
        valueAr: "مرتفعة — أوراق مالية متداولة في أسواق منظّمة",
      },
      {
        labelEn: "Investor Type",
        labelAr: "نوع المستثمر",
        valueEn:
          "Investors seeking long-term capital growth with higher risk tolerance",
        valueAr:
          "الباحث عن نمو رأس المال طويل الأجل مع قدرة أعلى على تحمّل المخاطر",
      },
      {
        labelEn: "Structure",
        labelAr: "الهيكل",
        valueEn:
          "Discretionary portfolio / segregated account, or public equity fund units",
        valueAr:
          "محفظة تديرية / حساب منفصل، أو وحدات في صندوق أسهم عام",
      },
    ],
  },

  capabilities: {
    headingEn: "CORE CAPABILITIES",
    headingAr: "القدرات الأساسية",
    items: [
      {
        titleEn: "Saudi Equities",
        titleAr: "الأسهم السعودية",
        bodyEn:
          "Dedicated coverage of the Saudi equity market, grounded in fundamental company research and close monitoring of local market dynamics.",
        bodyAr:
          "تغطية مخصّصة للسوق السعودي مبنية على البحث الأساسي للشركات والمتابعة الدقيقة لديناميكيات السوق المحلي.",
      },
      {
        titleEn: "Active Portfolio Management",
        titleAr: "الإدارة النشطة للمحفظة",
        bodyEn:
          "Continuous research and monitoring with disciplined rebalancing to manage risk, adapt to market conditions and capture emerging opportunities.",
        bodyAr:
          "بحث ومتابعة مستمرّان وإعادة توازن منضبطة لإدارة المخاطر والتكيّف مع ظروف السوق واقتناص الفرص الناشئة.",
      },
    ],
  },

  offers: {
    headingEn: "What We Offer",
    headingAr: "ما نقدّمه",
    items: [
      {
        icon: "local",
        titleEn: "Local Markets",
        titleAr: "الأسواق المحلية",
        bodyEn:
          "Miyar seeks to broaden the range of investment opportunities available to its clients by accessing developed markets and building relationships with specialized investment partners with global expertise in private equity.<br>Miyar’s approach in this area is designed to provide flexible access to a diversified set of opportunities, including private equity, project investments, and venture capital across multiple sectors, with a focus on mature markets offering attractive long-term growth potential.",
        bodyAr:
          "تعمل معيار على توسيع نطاق الفرص الاستثمارية المتاحة لعملائها من خلال الوصول إلى الأسواق المتقدمة وبناء علاقات مع جهات استثمارية متخصصة تتمتع بخبرة عالمية في مجال الملكية الخاصة.<br>وتهدف استثمارات معيار في هذا المجال إلى توفير منصة مرنة للوصول إلى مجموعة متنوعة من الفرص، تشمل استثمارات الملكية الخاصة، والمشاريع، ورأس المال الجريء، عبر قطاعات متعددة، مع تركيز على الأسواق التي تتمتع ببيئات استثمارية ناضجة وفرص نمو واعدة.",
      },
      {
        icon: "regional",
        titleEn: "Regional Markets",
        titleAr: "الأسواق الإقليمية",
        bodyEn:
          "Miyar seeks to provide clients with access to distinctive investment opportunities across global markets, broadening portfolio diversification and enabling exposure beyond local markets.<br>Through its private equity investments, Miyar focuses on promising opportunities across companies, projects, and venture capital investments in a range of sectors, with particular attention to developed markets and opportunities that demonstrate clear growth potential and sustainable value creation.",
        bodyAr:
          "تسعى معيار إلى إتاحة فرص استثمارية نوعية في الأسواق العالمية، بما يوسّع نطاق التنويع ويمنح العملاء إمكانية الوصول إلى فرص استثمارية خارج الأسواق المحلية.<br>ومن خلال استثمارات الملكية الخاصة، تركز معيار على الفرص الواعدة في الشركات والمشاريع واستثمارات رأس المال الجريء عبر مجموعة متنوعة من القطاعات، مع اهتمام خاص بالأسواق المتقدمة والفرص التي تتمتع بمقومات نمو واضحة وإمكانات مستدامة لخلق القيمة.",
      },
    ],
  },

  examples: {
    headingEn: "Examples of Our Investments",
    headingAr: "أمثلة من استثماراتنا",
    introEn:
      "Illustrative examples of the types of private equity opportunities we evaluate and pursue for our clients.",
    introAr:
      "أمثلة توضيحية لأنواع فرص الملكية الخاصة التي ندرسها ونسعى إليها لصالح عملائنا.",
    labels: {
      acquisitionYearEn: "Acquisition year",
      acquisitionYearAr: "سنة الاستحواذ",
      stakeEn: "Stake",
      stakeAr: "نسبة الاستحواذ",
      geographyEn: "Geographic scope",
      geographyAr: "النطاق الجغرافي",
      stageEn: "Stage",
      stageAr: "المرحلة",
    },
    items: [
      {
        titleEn: "Growth Platform",
        titleAr: "منصة نمو",
        sectorEn: "Technology & Digital Services",
        sectorAr: "التقنية والخدمات الرقمية",
        bodyEn:
          "Selective participation in growth-stage companies with scalable models, strong unit economics, and clear paths to value creation.",
        bodyAr:
          "مشاركة انتقائية في شركات مرحلة النمو ذات نماذج قابلة للتوسع، واقتصاديات وحدة قوية، ومسارات واضحة لخلق القيمة.",
        acquisitionYearEn: "2024",
        acquisitionYearAr: "٢٠٢٤",
        stakeEn: "Minority",
        stakeAr: "حصة أقلية",
        geographyEn: "Saudi Arabia",
        geographyAr: "المملكة العربية السعودية",
        stageEn: "Growth",
        stageAr: "نمو",
      },
      {
        titleEn: "Sector Consolidation",
        titleAr: "توحيد قطاعي",
        sectorEn: "Healthcare & Consumer",
        sectorAr: "الرعاية الصحية والاستهلاك",
        bodyEn:
          "Investments that support operational improvement and consolidation in resilient sectors with long-term demand drivers.",
        bodyAr:
          "استثمارات تدعم التحسين التشغيلي والتوحيد في قطاعات مرنة ذات محركات طلب تخدم الأجل الطويل.",
        acquisitionYearEn: "2023",
        acquisitionYearAr: "٢٠٢٣",
        stakeEn: "Majority",
        stakeAr: "حصة أغلبية",
        geographyEn: "GCC",
        geographyAr: "دول مجلس التعاون",
        stageEn: "Buyout",
        stageAr: "استحواذ",
      },
      {
        titleEn: "Infrastructure-Linked Opportunity",
        titleAr: "فرصة مرتبطة بالبنية التحتية",
        sectorEn: "Industrial & Infrastructure",
        sectorAr: "الصناعة والبنية التحتية",
        bodyEn:
          "Opportunities aligned with structural economic transformation themes, where disciplined capital can support durable growth.",
        bodyAr:
          "فرص متوائمة مع موضوعات التحول الاقتصادي الهيكلي، حيث يمكن لرأس المال المنضبط أن يدعم نموًا مستدامًا.",
        acquisitionYearEn: "2025",
        acquisitionYearAr: "٢٠٢٥",
        stakeEn: "Co-investment",
        stakeAr: "استثمار مشترك",
        geographyEn: "Regional",
        geographyAr: "إقليمي",
        stageEn: "Expansion",
        stageAr: "توسع",
      },
    ],
  },

  contact: {
    titleEn: "CONTACT",
    titleAr: "تواصل معنا",
    bodyEn:
      "Invest with discipline and insight — speak with our team to explore how our equity strategies can support your long-term objectives.",
    bodyAr:
      "استثمر بانضباط ورؤية — تحدّث مع فريقنا لاستكشاف كيف يمكن لاستراتيجياتنا في الأسهم أن تدعم أهدافك طويلة الأجل.",
    buttonEn: "Register Interest",
    buttonAr: "سجّل اهتمامك",
  },

  disclaimer: {
    leadEn: "Risk note:",
    leadAr: "تنويه المخاطر:",
    bodyEn:
      "The value of investments may fall as well as rise, and past performance is not a reliable indicator of future results. Eligibility is subject to client classification and a suitability assessment. Products are offered solely through their official, Compliance-approved documents.",
    bodyAr:
      "قد تنخفض قيمة الاستثمارات كما قد ترتفع، والأداء السابق ليس مؤشراً موثوقاً للنتائج المستقبلية. الأهلية مشروطة بتصنيف العميل وتقييم مدى الملاءمة. وتُقدَّم المنتجات حصراً من خلال مستنداتها الرسمية المعتمدة من إدارة الالتزام.",
  },
};
