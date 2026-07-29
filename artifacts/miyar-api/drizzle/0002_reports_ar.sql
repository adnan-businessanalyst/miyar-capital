ALTER TABLE "reports" ADD COLUMN "title_ar" varchar(300);--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "date_ar" varchar(80);--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "file_name_ar" varchar(300);--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "mime_type_ar" varchar(100);--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "file_size_ar" integer;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "file_data_ar" bytea;
