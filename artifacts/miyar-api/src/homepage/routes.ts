import { eq } from "drizzle-orm";
import type { Hono } from "hono";
import { isAdminAuthenticated } from "../admin/auth.js";
import { getDb } from "../db/index.js";
import { homepageHero } from "../db/schema.js";
import { ensureArabicFields } from "../i18n/translate.js";
import {
  DEFAULT_HOMEPAGE_HERO,
  homepageHeroSchema,
  type HomepageHeroPayload,
} from "./schema.js";

function toPayload(row: {
  ctaShow: boolean;
  ctaHref: string;
  ctaLabelEn: string;
  ctaLabelAr: string;
  promoShow: boolean;
  promoHref: string;
  promoTitleEn: string;
  promoTitleAr: string;
  promoBodyEn: string;
  promoBodyAr: string;
}): HomepageHeroPayload {
  return {
    ctaShow: row.ctaShow,
    ctaHref: row.ctaHref,
    ctaLabelEn: row.ctaLabelEn,
    ctaLabelAr: row.ctaLabelAr,
    promoShow: row.promoShow,
    promoHref: row.promoHref,
    promoTitleEn: row.promoTitleEn,
    promoTitleAr: row.promoTitleAr,
    promoBodyEn: row.promoBodyEn,
    promoBodyAr: row.promoBodyAr,
  };
}

async function ensureRow(): Promise<HomepageHeroPayload> {
  const db = getDb();
  const [existing] = await db
    .select()
    .from(homepageHero)
    .where(eq(homepageHero.id, 1))
    .limit(1);

  if (existing) return toPayload(existing);

  const [created] = await db
    .insert(homepageHero)
    .values({
      id: 1,
      ...DEFAULT_HOMEPAGE_HERO,
      updatedAt: new Date(),
    })
    .returning();

  return toPayload(created);
}

export function registerHomepageRoutes(app: Hono) {
  app.get("/api/homepage-hero", async (c) => {
    try {
      const hero = await ensureRow();
      return c.json({ ok: true, hero });
    } catch (e) {
      console.error("[homepage-hero] get failed", e);
      return c.json({ ok: true, hero: DEFAULT_HOMEPAGE_HERO });
    }
  });

  app.get("/api/admin/homepage-hero", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const hero = await ensureRow();
      return c.json({ ok: true, hero });
    } catch (e) {
      console.error("[admin homepage-hero] get failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Database unavailable" },
        500,
      );
    }
  });

  app.put("/api/admin/homepage-hero", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const json = await c.req.json().catch(() => null);
      const parsed = homepageHeroSchema.safeParse(json);
      if (!parsed.success) {
        return c.json(
          { error: parsed.error.issues[0]?.message ?? "Invalid data" },
          400,
        );
      }

      const filled = await ensureArabicFields(
        {
          ctaLabelEn: parsed.data.ctaLabelEn,
          ctaLabelAr: parsed.data.ctaLabelAr || "",
          promoTitleEn: parsed.data.promoTitleEn,
          promoTitleAr: parsed.data.promoTitleAr || "",
          promoBodyEn: parsed.data.promoBodyEn,
          promoBodyAr: parsed.data.promoBodyAr || "",
        },
        [
          ["ctaLabelEn", "ctaLabelAr"],
          ["promoTitleEn", "promoTitleAr"],
          ["promoBodyEn", "promoBodyAr"],
        ],
      );

      const values = {
        ctaShow: parsed.data.ctaShow,
        ctaHref: parsed.data.ctaHref,
        ctaLabelEn: filled.ctaLabelEn,
        ctaLabelAr: filled.ctaLabelAr,
        promoShow: parsed.data.promoShow,
        promoHref: parsed.data.promoHref,
        promoTitleEn: filled.promoTitleEn,
        promoTitleAr: filled.promoTitleAr,
        promoBodyEn: filled.promoBodyEn,
        promoBodyAr: filled.promoBodyAr,
        updatedAt: new Date(),
      };

      await ensureRow();
      const [row] = await getDb()
        .update(homepageHero)
        .set(values)
        .where(eq(homepageHero.id, 1))
        .returning();

      return c.json({ ok: true, hero: toPayload(row) });
    } catch (e) {
      console.error("[admin homepage-hero] update failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not save settings" },
        500,
      );
    }
  });
}
