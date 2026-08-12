UPDATE "contact_submissions" SET "phone" = '' WHERE "phone" IS NULL;--> statement-breakpoint
ALTER TABLE "contact_submissions" ALTER COLUMN "phone" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN IF NOT EXISTS "page_title" varchar(300);
