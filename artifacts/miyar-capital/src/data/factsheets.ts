export const FACTSHEET_SLUGS = [
  "equity-management",
  "private-markets",
  "real-assets",
  "murabaha-fund",
] as const;

export type FactsheetSlug = (typeof FACTSHEET_SLUGS)[number];

export type CmsFactsheetRow = {
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
};

export type CmsFactsheet = {
  slug: FactsheetSlug | string;
  pagePath: string;
  pageLabelEn: string;
  pageLabelAr: string;
  titleEn: string;
  titleAr: string;
  rows: CmsFactsheetRow[];
  ctaShow: boolean;
  ctaLabelEn: string;
  ctaLabelAr: string;
  hasFile: boolean;
  hasFileAr: boolean;
  fileName: string | null;
  fileNameAr: string | null;
  fileSize: number | null;
  fileSizeAr: number | null;
  fileUrl: string | null;
  fileUrlAr: string | null;
  updatedAt: string;
};
