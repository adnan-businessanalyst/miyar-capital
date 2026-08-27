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
    introTitleEn: string;
    introTitleAr: string;
    introBodyEn: string;
    introBodyAr: string;
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
        valueAr: "صناديق عامة · صناديق خاصة · إدارة المحافظ الاستثمارية الخاصة",
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
    headingAr: "نهج متكامل عبر الركائز الأربع، لا مجموعةَ منتجات متفرقة.",
    bodyEn:
      "Each pillar carries its own page, documents and process. Allocation is coordinated centrally so that mandates draw on the full platform rather than a single fund.",
    bodyAr:
      "لكل ركيزة ملفها الخاص و وثائقها وإجراءاتها. ويُنسَّق توزيع الأصول مركزياً بحيث يستفيد أصحاب التفويضات من المنصة كاملةً لا من صندوقٍ واحد.",
    pillars: [
      {
        num: "I",
        titleEn: "I. Liquidity & Fixed Income",
        titleAr: "I. السيولة والدخل الثابت",
        bodyEn:
          "Murabaha and money-market solutions.",
        bodyAr:
          "حلول المرابحة وأسواق النقد.",
        href: "/asset-management/liquidity-fixed-income",
      },
      {
        num: "II",
        titleEn: "II. Equity Management",
        titleAr: "II. إدارة الأسهم",
        bodyEn:
          "Saudi and regional equity strategies.",
        bodyAr:
          "استراتيجيات سعودية وإقليمية إدارة الأسهم.",
        href: "/asset-management/equity-management",
      },
      {
        num: "III",
        titleEn: "III. Real Assets",
        titleAr: "III. الأصول العقارية",
        bodyEn:
          "Real estate income & development funds.",
        bodyAr:
          "صناديق مدرة للدخل وصناديق تنمية.",
        href: "/asset-management/real-assets",
      },
      {
        num: "IV",
        titleEn: "IV. Private Markets",
        titleAr: "IV. الأسواق الخاصة",
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
    introTitleEn: "Discretionary Portfolio Management",
    introTitleAr: "الإدارة التقديرية للمحافظ",
    introBodyEn:
      "Bespoke mandates for individuals, family offices and institutions — built around a written investment policy, liquidity needs and horizon.",
    introBodyAr:
      "تفويضات مُفصَّلة للأفراد والمكاتب العائلية والمؤسسات، تُبنى على سياسة استثمارٍ مكتوبة واحتياجات السيولة والمدى الزمني.",
    items: [
      {
        id: "dpm",
        num: "A",
        titleEn: "Discretionary Portfolio Management",
        titleAr: "إدارة المحافظ الاستثمارية الخاصة",
        bodyEn:
          "Bespoke mandates built around a written investment policy, liquidity needs and horizon — the firm's primary engine for AUM growth.",
        bodyAr:
          "تفويضات مُفصَّلة تُبنى على سياسة استثمارٍ مكتوبة واحتياجات السيولة والمدى الزمني، وهي المحرك الرئيس لنمو الأصول المُدارة لدى الشركة.",
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
          "حلول متعددة الأصول، تفويضات استشارية، وهياكل الأوقاف، لرؤوس الأموال المؤسسية والمؤهلة.",
        href: "/asset-management/institutional-family-office",
      },
    ],
  },
};
