CREATE TABLE "disclosures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"title" varchar(500) NOT NULL,
	"title_ar" varchar(500),
	"body" text NOT NULL,
	"body_ar" text,
	"file_name" varchar(300) NOT NULL,
	"file_name_ar" varchar(300),
	"mime_type" varchar(100) DEFAULT 'application/pdf' NOT NULL,
	"mime_type_ar" varchar(100),
	"file_size" integer NOT NULL,
	"file_size_ar" integer,
	"file_data" bytea NOT NULL,
	"file_data_ar" bytea,
	"sort_order" integer DEFAULT 0 NOT NULL
);
