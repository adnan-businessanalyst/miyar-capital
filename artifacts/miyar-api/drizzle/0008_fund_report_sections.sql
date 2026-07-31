CREATE TYPE "public"."fund_report_section" AS ENUM('voting_policy', 'terms_and_conditions', 'quarterly_disclosures');
--> statement-breakpoint
ALTER TABLE "fund_reports" ADD COLUMN "section" "fund_report_section" DEFAULT 'quarterly_disclosures' NOT NULL;
--> statement-breakpoint
ALTER TABLE "funds_reports_settings" ADD COLUMN "voting_policy_en" varchar(200) DEFAULT 'Voting Policy' NOT NULL;
--> statement-breakpoint
ALTER TABLE "funds_reports_settings" ADD COLUMN "voting_policy_ar" varchar(200) DEFAULT 'سياسة التصويت' NOT NULL;
--> statement-breakpoint
ALTER TABLE "funds_reports_settings" ADD COLUMN "terms_en" varchar(200) DEFAULT 'Terms and Conditions' NOT NULL;
--> statement-breakpoint
ALTER TABLE "funds_reports_settings" ADD COLUMN "terms_ar" varchar(200) DEFAULT 'الشروط والأحكام' NOT NULL;
--> statement-breakpoint
ALTER TABLE "funds_reports_settings" ADD COLUMN "quarterly_en" varchar(200) DEFAULT 'Quarterly Disclosures' NOT NULL;
--> statement-breakpoint
ALTER TABLE "funds_reports_settings" ADD COLUMN "quarterly_ar" varchar(200) DEFAULT 'الإفصاحات الربعية' NOT NULL;
