CREATE TABLE "homepage_hero" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"cta_show" boolean DEFAULT true NOT NULL,
	"cta_href" varchar(500) DEFAULT '#what-we-do' NOT NULL,
	"cta_label_en" varchar(200) DEFAULT 'Explore Our Services' NOT NULL,
	"cta_label_ar" varchar(200) DEFAULT 'استكشف خدماتنا' NOT NULL,
	"promo_show" boolean DEFAULT true NOT NULL,
	"promo_href" varchar(500) DEFAULT '/asset-management/liquidity-fi' NOT NULL,
	"promo_title_en" varchar(300) DEFAULT 'Sukuk Offerings' NOT NULL,
	"promo_title_ar" varchar(300) DEFAULT 'عروض الصكوك' NOT NULL,
	"promo_body_en" text DEFAULT 'We offer a range of Sukuk offerings to meet the needs of our clients.' NOT NULL,
	"promo_body_ar" text DEFAULT 'نقدم عروض مختلفة من السكوك لتلبية احتياجات عملائنا.' NOT NULL
);
