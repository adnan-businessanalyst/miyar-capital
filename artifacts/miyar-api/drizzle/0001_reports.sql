CREATE TYPE "public"."report_section" AS ENUM('annual', 'financial');--> statement-breakpoint
CREATE TABLE "reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"section" "report_section" NOT NULL,
	"title" varchar(300) NOT NULL,
	"date" varchar(80) NOT NULL,
	"file_name" varchar(300) NOT NULL,
	"mime_type" varchar(100) DEFAULT 'application/pdf' NOT NULL,
	"file_size" integer NOT NULL,
	"file_data" bytea NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
