ALTER TABLE "reports" ADD COLUMN "image_mime_type" varchar(100);--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "image_size" integer;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "image_data" bytea;
