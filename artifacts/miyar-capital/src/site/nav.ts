import type { NavDoc } from "./types";

/**
 * Hardcoded site navigation. Edit labels (EN/AR), hrefs, and nested children here.
 * Not managed by Site Manager or the API.
 */
export const SITE_NAV: NavDoc = {
  items: [
    {
      id: "front",
      labelEn: "Home",
      labelAr: "الرئيسية",
      href: "/",
    },
    {
      id: "about",
      labelEn: "About",
      labelAr: "عن معيار",
      href: "",
      children: [
        {
          id: "about-who",
          labelEn: "Who We Are",
          labelAr: "من نحن",
          href: "/who-we-are",
        },
        {
          id: "about-board",
          labelEn: "Board of Directors",
          labelAr: "مجلس الإدارة",
          href: "/board-of-directors",
        },
        {
          id: "about-executive-team",
          labelEn: "Executive Team",
          labelAr: "الفريق التنفيذي",
          href: "/executive-team",
        },
        {
          id: "about-gov",
          labelEn: "Governance & Independence",
          labelAr: "الحوكمة والاستقلالية",
          href: "/governance-independence",
        },
        {
          id: "about-shariah",
          labelEn: "Shariah Principles",
          labelAr: "المبادئ الشرعية",
          href: "/shariah-principles",
        },
      ],
    },
    {
      id: "am",
      labelEn: "Asset Management",
      labelAr: "إدارة الأصول",
      href: "/asset-management",
      children: [
        {
          id: "am-overview",
          labelEn: "Overview",
          labelAr: "نظرة عامة",
          href: "/asset-management",
        },
        {
          id: "am-grp1",
          labelEn: "THE FOUR PILLARS",
          labelAr: "الركائز الأربع",
          group: true,
        },
        {
          id: "am-liq",
          labelEn: "Liquidity & FI Solutions",
          labelAr: "حلول السيولة والدخل الثابت",
          href: "/asset-management/liquidity-fi",
        },
        {
          id: "am-eq",
          labelEn: "Equity Management",
          labelAr: "إدارة الأسهم",
          href: "/equity-management",
        },
        {
          id: "am-real",
          labelEn: "Real Assets",
          labelAr: "الأصول الحقيقية",
          href: "/real-assets",
        },
        {
          id: "am-pm",
          labelEn: "Private Markets",
          labelAr: "الأسواق الخاصة",
          href: "/private-markets",
        },
        {
          id: "am-grp2",
          labelEn: "CLIENT SOLUTIONS",
          labelAr: "حلول العملاء",
          group: true,
        },
        {
          id: "am-dpm",
          labelEn: "Discretionary Portfolio Management",
          labelAr: "الإدارة التقديرية للمحافظ",
          href: "/dpm",
        },
        {
          id: "am-inst",
          labelEn: "Institutional & Family Office",
          labelAr: "المؤسسات والمكاتب العائلية",
          href: "/asset-management/institutional-family-office",
        },
        {
          id: "am-grp3",
          labelEn: "ORIGINAL",
          labelAr: "حلول الاستثمار",
          group: true,
        },
        {
          id: "am-im",
          labelEn: "Investment Management",
          labelAr: "إدارة الاستثمار",
          href: "/investment-management",
        },
        {
          id: "am-seq",
          labelEn: "Saudi Equity Fund",
          labelAr: "صندوق الأسهم السعودية",
          href: "/saudi-equity-fund",
        },
        {
          id: "am-mur",
          labelEn: "Murabaha Fund",
          labelAr: "صندوق المرابحة",
          href: "/murabaha-fund",
        },
      ],
    },
    {
      id: "ib",
      labelEn: "Investment Banking",
      labelAr: "المصرفية الاستثمارية",
      href: "/investment-banking",
      children: [
        {
          id: "ib-overview",
          labelEn: "Overview",
          labelAr: "نظرة عامة",
          href: "/investment-banking",
        },
        {
          id: "ib-grp-overview",
          labelEn: "",
          labelAr: "",
          group: true,
        },
        {
          id: "ib-cma",
          labelEn: "Capital Markets Advisory",
          labelAr: "استشارات أسواق المال",
          href: "/investment-banking/capital-markets-advisory",
        },
        {
          id: "ib-ma",
          labelEn: "Mergers & Acquisitions",
          labelAr: "الاندماج والاستحواذ",
          href: "/investment-banking/mergers-acquisitions",
        },
        {
          id: "ib-debt",
          labelEn: "Debt & Financing Arrangement",
          labelAr: "ترتيب الديون والتمويل",
          href: "/investment-banking/debt-financing-arrangement",
        },
        {
          id: "ib-val",
          labelEn: "Valuation & Financial Advisory",
          labelAr: "التقييم والاستشارات المالية",
          href: "/investment-banking/valuation-financial-advisory",
        },
        {
          id: "ib-repa",
          labelEn: "Real Estate & Private Arrangements",
          labelAr: "العقارات والترتيبات الخاصة",
          href: "/investment-banking/real-estate-private-arrangements",
        },
        {
        id: "am-grp1",
        labelEn: "ORIGINAL PAGES",
        labelAr: "",
        group: true,
      },
        {
          id: "ib-repa",
          labelEn: "Arrangement Management",
          labelAr: "",
          href: "/arrangement-management",
        },
        {
          id: "ib-repa",
          labelEn: "Investment Advisory",
          labelAr: "",
          href: "/investment-advisory",
        },

      ],
    },
    {
      id: "ir",
      labelEn: "Investor Relations",
      labelAr: "علاقات المستثمرين",
      href: "",
      children: [
        {
          id: "ir-fin",
          labelEn: "Financial Reports",
          labelAr: "التقارير المالية",
          href: "/financial-reports",
        },
        {
          id: "ir-ann",
          labelEn: "Annual Reports",
          labelAr: "التقارير السنوية",
          href: "/annual-reports",
        },
        { id: "ir-rak", labelEn: "Rakiza", labelAr: "ركيزة", href: "/rakiza" },
        {
          id: "ir-disc",
          labelEn: "Disclosures",
          labelAr: "الإفصاحات",
          href: "/disclosures",
        },
        {
          id: "ir-fatca",
          labelEn: "FATCA",
          labelAr: "فاتكا",
          href: "/fatca",
        },
        {
          id: "ir-priv",
          labelEn: "Privacy & Policy",
          labelAr: "الخصوصية والسياسة",
          href: "/privacy-policy",
        },
      ],
    },
    {
      id: "insights",
      labelEn: "Insights",
      labelAr: "رؤى",
      href: "/insights",
      // children: [
      //   { id: "ins-cio",  labelEn: "CIO Views",          labelAr: "رؤى مدير الاستثمار",  href: "/insights#cio" },
      //   { id: "ins-fund", labelEn: "Fund Commentary",     labelAr: "تعليقات الصناديق",    href: "/insights#fund" },
      //   { id: "ins-mkt",  labelEn: "Market Commentary",   labelAr: "تعليقات السوق",       href: "/insights#market" },
      //   { id: "ins-res",  labelEn: "Research Notes",      labelAr: "مذكرات بحثية",        href: "/insights#research" },
      // ],
    },
  ],
};
