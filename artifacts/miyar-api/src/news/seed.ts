/**
 * Seed news settings + sample articles (idempotent by slug).
 * Run: pnpm db:seed:news
 */
import { eq } from "drizzle-orm";
import { getDb } from "../db/index.js";
import { newsArticles, newsSettings } from "../db/schema.js";
import { DEFAULT_NEWS_SETTINGS } from "./schema.js";

const SEED_ARTICLES = [
  {
    slug: "miyar-capital-expands-asset-management-platform",
    title: "Miyar Capital Expands Its Asset Management Platform",
    titleAr: "معيار المالية توسّع منصة إدارة الأصول",
    date: "12 March 2026",
    dateAr: "١٢ مارس ٢٠٢٦",
    blurb:
      "New strategies across liquidity, equities, and private markets deepen our principal-minded offering for institutional and private clients.",
    blurbAr:
      "استراتيجيات جديدة عبر السيولة والأسهم والأسواق الخاصة تعمّق عرضنا القائم على القناعة للمؤسسات والعملاء من الأفراد.",
    body: [
      "Miyar Capital continues to deepen its asset-management platform with a focus on principal-minded strategies across liquidity and fixed income, equities, real assets, and private markets.",
      "The expansion reflects growing demand from institutional investors and family offices seeking CMA-regulated partners who underwrite conviction rather than product shelves.",
      "Clients will benefit from clearer reporting frameworks, disciplined portfolio construction, and closer alignment between investment teams and investor objectives.",
    ].join("\n\n"),
    bodyAr: [
      "تواصل معيار المالية تعميق منصة إدارة الأصول مع التركيز على استراتيجيات قائمة على القناعة عبر السيولة والدخل الثابت والأسهم والأصول الحقيقية والأسواق الخاصة.",
      "يعكس التوسع الطلب المتزايد من المستثمرين المؤسسيين والمكاتب العائلية على شركاء مرخّصين من هيئة السوق المالية يبنون قناعات استثمارية لا مجرد قوائم منتجات.",
      "سيستفيد العملاء من أطر تقارير أوضح وبناء محافظ منضبط ومواءمة أوثق بين فرق الاستثمار وأهداف المستثمرين.",
    ].join("\n\n"),
    imageUrl: "/media/content/service-asset-management.webp",
    sortOrder: 0,
  },
  {
    slug: "investment-banking-advisory-outlook-2026",
    title: "Investment Banking: Advisory Outlook for 2026",
    titleAr: "الخدمات المصرفية الاستثمارية: آفاق الاستشارات لعام ٢٠٢٦",
    date: "28 February 2026",
    dateAr: "٢٨ فبراير ٢٠٢٦",
    blurb:
      "Our IB team shares perspectives on capital markets, M&A, and financing arrangements shaping Saudi corporate agendas this year.",
    blurbAr:
      "يشارك فريق الخدمات المصرفية الاستثمارية رؤاه حول أسواق رأس المال وعمليات الاندماج والاستحواذ وترتيبات التمويل التي تشكّل أجندات الشركات السعودية هذا العام.",
    body: [
      "Saudi corporate agendas in 2026 continue to emphasise capital formation, strategic partnerships, and carefully sequenced financing.",
      "Miyar Capital’s investment banking practice advises companies and shareholders across capital markets, mergers and acquisitions, and debt and financing arrangements.",
      "We expect selective M&A and structured financing to remain active as sponsors seek partners who combine local market fluency with independent judgment.",
    ].join("\n\n"),
    bodyAr: [
      "تواصل أجندات الشركات السعودية في عام ٢٠٢٦ التركيز على تكوين رأس المال والشراكات الاستراتيجية والتمويل المتسلسل بعناية.",
      "تقدم ممارسة الخدمات المصرفية الاستثمارية في معيار المالية المشورة للشركات والمساهمين عبر أسواق رأس المال وعمليات الاندماج والاستحواذ وترتيبات الدين والتمويل.",
      "نتوقع أن تظل عمليات الاندماج والاستحواذ الانتقائية والتمويل المنظّم نشطة مع سعي الرعاة لشركاء يجمعون بين فهم السوق المحلي والحكم المستقل.",
    ].join("\n\n"),
    imageUrl: "/media/content/service-investment-banking.webp",
    sortOrder: 1,
  },
  {
    slug: "liquidity-and-fixed-income-strategies-update",
    title: "Liquidity & Fixed Income Strategies: Q1 Update",
    titleAr: "استراتيجيات السيولة والدخل الثابت: تحديث الربع الأول",
    date: "10 February 2026",
    dateAr: "١٠ فبراير ٢٠٢٦",
    blurb:
      "How our liquidity and fixed-income solutions are positioned for clients seeking stability alongside measured yield.",
    blurbAr:
      "كيف تُوضَع حلول السيولة والدخل الثابت للعملاء الباحثين عن الاستقرار إلى جانب عائد مدروس.",
    body: [
      "Liquidity and fixed-income solutions remain a core pillar of Miyar Capital’s offering for clients who prioritise capital preservation and predictable cash flow.",
      "In the first quarter, portfolios emphasised high-quality instruments, careful duration management, and Shariah-compliant structures aligned with CMA standards.",
      "We continue to refine allocation frameworks so that liquidity sleeves complement longer-horizon equity and private-market exposures within client mandates.",
    ].join("\n\n"),
    bodyAr: [
      "تظل حلول السيولة والدخل الثابت ركيزة أساسية في عرض معيار المالية للعملاء الذين يمنحون الأولوية للحفاظ على رأس المال والتدفق النقدي المتوقع.",
      "في الربع الأول، ركّزت المحافظ على أدوات عالية الجودة وإدارة مدة دقيقة وهياكل متوافقة مع الشريعة ومتماشية مع معايير هيئة السوق المالية.",
      "نواصل تحسين أطر التخصيص بحيث تكمّل شرائح السيولة تعرضات الأسهم والأسواق الخاصة ذات الأفق الأطول ضمن تفويضات العملاء.",
    ].join("\n\n"),
    imageUrl: "/media/content/pillar_liquidity.webp",
    sortOrder: 2,
  },
  {
    slug: "private-markets-opportunities-for-qualified-investors",
    title: "Private Markets Opportunities for Qualified Investors",
    titleAr: "فرص الأسواق الخاصة للمستثمرين المؤهلين",
    date: "22 January 2026",
    dateAr: "٢٢ يناير ٢٠٢٦",
    blurb:
      "Illiquidity premium, governance, and access — what qualified investors should weigh when evaluating private market allocations.",
    blurbAr:
      "علاوة عدم السيولة والحوكمة والوصول — ما ينبغي للمستثمرين المؤهلين مراعاته عند تقييم تخصيصات الأسواق الخاصة.",
    body: [
      "Private markets can offer diversification and access to opportunities not available in public markets, but they require careful underwriting of liquidity, governance, and manager alignment.",
      "Miyar Capital works with qualified investors to evaluate private arrangements that fit long-term objectives and regulatory eligibility.",
      "Official fund documents and suitability assessments remain the foundation of any private markets discussion — this update is informational and does not constitute an offer.",
    ].join("\n\n"),
    bodyAr: [
      "يمكن أن توفّر الأسواق الخاصة تنويعًا ووصولًا إلى فرص غير متاحة في الأسواق العامة، لكنها تتطلب اكتتابًا دقيقًا للسيولة والحوكمة ومواءمة المدير.",
      "تعمل معيار المالية مع المستثمرين المؤهلين لتقييم الترتيبات الخاصة التي تناسب الأهداف طويلة الأجل والأهلية التنظيمية.",
      "تظل وثائق الصندوق الرسمية وتقييمات الملاءمة أساس أي نقاش حول الأسواق الخاصة — هذا التحديث معلوماتي ولا يشكّل عرضًا.",
    ].join("\n\n"),
    imageUrl: "/media/content/pillar_private_markets.webp",
    sortOrder: 3,
  },
] as const;

async function main() {
  const db = getDb();
  const now = new Date();

  await db
    .insert(newsSettings)
    .values({ id: 1, ...DEFAULT_NEWS_SETTINGS, updatedAt: now })
    .onConflictDoNothing({ target: newsSettings.id });

  let inserted = 0;
  for (const article of SEED_ARTICLES) {
    const [existing] = await db
      .select({ id: newsArticles.id })
      .from(newsArticles)
      .where(eq(newsArticles.slug, article.slug))
      .limit(1);
    if (existing) continue;

    await db.insert(newsArticles).values({
      ...article,
      isPublished: true,
      createdAt: now,
      updatedAt: now,
    });
    inserted += 1;
  }

  console.log(`[news seed] inserted ${inserted} article(s)`);
  process.exit(0);
}

main().catch((err) => {
  console.error("[news seed] failed", err);
  process.exit(1);
});
