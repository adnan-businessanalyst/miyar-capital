/**
 * Ensure careers settings row + a sample published job (idempotent by slug/ref).
 * Run: pnpm db:seed:jobs
 */
import { eq } from "drizzle-orm";
import { getDb } from "../db/index.js";
import { jobPosts, jobsSettings } from "../db/schema.js";
import { DEFAULT_JOBS_SETTINGS } from "./schema.js";

const SAMPLE = {
  slug: "investment-analyst",
  referenceCode: "MC-2026-001",
  title: "Investment Analyst",
  titleAr: "محلل استثمار",
  location: "Riyadh, Saudi Arabia",
  locationAr: "الرياض، المملكة العربية السعودية",
  employmentType: "Full-time",
  employmentTypeAr: "دوام كامل",
  summary:
    "Support portfolio construction and research across liquidity, equities, and private markets for institutional and private clients.",
  summaryAr:
    "دعم بناء المحافظ والبحث عبر السيولة والأسهم والأسواق الخاصة للمؤسسات والعملاء من الأفراد.",
  description:
    "Miyar Capital is hiring an Investment Analyst to support research and portfolio construction across liquidity, equities, and private markets.\n\nYou will work closely with senior investment professionals to prepare analysis, monitor markets, and support client-facing investment materials.\n\nKey responsibilities:\n• Conduct fundamental and relative-value research across assigned asset classes\n• Assist with portfolio construction, risk monitoring, and performance attribution\n• Prepare investment memos, models, and presentation materials\n• Track market developments and contribute to internal investment discussions\n\nWhat we look for:\n• Strong analytical skills and attention to detail\n• Clear written and verbal communication in English (Arabic is an advantage)\n• Interest in Shariah-compliant investing and Saudi capital markets\n• Bachelor’s degree in finance, economics, or a related field",
  descriptionAr:
    "توظّف معيار المالية محلل استثمار لدعم البحث وبناء المحافظ عبر السيولة والأسهم والأسواق الخاصة.\n\nستعمل عن قرب مع كبار المختصين في الاستثمار لإعداد التحليلات ومتابعة الأسواق ودعم المواد الاستثمارية الموجهة للعملاء.\n\nالمسؤوليات الرئيسية:\n• إجراء أبحاث أساسية ونسبية عبر فئات الأصول المسندة\n• المساعدة في بناء المحافظ ومراقبة المخاطر وعزو الأداء\n• إعداد مذكرات الاستثمار والنماذج والعروض التقديمية\n• متابعة تطورات الأسواق والمساهمة في النقاشات الاستثمارية الداخلية\n\nما نبحث عنه:\n• مهارات تحليلية قوية ودقة في التفاصيل\n• تواصل واضح كتابةً وشفهيًا باللغة الإنجليزية (والعربية ميزة)\n• اهتمام بالاستثمار المتوافق مع الشريعة وأسواق رأس المال السعودية\n• درجة البكالوريوس في المالية أو الاقتصاد أو تخصص ذي صلة",
  howToApply:
    "To apply, click Apply by email below. Your mail client will open with the required subject line and message body already filled in.\n\nAttach your CV (PDF preferred). Do not change the email subject or body — applications with altered subject or body may not be processed.\n\nSend your application to our Human Resources team. We will review complete applications and contact shortlisted candidates.",
  howToApplyAr:
    "للتقديم، انقر زر «قدّم عبر البريد» أدناه. سيفتح برنامج البريد مع موضوع الرسالة ونصها المطلوبين جاهزين.\n\nأرفق سيرتك الذاتية (يفضّل PDF). لا تغيّر موضوع الرسالة أو نصها — قد لا تُعالَج الطلبات ذات الموضوع أو النص المعدّل.\n\nأرسل طلبك إلى فريق الموارد البشرية. سنراجع الطلبات المكتملة ونتواصل مع المرشحين المختارين.",
  emailSubject: "Application — Investment Analyst (MC-2026-001)",
  emailSubjectAr: "طلب توظيف — محلل استثمار (MC-2026-001)",
  emailBody:
    "Dear HR,\n\nI would like to apply for the Investment Analyst role (MC-2026-001).\n\nPlease find my CV attached.\n\nKind regards,",
  emailBodyAr:
    "السلام عليكم،\n\nأود التقديم على وظيفة محلل استثمار (MC-2026-001).\n\nمرفق السيرة الذاتية.\n\nمع التحية،",
};

async function main() {
  const db = getDb();
  const now = new Date();

  await db
    .insert(jobsSettings)
    .values({ id: 1, ...DEFAULT_JOBS_SETTINGS, updatedAt: now })
    .onConflictDoUpdate({
      target: jobsSettings.id,
      set: {
        introEn: DEFAULT_JOBS_SETTINGS.introEn,
        introAr: DEFAULT_JOBS_SETTINGS.introAr,
        updatedAt: now,
      },
    });

  const [bySlug] = await db
    .select({ id: jobPosts.id })
    .from(jobPosts)
    .where(eq(jobPosts.slug, SAMPLE.slug))
    .limit(1);

  const [byRef] = bySlug
    ? [null]
    : await db
        .select({ id: jobPosts.id })
        .from(jobPosts)
        .where(eq(jobPosts.referenceCode, SAMPLE.referenceCode))
        .limit(1);

  const existingId = bySlug?.id ?? byRef?.id;

  if (existingId) {
    await db
      .update(jobPosts)
      .set({
        slug: SAMPLE.slug,
        title: SAMPLE.title,
        titleAr: SAMPLE.titleAr,
        location: SAMPLE.location,
        locationAr: SAMPLE.locationAr,
        employmentType: SAMPLE.employmentType,
        employmentTypeAr: SAMPLE.employmentTypeAr,
        summary: SAMPLE.summary,
        summaryAr: SAMPLE.summaryAr,
        description: SAMPLE.description,
        descriptionAr: SAMPLE.descriptionAr,
        howToApply: SAMPLE.howToApply,
        howToApplyAr: SAMPLE.howToApplyAr,
        emailSubject: SAMPLE.emailSubject,
        emailSubjectAr: SAMPLE.emailSubjectAr,
        emailBody: SAMPLE.emailBody,
        emailBodyAr: SAMPLE.emailBodyAr,
        isPublished: true,
        updatedAt: now,
      })
      .where(eq(jobPosts.id, existingId));
    console.log("[jobs seed] updated sample job", SAMPLE.slug);
  } else {
    await db.insert(jobPosts).values({
      ...SAMPLE,
      isPublished: true,
      sortOrder: 0,
      createdAt: now,
      updatedAt: now,
    });
    console.log("[jobs seed] inserted sample job", SAMPLE.slug);
  }

  console.log("[jobs seed] done");
  process.exit(0);
}

main().catch((err) => {
  console.error("[jobs seed] failed", err);
  process.exit(1);
});
