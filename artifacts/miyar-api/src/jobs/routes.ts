import { asc, desc, eq } from "drizzle-orm";
import type { Context, Hono } from "hono";
import { isAdminAuthenticated } from "../admin/auth.js";
import { getDb } from "../db/index.js";
import { jobPosts, jobsSettings } from "../db/schema.js";
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

  /* PATCH preferred; PUT kept for older clients. */
  const saveJobsSettings = async (c: Context) => {
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
      await ensureSettings();
      const [row] = await db
        .update(jobsSettings)
        .set(payload)
        .where(eq(jobsSettings.id, 1))
        .returning();

      if (!row) {
        const [inserted] = await db
          .insert(jobsSettings)
          .values({ id: 1, ...payload })
          .returning();
        if (!inserted) {
          return c.json({ error: "Could not save settings" }, 500);
        }
        return c.json({ ok: true, settings: toSettingsPayload(inserted) });
      }

      return c.json({ ok: true, settings: toSettingsPayload(row) });
    } catch (e) {
      console.error("[admin jobs-settings] update failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not save settings" },
        500,
      );
    }
  };

  app.patch("/api/admin/jobs-settings", saveJobsSettings);
  app.put("/api/admin/jobs-settings", saveJobsSettings);

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

      const now = new Date();
      const [row] = await getDb()
        .insert(jobPosts)
        .values({
          referenceCode: parsed.data.referenceCode,
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
      const patch: Record<string, unknown> = { updatedAt: new Date() };
      if (data.referenceCode !== undefined) patch.referenceCode = data.referenceCode;
      if (data.title !== undefined) patch.title = data.title;
      if (data.titleAr !== undefined) patch.titleAr = data.titleAr || "";
      if (data.location !== undefined) patch.location = data.location;
      if (data.locationAr !== undefined) patch.locationAr = data.locationAr || "";
      if (data.employmentType !== undefined) {
        patch.employmentType = data.employmentType;
      }
      if (data.employmentTypeAr !== undefined) {
        patch.employmentTypeAr = data.employmentTypeAr || "";
      }
      if (data.summary !== undefined) patch.summary = data.summary;
      if (data.summaryAr !== undefined) patch.summaryAr = data.summaryAr || "";
      if (data.emailSubject !== undefined) patch.emailSubject = data.emailSubject;
      if (data.emailSubjectAr !== undefined) {
        patch.emailSubjectAr = data.emailSubjectAr || "";
      }
      if (data.emailBody !== undefined) patch.emailBody = data.emailBody;
      if (data.emailBodyAr !== undefined) patch.emailBodyAr = data.emailBodyAr || "";
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
