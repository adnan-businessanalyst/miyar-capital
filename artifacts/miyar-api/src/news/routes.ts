import { and, asc, desc, eq } from "drizzle-orm";
import type { Hono } from "hono";
import { isAdminAuthenticated } from "../admin/auth.js";
import { getDb } from "../db/index.js";
import { newsArticles, newsSettings } from "../db/schema.js";
import {
  DEFAULT_NEWS_SETTINGS,
  newsArticleSchema,
  newsArticleUpdateSchema,
  newsSettingsSchema,
  type NewsSettingsPayload,
} from "./schema.js";

type NewsListItem = {
  id: string;
  slug: string;
  title: string;
  titleAr: string | null;
  date: string;
  dateAr: string | null;
  blurb: string;
  blurbAr: string | null;
  body: string;
  bodyAr: string | null;
  imageUrl: string;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

const listColumns = {
  id: newsArticles.id,
  slug: newsArticles.slug,
  title: newsArticles.title,
  titleAr: newsArticles.titleAr,
  date: newsArticles.date,
  dateAr: newsArticles.dateAr,
  blurb: newsArticles.blurb,
  blurbAr: newsArticles.blurbAr,
  body: newsArticles.body,
  bodyAr: newsArticles.bodyAr,
  imageUrl: newsArticles.imageUrl,
  isPublished: newsArticles.isPublished,
  sortOrder: newsArticles.sortOrder,
  createdAt: newsArticles.createdAt,
  updatedAt: newsArticles.updatedAt,
};

function toListItem(row: {
  id: string;
  slug: string;
  title: string;
  titleAr: string | null;
  date: string;
  dateAr: string | null;
  blurb: string;
  blurbAr: string | null;
  body: string;
  bodyAr: string | null;
  imageUrl: string;
  isPublished: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}): NewsListItem {
  return {
    ...row,
    imageUrl: row.imageUrl || "",
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function toSettingsPayload(row: {
  headingEn: string;
  headingAr: string;
  introEn: string;
  introAr: string;
  emptyEn: string;
  emptyAr: string;
  readMoreEn: string;
  readMoreAr: string;
  backLabelEn: string;
  backLabelAr: string;
}): NewsSettingsPayload {
  return {
    headingEn: row.headingEn,
    headingAr: row.headingAr,
    introEn: row.introEn,
    introAr: row.introAr,
    emptyEn: row.emptyEn,
    emptyAr: row.emptyAr,
    readMoreEn: row.readMoreEn,
    readMoreAr: row.readMoreAr,
    backLabelEn: row.backLabelEn,
    backLabelAr: row.backLabelAr,
  };
}

async function ensureSettings(): Promise<NewsSettingsPayload> {
  const db = getDb();
  const [existing] = await db
    .select()
    .from(newsSettings)
    .where(eq(newsSettings.id, 1))
    .limit(1);

  if (existing) return toSettingsPayload(existing);

  const [created] = await db
    .insert(newsSettings)
    .values({
      id: 1,
      ...DEFAULT_NEWS_SETTINGS,
      updatedAt: new Date(),
    })
    .returning();

  return toSettingsPayload(created);
}

export function registerNewsRoutes(app: Hono) {
  app.get("/api/news", async (c) => {
    try {
      const settings = await ensureSettings();
      const rows = await getDb()
        .select(listColumns)
        .from(newsArticles)
        .where(eq(newsArticles.isPublished, true))
        .orderBy(asc(newsArticles.sortOrder), desc(newsArticles.createdAt));
      return c.json({
        ok: true,
        settings,
        articles: rows.map(toListItem),
      });
    } catch (e) {
      console.error("[news] list failed", e);
      return c.json({
        ok: true,
        settings: DEFAULT_NEWS_SETTINGS,
        articles: [],
      });
    }
  });

  app.get("/api/news/:slug", async (c) => {
    try {
      const slug = c.req.param("slug");
      const settings = await ensureSettings();
      const [row] = await getDb()
        .select(listColumns)
        .from(newsArticles)
        .where(
          and(eq(newsArticles.slug, slug), eq(newsArticles.isPublished, true)),
        )
        .limit(1);

      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({ ok: true, settings, article: toListItem(row) });
    } catch (e) {
      console.error("[news] get failed", e);
      return c.json({ error: "Unavailable" }, 500);
    }
  });

  app.get("/api/admin/news-settings", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const settings = await ensureSettings();
      return c.json({ ok: true, settings });
    } catch (e) {
      console.error("[admin news-settings] get failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Database unavailable" },
        500,
      );
    }
  });

  app.put("/api/admin/news-settings", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const json = await c.req.json().catch(() => null);
      const parsed = newsSettingsSchema.safeParse(json);
      if (!parsed.success) {
        return c.json(
          { error: parsed.error.issues[0]?.message ?? "Invalid settings" },
          400,
        );
      }

      const data = parsed.data;
      const payload = {
        headingEn: data.headingEn,
        headingAr: data.headingAr || "",
        introEn: data.introEn,
        introAr: data.introAr || "",
        emptyEn: data.emptyEn,
        emptyAr: data.emptyAr || "",
        readMoreEn: data.readMoreEn,
        readMoreAr: data.readMoreAr || "",
        backLabelEn: data.backLabelEn,
        backLabelAr: data.backLabelAr || "",
        updatedAt: new Date(),
      };

      const db = getDb();
      const [row] = await db
        .insert(newsSettings)
        .values({ id: 1, ...payload })
        .onConflictDoUpdate({
          target: newsSettings.id,
          set: payload,
        })
        .returning();

      if (!row) return c.json({ error: "Could not save settings" }, 500);
      return c.json({ ok: true, settings: toSettingsPayload(row) });
    } catch (e) {
      console.error("[admin news-settings] update failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not save settings" },
        500,
      );
    }
  });

  app.get("/api/admin/news", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const rows = await getDb()
        .select(listColumns)
        .from(newsArticles)
        .orderBy(asc(newsArticles.sortOrder), desc(newsArticles.createdAt));
      return c.json({ ok: true, articles: rows.map(toListItem) });
    } catch (e) {
      console.error("[admin news] list failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Database unavailable" },
        500,
      );
    }
  });

  app.post("/api/admin/news", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const json = await c.req.json().catch(() => null);
      const parsed = newsArticleSchema.safeParse(json);
      if (!parsed.success) {
        return c.json(
          { error: parsed.error.issues[0]?.message ?? "Invalid article data" },
          400,
        );
      }

      const now = new Date();
      const [row] = await getDb()
        .insert(newsArticles)
        .values({
          slug: parsed.data.slug,
          title: parsed.data.title,
          titleAr: parsed.data.titleAr || "",
          date: parsed.data.date,
          dateAr: parsed.data.dateAr || "",
          blurb: parsed.data.blurb,
          blurbAr: parsed.data.blurbAr || "",
          body: parsed.data.body,
          bodyAr: parsed.data.bodyAr || "",
          imageUrl: parsed.data.imageUrl || "",
          isPublished: parsed.data.isPublished ?? true,
          sortOrder: parsed.data.sortOrder ?? 0,
          createdAt: now,
          updatedAt: now,
        })
        .returning(listColumns);

      return c.json({ ok: true, article: toListItem(row) }, 201);
    } catch (e) {
      console.error("[admin news] create failed", e);
      const msg = e instanceof Error ? e.message : "Could not save article";
      if (/unique|duplicate/i.test(msg)) {
        return c.json({ error: "Slug already exists" }, 400);
      }
      return c.json({ error: msg }, 500);
    }
  });

  app.patch("/api/admin/news/:id", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const id = c.req.param("id");
      const json = await c.req.json().catch(() => null);
      const parsed = newsArticleUpdateSchema.safeParse(json);
      if (!parsed.success) {
        return c.json(
          { error: parsed.error.issues[0]?.message ?? "Invalid article data" },
          400,
        );
      }

      const data = parsed.data;
      const patch: Record<string, unknown> = { updatedAt: new Date() };
      if (data.slug !== undefined) patch.slug = data.slug;
      if (data.title !== undefined) patch.title = data.title;
      if (data.titleAr !== undefined) patch.titleAr = data.titleAr || "";
      if (data.date !== undefined) patch.date = data.date;
      if (data.dateAr !== undefined) patch.dateAr = data.dateAr || "";
      if (data.blurb !== undefined) patch.blurb = data.blurb;
      if (data.blurbAr !== undefined) patch.blurbAr = data.blurbAr || "";
      if (data.body !== undefined) patch.body = data.body;
      if (data.bodyAr !== undefined) patch.bodyAr = data.bodyAr || "";
      if (data.imageUrl !== undefined) patch.imageUrl = data.imageUrl;
      if (data.isPublished !== undefined) patch.isPublished = data.isPublished;
      if (data.sortOrder !== undefined) patch.sortOrder = data.sortOrder;

      const [row] = await getDb()
        .update(newsArticles)
        .set(patch)
        .where(eq(newsArticles.id, id))
        .returning(listColumns);

      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({ ok: true, article: toListItem(row) });
    } catch (e) {
      console.error("[admin news] update failed", e);
      const msg = e instanceof Error ? e.message : "Could not update article";
      if (/unique|duplicate/i.test(msg)) {
        return c.json({ error: "Slug already exists" }, 400);
      }
      return c.json({ error: msg }, 500);
    }
  });

  app.post("/api/admin/news/:id/visibility", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const id = c.req.param("id");
      const json = (await c.req.json().catch(() => null)) as {
        isPublished?: boolean;
      } | null;
      if (typeof json?.isPublished !== "boolean") {
        return c.json({ error: "isPublished boolean is required" }, 400);
      }

      const [row] = await getDb()
        .update(newsArticles)
        .set({ isPublished: json.isPublished, updatedAt: new Date() })
        .where(eq(newsArticles.id, id))
        .returning(listColumns);

      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({ ok: true, article: toListItem(row) });
    } catch (e) {
      console.error("[admin news] visibility failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not update visibility" },
        500,
      );
    }
  });

  app.delete("/api/admin/news/:id", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const id = c.req.param("id");
      const [row] = await getDb()
        .delete(newsArticles)
        .where(eq(newsArticles.id, id))
        .returning({ id: newsArticles.id });
      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({ ok: true });
    } catch (e) {
      console.error("[admin news] delete failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not delete article" },
        500,
      );
    }
  });
}
