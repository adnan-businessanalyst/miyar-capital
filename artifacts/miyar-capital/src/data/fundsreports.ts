/**
 * Funds Reports types + empty fallbacks (CMS-driven via API).
 */

export type FundReportSectionId =
  | "voting_policy"
  | "terms_and_conditions"
  | "quarterly_disclosures";

export interface FundsReportCard {
  id: string;
  section: FundReportSectionId;
  titleEn: string;
  titleAr: string;
  dateEn: string;
  dateAr: string;
  hasFile: boolean;
  hasArabicFile: boolean;
  fileUrl: string | null;
  fileUrlAr: string | null;
  fileName: string | null;
  fileNameAr: string | null;
}

export interface FundsReportFund {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  cards: FundsReportCard[];
}

export interface FundsReportsSettings {
  headingEn: string;
  headingAr: string;
  crumbEn: string;
  crumbAr: string;
  introEn: string;
  introAr: string;
  emptyEn: string;
  emptyAr: string;
  viewReportsEn: string;
  viewReportsAr: string;
  childCrumbReportsEn: string;
  childCrumbReportsAr: string;
  votingPolicyEn: string;
  votingPolicyAr: string;
  termsEn: string;
  termsAr: string;
  quarterlyEn: string;
  quarterlyAr: string;
}

export interface FundsReportsPageData {
  settings: FundsReportsSettings;
  funds: FundsReportFund[];
}

export const FUND_REPORT_SECTIONS: FundReportSectionId[] = [
  "voting_policy",
  "terms_and_conditions",
  "quarterly_disclosures",
];

export const EMPTY_FUNDS_REPORTS_SETTINGS: FundsReportsSettings = {
  headingEn: "Funds Reports",
  headingAr: "تقارير الصناديق",
  crumbEn: "Investor Relations / Funds Reports",
  crumbAr: "علاقات المستثمرين / تقارير الصناديق",
  introEn: "Reports and documents for Miyar Capital investment funds.",
  introAr: "تقارير ومستندات صناديق معيار المالية الاستثمارية.",
  emptyEn: "No fund reports published yet.",
  emptyAr: "لا توجد تقارير صناديق منشورة بعد.",
  viewReportsEn: "View all reports",
  viewReportsAr: "عرض جميع التقارير",
  childCrumbReportsEn: "Reports",
  childCrumbReportsAr: "التقارير",
  votingPolicyEn: "Voting Policy",
  votingPolicyAr: "سياسة التصويت",
  termsEn: "Terms and Conditions",
  termsAr: "الشروط والأحكام",
  quarterlyEn: "Quarterly Disclosures",
  quarterlyAr: "الإفصاحات الربعية",
};

export const EMPTY_FUNDS_REPORTS_PAGE: FundsReportsPageData = {
  settings: EMPTY_FUNDS_REPORTS_SETTINGS,
  funds: [],
};

export function sectionHeading(
  settings: FundsReportsSettings,
  section: FundReportSectionId,
  lang: "en" | "ar",
): string {
  if (section === "voting_policy") {
    return lang === "ar" ? settings.votingPolicyAr : settings.votingPolicyEn;
  }
  if (section === "terms_and_conditions") {
    return lang === "ar" ? settings.termsAr : settings.termsEn;
  }
  return lang === "ar" ? settings.quarterlyAr : settings.quarterlyEn;
}
