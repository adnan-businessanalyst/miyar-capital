/**
 * Institutional & Family Office page copy (EN + AR).
 * Imported by `views/InstitutionalFamilyOffice.tsx` — not CMS-managed.
 * Route: /asset-management/institutional-family-office
 *
 * Bodies may include `<br>` / `&amp;` (rendered via RichText).
 */

export type IfoSectionId =
  | "intro"
  | "overview"
  | "serve"
  | "approach"
  | "engagement"
  | "notes";

export type IfoIconId =
  | "landmark"
  | "briefcase"
  | "building"
  | "sprout"
  | "layers"
  | "message"
  | "key"
  | "clipboard";

export interface IfoMetaFact {
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
}

export interface IfoCard {
  icon: IfoIconId;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface IfoStep {
  num: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface IfoNote {
  numEn: string;
  numAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface IfoContent {
  sectionOrder: IfoSectionId[];
  hero: {
    titleEn: string;
    titleAr: string;
    crumbAmEn: string;
    crumbAmAr: string;
    crumbPageEn: string;
    crumbPageAr: string;
    descriptionEn: string;
    descriptionAr: string;
    meta: IfoMetaFact[];
  };
  overview: {
    tagEn: string;
    tagAr: string;
    headingEn: string;
    headingAr: string;
    body1En: string;
    body1Ar: string;
    body2En: string;
    body2Ar: string;
  };
  serve: {
    headingEn: string;
    headingAr: string;
    items: IfoCard[];
  };
  approach: {
    headingEn: string;
    headingAr: string;
    steps: IfoStep[];
  };
  engagement: {
    tagEn: string;
    tagAr: string;
    headingEn: string;
    headingAr: string;
    items: IfoCard[];
  };
  notes: {
    titleEn: string;
    titleAr: string;
    items: IfoNote[];
  };
  contact: {
    titleEn: string;
    titleAr: string;
    bodyEn: string;
    bodyAr: string;
    buttonEn: string;
    buttonAr: string;
  };
}

export const INSTITUTIONAL_FAMILY_OFFICE: IfoContent = {
  sectionOrder: ["intro", "overview", "serve", "approach", "engagement", "notes"],

  hero: {
    titleEn: "Institutional & Family Office",
    titleAr: "المؤسسات والمكاتب العائلية",
    crumbAmEn: "Asset Management",
    crumbAmAr: "إدارة الأصول",
    crumbPageEn: "Institutional & Family Office",
    crumbPageAr: "المؤسسات والمكاتب العائلية",
    descriptionEn:
      "Bespoke mandates built around your governance, objectives and time horizon.",
    descriptionAr:
      "تفويضات مصمّمة خصيصاً حول حوكمتك وأهدافك وأفقك الزمني.",
    meta: [
      {
        labelEn: "Client Type",
        labelAr: "نوع العميل",
        valueEn: "Institutions · Family Offices · Endowments",
        valueAr: "مؤسسات · مكاتب عائلية · أوقاف",
      },
      {
        labelEn: "Mandate",
        labelAr: "التفويض",
        valueEn: "Segregated / Advisory",
        valueAr: "منفصل / استشاري",
      },
    ],
  },

  overview: {
    tagEn: "OVERVIEW",
    tagAr: "نظرة عامة",
    headingEn: "Institutional discipline, delivered around your mandate",
    headingAr: "انضباط مؤسسي، يُقدَّم حول تفويضك",
    body1En:
      "Institutions and family offices face distinct demands: fiduciary accountability, multi-generational horizons, complex liquidity needs, and governance frameworks that leave no room for a one-size-fits-all product. We serve these clients through dedicated mandates — portfolios designed, managed and reported against each client's own investment policy, not a generic model.",
    body1Ar:
      "تواجه المؤسسات والمكاتب العائلية متطلبات ذات طبيعة خاصة: مسؤولية ائتمانية، وآفاق ممتدّة عبر الأجيال، واحتياجات سيولة معقّدة، وأُطر حوكمة لا تحتمل حلاً واحداً يناسب الجميع. ونحن نخدم هؤلاء العملاء عبر تفويضات مخصّصة — محافظ تُصمَّم وتُدار ويُرفَع عنها التقارير وفق سياسة الاستثمار الخاصة بكل عميل، لا وفق نموذج عام.",
    body2En:
      "Our institutional platform draws on the firm's four pillars — liquidity and fixed income, equities, real assets, and private markets — to construct portfolios that balance capital preservation, income and long-term growth within a Shariah-compliant framework.",
    body2Ar:
      "تعتمد منصّتنا المؤسسية على كامل ركائز الشركة الأربع — السيولة والدخل الثابت، والأسهم، والأصول العقارية، والأسواق الخاصة — بما يتيح بناء محافظ توازن بين الحفاظ على رأس المال والدخل والنمو طويل الأجل ضمن إطار متوافق مع الشريعة.",
  },

  serve: {
    headingEn: "Who We Serve",
    headingAr: "من نخدم",
    items: [
      {
        icon: "landmark",
        titleEn: "Government &amp; Quasi-Government Entities",
        titleAr: "الجهات الحكومية وشبه الحكومية",
        bodyEn:
          "Investment programmes for public institutions and their affiliates, built around statutory requirements, liquidity policies and conservative risk parameters.",
        bodyAr:
          "برامج استثمارية للمؤسسات العامة والجهات التابعة لها، مبنية على المتطلبات النظامية وسياسات السيولة ومعايير مخاطر متحفّظة.",
      },
      {
        icon: "briefcase",
        titleEn: "Corporates &amp; Treasuries",
        titleAr: "الشركات والخزائن",
        bodyEn:
          "Treasury and surplus-cash mandates that prioritise capital preservation and risk-conscious returns while keeping funds accessible for operational needs.",
        bodyAr:
          "تفويضات للخزينة والفوائض النقدية تُعطي الأولوية للحفاظ على رأس المال وللعوائد المدروسة، مع إبقاء الأموال متاحة للاحتياجات التشغيلية.",
      },
      {
        icon: "building",
        titleEn: "Family Offices &amp; Private Wealth",
        titleAr: "المكاتب العائلية والثروات الخاصة",
        bodyEn:
          "Multi-generational portfolios aligned with family governance, succession objectives and values — with the discretion and continuity families expect.",
        bodyAr:
          "محافظ ممتدّة عبر الأجيال تتوافق مع حوكمة الأسرة وأهداف التعاقب وقِيَمها، بما يوفّره العملاء من خصوصية واستمرارية.",
      },
      {
        icon: "sprout",
        titleEn: "Endowments, Awqaf &amp; Foundations",
        titleAr: "الأوقاف والمؤسسات الخيرية",
        bodyEn:
          "Perpetual-horizon portfolios structured to generate sustainable distributions while preserving the real value of the underlying corpus.",
        bodyAr:
          "محافظ ذات أفق دائم تُصمَّم لتوليد توزيعات مستدامة مع الحفاظ على القيمة الحقيقية لأصل الوقف.",
      },
    ],
  },

  approach: {
    headingEn: "Our Approach",
    headingAr: "منهجنا",
    steps: [
      {
        num: "01",
        titleEn: "Investment Policy Statement",
        titleAr: "بيان سياسة الاستثمار",
        bodyEn:
          "Every mandate begins with an Investment Policy Statement developed with the client.<br>It defines objectives, risk tolerance, eligible asset classes, liquidity requirements and benchmarks.",
        bodyAr:
          "يبدأ كل تفويض ببيان سياسة استثمار يُوضَع بالتعاون مع العميل.<br>يحدّد الأهداف ومستوى تحمّل المخاطر وفئات الأصول المؤهّلة ومتطلبات السيولة والمؤشرات المرجعية.",
      },
      {
        num: "02",
        titleEn: "Portfolio Construction",
        titleAr: "بناء المحفظة",
        bodyEn:
          "The investment committee then oversees portfolio construction and ongoing management with clear accountability at each step.",
        bodyAr:
          "ومن ثمّ تشرف لجنة الاستثمار على بناء المحفظة وإدارتها المستمرّة بمساءلة واضحة في كل خطوة.",
      },
      {
        num: "03",
        titleEn: "Transparency &amp; Reporting",
        titleAr: "الشفافية والتقارير",
        bodyEn:
          "Clients retain full transparency: segregated accounts, independent custody, and reporting tailored to their internal governance framework.",
        bodyAr:
          "ويحتفظ العملاء بشفافية كاملة: حسابات منفصلة، وحفظ مستقل، وتقارير مصمّمة وفق إطار حوكمتهم الداخلي.",
      },
    ],
  },

  engagement: {
    tagEn: "ENGAGEMENT",
    tagAr: "سُبل التعامل",
    headingEn: "How We Work Together",
    headingAr: "كيف نعمل معاً",
    items: [
      {
        icon: "layers",
        titleEn: "Segregated Mandates",
        titleAr: "التفويضات المنفصلة",
        bodyEn:
          "Fully discretionary portfolios held in the client's own name, managed against a bespoke investment policy with institutional-grade oversight.",
        bodyAr:
          "محافظ تديرية بالكامل باسم العميل، تُدار وفق سياسة استثمار مخصّصة وبإشراف بمستوى مؤسسي.",
      },
      {
        icon: "message",
        titleEn: "Advisory Services",
        titleAr: "الخدمات الاستشارية",
        bodyEn:
          "Non-discretionary support for clients who retain decision-making internally: asset-allocation advice, manager selection and portfolio reviews.",
        bodyAr:
          "دعم غير تديري للعملاء الذين يحتفظون بالقرار داخلياً: مشورة توزيع الأصول، واختيار المدراء، ومراجعات المحفظة.",
      },
      {
        icon: "key",
        titleEn: "Access to Firm Strategies",
        titleAr: "الوصول إلى استراتيجيات الشركة",
        bodyEn:
          "Preferential institutional access to the firm's fund range and private-market opportunities, including co-investment alongside the firm's own capital.",
        bodyAr:
          "وصول مؤسسي تفضيلي إلى نطاق صناديق الشركة وفرص الأسواق الخاصة، بما يشمل الاستثمار المشترك إلى جانب رأسمال الشركة.",
      },
      {
        icon: "clipboard",
        titleEn: "Governance &amp; Reporting",
        titleAr: "الحوكمة والتقارير",
        bodyEn:
          "Institutional clients receive dedicated relationship coverage, quarterly investment reviews and reporting packages built to their specification — performance attribution, holdings transparency and compliance confirmation against the agreed policy.",
        bodyAr:
          "يحصل العملاء المؤسسيون على تغطية علاقات مخصّصة، ومراجعات استثمارية ربع سنوية، وحزم تقارير مصمّمة وفق مواصفاتهم — تحليل الأداء، وشفافية المراكز، وتأكيد الالتزام مقابل السياسة المتفق عليها.",
      },
    ],
  },

  notes: {
    titleEn: "NOTES &amp; DISCLOSURES",
    titleAr: "ملاحظات وإفصاحات",
    items: [
      {
        numEn: "1.",
        numAr: "١.",
        bodyEn:
          "Services are available to qualified and institutional investors as defined under applicable CMA regulations.",
        bodyAr:
          "الخدمات متاحة للمستثمرين المؤهلين والمؤسسيين وفق ما تحدّده أنظمة هيئة السوق المالية المعمول بها.",
      },
      {
        numEn: "2.",
        numAr: "٢.",
        bodyEn:
          "Mandate terms, minimum portfolio sizes and fee structures are agreed individually and documented in the investment management agreement.",
        bodyAr:
          "تُتَّفق شروط التفويض والحدّ الأدنى لحجم المحفظة وهياكل الرسوم بشكل فردي وتُوثَّق في اتفاقية إدارة الاستثمار.",
      },
      {
        numEn: "3.",
        numAr: "٣.",
        bodyEn:
          "All portfolios are managed in accordance with Shariah guidelines as approved by the firm's Shariah advisor.",
        bodyAr:
          "تُدار جميع المحافظ وفق الضوابط الشرعية المعتمدة من المستشار الشرعي للشركة.",
      },
      {
        numEn: "4.",
        numAr: "٤.",
        bodyEn:
          "Past performance is not a reliable indicator of future results; the value of investments may fall as well as rise.",
        bodyAr:
          "الأداء السابق ليس مؤشراً موثوقاً للنتائج المستقبلية، وقد تنخفض قيمة الاستثمارات كما قد ترتفع.",
      },
    ],
  },

  contact: {
    titleEn: "CONTACT",
    titleAr: "تواصل معنا",
    bodyEn:
      "To learn more about Private Markets and request official fund documents, contact our team.",
    bodyAr:
      "لمعرفة المزيد عن الأسواق الخاصة وطلب مستندات الصندوق الرسمية، تواصل مع فريقنا.",
    buttonEn: "Contact Us",
    buttonAr: "تواصل معنا",
  },
};
