import { z } from "zod";
import {
  isPdfUpload,
  MAX_REPORT_BYTES,
  sanitizeDownloadName,
} from "../reports/schema.js";

export const FUND_REPORT_SECTIONS = [
  "voting_policy",
  "terms_and_conditions",
  "quarterly_disclosures",
] as const;

export type FundReportSectionId = (typeof FUND_REPORT_SECTIONS)[number];

const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(200)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be lowercase letters, numbers, and hyphens",
  );

export const fundSchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(1).max(300),
  titleAr: z.string().trim().max(300).optional().default(""),
  description: z.string().trim().min(1).max(5000),
  descriptionAr: z.string().trim().max(5000).optional().default(""),
  isPublished: z.boolean().optional().default(true),
  sortOrder: z.number().int().optional().default(0),
});

export const fundUpdateSchema = fundSchema.partial();

export type FundPayload = z.infer<typeof fundSchema>;

export const fundReportMetaSchema = z.object({
  section: z.enum(FUND_REPORT_SECTIONS).default("quarterly_disclosures"),
  title: z.string().trim().min(1).max(300),
  titleAr: z.string().trim().max(300).optional().default(""),
  date: z.string().trim().min(1).max(80),
  dateAr: z.string().trim().max(80).optional().default(""),
  fileName: z.string().trim().max(300).optional().default(""),
  fileNameAr: z.string().trim().max(300).optional().default(""),
  sortOrder: z.coerce.number().int().optional().default(0),
});

export const fundReportUpdateSchema = fundReportMetaSchema.partial();

export type FundReportMetaPayload = z.infer<typeof fundReportMetaSchema>;

export const fundsReportsSettingsSchema = z.object({
  headingEn: z.string().trim().min(1).max(300),
  headingAr: z.string().trim().max(300).optional().default(""),
  crumbEn: z.string().trim().min(1).max(300),
  crumbAr: z.string().trim().max(300).optional().default(""),
  introEn: z.string().trim().min(1).max(2000),
  introAr: z.string().trim().max(2000).optional().default(""),
  emptyEn: z.string().trim().min(1).max(1000),
  emptyAr: z.string().trim().max(1000).optional().default(""),
  viewReportsEn: z.string().trim().min(1).max(120),
  viewReportsAr: z.string().trim().max(120).optional().default(""),
  childCrumbReportsEn: z.string().trim().min(1).max(80),
  childCrumbReportsAr: z.string().trim().max(80).optional().default(""),
  votingPolicyEn: z.string().trim().min(1).max(200),
  votingPolicyAr: z.string().trim().max(200).optional().default(""),
  termsEn: z.string().trim().min(1).max(200),
  termsAr: z.string().trim().max(200).optional().default(""),
  quarterlyEn: z.string().trim().min(1).max(200),
  quarterlyAr: z.string().trim().max(200).optional().default(""),
});

export type FundsReportsSettingsPayload = z.infer<
  typeof fundsReportsSettingsSchema
>;

export const DEFAULT_FUNDS_REPORTS_SETTINGS: FundsReportsSettingsPayload = {
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

export { isPdfUpload, MAX_REPORT_BYTES, sanitizeDownloadName };
