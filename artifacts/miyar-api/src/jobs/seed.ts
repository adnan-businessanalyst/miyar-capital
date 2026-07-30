/**
 * Ensure careers settings row + a sample published job (idempotent).
 * Run: pnpm db:seed:jobs
 */
import { eq } from "drizzle-orm";
import { getDb } from "../db/index.js";
import { jobPosts, jobsSettings } from "../db/schema.js";
import { DEFAULT_JOBS_SETTINGS } from "./schema.js";

const SAMPLE_REF = "MC-2026-001";

async function main() {
  const db = getDb();
  const now = new Date();

  await db
    .insert(jobsSettings)
    .values({ id: 1, ...DEFAULT_JOBS_SETTINGS, updatedAt: now })
    .onConflictDoNothing({ target: jobsSettings.id });

  const [existing] = await db
    .select({ id: jobPosts.id })
    .from(jobPosts)
    .where(eq(jobPosts.referenceCode, SAMPLE_REF))
    .limit(1);

  if (!existing) {
    await db.insert(jobPosts).values({
      referenceCode: SAMPLE_REF,
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
      emailSubject: "Application — Investment Analyst (MC-2026-001)",
      emailSubjectAr: "طلب توظيف — محلل استثمار (MC-2026-001)",
      emailBody:
        "Dear HR,\n\nI would like to apply for the Investment Analyst role (MC-2026-001).\n\nPlease find my CV attached.\n\nKind regards,",
      emailBodyAr:
        "السلام عليكم،\n\nأود التقديم على وظيفة محلل استثمار (MC-2026-001).\n\nمرفق السيرة الذاتية.\n\nمع التحية،",
      isPublished: true,
      sortOrder: 0,
      createdAt: now,
      updatedAt: now,
    });
    console.log("[jobs seed] inserted sample job", SAMPLE_REF);
  } else {
    console.log("[jobs seed] sample job already exists");
  }

  console.log("[jobs seed] done");
  process.exit(0);
}

main().catch((err) => {
  console.error("[jobs seed] failed", err);
  process.exit(1);
});
