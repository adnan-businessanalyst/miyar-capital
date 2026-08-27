import { z } from "zod";

export const MAX_FACTSHEET_BYTES = 20 * 1024 * 1024;

export const factsheetRowSchema = z.object({
  labelEn: z.string().trim().min(1).max(200),
  labelAr: z.string().trim().max(200).default(""),
  valueEn: z.string().trim().min(1).max(800),
  valueAr: z.string().trim().max(800).default(""),
});

export const factsheetUpdateSchema = z.object({
  titleEn: z.string().trim().min(1).max(300),
  titleAr: z.string().trim().max(300).default(""),
  rows: z.array(factsheetRowSchema).min(1).max(20),
  ctaShow: z.boolean(),
  ctaLabelEn: z.string().trim().min(1).max(300),
  ctaLabelAr: z.string().trim().max(300).default(""),
});

export function sanitizeDownloadName(name: string): string {
  const base = name.replace(/[/\\?%*:|"<>]/g, "-").trim();
  if (!base) return "factsheet.pdf";
  return base.toLowerCase().endsWith(".pdf") ? base : `${base}.pdf`;
}

export function isPdfUpload(file: File | Blob, fileName: string): boolean {
  const mime = "type" in file ? file.type : "";
  if (mime === "application/pdf") return true;
  return fileName.toLowerCase().endsWith(".pdf");
}
