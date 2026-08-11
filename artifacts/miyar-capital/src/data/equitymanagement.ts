/**
 * Equity Management page copy (EN + AR).
 * Imported by `views/EquityManagement.tsx` — not CMS-managed.
 * Route: /asset-management/equity-management
 *
 * Bodies may include `<br>` for paragraph breaks (rendered via RichText).
 */

export type EquityManagementSectionId =
  | "intro"
  | "offer"
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

export interface EquityManagementExampleItem {
  titleEn: string;
  titleAr: string;
  sectorEn: string;
  sectorAr: string;
  bodyEn: string;
  bodyAr: string;
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
    items: EquityManagementExampleItem[];
  };
}

export const EQUITY_MANAGEMENT: EquityManagementContent = {
  sectionOrder: ["intro", "offer", "what-we-offer", "examples"],

  hero: {
    titleEn: "Private Equity",
    titleAr: "أسهم الملكية الخاصة",
    crumbAmEn: "Asset Management",
    crumbAmAr: "إدارة الأصول",
    crumbPageEn: "Equity Management",
    crumbPageAr: "أسهم الملكية الخاصة",
  },

  intro: {
    eyebrowEn: "Building Sustainable Long-Term Value",
    eyebrowAr: "بناء قيمة مستدامة على المدى الطويل",
    headingEn: "Equity Management",
    headingAr: "أسهم الملكية الخاصة",
    bodyEn:
      "Private equity investments provide investors with access to distinctive growth opportunities while contributing to greater portfolio diversification over the long term.<br>At Miyar, we take a selective approach to private equity opportunities, focusing on companies and sectors with strong fundamentals and clear potential for growth and value creation. We aim to align each investment opportunity with our clients’ objectives and investment priorities, while maintaining compliance with Sharia principles.<br>Our philosophy is built around long-term partnerships, disciplined opportunity selection, and an investment perspective that extends beyond short-term financial returns. Through our understanding of the market and rigorous evaluation of opportunities, we seek to build private equity portfolios capable of delivering sustainable value for our clients and partners.",
    bodyAr:
      "تمثل استثمارات الملكية الخاصة أحد المسارات التي تتيح للمستثمرين الوصول إلى فرص نمو نوعية والمساهمة في تعزيز تنويع المحافظ الاستثمارية على المدى الطويل.<br>في معيار، نتبنى نهجًا انتقائيًا في دراسة فرص الملكية الخاصة، مع التركيز على الشركات والقطاعات التي تتمتع بأسس قوية وإمكانات واضحة للنمو وخلق القيمة. ونحرص على مواءمة كل فرصة استثمارية مع أهداف عملائنا وتوجهاتهم الاستثمارية، مع الالتزام بضوابط الشريعة الإسلامية.<br>وترتكز فلسفتنا على بناء شراكات طويلة الأمد، والانضباط في اختيار الفرص، والنظر إلى الاستثمار بما يتجاوز العائد المالي قصير الأجل. ومن خلال فهمنا للأسواق وتقييمنا المتعمق للفرص، نسعى إلى بناء محافظ ملكية خاصة قادرة على تحقيق قيمة مستدامة لعملائنا وشركائنا.",
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
      },
    ],
  },
};
