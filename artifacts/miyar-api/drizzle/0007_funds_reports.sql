CREATE TABLE "funds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"slug" varchar(200) NOT NULL,
	"title" varchar(300) NOT NULL,
	"title_ar" varchar(300),
	"description" text NOT NULL,
	"description_ar" text,
	"is_published" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "funds_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "fund_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"fund_id" uuid NOT NULL,
	"title" varchar(300) NOT NULL,
	"title_ar" varchar(300),
	"date" varchar(80) NOT NULL,
	"date_ar" varchar(80),
	"file_name" varchar(300),
	"file_name_ar" varchar(300),
	"mime_type" varchar(100),
	"mime_type_ar" varchar(100),
	"file_size" integer,
	"file_size_ar" integer,
	"file_data" "bytea",
	"file_data_ar" "bytea",
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "funds_reports_settings" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"heading_en" varchar(300) DEFAULT 'Funds Reports' NOT NULL,
	"heading_ar" varchar(300) DEFAULT 'تقارير الصناديق' NOT NULL,
	"crumb_en" varchar(300) DEFAULT 'Investor Relations / Funds Reports' NOT NULL,
	"crumb_ar" varchar(300) DEFAULT 'علاقات المستثمرين / تقارير الصناديق' NOT NULL,
	"intro_en" text DEFAULT 'Reports and documents for Miyar Capital investment funds.' NOT NULL,
	"intro_ar" text DEFAULT 'تقارير ومستندات صناديق معيار المالية الاستثمارية.' NOT NULL,
	"empty_en" text DEFAULT 'No fund reports published yet.' NOT NULL,
	"empty_ar" text DEFAULT 'لا توجد تقارير صناديق منشورة بعد.' NOT NULL,
	"view_reports_en" varchar(120) DEFAULT 'View all reports' NOT NULL,
	"view_reports_ar" varchar(120) DEFAULT 'عرض جميع التقارير' NOT NULL,
	"child_crumb_reports_en" varchar(80) DEFAULT 'Reports' NOT NULL,
	"child_crumb_reports_ar" varchar(80) DEFAULT 'التقارير' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "fund_reports" ADD CONSTRAINT "fund_reports_fund_id_funds_id_fk" FOREIGN KEY ("fund_id") REFERENCES "public"."funds"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
INSERT INTO "funds_reports_settings" ("id") VALUES (1)
ON CONFLICT ("id") DO NOTHING;
