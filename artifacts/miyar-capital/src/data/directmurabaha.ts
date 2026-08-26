/**
 * Direct Murabaha service page copy (EN + AR).
 * Imported by `views/DirectMurabaha.tsx` — not CMS-managed.
 * Route: /asset-management/liquidity-fixed-income/direct-murabaha
 *
 * Service template (not a fund). No units / subscription / redemption language.
 */

export type DirectMurabahaSectionId =
  | "hero"
  | "overview"
  | "how"
  | "audience"
  | "pricing"
  | "cta"
  | "disclaimer"
  | "disclosure";

export interface DirectMurabahaMeta {
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
}

export interface DirectMurabahaStep {
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface DirectMurabahaContent {
  sectionOrder: DirectMurabahaSectionId[];
  hero: {
    titleEn: string;
    titleAr: string;
    crumbAmEn: string;
    crumbAmAr: string;
    crumbParentEn: string;
    crumbParentAr: string;
    crumbPageEn: string;
    crumbPageAr: string;
    meta: DirectMurabahaMeta[];
  };
  overview: {
    titleEn: string;
    titleAr: string;
    bodyEn: string;
    bodyAr: string;
  };
  how: {
    titleEn: string;
    titleAr: string;
    steps: DirectMurabahaStep[];
  };
  audience: {
    titleEn: string;
    titleAr: string;
    bodyEn: string;
    bodyAr: string;
  };
  pricing: {
    titleEn: string;
    titleAr: string;
    bodyEn: string;
    bodyAr: string;
  };
  cta: {
    titleEn: string;
    titleAr: string;
    buttonEn: string;
    buttonAr: string;
  };
  disclaimer: {
    titleEn: string;
    titleAr: string;
    bodyEn: string;
    bodyAr: string;
  };
  disclosure: {
    titleEn: string;
    titleAr: string;
    bodyEn: string;
    bodyAr: string;
  };
}

export const DIRECT_MURABAHA_PATH =
  "/asset-management/liquidity-fixed-income/direct-murabaha";

export const DIRECT_MURABAHA: DirectMurabahaContent = {
  sectionOrder: [
    "hero",
    "overview",
    "how",
    "audience",
    "pricing",
    "cta",
    "disclaimer",
    "disclosure",
  ],

  hero: {
    titleEn: "Direct Murabaha",
    titleAr: "المرابحة المباشرة",
    crumbAmEn: "Asset Management",
    crumbAmAr: "إدارة الأصول",
    crumbParentEn: "Liquidity & Fixed Income",
    crumbParentAr: "حلول السيولة والدخل الثابت",
    crumbPageEn: "Direct Murabaha",
    crumbPageAr: "المرابحة المباشرة",
    meta: [
      {
        labelEn: "Pillar",
        labelAr: "الركيزة",
        valueEn: "Liquidity &amp; Fixed Income",
        valueAr: "حلول السيولة والدخل الثابت",
      },
      {
        labelEn: "Nature",
        labelAr: "الطبيعة",
        valueEn: "A client-directed route",
        valueAr: "مسار مباشر بتحكّم العميل",
      },
      {
        labelEn: "Investor Type",
        labelAr: "نوع المستثمر",
        valueEn: "Institutions &amp; Qualified",
        valueAr: "مؤسسات ومؤهلون",
      },
    ],
  },

  overview: {
    titleEn: "Overview",
    titleAr: "نظرة عامة",
    bodyEn:
      "Direct Murabaha is a liquidity route in which the client directs the investment decisions, with execution, documentation and reporting provided by Miyar Capital. It suits institutional and qualified clients who hold a clear liquidity policy and want direct control over counterparties, tenors and allocation, while benefiting from institutional execution efficiency.",
    bodyAr:
      "المرابحة المباشرة مسار لإدارة السيولة يتحكّم فيه العميل بقراراته الاستثمارية، مع تنفيذ وتوثيق وتقارير من معيار المالية. يناسب العملاء المؤسسيين والمؤهلين الذين لديهم سياسة سيولة واضحة ويرغبون في تحكّم مباشر بأطراف التعامل والمدد والتوزيع، مع الاستفادة من كفاءة التنفيذ المؤسسي.",
  },

  how: {
    titleEn: "How It Works",
    titleAr: "كيف تعمل",
    steps: [
      {
        titleEn: "The client decides",
        titleAr: "العميل يقرّر",
        bodyEn:
          "Sets the counterparty, maturity and liquidity allocation per their policy.",
        bodyAr:
          "يحدّد الطرف المقابل ومدة الاستحقاق وتوزيع السيولة وفق سياسته.",
      },
      {
        titleEn: "Miyar executes",
        titleAr: "معيار تنفّذ",
        bodyEn:
          "Provides indicative pricing and executes transactions with approved counterparties.",
        bodyAr:
          "توفّر التسعير الإرشادي وتنفّذ الصفقات مع الأطراف المعتمدة.",
      },
      {
        titleEn: "Full documentation",
        titleAr: "توثيق كامل",
        bodyEn:
          "Every transaction documented at account level under approved controls.",
        bodyAr:
          "توثيق كل صفقة على مستوى الحساب وفق ضوابط معتمدة.",
      },
      {
        titleEn: "Regular reporting",
        titleAr: "تقارير منتظمة",
        bodyEn:
          "Periodic position-level reporting with full transparency.",
        bodyAr:
          "تقارير دورية على مستوى المراكز مع شفافية كاملة.",
      },
    ],
  },

  audience: {
    titleEn: "Who It Is For",
    titleAr: "لمن تناسب",
    bodyEn:
      "For institutional and qualified clients — companies managing their liquidity and family offices — who manage liquidity to a defined policy and want direct control over investment decisions with institutional execution efficiency.",
    bodyAr:
      "للعملاء المؤسسيين والمؤهلين — الشركات لإدارة سيولتها والمكاتب العائلية — الذين يديرون سيولتهم وفق سياسة محدّدة ويريدون تحكّماً مباشراً في قرارات الاستثمار مع كفاءة تنفيذ مؤسسية.",
  },

  pricing: {
    titleEn: "Pricing &amp; Documentation",
    titleAr: "التسعير والتوثيق",
    bodyEn:
      "Service fees, scope and execution mechanics are set out in the service agreement. Eligibility is subject to client classification and a suitability assessment.",
    bodyAr:
      "تُحدَّد أتعاب الخدمة ونطاقها وآلية التنفيذ في اتفاقية الخدمة. وتخضع الأهلية لتصنيف العميل وتقييم الملاءمة.",
  },

  cta: {
    titleEn: "Register your interest / Get in touch",
    titleAr: "سجّل اهتمامك / تواصل معنا",
    buttonEn: "Register your interest / Get in touch",
    buttonAr: "سجّل اهتمامك / تواصل معنا",
  },

  disclaimer: {
    titleEn: "Risk Note",
    titleAr: "تنويه المخاطر",
    bodyEn:
      "The value of investments may fall as well as rise, and past performance is not a reliable indicator of future results. Eligibility is subject to client classification and a suitability assessment. The service is offered solely under its official, Compliance-approved agreements and documents.",
    bodyAr:
      "قد تنخفض قيمة الاستثمارات كما قد ترتفع، والأداء السابق ليس مؤشراً موثوقاً للنتائج المستقبلية. الأهلية مشروطة بتصنيف العميل وتقييم الملاءمة. وتُقدَّم الخدمة حصراً وفق اتفاقياتها ومستنداتها الرسمية المعتمدة.",
  },

  disclosure: {
    titleEn: "Disclosure",
    titleAr: "الإفصاح التنظيمي",
    bodyEn:
      "Miyar Capital is authorised and regulated by the CMA, licence No. 21216-32. Content is for information only and does not constitute an offer of securities or investment advice.",
    bodyAr:
      "معيار المالية شركة مرخّصة ومنظّمة من هيئة السوق المالية، ترخيص رقم 21216-32. المحتوى لأغراض المعلومات فقط ولا يُعدّ عرضاً لأوراق مالية أو مشورة استثمارية.",
  },
};
