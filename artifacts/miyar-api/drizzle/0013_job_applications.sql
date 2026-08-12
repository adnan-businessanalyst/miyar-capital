CREATE TABLE IF NOT EXISTS "job_applications" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "first_name" varchar(200) NOT NULL,
  "last_name" varchar(200) NOT NULL,
  "email" varchar(320) NOT NULL,
  "phone" varchar(80) NOT NULL,
  "message" text NOT NULL,
  "job_id" uuid,
  "job_slug" varchar(200) NOT NULL,
  "job_title" varchar(300) NOT NULL,
  "job_reference" varchar(80) NOT NULL,
  "source_page" varchar(300) NOT NULL,
  "status" "submission_status" DEFAULT 'new' NOT NULL,
  "ip" varchar(80),
  "user_agent" text,
  "cv_name" varchar(120) NOT NULL,
  "cv_mime" varchar(80) NOT NULL,
  "cv_size" integer NOT NULL,
  "cv_data" bytea NOT NULL,
  "scan_status" varchar(40) DEFAULT 'skipped' NOT NULL,
  "scan_detail" text,
  "scan_provider" varchar(80),
  "scanned_at" timestamp with time zone
);--> statement-breakpoint
ALTER TABLE "job_applications"
  DROP CONSTRAINT IF EXISTS "job_applications_message_len";--> statement-breakpoint
ALTER TABLE "job_applications"
  ADD CONSTRAINT "job_applications_message_len"
  CHECK (char_length(btrim("message")) >= 20 AND char_length(btrim("message")) <= 300);
