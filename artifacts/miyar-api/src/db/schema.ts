import {
  boolean,
  customType,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const submissionStatusEnum = pgEnum("submission_status", ["new", "read"]);

/** Binary bytes stored in Postgres (survives Railway redeploys without a volume). */
const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() {
    return "bytea";
  },
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 80 }).notNull(),
  subject: varchar("subject", { length: 200 }),
  message: text("message").notNull(),
  sourcePage: varchar("source_page", { length: 300 }).notNull(),
  pageTitle: varchar("page_title", { length: 300 }),
  status: submissionStatusEnum("status").default("new").notNull(),
  ip: varchar("ip", { length: 80 }),
  userAgent: text("user_agent"),
  attachmentName: varchar("attachment_name", { length: 120 }),
  attachmentMime: varchar("attachment_mime", { length: 80 }),
  attachmentData: bytea("attachment_data"),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;

export const reportSectionEnum = pgEnum("report_section", ["annual", "financial"]);

export const reports = pgTable("reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  section: reportSectionEnum("section").notNull(),
  title: varchar("title", { length: 300 }).notNull(),
  titleAr: varchar("title_ar", { length: 300 }),
  date: varchar("date", { length: 80 }).notNull(),
  dateAr: varchar("date_ar", { length: 80 }),
  fileName: varchar("file_name", { length: 300 }).notNull(),
  fileNameAr: varchar("file_name_ar", { length: 300 }),
  mimeType: varchar("mime_type", { length: 100 }).notNull().default("application/pdf"),
  mimeTypeAr: varchar("mime_type_ar", { length: 100 }),
  fileSize: integer("file_size").notNull(),
  fileSizeAr: integer("file_size_ar"),
  fileData: bytea("file_data").notNull(),
  fileDataAr: bytea("file_data_ar"),
  imageMimeType: varchar("image_mime_type", { length: 100 }),
  imageSize: integer("image_size"),
  imageData: bytea("image_data"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type Report = typeof reports.$inferSelect;
export type NewReport = typeof reports.$inferInsert;
export type ReportSection = (typeof reportSectionEnum.enumValues)[number];

export const disclosures = pgTable("disclosures", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  titleAr: varchar("title_ar", { length: 500 }),
  body: text("body").notNull(),
  bodyAr: text("body_ar"),
  fileName: varchar("file_name", { length: 300 }).notNull(),
  fileNameAr: varchar("file_name_ar", { length: 300 }),
  mimeType: varchar("mime_type", { length: 100 }).notNull().default("application/pdf"),
  mimeTypeAr: varchar("mime_type_ar", { length: 100 }),
  fileSize: integer("file_size").notNull(),
  fileSizeAr: integer("file_size_ar"),
  fileData: bytea("file_data").notNull(),
  fileDataAr: bytea("file_data_ar"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type Disclosure = typeof disclosures.$inferSelect;
export type NewDisclosure = typeof disclosures.$inferInsert;

/** Singleton homepage hero CTA + promo card settings. */
export const homepageHero = pgTable("homepage_hero", {
  id: integer("id").primaryKey().default(1),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  ctaShow: boolean("cta_show").notNull().default(true),
  ctaHref: varchar("cta_href", { length: 500 }).notNull().default("#what-we-do"),
  ctaLabelEn: varchar("cta_label_en", { length: 200 }).notNull().default("Explore Our Services"),
  ctaLabelAr: varchar("cta_label_ar", { length: 200 }).notNull().default("استكشف خدماتنا"),
  promoShow: boolean("promo_show").notNull().default(true),
  promoHref: varchar("promo_href", { length: 500 })
    .notNull()
    .default("/asset-management/liquidity-fixed-income/murabaha-fund"),
  promoTitleEn: varchar("promo_title_en", { length: 300 }).notNull().default("Sukuk Offerings"),
  promoTitleAr: varchar("promo_title_ar", { length: 300 }).notNull().default("عروض الصكوك"),
  promoBodyEn: text("promo_body_en")
    .notNull()
    .default("We offer a range of Sukuk offerings to meet the needs of our clients."),
  promoBodyAr: text("promo_body_ar")
    .notNull()
    .default("نقدم عروض مختلفة من السكوك لتلبية احتياجات عملائنا."),
});

export type HomepageHero = typeof homepageHero.$inferSelect;
export type NewHomepageHero = typeof homepageHero.$inferInsert;

/** Career job postings shown on the homepage + /careers/[slug]. */
export const jobPosts = pgTable("job_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  referenceCode: varchar("reference_code", { length: 80 }).notNull(),
  title: varchar("title", { length: 300 }).notNull(),
  titleAr: varchar("title_ar", { length: 300 }),
  location: varchar("location", { length: 200 }).notNull(),
  locationAr: varchar("location_ar", { length: 200 }),
  employmentType: varchar("employment_type", { length: 120 }).notNull(),
  employmentTypeAr: varchar("employment_type_ar", { length: 120 }),
  summary: text("summary").notNull(),
  summaryAr: text("summary_ar"),
  description: text("description").notNull().default(""),
  descriptionAr: text("description_ar"),
  howToApply: text("how_to_apply").notNull().default(""),
  howToApplyAr: text("how_to_apply_ar"),
  emailSubject: varchar("email_subject", { length: 500 }).notNull(),
  emailSubjectAr: varchar("email_subject_ar", { length: 500 }),
  emailBody: text("email_body").notNull(),
  emailBodyAr: text("email_body_ar"),
  isPublished: boolean("is_published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type JobPost = typeof jobPosts.$inferSelect;
export type NewJobPost = typeof jobPosts.$inferInsert;

/** Singleton careers section settings (HR email + section copy). */
export const jobsSettings = pgTable("jobs_settings", {
  id: integer("id").primaryKey().default(1),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  hrEmail: varchar("hr_email", { length: 320 }).notNull().default("hr@miyarcapital.com.sa"),
  tagEn: varchar("tag_en", { length: 120 }).notNull().default("Careers"),
  tagAr: varchar("tag_ar", { length: 120 }).notNull().default("الوظائف"),
  headingEn: varchar("heading_en", { length: 300 }).notNull().default("Join Miyar Capital"),
  headingAr: varchar("heading_ar", { length: 300 }).notNull().default("انضم إلى معيار المالية"),
  introEn: text("intro_en")
    .notNull()
    .default("Explore open roles and apply by emailing our Human Resources team."),
  introAr: text("intro_ar")
    .notNull()
    .default("اطّلع على الوظائف الشاغرة وقدّم عبر البريد الإلكتروني لفريق الموارد البشرية."),
  hrLabelEn: varchar("hr_label_en", { length: 120 }).notNull().default("HR email:"),
  hrLabelAr: varchar("hr_label_ar", { length: 120 }).notNull().default("بريد الموارد البشرية:"),
  applyLabelEn: varchar("apply_label_en", { length: 120 }).notNull().default("Apply by email"),
  applyLabelAr: varchar("apply_label_ar", { length: 120 }).notNull().default("قدّم عبر البريد"),
  emptyEn: text("empty_en")
    .notNull()
    .default("There are no open positions at this time. Please check back later."),
  emptyAr: text("empty_ar")
    .notNull()
    .default("لا توجد وظائف شاغرة حاليًا. يرجى المراجعة لاحقًا."),
  disclaimerEn: text("disclaimer_en")
    .notNull()
    .default(
      "Important: the email subject and body must match exactly as provided. Applications with altered subject or body may not be processed.",
    ),
  disclaimerAr: text("disclaimer_ar")
    .notNull()
    .default(
      "مهم: يجب أن يتطابق موضوع الرسالة ونصها تمامًا كما هو موضح. قد لا تُعالَج الطلبات ذات الموضوع أو النص المعدّل.",
    ),
});

export type JobsSettings = typeof jobsSettings.$inferSelect;
export type NewJobsSettings = typeof jobsSettings.$inferInsert;

/**
 * Job applications from the careers Apply form.
 * CV bytes are stored in Postgres; scan_* fields are ready for an antivirus/malware scanner.
 */
export const jobApplications = pgTable("job_applications", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  firstName: varchar("first_name", { length: 200 }).notNull(),
  lastName: varchar("last_name", { length: 200 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 80 }).notNull(),
  message: text("message").notNull(),
  jobId: uuid("job_id"),
  jobSlug: varchar("job_slug", { length: 200 }).notNull(),
  jobTitle: varchar("job_title", { length: 300 }).notNull(),
  jobReference: varchar("job_reference", { length: 80 }).notNull(),
  sourcePage: varchar("source_page", { length: 300 }).notNull(),
  status: submissionStatusEnum("status").default("new").notNull(),
  ip: varchar("ip", { length: 80 }),
  userAgent: text("user_agent"),
  cvName: varchar("cv_name", { length: 120 }).notNull(),
  cvMime: varchar("cv_mime", { length: 80 }).notNull(),
  cvSize: integer("cv_size").notNull(),
  cvData: bytea("cv_data").notNull(),
  /** pending | clean | infected | skipped | error — scanner pipeline. */
  scanStatus: varchar("scan_status", { length: 40 }).notNull().default("skipped"),
  scanDetail: text("scan_detail"),
  scanProvider: varchar("scan_provider", { length: 80 }),
  scannedAt: timestamp("scanned_at", { withTimezone: true }),
});

export type JobApplication = typeof jobApplications.$inferSelect;
export type NewJobApplication = typeof jobApplications.$inferInsert;

/** News articles shown on /news and /news/[slug]. */
export const newsArticles = pgTable("news_articles", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  titleAr: varchar("title_ar", { length: 500 }),
  date: varchar("date", { length: 80 }).notNull(),
  dateAr: varchar("date_ar", { length: 80 }),
  blurb: text("blurb").notNull(),
  blurbAr: text("blurb_ar"),
  body: text("body").notNull(),
  bodyAr: text("body_ar"),
  imageUrl: varchar("image_url", { length: 500 }).notNull().default(""),
  isPublished: boolean("is_published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type NewsArticle = typeof newsArticles.$inferSelect;
export type NewNewsArticle = typeof newsArticles.$inferInsert;

/** Singleton news page copy (heading, empty state, labels). */
export const newsSettings = pgTable("news_settings", {
  id: integer("id").primaryKey().default(1),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  headingEn: varchar("heading_en", { length: 300 }).notNull().default("News"),
  headingAr: varchar("heading_ar", { length: 300 }).notNull().default("الأخبار"),
  introEn: text("intro_en")
    .notNull()
    .default("News and updates from Miyar Capital."),
  introAr: text("intro_ar")
    .notNull()
    .default("أخبار وتحديثات من معيار المالية."),
  emptyEn: text("empty_en")
    .notNull()
    .default("No news articles at this time."),
  emptyAr: text("empty_ar")
    .notNull()
    .default("لا توجد مقالات إخبارية في الوقت الحالي."),
  readMoreEn: varchar("read_more_en", { length: 80 }).notNull().default("Read more"),
  readMoreAr: varchar("read_more_ar", { length: 80 }).notNull().default("اقرأ المزيد"),
  backLabelEn: varchar("back_label_en", { length: 120 })
    .notNull()
    .default("Back to News"),
  backLabelAr: varchar("back_label_ar", { length: 120 })
    .notNull()
    .default("العودة إلى الأخبار"),
});

export type NewsSettings = typeof newsSettings.$inferSelect;
export type NewNewsSettings = typeof newsSettings.$inferInsert;

/** Parent funds shown on /funds-reports. */
export const funds = pgTable("funds", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  title: varchar("title", { length: 300 }).notNull(),
  titleAr: varchar("title_ar", { length: 300 }),
  description: text("description").notNull(),
  descriptionAr: text("description_ar"),
  isPublished: boolean("is_published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type Fund = typeof funds.$inferSelect;
export type NewFund = typeof funds.$inferInsert;

export const fundReportSectionEnum = pgEnum("fund_report_section", [
  "voting_policy",
  "terms_and_conditions",
  "quarterly_disclosures",
]);

/** Report cards under a fund (/funds-reports/{slug}/reports). PDFs optional. */
export const fundReports = pgTable("fund_reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  fundId: uuid("fund_id")
    .notNull()
    .references(() => funds.id, { onDelete: "cascade" }),
  section: fundReportSectionEnum("section")
    .notNull()
    .default("quarterly_disclosures"),
  title: varchar("title", { length: 300 }).notNull(),
  titleAr: varchar("title_ar", { length: 300 }),
  date: varchar("date", { length: 80 }).notNull(),
  dateAr: varchar("date_ar", { length: 80 }),
  fileName: varchar("file_name", { length: 300 }),
  fileNameAr: varchar("file_name_ar", { length: 300 }),
  mimeType: varchar("mime_type", { length: 100 }),
  mimeTypeAr: varchar("mime_type_ar", { length: 100 }),
  fileSize: integer("file_size"),
  fileSizeAr: integer("file_size_ar"),
  fileData: bytea("file_data"),
  fileDataAr: bytea("file_data_ar"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type FundReport = typeof fundReports.$inferSelect;
export type NewFundReport = typeof fundReports.$inferInsert;
export type FundReportSection = (typeof fundReportSectionEnum.enumValues)[number];

/** Singleton /funds-reports page copy. */
export const fundsReportsSettings = pgTable("funds_reports_settings", {
  id: integer("id").primaryKey().default(1),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  headingEn: varchar("heading_en", { length: 300 }).notNull().default("Funds Reports"),
  headingAr: varchar("heading_ar", { length: 300 })
    .notNull()
    .default("تقارير الصناديق"),
  crumbEn: varchar("crumb_en", { length: 300 })
    .notNull()
    .default("Investor Relations / Funds Reports"),
  crumbAr: varchar("crumb_ar", { length: 300 })
    .notNull()
    .default("علاقات المستثمرين / تقارير الصناديق"),
  introEn: text("intro_en")
    .notNull()
    .default("Reports and documents for Miyar Capital investment funds."),
  introAr: text("intro_ar")
    .notNull()
    .default("تقارير ومستندات صناديق معيار المالية الاستثمارية."),
  emptyEn: text("empty_en")
    .notNull()
    .default("No fund reports published yet."),
  emptyAr: text("empty_ar")
    .notNull()
    .default("لا توجد تقارير صناديق منشورة بعد."),
  viewReportsEn: varchar("view_reports_en", { length: 120 })
    .notNull()
    .default("View all reports"),
  viewReportsAr: varchar("view_reports_ar", { length: 120 })
    .notNull()
    .default("عرض جميع التقارير"),
  childCrumbReportsEn: varchar("child_crumb_reports_en", { length: 80 })
    .notNull()
    .default("Reports"),
  childCrumbReportsAr: varchar("child_crumb_reports_ar", { length: 80 })
    .notNull()
    .default("التقارير"),
  votingPolicyEn: varchar("voting_policy_en", { length: 200 })
    .notNull()
    .default("Voting Policy"),
  votingPolicyAr: varchar("voting_policy_ar", { length: 200 })
    .notNull()
    .default("سياسة التصويت"),
  termsEn: varchar("terms_en", { length: 200 })
    .notNull()
    .default("Terms and Conditions"),
  termsAr: varchar("terms_ar", { length: 200 })
    .notNull()
    .default("الشروط والأحكام"),
  quarterlyEn: varchar("quarterly_en", { length: 200 })
    .notNull()
    .default("Quarterly Disclosures"),
  quarterlyAr: varchar("quarterly_ar", { length: 200 })
    .notNull()
    .default("الإفصاحات الربعية"),
});

export type FundsReportsSettings = typeof fundsReportsSettings.$inferSelect;
export type NewFundsReportsSettings = typeof fundsReportsSettings.$inferInsert;
