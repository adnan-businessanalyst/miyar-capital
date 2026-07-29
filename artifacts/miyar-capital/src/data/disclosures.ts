export interface Disclosure {
  id: string;
  title: string;
  titleAr: string | null;
  body: string;
  bodyAr: string | null;
  fileName: string;
  fileNameAr: string | null;
  fileUrl: string;
  fileUrlAr: string | null;
  hasArabicFile: boolean;
}
