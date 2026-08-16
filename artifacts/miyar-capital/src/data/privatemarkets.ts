/**
 * Private Markets page copy (EN + AR).
 * Imported by `views/PrivateMarketsPage.tsx` — not CMS-managed.
 * Route: /asset-management/private-markets
 *
 * Bodies may include `<br>` / `&amp;` (rendered via RichText).
 * Editorial: do not publish a PE launch date until CMA approval is confirmed.
 */

export type PrivateMarketsSectionId =
  | "intro"
  | "overview"
  | "capabilities"
  | "cta"
  | "disclaimer"
  | "disclosure";

export type PrivateMarketsCapLayout = "img-left" | "img-right";

export interface PrivateMarketsFact {
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
}

export interface PrivateMarketsCapability {
  layout: PrivateMarketsCapLayout;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
  ariaEn: string;
  ariaAr: string;
}

export interface PrivateMarketsContent {
  sectionOrder: PrivateMarketsSectionId[];
  hero: {
    titleEn: string;
    titleAr: string;
    crumbAmEn: string;
    crumbAmAr: string;
    crumbPageEn: string;
    crumbPageAr: string;
  };
  overview: {
    introTagEn: string;
    introTagAr: string;
    approachHeadingEn: string;
    approachHeadingAr: string;
    approachBodyEn: string;
    approachBodyAr: string;
    productHeadingEn: string;
    productHeadingAr: string;
    facts: PrivateMarketsFact[];
  };
  capabilities: {
    headingEn: string;
    headingAr: string;
    items: PrivateMarketsCapability[];
  };
  cta: {
    headingEn: string;
    headingAr: string;
    bodyEn: string;
    bodyAr: string;
  };
  disclaimer: {
    leadEn: string;
    leadAr: string;
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

export const PRIVATE_MARKETS: PrivateMarketsContent = {
  sectionOrder: [
    "intro",
    "overview",
    "capabilities",
    "cta",
    "disclaimer",
    "disclosure",
  ],

  hero: {
    titleEn: "Private Markets",
    titleAr: "الأسواق الخاصة",
    crumbAmEn: "Asset Management",
    crumbAmAr: "إدارة الأصول",
    crumbPageEn: "Private Markets",
    crumbPageAr: "الأسواق الخاصة",
  },

  overview: {
    introTagEn: "INTRODUCTION",
    introTagAr: "المقدمة",
    approachHeadingEn: "How We Manage Private Markets",
    approachHeadingAr: "كيف ندير الأسواق الخاصة",
    approachBodyEn:
      "Private Markets extends our platform into illiquid, longer-horizon opportunities — built on independent valuation and a defined conflicts-of-interest framework, and offered to qualified investors through official fund documents.",
    approachBodyAr:
      "تمتدّ الأسواق الخاصة بمنصّتنا إلى فرص أقلّ سيولة وأطول أفقاً، مبنية على تقييم مستقل وإطار محدّد لإدارة تعارض المصالح، وتُقدَّم للمستثمرين المؤهلين من خلال مستندات الصندوق الرسمية.",
    productHeadingEn: "PRODUCT OVERVIEW",
    productHeadingAr: "نظرة عامة على المنتج",
    facts: [
      {
        labelEn: "Asset Class",
        labelAr: "فئة الأصول",
        valueEn:
          "Private Markets (Private Equity, Private Credit, Co-Investment)",
        valueAr: "أسواق خاصة (ملكية خاصة، ائتمان خاص، استثمار مشترك)",
      },
      {
        labelEn: "Risk Level",
        labelAr: "مستوى المخاطر",
        valueEn: "High",
        valueAr: "مرتفع",
      },
      {
        labelEn: "Liquidity",
        labelAr: "السيولة",
        valueEn:
          "Illiquid — long-term capital commitment with limited or no redemption",
        valueAr:
          "غير سائلة — التزام رأسمالي طويل الأجل باسترداد محدود أو معدوم",
      },
      {
        labelEn: "Investor Type",
        labelAr: "نوع المستثمر",
        valueEn: "Qualified investors only",
        valueAr: "المستثمرون المؤهلون فقط",
      },
      {
        labelEn: "Structure",
        labelAr: "الهيكل",
        valueEn: "Closed-ended private funds and deal-by-deal vehicles",
        valueAr: "صناديق خاصة مغلقة وأدوات على أساس صفقة بصفقة",
      },
    ],
  },

  capabilities: {
    headingEn: "CORE CAPABILITIES",
    headingAr: "القدرات الأساسية",
    items: [
      {
        layout: "img-left",
        titleEn: "Private Equity",
        titleAr: "الملكية الخاصة",
        bodyEn:
          "A sponsor-aligned private equity strategy, currently in development. Positions are valued by an independent third party and managed under a defined conflicts-of-interest framework.",
        bodyAr:
          "استراتيجية ملكية خاصة متوائمة مع الرعاة، قيد التطوير. تُقيَّم المراكز من طرف مستقل وتُدار وفق إطار محدّد لتعارض المصالح.",
        ariaEn:
          "Illustration representing private equity investment strategy",
        ariaAr: "رسم توضيحي يمثل استراتيجية استثمار الملكية الخاصة",
      },
      {
        layout: "img-right",
        titleEn: "Private Credit",
        titleAr: "الائتمان الخاص",
        bodyEn:
          "Structured private-credit opportunities designed for qualified pools of capital. Financing is arranged on negotiated terms, with documentation and risk parameters set out in official fund documents.",
        bodyAr:
          "فرص ائتمان خاص مهيكلة مصمّمة لمجموعات رأسمال مؤهّلة. يُرتَّب التمويل وفق شروط تفاوضية، مع تحديد الوثائق ومعايير المخاطر في مستندات الصندوق الرسمية.",
        ariaEn:
          "Illustration representing structured private credit financing",
        ariaAr: "رسم توضيحي يمثل تمويل الائتمان الخاص المهيكل",
      },
      {
        layout: "img-left",
        titleEn: "Co-Investment",
        titleAr: "الاستثمار المشترك",
        bodyEn:
          "Selective co-investment opportunities offered alongside the firm on a deal-by-deal basis. Participation is evaluated per transaction, letting qualified investors allocate to specific deals rather than a blind pool.",
        bodyAr:
          "فرص استثمار مشترك انتقائية تُقدَّم إلى جانب الشركة على أساس صفقة بصفقة. تُقيَّم المشاركة لكل صفقة على حدة، بما يتيح للمستثمرين المؤهلين التخصيص لصفقات محدّدة بدلاً من محفظة عمياء.",
        ariaEn: "Illustration representing deal-by-deal co-investment",
        ariaAr: "رسم توضيحي يمثل الاستثمار المشترك صفقة بصفقة",
      },
    ],
  },

  cta: {
    headingEn: "CONTACT",
    headingAr: "تواصل معنا",
    bodyEn:
      "To learn more about Private Markets and request official fund documents, contact our team.",
    bodyAr:
      "لمعرفة المزيد عن الأسواق الخاصة وطلب مستندات الصندوق الرسمية، تواصل مع فريقنا.",
  },

  disclaimer: {
    leadEn: "Risk note:",
    leadAr: "تنويه المخاطر:",
    bodyEn:
      "The value of investments may fall as well as rise, and past performance is not a reliable indicator of future results. Eligibility is subject to client classification and a suitability assessment. Products are offered solely through their official, Compliance-approved documents.",
    bodyAr:
      "قد تنخفض قيمة الاستثمارات كما قد ترتفع، والأداء السابق ليس مؤشراً موثوقاً للنتائج المستقبلية. الأهلية مشروطة بتصنيف العميل وتقييم مدى الملاءمة. وتُقدَّم المنتجات حصراً من خلال مستنداتها الرسمية المعتمدة من إدارة الالتزام.",
  },

  disclosure: {
    titleEn: "DISCLOSURE",
    titleAr: "الإفصاح التنظيمي",
    bodyEn:
      "<b>Regulatory:</b> Miyar Financial is authorised and regulated by the Capital Market Authority (CMA), licence No. 21216-32, for arranging, advising, managing investments and operating funds. Content is for information only and does not constitute an offer of securities or investment advice. Products are offered solely through their official, Compliance-approved documents.",
    bodyAr:
      "<b>تنظيمي:</b> معيار المالية شركة مرخّصة ومنظّمة من هيئة السوق المالية، ترخيص رقم 21216-32، لممارسة أنشطة الترتيب وتقديم المشورة وإدارة الاستثمارات وتشغيل الصناديق. المحتوى المنشور لأغراض المعلومات فقط ولا يُعدّ عرضاً لأوراق مالية أو مشورة استثمارية. وتُقدَّم المنتجات حصراً من خلال مستنداتها الرسمية المعتمدة.",
  },
};
