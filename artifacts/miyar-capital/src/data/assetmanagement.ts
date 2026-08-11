/**
 * Asset Management page copy (EN + AR).
 * Imported by `views/AssetManagement.tsx` — not CMS-managed.
 */

export type AssetManagementSectionId =
  | "intro"
  | "platform"
  | "objectives"
  | "client-solutions";

export type AssetManagementPillarMediaId =
  | "liquidity"
  | "equity"
  | "real_assets"
  | "private_markets";

export interface AssetManagementMeta {
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
}

export interface AssetManagementPillar {
  num: string;
  media: AssetManagementPillarMediaId;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
  href: string;
}

export interface AssetManagementStep {
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface AssetManagementVertical {
  id: string;
  num: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
  href: string;
}

export interface AssetManagementContent {
  sectionOrder: AssetManagementSectionId[];
  hero: {
    titleEn: string;
    titleAr: string;
    crumbEn: string;
    crumbAr: string;
    descriptionEn: string;
    descriptionAr: string;
    meta: AssetManagementMeta[];
  };
  platform: {
    headingEn: string;
    headingAr: string;
    bodyEn: string;
    bodyAr: string;
    pillars: AssetManagementPillar[];
    prevAriaEn: string;
    prevAriaAr: string;
    nextAriaEn: string;
    nextAriaAr: string;
    showPillarAriaEn: string;
    showPillarAriaAr: string;
    goToPillarAriaEn: string;
    goToPillarAriaAr: string;
  };
  process: {
    tagEn: string;
    tagAr: string;
    headingEn: string;
    headingAr: string;
    steps: AssetManagementStep[];
  };
  clientSolutions: {
    tagEn: string;
    tagAr: string;
    headingEn: string;
    headingAr: string;
    items: AssetManagementVertical[];
  };
}

export const ASSET_MANAGEMENT: AssetManagementContent = {
  sectionOrder: ["intro", "platform", "objectives", "client-solutions"],

  hero: {
    titleEn: "Asset Management",
    titleAr: "إدارة الأصول",
    crumbEn: "Asset Management",
    crumbAr: "إدارة الأصول",
    descriptionEn:
      "Asset management organised around investor objectives — across four pillars.",
    descriptionAr:
      "إدارة أصول منظّمة حول أهداف المستثمر — عبر أربع ركائز.",
    meta: [
      {
        labelEn: "Clients",
        labelAr: "العملاء",
        valueEn: "Individuals · Family Offices · Institutions",
        valueAr: "أفراد · مكاتب عائلية · مؤسسات",
      },
      {
        labelEn: "Vehicles",
        labelAr: "الأدوات",
        valueEn: "Public Funds · Private Funds · DPM",
        valueAr: "صناديق عامة · صناديق خاصة · إدارة محافظ تقديرية",
      },
      {
        labelEn: "Regulation",
        labelAr: "التنظيم",
        valueEn: "CMA — Managing & Operating Funds",
        valueAr: "هيئة السوق المالية — إدارة وتشغيل الصناديق",
      },
    ],
  },

  platform: {
    headingEn: "One integrated platform, not a product shelf.",
    headingAr: "منصة متكاملة واحدة، وليست رف منتجات.",
    bodyEn:
      "Each pillar carries its own page, documents and process. Allocation is coordinated centrally so that mandates draw on the full platform rather than a single fund.",
    bodyAr:
      "لكل ركيزة صفحتها ومستنداتها وعملياتها. يُنسَّق التخصيص مركزياً حتى تستفيد التفويضات من المنصة كاملة وليس من صندوق واحد.",
    pillars: [
      {
        num: "I",
        media: "liquidity",
        titleEn: "Liquidity & Fixed Income",
        titleAr: "السيولة والدخل الثابت",
        bodyEn:
          "Murabaha and money-market solutions engineered for capital preservation and stable, risk-conscious returns.",
        bodyAr:
          "حلول المرابحة وأسواق النقد المصممة للحفاظ على رأس المال وتحقيق عوائد مستقرة واعية بالمخاطر.",
        href: "/asset-management/liquidity-fi",
      },
      {
        num: "II",
        media: "equity",
        titleEn: "Equity Management",
        titleAr: "إدارة الأسهم",
        bodyEn:
          "Saudi and regional equity strategies built on a disciplined process for long-term value creation.",
        bodyAr:
          "استراتيجيات أسهم سعودية وإقليمية مبنية على عملية منضبطة لخلق قيمة طويلة الأجل.",
        href: "/asset-management/equity-management",
      },
      {
        num: "III",
        media: "real_assets",
        titleEn: "Real Assets",
        titleAr: "الأصول الحقيقية",
        bodyEn:
          "Real estate income and development funds offering resilience and diversification for a portfolio.",
        bodyAr:
          "صناديق دخل وتطوير عقاري توفّر مرونة وتنويعاً للمحفظة.",
        href: "/asset-management/real-assets",
      },
      {
        num: "IV",
        media: "private_markets",
        titleEn: "Private Markets",
        titleAr: "الأسواق الخاصة",
        bodyEn:
          "Private equity and private credit strategies for qualified and institutional investors.",
        bodyAr:
          "استراتيجيات ملكية خاصة وتمويل خاص للمستثمرين المؤهلين والمؤسسيين.",
        href: "/asset-management/private-markets",
      },
    ],
    prevAriaEn: "Previous pillar",
    prevAriaAr: "الركيزة السابقة",
    nextAriaEn: "Next pillar",
    nextAriaAr: "الركيزة التالية",
    showPillarAriaEn: "Show {title}",
    showPillarAriaAr: "عرض {title}",
    goToPillarAriaEn: "Go to {title}",
    goToPillarAriaAr: "الانتقال إلى {title}",
  },

  process: {
    tagEn: "Investment Process",
    tagAr: "عملية الاستثمار",
    headingEn: "Objectives first. Allocation second. Risk throughout.",
    headingAr: "الأهداف أولاً. التخصيص ثانياً. والمخاطر في كل مرحلة.",
    steps: [
      {
        titleEn: "Understand Objectives",
        titleAr: "فهم الأهداف",
        bodyEn:
          "Classification, suitability and the client's true risk and liquidity needs.",
        bodyAr:
          "التصنيف والملاءمة واحتياجات العميل الحقيقية من المخاطر والسيولة.",
      },
      {
        titleEn: "Define the Mandate",
        titleAr: "تحديد التفويض",
        bodyEn:
          "Investment policy, constraints and benchmark agreed in writing.",
        bodyAr:
          "سياسة الاستثمار والقيود والمعيار المتفق عليها كتابةً.",
      },
      {
        titleEn: "Allocate",
        titleAr: "التخصيص",
        bodyEn: "Strategic and tactical allocation across the four pillars.",
        bodyAr: "تخصيص استراتيجي وتكتيكي عبر الركائز الأربع.",
      },
      {
        titleEn: "Select",
        titleAr: "الاختيار",
        bodyEn:
          "Security, manager and opportunity selection under conviction.",
        bodyAr:
          "اختيار الأوراق والمديرين والفرص وفق قناعة استثمارية.",
      },
      {
        titleEn: "Monitor & Report",
        titleAr: "المراقبة والتقارير",
        bodyEn:
          "Independent risk oversight, rebalancing and transparent reporting.",
        bodyAr:
          "رقابة مخاطر مستقلة وإعادة توازن وتقارير شفافة.",
      },
    ],
  },

  clientSolutions: {
    tagEn: "Client Solutions",
    tagAr: "حلول العملاء",
    headingEn: "Beyond funds.",
    headingAr: "ما بعد الصناديق.",
    items: [
      {
        id: "dpm",
        num: "A",
        titleEn: "Discretionary Portfolio Management",
        titleAr: "الإدارة التقديرية للمحافظ",
        bodyEn:
          "Bespoke mandates built around a written investment policy, liquidity needs and horizon — the firm's primary engine for AUM growth.",
        bodyAr:
          "تفويضات مخصّصة مبنية حول سياسة استثمار مكتوبة واحتياجات السيولة والأفق الزمني — المحرك الأساسي لنمو الأصول المدارة.",
        href: "/asset-management/dpm",
      },
      {
        id: "ifo",
        num: "B",
        titleEn: "Institutional & Family Office",
        titleAr: "المؤسسات والمكاتب العائلية",
        bodyEn:
          "Multi-asset solutions, advisory mandates and endowment / waqf structures for sophisticated pools of capital.",
        bodyAr:
          "حلول متعددة الأصول وتفويضات استشارية وهياكل أوقاف لمجموعات رأس مال متطورة.",
        href: "/asset-management/institutional-family-office",
      },
    ],
  },
};
