import { asc, desc, eq } from "drizzle-orm";
import type { Hono } from "hono";
import { isAdminAuthenticated } from "../admin/auth.js";
import { getDb } from "../db/index.js";
import { jobPosts, jobsSettings } from "../db/schema.js";
import { ensureArabicFields } from "../i18n/translate.js";
import {
  DEFAULT_JOBS_SETTINGS,
  jobPostSchema,
  jobPostUpdateSchema,
  jobsSettingsSchema,
  type JobsSettingsPayload,
} from "./schema.js";

type JobListItem = {
  id: string;
  referenceCode: string;
  title: string;
  titleAr: string | null;
  location: string;
  locationAr: string | null;
  employmentType: string;
  employmentTypeAr: string | null;
  summary: string;
  summaryAr: string | null;
  emailSubject: string;
  emailSubjectAr: string | null;
  emailBody: string;
  emailBodyAr: string | null;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

const listColumns = {
  id: jobPosts.id,
  referenceCode: jobPosts.referenceCode,
  title: jobPosts.title,
  titleAr: jobPosts.titleAr,
  location: jobPosts.location,
  locationAr: jobPosts.locationAr,
  employmentType: jobPosts.employmentType,
  employmentTypeAr: jobPosts.employmentTypeAr,
  summary: jobPosts.summary,
  summaryAr: jobPosts.summaryAr,
  emailSubject: jobPosts.emailSubject,
  emailSubjectAr: jobPosts.emailSubjectAr,
  emailBody: jobPosts.emailBody,
  emailBodyAr: jobPosts.emailBodyAr,
  isPublished: jobPosts.isPublished,
  sortOrder: jobPosts.sortOrder,
  createdAt: jobPosts.createdAt,
  updatedAt: jobPosts.updatedAt,
};

function toListItem(row: {
  id: string;
  referenceCode: string;
  title: string;
  titleAr: string | null;
  location: string;
  locationAr: string | null;
  employmentType: string;
  employmentTypeAr: string | null;
  summary: string;
  summaryAr: string | null;
  emailSubject: string;
  emailSubjectAr: string | null;
  emailBody: string;
  emailBodyAr: string | null;
  isPublished: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}): JobListItem {
  return {
    ...row,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function toSettingsPayload(row: {
  hrEmail: string;
  tagEn: string;
  tagAr: string;
  headingEn: string;
  headingAr: string;
  introEn: string;
  introAr: string;
  hrLabelEn: string;
  hrLabelAr: string;
  applyLabelEn: string;
  applyLabelAr: string;
  emptyEn: string;
  emptyAr: string;
  disclaimerEn: string;
  disclaimerAr: string;
}): JobsSettingsPayload {
  return {
    hrEmail: row.hrEmail,
    tagEn: row.tagEn,
    tagAr: row.tagAr,
    headingEn: row.headingEn,
    headingAr: row.headingAr,
    introEn: row.introEn,
    introAr: row.introAr,
    hrLabelEn: row.hrLabelEn,
    hrLabelAr: row.hrLabelAr,
    applyLabelEn: row.applyLabelEn,
    applyLabelAr: row.applyLabelAr,
    emptyEn: row.emptyEn,
    emptyAr: row.emptyAr,
    disclaimerEn: row.disclaimerEn,
    disclaimerAr: row.disclaimerAr,
  };
}

async function ensureSettings(): Promise<JobsSettingsPayload> {
  const db = getDb();
  const [existing] = await db
    .select()
    .from(jobsSettings)
    .where(eq(jobsSettings.id, 1))
    .limit(1);

  if (existing) return toSettingsPayload(existing);

  const [created] = await db
    .insert(jobsSettings)
    .values({
      id: 1,
      ...DEFAULT_JOBS_SETTINGS,
      updatedAt: new Date(),
    })
    .returning();

  return toSettingsPayload(created);
}

const arabicPairs = [
  ["title", "titleAr"],
  ["location", "locationAr"],
  ["employmentType", "employmentTypeAr"],
  ["summary", "summaryAr"],
  ["emailSubject", "emailSubjectAr"],
  ["emailBody", "emailBodyAr"],
] as const;

export function registerJobRoutes(app: Hono) {
  app.get("/api/jobs", async (c) => {
    try {
      const settings = await ensureSettings();
      const rows = await getDb()
        .select(listColumns)
        .from(jobPosts)
        .where(eq(jobPosts.isPublished, true))
        .orderBy(asc(jobPosts.sortOrder), desc(jobPosts.createdAt));
      return c.json({
        ok: true,
        settings,
        jobs: rows.map(toListItem),
      });
    } catch (e) {
      console.error("[jobs] list failed", e);
      return c.json({
        ok: true,
        settings: DEFAULT_JOBS_SETTINGS,
        jobs: [],
      });
    }
  });

  app.get("/api/admin/jobs-settings", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const settings = await ensureSettings();
      return c.json({ ok: true, settings });
    } catch (e) {
      console.error("[admin jobs-settings] get failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Database unavailable" },
        500,
      );
    }
  });

  app.put("/api/admin/jobs-settings", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const json = await c.req.json().catch(() => null);
      const parsed = jobsSettingsSchema.safeParse(json);
      if (!parsed.success) {
        return c.json(
          { error: parsed.error.issues[0]?.message ?? "Invalid settings" },
          400,
        );
      }

      /* Save as submitted — Arabic auto-fill is via the admin "Generate Arabic" button
         so a slow translate API cannot time out / fail the save. */
      const data = parsed.data;
      const payload = {
        hrEmail: data.hrEmail,
        tagEn: data.tagEn,
        tagAr: data.tagAr || "",
        headingEn: data.headingEn,
        headingAr: data.headingAr || "",
        introEn: data.introEn,
        introAr: data.introAr || "",
        hrLabelEn: data.hrLabelEn,
        hrLabelAr: data.hrLabelAr || "",
        applyLabelEn: data.applyLabelEn,
        applyLabelAr: data.applyLabelAr || "",
        emptyEn: data.emptyEn,
        emptyAr: data.emptyAr || "",
        disclaimerEn: data.disclaimerEn,
        disclaimerAr: data.disclaimerAr || "",
        updatedAt: new Date(),
      };

      const db = getDb();
      const [row] = await db
        .insert(jobsSettings)
        .values({ id: 1, ...payload })
        .onConflictDoUpdate({
          target: jobsSettings.id,
          set: payload,
        })
        .returning();

      if (!row) {
        return c.json({ error: "Could not save settings" }, 500);
      }

      return c.json({ ok: true, settings: toSettingsPayload(row) });
    } catch (e) {
      console.error("[admin jobs-settings] update failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not save settings" },
        500,
      );
    }
  });

  app.get("/api/admin/jobs", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const rows = await getDb()
        .select(listColumns)
        .from(jobPosts)
        .orderBy(asc(jobPosts.sortOrder), desc(jobPosts.createdAt));
      return c.json({ ok: true, jobs: rows.map(toListItem) });
    } catch (e) {
      console.error("[admin jobs] list failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Database unavailable" },
        500,
      );
    }
  });

  app.post("/api/admin/jobs", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const json = await c.req.json().catch(() => null);
      const parsed = jobPostSchema.safeParse(json);
      if (!parsed.success) {
        return c.json(
          { error: parsed.error.issues[0]?.message ?? "Invalid job data" },
          400,
        );
      }

      const filled = await ensureArabicFields(
        {
          title: parsed.data.title,
          titleAr: parsed.data.titleAr || "",
          location: parsed.data.location,
          locationAr: parsed.data.locationAr || "",
          employmentType: parsed.data.employmentType,
          employmentTypeAr: parsed.data.employmentTypeAr || "",
          summary: parsed.data.summary,
          summaryAr: parsed.data.summaryAr || "",
          emailSubject: parsed.data.emailSubject,
          emailSubjectAr: parsed.data.emailSubjectAr || "",
          emailBody: parsed.data.emailBody,
          emailBodyAr: parsed.data.emailBodyAr || "",
        },
        [...arabicPairs],
      );

      const now = new Date();
      const [row] = await getDb()
        .insert(jobPosts)
        .values({
          referenceCode: parsed.data.referenceCode,
          ...filled,
          isPublished: parsed.data.isPublished ?? true,
          sortOrder: parsed.data.sortOrder ?? 0,
          createdAt: now,
          updatedAt: now,
        })
        .returning(listColumns);

      return c.json({ ok: true, job: toListItem(row) }, 201);
    } catch (e) {
      console.error("[admin jobs] create failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not save job" },
        500,
      );
    }
  });

  app.patch("/api/admin/jobs/:id", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const id = c.req.param("id");
      const json = await c.req.json().catch(() => null);
      const parsed = jobPostUpdateSchema.safeParse(json);
      if (!parsed.success) {
        return c.json(
          { error: parsed.error.issues[0]?.message ?? "Invalid job data" },
          400,
        );
      }

      const data = parsed.data;
      const filled = await ensureArabicFields(
        {
          title: data.title || "",
          titleAr: data.titleAr || "",
          location: data.location || "",
          locationAr: data.locationAr || "",
          employmentType: data.employmentType || "",
          employmentTypeAr: data.employmentTypeAr || "",
          summary: data.summary || "",
          summaryAr: data.summaryAr || "",
          emailSubject: data.emailSubject || "",
          emailSubjectAr: data.emailSubjectAr || "",
          emailBody: data.emailBody || "",
          emailBodyAr: data.emailBodyAr || "",
        },
        [...arabicPairs],
      );

      const patch: Record<string, unknown> = { updatedAt: new Date() };
      if (data.referenceCode !== undefined) patch.referenceCode = data.referenceCode;
      if (data.title !== undefined) patch.title = filled.title;
      if (filled.titleAr) patch.titleAr = filled.titleAr;
      if (data.location !== undefined) patch.location = filled.location;
      if (filled.locationAr) patch.locationAr = filled.locationAr;
      if (data.employmentType !== undefined) {
        patch.employmentType = filled.employmentType;
      }
      if (filled.employmentTypeAr) {
        patch.employmentTypeAr = filled.employmentTypeAr;
      }
      if (data.summary !== undefined) patch.summary = filled.summary;
      if (filled.summaryAr) patch.summaryAr = filled.summaryAr;
      if (data.emailSubject !== undefined) patch.emailSubject = filled.emailSubject;
      if (filled.emailSubjectAr) patch.emailSubjectAr = filled.emailSubjectAr;
      if (data.emailBody !== undefined) patch.emailBody = filled.emailBody;
      if (filled.emailBodyAr) patch.emailBodyAr = filled.emailBodyAr;
      if (data.isPublished !== undefined) patch.isPublished = data.isPublished;
      if (data.sortOrder !== undefined) patch.sortOrder = data.sortOrder;

      const [row] = await getDb()
        .update(jobPosts)
        .set(patch)
        .where(eq(jobPosts.id, id))
        .returning(listColumns);

      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({ ok: true, job: toListItem(row) });
    } catch (e) {
      console.error("[admin jobs] update failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not update job" },
        500,
      );
    }
  });

  app.post("/api/admin/jobs/:id/visibility", async (c) => {
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
        .update(jobPosts)
        .set({ isPublished: json.isPublished, updatedAt: new Date() })
        .where(eq(jobPosts.id, id))
        .returning(listColumns);

      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({ ok: true, job: toListItem(row) });
    } catch (e) {
      console.error("[admin jobs] visibility failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not update visibility" },
        500,
      );
    }
  });

  app.delete("/api/admin/jobs/:id", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const id = c.req.param("id");
      const [row] = await getDb()
        .delete(jobPosts)
        .where(eq(jobPosts.id, id))
        .returning({ id: jobPosts.id });
      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({ ok: true });
    } catch (e) {
      console.error("[admin jobs] delete failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not delete job" },
        500,
      );
    }
  });
}
