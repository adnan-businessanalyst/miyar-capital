/**
 * Financial Reports page chrome copy (EN + AR).
 * Imported by `views/FinancialReports.tsx` — report cards come from the CMS/API.
 */

export interface FinancialReportsContent {
  hero: {
    titleEn: string;
    titleAr: string;
    crumbEn: string;
    crumbAr: string;
  };
  annual: {
    headingEn: string;
    headingAr: string;
    emptyEn: string;
    emptyAr: string;
  };
  financial: {
    headingEn: string;
    headingAr: string;
    emptyEn: string;
    emptyAr: string;
  };
  loadErrorEn: string;
  loadErrorAr: string;
}

export const FINANCIAL_REPORTS: FinancialReportsContent = {
  hero: {
    titleEn: "Financial Reports",
    titleAr: "التقارير المالية",
    crumbEn: "Investor Relations / Financial Reports",
    crumbAr: "علاقات المستثمرين / التقارير المالية",
  },
  annual: {
    headingEn: "Annual Reports",
    headingAr: "التقارير السنوية",
    emptyEn: "No annual reports published yet.",
    emptyAr: "لا توجد تقارير سنوية منشورة بعد.",
  },
  financial: {
    headingEn: "Financial Reports",
    headingAr: "التقارير المالية",
    emptyEn: "No financial reports published yet.",
    emptyAr: "لا توجد تقارير مالية منشورة بعد.",
  },
  loadErrorEn:
    "Reports are temporarily unavailable. Please try again later.",
  loadErrorAr:
    "التقارير غير متاحة مؤقتًا. يُرجى المحاولة مرة أخرى لاحقًا.",
};
