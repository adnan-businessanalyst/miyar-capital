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
);
