/**
 * Seed sample funds + sectioned report cards (idempotent by slug).
 * Tops up existing funds to 15 listing cards when short.
 * Run: pnpm db:seed:funds
 */
import { asc, eq, sql } from "drizzle-orm";
import { getDb } from "../db/index.js";
import { fundReports, funds, fundsReportsSettings } from "../db/schema.js";
import { DEFAULT_FUNDS_REPORTS_SETTINGS } from "./schema.js";

const LISTING_CARD_TARGET = 15;

type SeedCard = {
  section: "voting_policy" | "terms_and_conditions" | "quarterly_disclosures";
  title: string;
  titleAr: string;
  date: string;
  dateAr: string;
  sortOrder: number;
};

function makeCards(fundEn: string, fundAr: string): SeedCard[] {
  const cards: SeedCard[] = [
    {
      section: "voting_policy",
      title: `${fundEn} — Voting Policy`,
      titleAr: `${fundAr} — سياسة التصويت`,
      date: "2024",
      dateAr: "٢٠٢٤",
      sortOrder: 0,
    },
    {
      section: "terms_and_conditions",
      title: `${fundEn} — Terms and Conditions`,
      titleAr: `${fundAr} — الشروط والأحكام`,
      date: "2024",
      dateAr: "٢٠٢٤",
      sortOrder: 0,
    },
  ];

  const quarters = [
    { en: "Q1", ar: "الربع الأول", y: "2025", yAr: "٢٠٢٥" },
    { en: "Q4", ar: "الربع الرابع", y: "2024", yAr: "٢٠٢٤" },
    { en: "Q3", ar: "الربع الثالث", y: "2024", yAr: "٢٠٢٤" },
    { en: "Q2", ar: "الربع الثاني", y: "2024", yAr: "٢٠٢٤" },
    { en: "Q1", ar: "الربع الأول", y: "2024", yAr: "٢٠٢٤" },
    { en: "Q4", ar: "الربع الرابع", y: "2023", yAr: "٢٠٢٣" },
    { en: "Q3", ar: "الربع الثالث", y: "2023", yAr: "٢٠٢٣" },
    { en: "Q2", ar: "الربع الثاني", y: "2023", yAr: "٢٠٢٣" },
    { en: "Q1", ar: "الربع الأول", y: "2023", yAr: "٢٠٢٣" },
    { en: "Q4", ar: "الربع الرابع", y: "2022", yAr: "٢٠٢٢" },
    { en: "Q3", ar: "الربع الثالث", y: "2022", yAr: "٢٠٢٢" },
    { en: "Q2", ar: "الربع الثاني", y: "2022", yAr: "٢٠٢٢" },
    { en: "Q1", ar: "الربع الأول", y: "2022", yAr: "٢٠٢٢" },
  ];

  quarters.forEach((q, i) => {
    cards.push({
      section: "quarterly_disclosures",
      title: `${fundEn} — ${q.en} ${q.y} Disclosure`,
      titleAr: `${fundAr} — إفصاح ${q.ar} ${q.yAr}`,
      date: `${q.en} ${q.y}`,
      dateAr: `${q.ar} ${q.yAr}`,
      sortOrder: i,
    });
  });

  return cards.slice(0, LISTING_CARD_TARGET);
}

const SEED_FUNDS = [
  {
    slug: "murabaha-fund",
    title: "Murabaha Fund",
    titleAr: "صندوق المرابحة",
    description:
      "Shariah-compliant money-market fund focused on capital preservation and stable, risk-conscious returns.",
    descriptionAr:
      "صندوق أسواق نقد متوافق مع الشريعة يركّز على الحفاظ على رأس المال وتحقيق عوائد مستقرة واعية بالمخاطر.",
    sortOrder: 0,
    cards: makeCards("Miyar Murabaha Fund", "صندوق معيار للمرابحة"),
  },
  {
    slug: "saudi-equity-fund",
    title: "Saudi Equity Fund",
    titleAr: "صندوق الأسهم السعودية",
    description:
      "Actively managed Saudi equity strategy built for long-term value creation within a disciplined investment process.",
    descriptionAr:
      "استراتيجية أسهم سعودية تُدار بفعالية لخلق قيمة طويلة الأجل ضمن عملية استثمار منضبطة.",
    sortOrder: 1,
    cards: makeCards("Miyar Saudi Equity Fund", "صندوق معيار للأسهم السعودية"),
  },
];

async function topUpCards(
  fundId: string,
  desired: SeedCard[],
): Promise<number> {
  const db = getDb();
  const existing = await db
    .select({
      title: fundReports.title,
      date: fundReports.date,
      section: fundReports.section,
    })
    .from(fundReports)
    .where(eq(fundReports.fundId, fundId))
    .orderBy(asc(fundReports.sortOrder));

  if (existing.length >= LISTING_CARD_TARGET) return 0;

  const keys = new Set(
    existing.map((r) => `${r.section}|${r.title}|${r.date}`),
  );
  const [{ maxSort }] = await db
    .select({
      maxSort: sql<number>`coalesce(max(${fundReports.sortOrder}), -1)`,
    })
    .from(fundReports)
    .where(eq(fundReports.fundId, fundId));

  let nextSort = Number(maxSort) + 1;
  const toInsert = desired
    .filter((card) => !keys.has(`${card.section}|${card.title}|${card.date}`))
    .slice(0, LISTING_CARD_TARGET - existing.length)
    .map((card) => {
      const row = {
        fundId,
        section: card.section,
        title: card.title,
        titleAr: card.titleAr,
        date: card.date,
        dateAr: card.dateAr,
        sortOrder: nextSort,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      nextSort += 1;
      return row;
    });

  if (toInsert.length === 0) return 0;
  await db.insert(fundReports).values(toInsert);
  return toInsert.length;
}

async function main() {
  const db = getDb();

  await db
    .insert(fundsReportsSettings)
    .values({ id: 1, ...DEFAULT_FUNDS_REPORTS_SETTINGS, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: fundsReportsSettings.id,
      set: { updatedAt: new Date() },
    });

  for (const fund of SEED_FUNDS) {
    const [existing] = await db
      .select({ id: funds.id })
      .from(funds)
      .where(eq(funds.slug, fund.slug))
      .limit(1);

    if (existing) {
      const added = await topUpCards(existing.id, fund.cards);
      console.log(
        added > 0
          ? `topped up ${fund.slug}: +${added} cards`
          : `skip fund (exists, already ${LISTING_CARD_TARGET}+ cards): ${fund.slug}`,
      );
      continue;
    }

    const now = new Date();
    const [created] = await db
      .insert(funds)
      .values({
        slug: fund.slug,
        title: fund.title,
        titleAr: fund.titleAr,
        description: fund.description,
        descriptionAr: fund.descriptionAr,
        isPublished: true,
        sortOrder: fund.sortOrder,
        createdAt: now,
        updatedAt: now,
      })
      .returning({ id: funds.id });

    await db.insert(fundReports).values(
      fund.cards.map((card) => ({
        fundId: created.id,
        section: card.section,
        title: card.title,
        titleAr: card.titleAr,
        date: card.date,
        dateAr: card.dateAr,
        sortOrder: card.sortOrder,
        createdAt: now,
        updatedAt: now,
      })),
    );
    console.log(`seeded fund: ${fund.slug} (${fund.cards.length} cards)`);
  }

  console.log("funds seed done");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
