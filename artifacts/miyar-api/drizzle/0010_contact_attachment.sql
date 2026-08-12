ALTER TABLE "contact_submissions" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN IF NOT EXISTS "attachment_name" varchar(120);--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN IF NOT EXISTS "attachment_mime" varchar(80);--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN IF NOT EXISTS "attachment_data" bytea;
