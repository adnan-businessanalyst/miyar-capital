import postgres from "postgres";
import { FACTSHEET_DEFAULTS } from "../src/factsheets/defaults.ts";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL missing");
  process.exit(1);
}

const sql = postgres(url, { max: 1 });

try {
  await sql`
    CREATE TABLE IF NOT EXISTS page_factsheets (
      slug varchar(80) PRIMARY KEY NOT NULL,
      updated_at timestamptz DEFAULT now() NOT NULL,
      title_en varchar(300) NOT NULL,
      title_ar varchar(300) DEFAULT '' NOT NULL,
      rows jsonb DEFAULT '[]'::jsonb NOT NULL,
      cta_show boolean DEFAULT false NOT NULL,
      cta_label_en varchar(300) DEFAULT 'Download Factsheet ↓' NOT NULL,
      cta_label_ar varchar(300) DEFAULT 'تحميل نشرة الحقائق ↓' NOT NULL,
      file_name varchar(300),
      file_name_ar varchar(300),
      mime_type varchar(100),
      mime_type_ar varchar(100),
      file_size integer,
      file_size_ar integer,
      file_data bytea,
      file_data_ar bytea
    )
  `;

  for (const item of FACTSHEET_DEFAULTS) {
    await sql`
      INSERT INTO page_factsheets (
        slug, title_en, title_ar, rows, cta_show, cta_label_en, cta_label_ar
      )
      VALUES (
        ${item.slug},
        ${item.titleEn},
        ${item.titleAr},
        ${sql.json(item.rows)},
        ${item.ctaShow},
        ${item.ctaLabelEn},
        ${item.ctaLabelAr}
      )
      ON CONFLICT (slug) DO NOTHING
    `;
  }

  console.log("page_factsheets: ok");
} finally {
  await sql.end({ timeout: 5 });
}
