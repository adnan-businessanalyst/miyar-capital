CREATE TABLE "news_articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"slug" varchar(200) NOT NULL,
	"title" varchar(500) NOT NULL,
	"title_ar" varchar(500),
	"date" varchar(80) NOT NULL,
	"date_ar" varchar(80),
	"blurb" text NOT NULL,
	"blurb_ar" text,
	"body" text NOT NULL,
	"body_ar" text,
	"image_url" varchar(500) DEFAULT '' NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "news_articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "news_settings" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"heading_en" varchar(300) DEFAULT 'News' NOT NULL,
	"heading_ar" varchar(300) DEFAULT 'الأخبار' NOT NULL,
	"intro_en" text DEFAULT 'News and updates from Miyar Capital.' NOT NULL,
	"intro_ar" text DEFAULT 'أخبار وتحديثات من معيار المالية.' NOT NULL,
	"empty_en" text DEFAULT 'No news articles at this time.' NOT NULL,
	"empty_ar" text DEFAULT 'لا توجد مقالات إخبارية في الوقت الحالي.' NOT NULL,
	"read_more_en" varchar(80) DEFAULT 'Read more' NOT NULL,
	"read_more_ar" varchar(80) DEFAULT 'اقرأ المزيد' NOT NULL,
	"back_label_en" varchar(120) DEFAULT 'Back to News' NOT NULL,
	"back_label_ar" varchar(120) DEFAULT 'العودة إلى الأخبار' NOT NULL
);
--> statement-breakpoint
INSERT INTO "news_settings" ("id") VALUES (1)
ON CONFLICT ("id") DO NOTHING;
--> statement-breakpoint
INSERT INTO "news_articles" (
	"slug", "title", "title_ar", "date", "date_ar", "blurb", "blurb_ar",
	"body", "body_ar", "image_url", "is_published", "sort_order"
) VALUES
(
	'miyar-capital-expands-asset-management-platform',
	'Miyar Capital Expands Its Asset Management Platform',
	'معيار المالية توسّع منصة إدارة الأصول',
	'12 March 2026',
	'١٢ مارس ٢٠٢٦',
	'New strategies across liquidity, equities, and private markets deepen our principal-minded offering for institutional and private clients.',
	'استراتيجيات جديدة عبر السيولة والأسهم والأسواق الخاصة تعمّق عرضنا القائم على القناعة للمؤسسات والعملاء من الأفراد.',
	'Miyar Capital continues to deepen its asset-management platform with a focus on principal-minded strategies across liquidity and fixed income, equities, real assets, and private markets.

The expansion reflects growing demand from institutional investors and family offices seeking CMA-regulated partners who underwrite conviction rather than product shelves.

Clients will benefit from clearer reporting frameworks, disciplined portfolio construction, and closer alignment between investment teams and investor objectives.',
	'تواصل معيار المالية تعميق منصة إدارة الأصول مع التركيز على استراتيجيات قائمة على القناعة عبر السيولة والدخل الثابت والأسهم والأصول الحقيقية والأسواق الخاصة.

يعكس التوسع الطلب المتزايد من المستثمرين المؤسسيين والمكاتب العائلية على شركاء مرخّصين من هيئة السوق المالية يبنون قناعات استثمارية لا مجرد قوائم منتجات.

سيستفيد العملاء من أطر تقارير أوضح وبناء محافظ منضبط ومواءمة أوثق بين فرق الاستثمار وأهداف المستثمرين.',
	'/media/content/service-asset-management.webp',
	true,
	0
),
(
	'investment-banking-advisory-outlook-2026',
	'Investment Banking: Advisory Outlook for 2026',
	'الخدمات المصرفية الاستثمارية: آفاق الاستشارات لعام ٢٠٢٦',
	'28 February 2026',
	'٢٨ فبراير ٢٠٢٦',
	'Our IB team shares perspectives on capital markets, M&A, and financing arrangements shaping Saudi corporate agendas this year.',
	'يشارك فريق الخدمات المصرفية الاستثمارية رؤاه حول أسواق رأس المال وعمليات الاندماج والاستحواذ وترتيبات التمويل التي تشكّل أجندات الشركات السعودية هذا العام.',
	'Saudi corporate agendas in 2026 continue to emphasise capital formation, strategic partnerships, and carefully sequenced financing.

Miyar Capital’s investment banking practice advises companies and shareholders across capital markets, mergers and acquisitions, and debt and financing arrangements.

We expect selective M&A and structured financing to remain active as sponsors seek partners who combine local market fluency with independent judgment.',
	'تواصل أجندات الشركات السعودية في عام ٢٠٢٦ التركيز على تكوين رأس المال والشراكات الاستراتيجية والتمويل المتسلسل بعناية.

تقدم ممارسة الخدمات المصرفية الاستثمارية في معيار المالية المشورة للشركات والمساهمين عبر أسواق رأس المال وعمليات الاندماج والاستحواذ وترتيبات الدين والتمويل.

نتوقع أن تظل عمليات الاندماج والاستحواذ الانتقائية والتمويل المنظّم نشطة مع سعي الرعاة لشركاء يجمعون بين فهم السوق المحلي والحكم المستقل.',
	'/media/content/service-investment-banking.webp',
	true,
	1
),
(
	'liquidity-and-fixed-income-strategies-update',
	'Liquidity & Fixed Income Strategies: Q1 Update',
	'استراتيجيات السيولة والدخل الثابت: تحديث الربع الأول',
	'10 February 2026',
	'١٠ فبراير ٢٠٢٦',
	'How our liquidity and fixed-income solutions are positioned for clients seeking stability alongside measured yield.',
	'كيف تُوضَع حلول السيولة والدخل الثابت للعملاء الباحثين عن الاستقرار إلى جانب عائد مدروس.',
	'Liquidity and fixed-income solutions remain a core pillar of Miyar Capital’s offering for clients who prioritise capital preservation and predictable cash flow.

In the first quarter, portfolios emphasised high-quality instruments, careful duration management, and Shariah-compliant structures aligned with CMA standards.

We continue to refine allocation frameworks so that liquidity sleeves complement longer-horizon equity and private-market exposures within client mandates.',
	'تظل حلول السيولة والدخل الثابت ركيزة أساسية في عرض معيار المالية للعملاء الذين يمنحون الأولوية للحفاظ على رأس المال والتدفق النقدي المتوقع.

في الربع الأول، ركّزت المحافظ على أدوات عالية الجودة وإدارة مدة دقيقة وهياكل متوافقة مع الشريعة ومتماشية مع معايير هيئة السوق المالية.

نواصل تحسين أطر التخصيص بحيث تكمّل شرائح السيولة تعرضات الأسهم والأسواق الخاصة ذات الأفق الأطول ضمن تفويضات العملاء.',
	'/media/content/pillar_liquidity.webp',
	true,
	2
),
(
	'private-markets-opportunities-for-qualified-investors',
	'Private Markets Opportunities for Qualified Investors',
	'فرص الأسواق الخاصة للمستثمرين المؤهلين',
	'22 January 2026',
	'٢٢ يناير ٢٠٢٦',
	'Illiquidity premium, governance, and access — what qualified investors should weigh when evaluating private market allocations.',
	'علاوة عدم السيولة والحوكمة والوصول — ما ينبغي للمستثمرين المؤهلين مراعاته عند تقييم تخصيصات الأسواق الخاصة.',
	'Private markets can offer diversification and access to opportunities not available in public markets, but they require careful underwriting of liquidity, governance, and manager alignment.

Miyar Capital works with qualified investors to evaluate private arrangements that fit long-term objectives and regulatory eligibility.

Official fund documents and suitability assessments remain the foundation of any private markets discussion — this update is informational and does not constitute an offer.',
	'يمكن أن توفّر الأسواق الخاصة تنويعًا ووصولًا إلى فرص غير متاحة في الأسواق العامة، لكنها تتطلب اكتتابًا دقيقًا للسيولة والحوكمة ومواءمة المدير.

تعمل معيار المالية مع المستثمرين المؤهلين لتقييم الترتيبات الخاصة التي تناسب الأهداف طويلة الأجل والأهلية التنظيمية.

تظل وثائق الصندوق الرسمية وتقييمات الملاءمة أساس أي نقاش حول الأسواق الخاصة — هذا التحديث معلوماتي ولا يشكّل عرضًا.',
	'/media/content/pillar_private_markets.webp',
	true,
	3
)
ON CONFLICT ("slug") DO NOTHING;
