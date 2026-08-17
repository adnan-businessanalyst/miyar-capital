/**
 * Asset Management page copy (EN + AR).
 * Imported by `views/AssetManagement.tsx` — not CMS-managed.
 *
 * Body strings support RichText: `<br>`, `<strong>`, `<em>`,
 * `<span class="rt-navy|rt-accent|rt-muted|rt-white">…</span>`.
 */

export type AssetManagementSectionId =
  | "intro"
  | "platform"
  | "objectives"
  | "client-solutions";

export interface AssetManagementMeta {
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
}

export interface AssetManagementPillar {
  num: string;
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
      "تنطلق من أهداف المستثمر، وتتوزع على أربع ركائز.",
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
        valueAr: "صناديق عامة · صناديق خاصة · إدارة المحافظ الإستثمارية الخاصة",
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
    headingAr: "منصةٌ واحدة متكاملة، لا مجموعةَ منتجات متفرقة.",
    bodyEn:
      "Each pillar carries its own page, documents and process. Allocation is coordinated centrally so that mandates draw on the full platform rather than a single fund.",
    bodyAr:
      "لكل ركيزة ملفها الخاص ووثائقها وإجراءاتها. ويُنسَّق توزيع الأصول مركزياً بحيث يستفيد أصحاب التفاويض من المنصة كاملةً لا من صندوقٍ واحد.",
    pillars: [
      {
        num: "I",
        titleEn: "Liquidity & Fixed Income",
        titleAr: "السيولة والدخل الثابت",
        bodyEn:
          "Murabaha and money-market solutions.",
        bodyAr:
          "حلول المرابحة وأسواق النقد.",
        href: "/asset-management/liquidity-fi",
      },
      {
        num: "II",
        titleEn: "Equity Management",
        titleAr: "إدارة أسهم الملكية الخاصة",
        bodyEn:
          "Saudi and regional equity strategies.",
        bodyAr:
          "استراتيجيات سعودية وإقليمية لأسهم الملكية الخاصة.",
        href: "/asset-management/equity-management",
      },
      {
        num: "III",
        titleEn: "Real Assets",
        titleAr: "الأصول العقارية",
        bodyEn:
          "Real estate income & development funds.",
        bodyAr:
          "صناديق مدرة للدخل وصناديق تنمية.",
        href: "/asset-management/real-assets",
      },
      {
        num: "IV",
        titleEn: "Private Markets",
        titleAr: "الأسواق الخاصة",
        bodyEn:
          "PE & private credit - qualified investors.",
        bodyAr:
          "الملكية الخاصة والتمويل الخاص - للمستثمرين المؤهلين.",
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
          "تصنيف العميل، والملاءمة، وقدرته الفعلية على تحمّل المخاطر واحتياجاته من السيولة.",
      },
      {
        titleEn: "Define the Mandate",
        titleAr: "تحديد التفويض",
        bodyEn:
          "Investment policy, constraints and benchmark agreed in writing.",
        bodyAr:
          "يُتفق كتابةً على سياسة الاستثمار والقيود الاستثمارية والمؤشر الاسترشادي.",
      },
      {
        titleEn: "Allocate",
        titleAr: "التخصيص",
        bodyEn: "Strategic and tactical allocation across the four pillars.",
        bodyAr: "التوزيع الاستراتيجي والتكتيكي على ركائزنا الأربع.",
      },
      {
        titleEn: "Select",
        titleAr: "الاختيار",
        bodyEn:
          "Security, manager and opportunity selection under conviction.",
        bodyAr:
          "اختيار الأوراق المالية ومديري الأصول والفرص وفق اقتناعٍ راسخ.",
      },
      {
        titleEn: "Monitor & Report",
        titleAr: "المراقبة والتقارير",
        bodyEn:
          "Independent risk oversight, rebalancing and transparent reporting.",
        bodyAr:
          "رقابةٌ مستقلة على المخاطر، وإعادة موازنة، وإفصاحٌ شفاف.",
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
        titleAr: "إدارة المحافظ الإستثمارية الخاصة",
        bodyEn:
          "Bespoke mandates built around a written investment policy, liquidity needs and horizon — the firm's primary engine for AUM growth.",
        bodyAr:
          "تفاويض مُفصَّلة تُبنى على سياسة استثمارٍ مكتوبة واحتياجات السيولة والمدى الزمني، وهي المحرك الرئيس لنمو الأصول المُدارة لدى الشركة.",
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
          "حلول متعددة الأصول، وتفاويض استشارية، وهياكل الأوقاف، لرؤوس الأموال المؤسسية والمؤهلة.",
        href: "/asset-management/institutional-family-office",
      },
    ],
  },
};
