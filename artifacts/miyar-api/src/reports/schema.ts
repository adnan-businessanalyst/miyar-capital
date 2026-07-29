import { z } from "zod";

export const REPORT_SECTIONS = ["annual", "financial"] as const;
export const MAX_REPORT_BYTES = 20 * 1024 * 1024; // 20 MB
export const MAX_REPORT_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

const optionalAr = z.string().trim().max(300).optional().default("");

export const reportMetaSchema = z.object({
  section: z.enum(REPORT_SECTIONS),
  title: z.string().trim().min(1).max(300),
  titleAr: optionalAr,
  date: z.string().trim().min(1).max(80),
  dateAr: z.string().trim().max(80).optional().default(""),
  fileName: z.string().trim().min(1).max(300),
  fileNameAr: optionalAr,
});

export const reportUpdateSchema = reportMetaSchema.partial().extend({
  section: z.enum(REPORT_SECTIONS).optional(),
  title: z.string().trim().min(1).max(300).optional(),
  titleAr: z.string().trim().max(300).optional(),
  date: z.string().trim().min(1).max(80).optional(),
  dateAr: z.string().trim().max(80).optional(),
  fileName: z.string().trim().min(1).max(300).optional(),
  fileNameAr: z.string().trim().max(300).optional(),
});

export function sanitizeDownloadName(name: string): string {
  const base = name.replace(/[/\\?%*:|"<>]/g, "-").trim();
  if (!base) return "report.pdf";
  return base.toLowerCase().endsWith(".pdf") ? base : `${base}.pdf`;
}

export function isPdfUpload(file: File | Blob, fileName: string): boolean {
  const mime = "type" in file ? file.type : "";
  if (mime === "application/pdf") return true;
  return fileName.toLowerCase().endsWith(".pdf");
}

const IMAGE_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

export function isImageUpload(file: File | Blob, fileName: string): boolean {
  const mime = "type" in file ? file.type : "";
  if (mime && IMAGE_MIME.has(mime)) return true;
  return /\.(jpe?g|png|webp|gif|svg)$/i.test(fileName);
}
