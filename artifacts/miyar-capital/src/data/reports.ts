export type ReportSection = "annual" | "financial";

export interface Report {
  id: string;
  section: ReportSection;
  title: string;
  titleAr: string | null;
  date: string;
  dateAr: string | null;
  fileName: string;
  fileNameAr: string | null;
  fileUrl: string;
  fileUrlAr: string | null;
  hasArabicFile: boolean;
  hasImage: boolean;
  imageUrl: string | null;
}
