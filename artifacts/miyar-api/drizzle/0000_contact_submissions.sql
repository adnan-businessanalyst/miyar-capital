CREATE TYPE "public"."submission_status" AS ENUM('new', 'read');--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" varchar(200) NOT NULL,
	"email" varchar(320) NOT NULL,
	"phone" varchar(80),
	"subject" varchar(200),
	"message" text NOT NULL,
	"source_page" varchar(300) NOT NULL,
	"status" "submission_status" DEFAULT 'new' NOT NULL,
	"ip" varchar(80),
	"user_agent" text
);
