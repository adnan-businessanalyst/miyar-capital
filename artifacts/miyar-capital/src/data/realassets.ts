/**
 * Real Assets page copy (EN + AR).
 * Imported by `views/RealAssets.tsx` — not CMS-managed.
 * Route: /asset-management/real-assets
 *
 * Bodies may include `<br>` for paragraph breaks (rendered via RichText).
 */

export type RealAssetsSectionId =
  | "intro"
  | "offer"
  | "capabilities"
  | "diversification"
  | "projects";

export type RealAssetsListCardIconId = "layers" | "map";

export interface RealAssetsListItem {
  labelEn: string;
  labelAr: string;
}

export interface RealAssetsMeta {
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
}

export interface RealAssetsListCard {
  icon: RealAssetsListCardIconId;
  /** Visual header media key: architecture photo or geo network SVG. */
  media: "architecture" | "geo";
  titleEn: string;
  titleAr: string;
  items: RealAssetsListItem[];
}

export interface RealAssetsCapability {
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface RealAssetsProjectItem {
  titleEn: string;
  titleAr: string;
  /** Public funds-reports slug → /funds-reports/{slug}/reports */
  slug: string;
  assetTypeEn: string;
  assetTypeAr: string;
  bodyEn: string;
  bodyAr: string;
  fundCurrencyEn: string;
  fundCurrencyAr: string;
  fundSizeEn: string;
  fundSizeAr: string;
  fundStartDateEn: string;
  fundStartDateAr: string;
  fundManagerEn: string;
  fundManagerAr: string;
  fundLifeEn: string;
  fundLifeAr: string;
  fundStatusEn: string;
  fundStatusAr: string;
  investmentStrategyEn: string;
  investmentStrategyAr: string;
  developerEn: string;
  developerAr: string;
  auditorEn: string;
  auditorAr: string;
  investmentGoalEn: string;
  investmentGoalAr: string;
  fundGeographyEn: string;
  fundGeographyAr: string;
}

export interface RealAssetsContent {
  sectionOrder: RealAssetsSectionId[];
  hero: {
    titleEn: string;
    titleAr: string;
    subtitleEn: string;
    subtitleAr: string;
    crumbAmEn: string;
    crumbAmAr: string;
    crumbPageEn: string;
    crumbPageAr: string;
    meta: RealAssetsMeta[];
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
    rows: RealAssetsMeta[];
  };
  capabilities: {
    headingEn: string;
    headingAr: string;
    items: RealAssetsCapability[];
  };
  diversification: RealAssetsListCard;
  geography: RealAssetsListCard;
  projects: {
    headingEn: string;
    headingAr: string;
    subEn: string;
    subAr: string;
    introEn: string;
    introAr: string;
    labels: {
      fundCurrencyEn: string;
      fundCurrencyAr: string;
      assetTypeEn: string;
      assetTypeAr: string;
      fundLifeEn: string;
      fundLifeAr: string;
      fundStartDateEn: string;
      fundStartDateAr: string;
      fundSizeEn: string;
      fundSizeAr: string;
      investmentStrategyEn: string;
      investmentStrategyAr: string;
      fundManagerEn: string;
      fundManagerAr: string;
      developerEn: string;
      developerAr: string;
      auditorEn: string;
      auditorAr: string;
      investmentGoalEn: string;
      investmentGoalAr: string;
      fundStatusEn: string;
      fundStatusAr: string;
      fundGeographyEn: string;
      fundGeographyAr: string;
    };
    items: RealAssetsProjectItem[];
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

export const REAL_ASSETS: RealAssetsContent = {
  sectionOrder: ["intro", "offer", "capabilities", "diversification", "projects"],

  hero: {
    titleEn: "Real Estate Assets",
    titleAr: "أصول عقارية",
    subtitleEn: "Tangible assets. Durable returns. Inflation resilience.",
    subtitleAr: "أصول ملموسة.  قيمة مضافة.",
    crumbAmEn: "Asset Management",
    crumbAmAr: "إدارة الأصول",
    crumbPageEn: "Real Assets",
    crumbPageAr: "الأصول العقارية",
    meta: [
      {
        labelEn: "Focus",
        labelAr: "التركيز",
        valueEn: "Real Estate · Infrastructure",
        valueAr: "العقارات · البنية التحتية",
      },
      {
        labelEn: "Coverage",
        labelAr: "التغطية",
        valueEn: "MENA · Global Markets",
        valueAr: "الشرق الأوسط وشمال أفريقيا · الأسواق العالمية",
      },
      {
        labelEn: "Approach",
        labelAr: "النهج",
        valueEn: "Long-term · Value-driven",
        valueAr: "طويل الأمد · قائم على القيمة",
      },
    ],
  },

  intro: {
    eyebrowEn: "INTRODUCTION",
    eyebrowAr: "المقدمة",
    headingEn: "How We Manage Real Assets",
    headingAr: "كيف ندير الأصول العقارية",
    bodyEn:
      "Real assets give our clients access to tangible, income-generating investments that diversify portfolios and offer a hedge against inflation. We source, structure and manage real estate opportunities with a long-term, value-driven approach.",
    bodyAr:
      "توفّر الأصول العقارية لعملائنا فرص استثمار ملموسة ومدرّة للدخل، تُسهم في تنويع المحافظ وتشكّل تحوّطاً ضدّ التضخم. ونتولّى تحديد الفرص العقارية وهيكلتها وإدارتها وفق منهج طويل الأجل قائم على القيمة.",
  },

  productOverview: {
    headingEn: "PRODUCT OVERVIEW",
    headingAr: "نظرة عامة على المنتج",
    rows: [
      {
        labelEn: "Asset Class",
        labelAr: "فئة الأصول",
        valueEn: "Real Assets (Real Estate)",
        valueAr: "أصول عقارية (عقارات)",
      },
      {
        labelEn: "Risk Level",
        labelAr: "مستوى المخاطر",
        valueEn: "Moderate to High",
        valueAr: "متوسط إلى مرتفع",
      },
      {
        labelEn: "Liquidity",
        labelAr: "السيولة",
        valueEn: "Low — long-term holding periods",
        valueAr: "منخفضة — فترات تملّك طويلة الأجل",
      },
      {
        labelEn: "Investor Type",
        labelAr: "نوع المستثمر",
        valueEn: "Qualified / Institutional",
        valueAr: "مؤهل / مؤسسي",
      },
      {
        labelEn: "Structure",
        labelAr: "الهيكل",
        valueEn: "Private funds and direct investment vehicles",
        valueAr: "صناديق خاصة وأدوات استثمار مباشر",
      },
    ],
  },

  capabilities: {
    headingEn: "CORE CAPABILITIES",
    headingAr: "القدرات الأساسية",
    items: [
      {
        titleEn: "Income-generating Real Estate",
        titleAr: "العقارات المدرّة للدخل",
        bodyEn:
          "Investments in stabilised, income-producing properties across established sectors, selected to generate recurring cash flow supported by existing tenancy and operating history.",
        bodyAr:
          "استثمارات في عقارات مستقرة ومدرّة للدخل ضمن قطاعات راسخة، تُختار لتوليد تدفقات نقدية متكرّرة مدعومة بإشغال قائم وسجلّ تشغيلي.",
      },
      {
        titleEn: "Development Opportunities",
        titleAr: "فرص التطوير",
        bodyEn:
          "Selective participation in value-add and development-stage projects, assessed on location, project fundamentals and alignment with long-term demand trends.",
        bodyAr:
          "مشاركة انتقائية في مشاريع القيمة المضافة والمشاريع في مرحلة التطوير، تُقيَّم وفق الموقع وأساسيات المشروع وتوافقه مع اتجاهات الطلب طويلة الأجل.",
      },
    ],
  },

  diversification: {
    icon: "layers",
    media: "architecture",
    titleEn: "Asset Diversity",
    titleAr: "تنوع الأصول",
    items: [
      { labelEn: "Residential units", labelAr: "الوحدات السكنية" },
      { labelEn: "Offices", labelAr: "المكاتب" },
      { labelEn: "Retail", labelAr: "متاجر التجزئة" },
      { labelEn: "Hospitality", labelAr: "قطاع الضيافة" },
      { labelEn: "Industrial & Logistics???", labelAr: "القطاعات الصناعية و اللوجستية" },
      { labelEn: "Education", labelAr: "التعليم" },
      { labelEn: "Entertainment", labelAr: "قطاع الترفيه" },
      { labelEn: "Mixed-use real estate", labelAr: "العقارات متعددة الاستخدامات" },
    ],
  },

  geography: {
    icon: "map",
    media: "geo",
    titleEn: "Geographic Coverage",
    titleAr: "التغطية الجغرافية",
    items: [
      { labelEn: "Kingdom of Saudi Arabia", labelAr: "المملكة العربية السعودية" },
      { labelEn: "Arabian Gulf???", labelAr: "الخليج العربي" },
      { labelEn: "???Americas", labelAr: "الدول العربية" },
      { labelEn: "United States of America", labelAr: "الولايات المتحدة الأمريكية" },
      { labelEn: "Europe", labelAr: "أوروبا" },
      { labelEn: "Asia", labelAr: "اسيا" },
    ],
  },

  projects: {
    headingEn: "؟؟؟Our Real Assets Projects",
    headingAr: "الصناديق العقارية الاستثمارية",
    subEn: "Research — Analyse — Select — Establish",
    subAr: "نبحث – نحلل – ننتقي – نؤسس",
    introEn:
      "Selected real estate and infrastructure projects that reflect our focus on durable income, disciplined underwriting, and long-term asset quality.",
    introAr:
      "نؤسس صناديقنا العقارية الاستثمارية بعد ان نؤمن بالفكرة وجودة الاصل المستثمر به والقيمة المضافة للمنتج النهائي",
    labels: {
      fundCurrencyEn: "Fund Currency",
      fundCurrencyAr: "عملة الصندوق",
      assetTypeEn: "Asset Type",
      assetTypeAr: "نوع الأصل",
      fundLifeEn: "Fund Life",
      fundLifeAr: "مدة الصندوق",
      fundStartDateEn: "Effective Date",
      fundStartDateAr: "تاريخ بدء\nالصندوق",
      fundSizeEn: "Fund Size",
      fundSizeAr: "حجم\nالصندوق",
      investmentStrategyEn: "Investment Strategy",
      investmentStrategyAr: "استراتيجية\nالاستثمار",
      fundManagerEn: "Fund Manager",
      fundManagerAr: "مدير الصندوق",
      developerEn: "Developer",
      developerAr: "المطور",
      auditorEn: "Auditor",
      auditorAr: "المدقق",
      investmentGoalEn: "Investment Goal",
      investmentGoalAr: "هدف الاستثمار",
      fundStatusEn: "Fund Status",
      fundStatusAr: "حالة الصندوق",
      fundGeographyEn: "Fund Geography",
      fundGeographyAr: "الموقع",
    },
    items: [
      {
        titleEn: "Miyar Logistic Park Real Estate Fund",
        titleAr: "صندوق معيار لوجستيك بارك العقاري",
        slug: "miyar-logistic-park-real-estate-fund",
        assetTypeEn: "Real Estate",
        assetTypeAr: "العقارات",
        bodyEn:
          "???A closed-ended private real estate investment fund that is compliant with Shariah standards and controls and was established in accordance with the provisions of the Investment Funds Regulations issued by the Capital Market Authority in the Kingdom.",
        bodyAr:
          "صندوق إستثمار عقاري خاص مغلق متوافق مع المعايير و الضوابط الشرعية و تم تأسيسة وفقاً لأحكام لائحة صناديق الإستثمار الصادرة عن هيئة السوق المالية في المملكة.",
        fundCurrencyEn: "SAR",
        fundCurrencyAr: "ريال سعودي",
        fundSizeEn: "1.193 billion SAR",
        fundSizeAr: "1.193 مليار ريال سعودي",
        fundManagerEn: "Miyar Capital",
        fundManagerAr: "شركة معيار المالية",
        fundLifeEn: "4 years + 2 gregorian years extension",
        fundLifeAr: "4 سنوات + تمديد إضافي لمدة سنتين ميلادية",
        fundStartDateEn: "28/9/2025",
        fundStartDateAr: "28/9/2025",
        fundStatusEn: "Closed",
        fundStatusAr: "مغلق",
        investmentStrategyEn: "Actvie InvestmentStrategy",
        investmentStrategyAr: "استراتيجية نشطة",
        developerEn: "؟؟؟Najd Bonyan Company",
        developerAr: "شركة بنيان نجد العقارية",
        auditorEn: "PKF Al-Bassam & Co.",
        auditorAr: "البسام و شركاة المحاسبون المتحالفون",
        investmentGoalEn: "؟؟؟Income generation and capital preservation",
        investmentGoalAr: "يتمثل الهدف الرئيسي للصندوق في تنمية رأس المال من خلال الاستثمار في مشروع تطوير عقاري يشمل تطوير الأراضي و البنية التحتية و تجهيزها للاستخدامات الصناعية و اللوجستية، و من ثم بيعها بما يحقق عوائد رأسمالية لمالكي وحدات الصندوق.",
        fundGeographyEn: "Kingdom of Saudi Arabia",
        fundGeographyAr: "المملكة العربية السعودية",
      },
      {
        titleEn: "Miyar Logistic Park Real Estate Fund",
        titleAr: "صندوق معيار لوجستيك بارك العقاري",
        slug: "miyar-logistic-park-real-estate-fund-ii",
        assetTypeEn: "Real Estate",
        assetTypeAr: "العقارات",
        bodyEn:
          "???A closed-ended private real estate investment fund that is compliant with Shariah standards and controls and was established in accordance with the provisions of the Investment Funds Regulations issued by the Capital Market Authority in the Kingdom.",
        bodyAr:
          "صندوق إستثمار عقاري خاص مغلق متوافق مع المعايير و الضوابط الشرعية و تم تأسيسة وفقاً لأحكام لائحة صناديق الإستثمار الصادرة عن هيئة السوق المالية في المملكة.",
        fundCurrencyEn: "SAR",
        fundCurrencyAr: "ريال سعودي",
        fundSizeEn: "160 million SAR",
        fundSizeAr: "160 مليون ريال سعودي",
        fundManagerEn: "Miyar Capital",
        fundManagerAr: "شركة معيار المالية",
        fundLifeEn: "5 years + 2 gregorian years extension",
        fundLifeAr: "5 سنوات + تمديد إضافي لمدة سنتين ميلادية",
        fundStartDateEn: "6/4/2025",
        fundStartDateAr: "6/4/2025",
        fundStatusEn: "Closed",
        fundStatusAr: "مغلق",
        investmentStrategyEn: "Actvie InvestmentStrategy",
        investmentStrategyAr: "استراتيجية نشطة",
        developerEn: "???Kaden Investment Company",
        developerAr: "شركة كادن للاستثمار",
        auditorEn: "PKF Al-Bassam & Co.",
        auditorAr: "البسام و شركاة المحاسبون المتحالفون",
        investmentGoalEn: "؟؟؟Income generation and capital preservation",
        investmentGoalAr: "يتمثل الهدف الرئيسي للصندوق في تنمية رأس المال من خلال الاستثمار في مشروع تطوير عقاري يشمل تطوير الأراضي و البنية التحتية و تجهيزها للاستخدامات الصناعية و اللوجستية، و من ثم بيعها بما يحقق عوائد رأسمالية لمالكي وحدات الصندوق.",
        fundGeographyEn: "Kingdom of Saudi Arabia",
        fundGeographyAr: "المملكة العربية السعودية",
      },
      {
        titleEn: "Miyar's Ajam Real Estate Fund???",
        titleAr: "صندوق معيار اجام العقاري",
        slug: "miyar-ajam-real-estate-fund",
        assetTypeEn: "Real Estate",
        assetTypeAr: "العقارات ",
        bodyEn:
          "???",
        bodyAr:
          "صندوق استثمار عقاري خاص مغلق متوافق مع المعايير و الضوابط الشرعية و تم تأسيسه و فقاً لأحكام لائحة صناديق الإستثمار الصادرة عن هيئة السوق المالية في المملكة.",
        fundCurrencyEn: "SAR",
        fundCurrencyAr: "ريال سعودي",
        fundSizeEn: "124 million SAR",
        fundSizeAr: "124 مليون ريال سعودي",
        fundStartDateEn: "22/1/2022",
        fundStartDateAr: "22/1/2022",
        fundLifeEn: "3 years + 1 year extension",
        fundLifeAr: "3 سنوات + تمديد اضافي لمدة سنتين ميلادية",
        investmentStrategyEn: "Active Investment Strategy",
        investmentStrategyAr: "استراتيجية نشطة",
        fundManagerEn: "Miyar Capital",
        fundManagerAr: "شركة معيار المالية",
        developerEn: "؟؟؟To be announced",
        developerAr: "شركة اتحاد العمران للتطوير العقاري",
        auditorEn: "PKF Al-Bassam & Co.",
        auditorAr: "البسام و شركاة المحاسبون المتحالفون",
        investmentGoalEn: "???A closed-ended private real estate investment fund that is compliant with Shariah standards and controls and was established in accordance with the provisions of the Investment Funds Regulations issued by the Capital Market Authority in the Kingdom.",
        investmentGoalAr: "يتمثل الهدف الرئيسي للصندوق في تنمية رأس المال من خلال الاستثمار في مشروع تطوير عقاري يشمل تطوير الأراضي و البنية التحتية و تجهيزها للاستخدامات الصناعية و اللوجستية، و من ثم بيعها بما يحقق عوائد رأسمالية لمالكي وحدات الصندوق.",
        fundStatusEn: "Open",
        fundStatusAr: "مفتوح",
        fundGeographyEn: "Kingdom of Saudi Arabia",
        fundGeographyAr: "المملكة العربية السعودية",
      },
      {
        titleEn: "Minyar First Jeddah Real Estate Fund",
        titleAr: "صندوق معيار جدة الاول العقاري",
        slug: "miyar-first-jeddah-real-estate-fund",
        assetTypeEn: "Real Estate",
        assetTypeAr: "العقارات",
        bodyEn:
          "???A closed-ended private real estate investment fund that is compliant with Shariah standards and controls and was established in accordance with the provisions of the Investment Funds Regulations issued by the Capital Market Authority in the Kingdom.",
        bodyAr:
          "صندوق إستثمار عقاري خاص مغلق متوافق مع المعايير و الضوابط الشرعية و تم تأسيسة وفقاً لأحكام لائحة صناديق الإستثمار الصادرة عن هيئة السوق المالية في المملكة.",
        fundCurrencyEn: "SAR",
        fundCurrencyAr: "ريال سعودي",
        fundSizeEn: "511 million SAR",
        fundSizeAr: "511 مليون ريال سعودي",
        fundManagerEn: "Miyar Capital",
        fundManagerAr: "شركة معيار المالية",
        fundLifeEn: "4 years + 2 gregorian years extension",
        fundLifeAr: "4 سنوات + تمديد إضافي لمدة سنتين ميلادية",
        fundStartDateEn: "17/5/2017",
        fundStartDateAr: "17/5/2017",
        fundStatusEn: "Closed",
        fundStatusAr: "مغلق",
        investmentStrategyEn: "Actvie InvestmentStrategy",
        investmentStrategyAr: "استراتيجية نشطة",
        developerEn: "؟؟؟Saud Alrifi Trade Group",
        developerAr: "مجموعة سعود العريفي للتجارة",
        auditorEn: "PKF Al-Bassam & Co.",
        auditorAr: "البسام و شركاة المحاسبون المتحالفون",
        investmentGoalEn: "؟؟؟Income generation and capital preservation",
        investmentGoalAr: "يتمثل الهدف الرئيسي للصندوق في تنمية رأس المال من خلال الاستثمار في مشروع تطوير عقاري يشمل تطوير الأراضي و البنية التحتية و تجهيزها للاستخدامات الصناعية و اللوجستية، و من ثم بيعها بما يحقق عوائد رأسمالية لمالكي وحدات الصندوق.",
        fundGeographyEn: "Kingdom of Saudi Arabia",
        fundGeographyAr: "المملكة العربية السعودية",
      },
    ],
  },

  contact: {
    titleEn: "CONTACT",
    titleAr: "تواصل معنا",
    bodyEn:
      "To learn more about our real assets offering, contact our team.",
    bodyAr: "لمعرفة المزيد عن عروضنا في الأصول العقارية، تواصل مع فريقنا.",
    buttonEn: "Contact Us",
    buttonAr: "تواصل معنا",
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
