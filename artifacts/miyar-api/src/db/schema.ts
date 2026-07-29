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

export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 80 }),
  subject: varchar("subject", { length: 200 }),
  message: text("message").notNull(),
  sourcePage: varchar("source_page", { length: 300 }).notNull(),
  status: submissionStatusEnum("status").default("new").notNull(),
  ip: varchar("ip", { length: 80 }),
  userAgent: text("user_agent"),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;

/** PDF bytes stored in Postgres (survives Railway redeploys without a volume). */
const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() {
    return "bytea";
  },
});

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
    .default("/asset-management/liquidity-fi"),
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
