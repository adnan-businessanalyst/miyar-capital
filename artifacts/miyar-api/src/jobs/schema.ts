import { z } from "zod";

export const jobPostSchema = z.object({
  referenceCode: z.string().trim().min(1).max(80),
  title: z.string().trim().min(1).max(300),
  titleAr: z.string().trim().max(300).optional().default(""),
  location: z.string().trim().min(1).max(200),
  locationAr: z.string().trim().max(200).optional().default(""),
  employmentType: z.string().trim().min(1).max(120),
  employmentTypeAr: z.string().trim().max(120).optional().default(""),
  summary: z.string().trim().min(1).max(5000),
  summaryAr: z.string().trim().max(5000).optional().default(""),
  emailSubject: z.string().trim().min(1).max(500),
  emailSubjectAr: z.string().trim().max(500).optional().default(""),
  emailBody: z.string().trim().min(1).max(10000),
  emailBodyAr: z.string().trim().max(10000).optional().default(""),
  isPublished: z.boolean().optional().default(true),
  sortOrder: z.number().int().optional().default(0),
});

export const jobPostUpdateSchema = jobPostSchema.partial();

export type JobPostPayload = z.infer<typeof jobPostSchema>;

export const jobsSettingsSchema = z.object({
  hrEmail: z
    .string()
    .trim()
    .min(3, "HR email is required")
    .max(320)
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Invalid HR email"),
  tagEn: z.string().trim().min(1, "Tag (EN) is required").max(120),
  tagAr: z.string().trim().max(120).optional().default(""),
  headingEn: z.string().trim().min(1, "Heading (EN) is required").max(300),
  headingAr: z.string().trim().max(300).optional().default(""),
  introEn: z.string().trim().min(1, "Intro (EN) is required").max(2000),
  introAr: z.string().trim().max(2000).optional().default(""),
  hrLabelEn: z.string().trim().min(1, "HR label (EN) is required").max(120),
  hrLabelAr: z.string().trim().max(120).optional().default(""),
  applyLabelEn: z.string().trim().min(1, "Apply label (EN) is required").max(120),
  applyLabelAr: z.string().trim().max(120).optional().default(""),
  emptyEn: z.string().trim().min(1, "Empty state (EN) is required").max(1000),
  emptyAr: z.string().trim().max(1000).optional().default(""),
  disclaimerEn: z.string().trim().min(1, "Disclaimer (EN) is required").max(2000),
  disclaimerAr: z.string().trim().max(2000).optional().default(""),
});

export type JobsSettingsPayload = z.infer<typeof jobsSettingsSchema>;

export const DEFAULT_JOBS_SETTINGS: JobsSettingsPayload = {
  hrEmail: "hr@miyarcapital.com.sa",
  tagEn: "Careers",
  tagAr: "الوظائف",
  headingEn: "Join Miyar Capital",
  headingAr: "انضم إلى معيار المالية",
  introEn: "Explore open roles and apply by emailing our Human Resources team.",
  introAr:
    "اطّلع على الوظائف الشاغرة وقدّم عبر البريد الإلكتروني لفريق الموارد البشرية.",
  hrLabelEn: "HR email:",
  hrLabelAr: "بريد الموارد البشرية:",
  applyLabelEn: "Apply by email",
  applyLabelAr: "قدّم عبر البريد",
  emptyEn: "There are no open positions at this time. Please check back later.",
  emptyAr: "لا توجد وظائف شاغرة حاليًا. يرجى المراجعة لاحقًا.",
  disclaimerEn:
    "Important: the email subject and body must match exactly as provided. Applications with altered subject or body may not be processed.",
  disclaimerAr:
    "مهم: يجب أن يتطابق موضوع الرسالة ونصها تمامًا كما هو موضح. قد لا تُعالَج الطلبات ذات الموضوع أو النص المعدّل.",
};
