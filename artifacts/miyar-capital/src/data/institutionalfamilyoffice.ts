/**
 * Institutional & Family Office page copy (EN + AR).
 * Imported by `views/InstitutionalFamilyOffice.tsx` — not CMS-managed.
 * Route: /asset-management/institutional-family-office
 *
 * Bodies may include `<br>` / `&amp;` (rendered via RichText).
 */

export type IfoSectionId = "intro" | "overview" | "engagement" | "notes";

export type IfoIconId =
  | "landmark"
  | "briefcase"
  | "building"
  | "sprout"
  | "layers"
  | "message"
  | "key";

export interface IfoChip {
  leadEn: string;
  leadAr: string;
  textEn: string;
  textAr: string;
}

export interface IfoCard {
  icon: IfoIconId;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface IfoNote {
  num: string;
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
    badgeEn: string;
    badgeAr: string;
    descriptionEn: string;
    descriptionAr: string;
    chips: IfoChip[];
  };
  overview: {
    tagEn: string;
    tagAr: string;
    headingEn: string;
    headingAr: string;
    subEn: string;
    subAr: string;
    body1En: string;
    body1Ar: string;
    body2En: string;
    body2Ar: string;
    serveHeadingEn: string;
    serveHeadingAr: string;
    serveLeadEn: string;
    serveLeadAr: string;
    serveItems: IfoCard[];
    approachHeadingEn: string;
    approachHeadingAr: string;
    approachBodyEn: string;
    approachBodyAr: string;
  };
  engagement: {
    tagEn: string;
    tagAr: string;
    headingEn: string;
    headingAr: string;
    subEn: string;
    subAr: string;
    items: IfoCard[];
    govHeadingEn: string;
    govHeadingAr: string;
    govBodyEn: string;
    govBodyAr: string;
    ctaEn: string;
    ctaAr: string;
  };
  notes: {
    titleEn: string;
    titleAr: string;
    items: IfoNote[];
    closingEn: string;
    closingAr: string;
  };
}

