import { z } from "zod";

export const MAX_DISCLOSURE_BYTES = 20 * 1024 * 1024; // 20 MB

export const disclosureMetaSchema = z.object({
  title: z.string().trim().min(1).max(500),
  titleAr: z.string().trim().max(500).optional().default(""),
  body: z.string().trim().min(1).max(10000),
  bodyAr: z.string().trim().max(10000).optional().default(""),
  fileName: z.string().trim().min(1).max(300),
  fileNameAr: z.string().trim().max(300).optional().default(""),
});

export const disclosureUpdateSchema = disclosureMetaSchema.partial();
