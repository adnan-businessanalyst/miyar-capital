import { normalizePath } from "./reserved.js";

export type SiteParent = {
  path: string;
  titleEn: string;
  titleAr: string;
};

/** Current hardcoded marketing pages that can be chosen as a CMS parent. */
export const SITE_PARENTS: SiteParent[] = [
  { path: "/who-we-are", titleEn: "Who We Are", titleAr: "من نحن" },
  { path: "/board-of-directors", titleEn: "Board of Directors", titleAr: "مجلس الإدارة" },
  { path: "/executive-team", titleEn: "Executive Team", titleAr: "الفريق التنفيذي" },
  { path: "/our-team", titleEn: "Our Team", titleAr: "فريقنا" },
  { path: "/careers", titleEn: "Careers", titleAr: "الوظائف" },
  { path: "/governance-independence", titleEn: "Governance & Independence", titleAr: "الحوكمة والاستقلالية" },
  { path: "/shariah-principles", titleEn: "Shariah Principles", titleAr: "المبادئ الشرعية" },
  { path: "/asset-management", titleEn: "Asset Management", titleAr: "إدارة الأصول" },
  {
    path: "/asset-management/liquidity-fixed-income",
    titleEn: "Liquidity & Fixed Income",
    titleAr: "حلول السيولة والدخل الثابت",
  },
  {
    path: "/asset-management/liquidity-fixed-income/murabaha-fund",
    titleEn: "Murabaha",
    titleAr: "المرابحة",
  },
  {
    path: "/asset-management/liquidity-fixed-income/direct-murabaha",
    titleEn: "Direct Murabaha",
    titleAr: "المرابحة المباشرة",
  },
  { path: "/asset-management/equity-management", titleEn: "Equity Management", titleAr: "إدارة الأسهم" },
  { path: "/asset-management/real-assets", titleEn: "Real Assets", titleAr: "الأصول العقارية" },
  { path: "/asset-management/private-markets", titleEn: "Private Markets", titleAr: "الأسواق الخاصة" },
  {
    path: "/asset-management/discretionary-portfolio-management",
    titleEn: "Discretionary Portfolio Management",
    titleAr: "الإدارة التقديرية للمحافظ",
  },
  {
    path: "/asset-management/Discretionary-portfolio-management",
    titleEn: "Discretionary Portfolio Management",
    titleAr: "الإدارة التقديرية للمحافظ",
  },
  { path: "/asset-management/dpm", titleEn: "DPM", titleAr: "إدارة المحافظ" },
  {
    path: "/asset-management/institutional-family-office",
    titleEn: "Institutional & Family Office",
    titleAr: "المؤسسات والمكاتب العائلية",
  },
  { path: "/investment-banking", titleEn: "Investment Banking", titleAr: "المصرفية الاستثمارية" },
  { path: "/arrangement-management", titleEn: "Arrangement Management", titleAr: "إدارة المصرفية الاستثمارية" },
  { path: "/investment-advisory", titleEn: "Investment Advisory", titleAr: "المستشار المالي" },
  {
    path: "/investment-banking/capital-markets-advisory",
    titleEn: "Capital Markets Advisory",
    titleAr: "استشارات أسواق رأس المال",
  },
  {
    path: "/investment-banking/debt-financing-arrangement",
    titleEn: "Debt Financing Arrangement",
    titleAr: "ترتيب تمويل الدين",
  },
  {
    path: "/investment-banking/mergers-acquisitions",
    titleEn: "Mergers & Acquisitions",
    titleAr: "الاندماج والاستحواذ",
  },
  {
    path: "/investment-banking/valuation-financial-advisory",
    titleEn: "Valuation & Financial Advisory",
    titleAr: "التقييم والاستشارات المالية",
  },
  {
    path: "/investment-banking/real-estate-private-arrangements",
    titleEn: "Real Estate Private Arrangements",
    titleAr: "الترتيبات العقارية الخاصة",
  },
  {
    path: "/investment-banking/register-interest",
    titleEn: "Register Interest",
    titleAr: "سجّل اهتمامك",
  },
  { path: "/investment-management", titleEn: "Investment Management", titleAr: "إدارة الاستثمار" },
  { path: "/financial-reports", titleEn: "Financial Reports", titleAr: "التقارير المالية" },
  { path: "/funds-reports", titleEn: "Funds Reports", titleAr: "تقارير الصناديق" },
  { path: "/annual-reports", titleEn: "Annual Reports", titleAr: "التقارير السنوية" },
  { path: "/disclosures", titleEn: "Disclosures", titleAr: "الإفصاحات" },
  { path: "/news", titleEn: "News", titleAr: "الأخبار" },
  { path: "/insights", titleEn: "Insights", titleAr: "الرؤى" },
  { path: "/privacy-policy", titleEn: "Privacy Policy", titleAr: "سياسة الخصوصية" },
  { path: "/fatca", titleEn: "FATCA", titleAr: "فاتكا" },
  { path: "/murabaha-fund", titleEn: "Murabaha Fund", titleAr: "صندوق المرابحة" },
  { path: "/saudi-equity-fund", titleEn: "Saudi Equity Fund", titleAr: "صندوق الأسهم السعودية" },
  { path: "/rakiza", titleEn: "Rakiza", titleAr: "ركيزة" },
];

export function findSiteParent(path: string | null | undefined): SiteParent | undefined {
  if (!path) return undefined;
  const p = normalizePath(path);
  return SITE_PARENTS.find((item) => item.path === p);
}

export function siteAncestorChain(path: string): SiteParent[] {
  const p = normalizePath(path);
  return SITE_PARENTS.filter(
    (item) => item.path === p || p.startsWith(`${item.path}/`),
  ).sort((a, b) => a.path.length - b.path.length);
}
