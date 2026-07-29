import {
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
