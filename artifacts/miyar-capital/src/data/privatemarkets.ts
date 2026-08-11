/**
 * Private Markets page copy (EN + AR).
 * Imported by `views/PrivateMarketsPage.tsx` — not CMS-managed.
 * Route: /asset-management/private-markets
 *
 * Bodies may include `<br>` for paragraph breaks (rendered via RichText).
 */

export type PrivateMarketsSectionId =
  | "intro"
  | "overview"
  | "capabilities"
  | "cta"
  | "disclaimer";

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
    buttonEn: string;
    buttonAr: string;
  };
  disclaimer: {
    bodyEn: string;
    bodyAr: string;
  };
}

export const PRIVATE_MARKETS: PrivateMarketsContent = {
  sectionOrder: ["intro", "overview", "capabilities", "cta", "disclaimer"],

  hero: {
    titleEn: "Private Markets",
    titleAr: "الأسواق الخاصة",
    crumbAmEn: "Asset Management",
    crumbAmAr: "إدارة الأصول",
    crumbPageEn: "Private Markets",
    crumbPageAr: "الأسواق الخاصة",
  },

  overview: {
    approachHeadingEn: "How We Manage Private Markets",
    approachHeadingAr: "كيف ندير الأسواق الخاصة",
    approachBodyEn:
      "Private Markets extends the platform into illiquid, longer-horizon opportunities — built with independent valuation and a defined conflicts-of-interest framework, and offered to qualified investors through official fund documents.",
    approachBodyAr:
      "تمتد الأسواق الخاصة بالمنصة إلى فرص غير سائلة وأطول أمداً — مبنية على تقييم مستقل وإطار محدد لتعارض المصالح، وتُقدَّم للمستثمرين المؤهلين عبر المستندات الرسمية للصناديق.",
    productHeadingEn: "Product Overview",
    productHeadingAr: "نظرة عامة على المنتج",
    facts: [
      {
        labelEn: "Asset Class",
        labelAr: "فئة الأصل",
        valueEn:
          "Private Markets (Private Equity, Private Credit, Co-Investment)",
        valueAr:
          "الأسواق الخاصة (الملكية الخاصة، التمويل الخاص، الاستثمار المشترك)",
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
          "غير سائلة — التزام رأسمالي طويل الأمد مع استرداد محدود أو معدوم",
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
        valueAr: "صناديق خاصة مغلقة وهياكل صفقة بصفقة",
      },
    ],
  },

  capabilities: {
    headingEn: "Core Capabilities",
    headingAr: "القدرات الأساسية",
    items: [
      {
        layout: "img-left",
        titleEn: "Private Equity",
        titleAr: "الملكية الخاصة",
        bodyEn:
          "A sponsor-aligned private equity strategy scheduled to launch in 2026. Positions are valued by an independent third party and managed under a defined conflicts-of-interest framework.",
        bodyAr:
          "استراتيجية ملكية خاصة متوائمة مع الراعي ومقرّر إطلاقها في 2026. تُقيَّم المراكز من طرف ثالث مستقل وتُدار ضمن إطار محدد لتعارض المصالح.",
        ariaEn:
          "Illustration representing private equity investment strategy",
        ariaAr: "رسم توضيحي يمثل استراتيجية استثمار الملكية الخاصة",
      },
      {
        layout: "img-right",
        titleEn: "Private Credit",
        titleAr: "التمويل الخاص",
        bodyEn:
          "Structured private-credit opportunities designed for qualified pools of capital. Financing is arranged across negotiated terms, with documentation and risk parameters set out in official fund documents.",
        bodyAr:
          "فرص تمويل خاص مهيكلة ومصممة لتجمعات رأس مال مؤهلة. يُرتَّب التمويل وفق شروط متفاوض عليها، مع توثيق ومعايير مخاطر مبيّنة في المستندات الرسمية للصناديق.",
        ariaEn:
          "Illustration representing structured private credit financing",
        ariaAr: "رسم توضيحي يمثل تمويل الائتمان الخاص المهيكل",
      },
      {
        layout: "img-left",
        titleEn: "Co-Investment",
        titleAr: "الاستثمار المشترك",
        bodyEn:
          "Selective co-investment opportunities offered alongside the firm on a deal-by-deal basis. Participation is evaluated per transaction, allowing qualified investors to allocate to specific deals rather than a blind pool.",
        bodyAr:
          "فرص استثمار مشترك انتقائية تُقدَّم إلى جانب الشركة على أساس صفقة بصفقة. تُقيَّم المشاركة لكل معاملة، بما يتيح للمستثمرين المؤهلين التخصيص لصفقات محددة بدلاً من محفظة عمياء.",
        ariaEn: "Illustration representing deal-by-deal co-investment",
        ariaAr: "رسم توضيحي يمثل الاستثمار المشترك صفقة بصفقة",
      },
    ],
  },

  cta: {
    headingEn: "Speak With Our Team",
    headingAr: "تحدث مع فريقنا",
    bodyEn:
      "To learn more about Private Markets and request official fund documents, contact our team.",
    bodyAr:
      "لمعرفة المزيد عن الأسواق الخاصة وطلب المستندات الرسمية للصناديق، تواصل مع فريقنا.",
    buttonEn: "Contact Us",
    buttonAr: "تواصل معنا",
  },

  disclaimer: {
    bodyEn:
      "This page is for informational purposes only and does not constitute an offer, solicitation, or recommendation to invest. Private Markets products are available to qualified investors only, as defined by applicable regulations, and are offered solely through official fund documents. Investments in private markets are illiquid, involve a high degree of risk, and may result in loss of capital. Past performance is not indicative of future results.",
    bodyAr:
      "هذه الصفحة لأغراض معلوماتية فقط ولا تُعد عرضاً أو دعوة أو توصية للاستثمار. منتجات الأسواق الخاصة متاحة للمستثمرين المؤهلين فقط وفق الأنظمة المعمول بها، وتُقدَّم حصراً عبر المستندات الرسمية للصناديق. استثمارات الأسواق الخاصة غير سائلة وتنطوي على درجة عالية من المخاطر وقد تؤدي إلى خسارة رأس المال. الأداء السابق لا يشير إلى النتائج المستقبلية.",
  },
};