export const INSTITUTIONAL_FAMILY_OFFICE: IfoContent = {
  sectionOrder: ["intro", "overview", "engagement", "notes"],

  hero: {
    titleEn: "Institutional & Family Office",
    titleAr: "المؤسسات والمكاتب العائلية",
    crumbAmEn: "Asset Management",
    crumbAmAr: "إدارة الأصول",
    crumbPageEn: "Institutional & Family Office",
    crumbPageAr: "المؤسسات والمكاتب العائلية",
    badgeEn: "CLIENT SOLUTIONS",
    badgeAr: "حلول العملاء",
    descriptionEn:
      "Bespoke mandates built around your governance, objectives, and time horizon.",
    descriptionAr:
      "تفويضات مخصّصة مبنية حول حوكمتك وأهدافك وأفقك الزمني.",
    chips: [
      {
        leadEn: "Client Type:",
        leadAr: "نوع العميل:",
        textEn: "Institutions · Family Offices · Endowments",
        textAr: "مؤسسات · مكاتب عائلية · أوقاف",
      },
      {
        leadEn: "Mandate:",
        leadAr: "التفويض:",
        textEn: "Segregated / Advisory",
        textAr: "منفصل / استشاري",
      },
    ],
  },

  overview: {
    tagEn: "CLIENT SOLUTIONS",
    tagAr: "حلول العملاء",
    headingEn: "Overview",
    headingAr: "نظرة عامة",
    subEn: "Institutional discipline, delivered around your mandate.",
    subAr: "انضباط مؤسسي، مقدَّم حول تفويضك.",
    body1En:
      "Institutions and family offices face a distinct set of demands: fiduciary accountability, multi-generational horizons, complex liquidity needs, and governance frameworks that leave no room for a one-size-fits-all product. Miyar Capital serves these clients through dedicated mandates — portfolios designed, managed, and reported against each client's own investment policy, not a generic model.",
    body1Ar:
      "تواجه المؤسسات والمكاتب العائلية مجموعة مطالب مميزة: المساءلة الائتمانية، والآفاق متعددة الأجيال، واحتياجات السيولة المعقّدة، وأطر الحوكمة التي لا تترك مجالاً لمنتج واحد يناسب الجميع. تخدم معيار كابيتال هؤلاء العملاء عبر تفويضات مخصّصة — محافظ تُصمَّم وتُدار وتُبلَّغ وفق سياسة استثمار كل عميل، لا وفق نموذج عام.",
    body2En:
      "Our institutional platform draws on the full breadth of the firm's four pillars — liquidity and fixed income, equities, real assets, and private markets — allowing us to construct portfolios that balance capital preservation, income, and long-term growth within a Shariah-compliant framework.",
    body2Ar:
      "تستند منصتنا المؤسسية إلى كامل اتساع ركائز الشركة الأربع — السيولة والدخل الثابت، والأسهم، والأصول العقارية، والأسواق الخاصة — بما يتيح بناء محافظ توازن بين حفظ رأس المال والدخل والنمو طويل الأجل ضمن إطار متوافق مع الشريعة.",
    serveHeadingEn: "Who We Serve",
    serveHeadingAr: "من نخدم",
    serveLeadEn:
      "Dedicated coverage across the institutional spectrum, each with its own governance realities and investment objectives.",
    serveLeadAr:
      "تغطية مخصّصة عبر الطيف المؤسسي، لكل منها واقع حوكمة وأهداف استثمار خاصة.",
    serveItems: [
      {
        icon: "landmark",
        titleEn: "Government &amp; Quasi-Government Entities",
        titleAr: "الجهات الحكومية وشبه الحكومية",
        bodyEn:
          "Investment programs for public institutions and their affiliates, built around statutory requirements, liquidity policies, and conservative risk parameters.",
        bodyAr:
          "برامج استثمار للمؤسسات العامة وتوابعها، مبنية حول المتطلبات النظامية وسياسات السيولة ومعايير المخاطر المحافظة.",
      },
      {
        icon: "briefcase",
        titleEn: "Corporates &amp; Treasuries",
        titleAr: "الشركات والخزائن",
        bodyEn:
          "Treasury and surplus-cash mandates that prioritize capital preservation and predictable returns while keeping funds accessible for operational needs.",
        bodyAr:
          "تفويضات خزينة وفائض نقدي تعطي الأولوية لحفظ رأس المال والعوائد المتوقعة مع إبقاء الأموال متاحة للاحتياجات التشغيلية.",
      },
      {
        icon: "building",
        titleEn: "Family Offices &amp; Private Wealth",
        titleAr: "المكاتب العائلية والثروة الخاصة",
        bodyEn:
          "Multi-generational portfolios aligned with family governance, succession objectives, and values — with the discretion and continuity families expect.",
        bodyAr:
          "محافظ متعددة الأجيال متوائمة مع حوكمة العائلة وأهداف التعاقب والقيم — مع التقدير والاستمرارية التي تتوقعها العائلات.",
      },
      {
        icon: "sprout",
        titleEn: "Endowments, Awqaf &amp; Foundations",
        titleAr: "الأوقاف والمؤسسات الخيرية",
        bodyEn:
          "Perpetual-horizon portfolios structured to generate sustainable distributions while preserving the real value of the underlying corpus.",
        bodyAr:
          "محافظ ذات أفق دائم مهيكلة لتوليد توزيعات مستدامة مع الحفاظ على القيمة الحقيقية للأصل الأساسي.",
      },
    ],
    approachHeadingEn: "Our Approach",
    approachHeadingAr: "نهجنا",
    approachBodyEn:
      "Every mandate begins with an Investment Policy Statement developed jointly with the client — defining objectives, risk tolerance, eligible asset classes, liquidity requirements, and benchmarks. From there, our investment committee oversees portfolio construction and ongoing management, with clear accountability at each step. Clients retain full transparency: segregated accounts, independent custody, and reporting tailored to their internal governance framework.",
    approachBodyAr:
      "يبدأ كل تفويض ببيان سياسة استثمار يُطوَّر بالاشتراك مع العميل — محدّداً الأهداف وتحمّل المخاطر وفئات الأصول المؤهلة ومتطلبات السيولة والمقارنات. ومن هناك يشرف لجنة الاستثمار لدينا على بناء المحفظة والإدارة المستمرة، مع مساءلة واضحة في كل خطوة. يحتفظ العملاء بشفافية كاملة: حسابات منفصلة، وحفظ مستقل، وتقارير مصمّمة وفق إطار حوكمتهم الداخلية.",
  },

  engagement: {
    tagEn: "ENGAGEMENT",
    tagAr: "التعاون",
    headingEn: "How We Work Together",
    headingAr: "كيف نعمل معاً",
    subEn:
      "Three ways to engage the firm, from full discretion to advisory support.",
    subAr:
      "ثلاث طرق للتعامل مع الشركة، من التقدير الكامل إلى الدعم الاستشاري.",
    items: [
      {
        icon: "layers",
        titleEn: "Segregated Mandates",
        titleAr: "تفويضات منفصلة",
        bodyEn:
          "Fully discretionary portfolios held in the client's own name, managed against a bespoke investment policy with institutional-grade oversight.",
        bodyAr:
          "محافظ تقديرية بالكامل باسم العميل، تُدار وفق سياسة استثمار مخصّصة برقابة بمستوى مؤسسي.",
      },
      {
        icon: "message",
        titleEn: "Advisory Services",
        titleAr: "خدمات استشارية",
        bodyEn:
          "Non-discretionary support for clients who retain decision-making internally: asset allocation advice, manager selection, and portfolio reviews.",
        bodyAr:
          "دعم غير تقديري للعملاء الذين يحتفظون باتخاذ القرار داخلياً: مشورة تخصيص الأصول واختيار المديرين ومراجعات المحافظ.",
      },
      {
        icon: "key",
        titleEn: "Access to Firm Strategies",
        titleAr: "الوصول إلى استراتيجيات الشركة",
        bodyEn:
          "Preferential institutional access to Miyar Capital's fund range and private-market opportunities, including co-investment alongside the firm's own capital.",
        bodyAr:
          "وصول مؤسسي تفضيلي إلى مجموعة صناديق معيار كابيتال وفرص الأسواق الخاصة، بما في ذلك الاستثمار المشترك إلى جانب رأس مال الشركة.",
      },
    ],
    govHeadingEn: "Governance &amp; Reporting",
    govHeadingAr: "الحوكمة والتقارير",
    govBodyEn:
      "Institutional clients receive dedicated relationship coverage, quarterly investment reviews, and reporting packages built to their specification — performance attribution, holdings transparency, and compliance confirmation against the agreed policy.",
    govBodyAr:
      "يحصل العملاء المؤسسيون على تغطية علاقة مخصّصة ومراجعات استثمار ربع سنوية وحزم تقارير وفق مواصفاتهم — إسناد الأداء وشفافية الحيازات وتأكيد الالتزام مقابل السياسة المتفق عليها.",
    ctaEn: "START A CONVERSATION",
    ctaAr: "ابدأ حواراً",
  },

  notes: {
    titleEn: "NOTES &amp; DISCLOSURES",
    titleAr: "ملاحظات وإفصاحات",
    items: [
      {
        num: "01.",
        bodyEn:
          "Services are available to qualified and institutional investors as defined under applicable Capital Market Authority regulations.",
        bodyAr:
          "الخدمات متاحة للمستثمرين المؤهلين والمؤسسيين وفق تعريف أنظمة هيئة السوق المالية المعمول بها.",
      },
      {
        num: "02.",
        bodyEn:
          "Mandate terms, minimum portfolio sizes, and fee structures are agreed individually and documented in the investment management agreement.",
        bodyAr:
          "تُتفق شروط التفويض والحد الأدنى لحجم المحفظة وهياكل الرسوم بشكل فردي وتُوثَّق في اتفاقية إدارة الاستثمار.",
      },
      {
        num: "03.",
        bodyEn:
          "All portfolios are managed in accordance with Shariah guidelines as approved by the firm's Shariah advisor.",
        bodyAr:
          "تُدار جميع المحافظ وفق الضوابط الشرعية كما اعتمدها مستشار الشريعة لدى الشركة.",
      },
      {
        num: "04.",
        bodyEn:
          "Past performance is not a reliable indicator of future results. The value of investments may fall as well as rise.",
        bodyAr:
          "الأداء السابق ليس مؤشراً موثوقاً للنتائج المستقبلية. قد تنخفض قيمة الاستثمارات كما قد ترتفع.",
      },
    ],
    closingEn:
      "Miyar Capital — Institutional &amp; Family Office. This page is for information purposes only and does not constitute an offer or solicitation.",
    closingAr:
      "معيار كابيتال — المؤسسات والمكاتب العائلية. هذه الصفحة لأغراض معلوماتية فقط ولا تُعد عرضاً أو دعوة.",
  },
};
