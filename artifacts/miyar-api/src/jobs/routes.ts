import { and, asc, desc, eq } from "drizzle-orm";
import type { Context, Hono } from "hono";
import { isAdminAuthenticated } from "../admin/auth.js";
import { rateLimit } from "../contact/rateLimit.js";
import { verifyRecaptcha } from "../contact/recaptcha.js";
import { getDb } from "../db/index.js";
import { jobApplications, jobPosts, jobsSettings } from "../db/schema.js";
import { clientIp } from "../http/clientIp.js";
import {
  isJobApplyEmailConfigured,
  sendJobApplyEmail,
} from "./applyMail.js";
import { parseJobApplyFields } from "./applySchema.js";
import { validateJobCv } from "./cv.js";
import { scanUpload } from "./scan.js";
import {
  DEFAULT_JOBS_SETTINGS,
  jobPostSchema,
  jobPostUpdateSchema,
  jobsSettingsSchema,
  type JobsSettingsPayload,
} from "./schema.js";

type JobListItem = {
  id: string;
  slug: string;
  referenceCode: string;
  title: string;
  titleAr: string | null;
  location: string;
  locationAr: string | null;
  employmentType: string;
  employmentTypeAr: string | null;
  summary: string;
  summaryAr: string | null;
  description: string;
  descriptionAr: string | null;
  howToApply: string;
  howToApplyAr: string | null;
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
  slug: jobPosts.slug,
  referenceCode: jobPosts.referenceCode,
  title: jobPosts.title,
  titleAr: jobPosts.titleAr,
  location: jobPosts.location,
  locationAr: jobPosts.locationAr,
  employmentType: jobPosts.employmentType,
  employmentTypeAr: jobPosts.employmentTypeAr,
  summary: jobPosts.summary,
  summaryAr: jobPosts.summaryAr,
  description: jobPosts.description,
  descriptionAr: jobPosts.descriptionAr,
  howToApply: jobPosts.howToApply,
  howToApplyAr: jobPosts.howToApplyAr,
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
  slug: string;
  referenceCode: string;
  title: string;
  titleAr: string | null;
  location: string;
  locationAr: string | null;
  employmentType: string;
  employmentTypeAr: string | null;
  summary: string;
  summaryAr: string | null;
  description: string;
  descriptionAr: string | null;
  howToApply: string;
  howToApplyAr: string | null;
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

  app.get("/api/jobs/:slug", async (c) => {
    try {
      const slug = c.req.param("slug");
      const settings = await ensureSettings();
      const [row] = await getDb()
        .select(listColumns)
        .from(jobPosts)
        .where(and(eq(jobPosts.slug, slug), eq(jobPosts.isPublished, true)))
        .limit(1);
      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({
        ok: true,
        settings,
        job: toListItem(row),
      });
    } catch (e) {
      console.error("[jobs] get by slug failed", e);
      return c.json({ error: "Not found" }, 404);
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
          slug: parsed.data.slug,
          referenceCode: parsed.data.referenceCode,
          title: parsed.data.title,
          titleAr: parsed.data.titleAr || "",
          location: parsed.data.location,
          locationAr: parsed.data.locationAr || "",
          employmentType: parsed.data.employmentType,
          employmentTypeAr: parsed.data.employmentTypeAr || "",
          summary: parsed.data.summary,
          summaryAr: parsed.data.summaryAr || "",
          description: parsed.data.description,
          descriptionAr: parsed.data.descriptionAr || "",
          howToApply: parsed.data.howToApply,
          howToApplyAr: parsed.data.howToApplyAr || "",
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
      const msg = e instanceof Error ? e.message : "Could not save job";
      if (/unique|duplicate/i.test(msg)) {
        return c.json({ error: "Slug already exists" }, 400);
      }
      return c.json({ error: msg }, 500);
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
      if (data.slug !== undefined) patch.slug = data.slug;
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
      if (data.description !== undefined) patch.description = data.description;
      if (data.descriptionAr !== undefined) {
        patch.descriptionAr = data.descriptionAr || "";
      }
      if (data.howToApply !== undefined) patch.howToApply = data.howToApply;
      if (data.howToApplyAr !== undefined) {
        patch.howToApplyAr = data.howToApplyAr || "";
      }
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
      const msg = e instanceof Error ? e.message : "Could not update job";
      if (/unique|duplicate/i.test(msg)) {
        return c.json({ error: "Slug already exists" }, 400);
      }
      return c.json({ error: msg }, 500);
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

  // ── Public Apply form ───────────────────────────────────────────────
  app.post("/api/jobs/apply", async (c) => {
    try {
      const ip = clientIp(c);
      const limited = rateLimit(`job-apply:${ip}`);
      if (!limited.ok) {
        c.header("Retry-After", String(limited.retryAfterSec));
        return c.json(
          { ok: false, error: "Too many requests. Please try again shortly." },
          429,
        );
      }

      const contentType = c.req.header("content-type") || "";
      if (!contentType.includes("multipart/form-data")) {
        return c.json(
          { ok: false, error: "Multipart form data with a PDF CV is required." },
          400,
        );
      }

      const body = await c.req.parseBody({ all: true });
      const fields: Record<string, unknown> = {};
      let rawFile: File | null = null;

      for (const [key, value] of Object.entries(body)) {
        if (key === "cv" || key === "attachment") {
          const files = Array.isArray(value)
            ? value.filter((v) => v instanceof File)
            : value instanceof File
              ? [value]
              : [];
          if (files.length > 1) {
            return c.json(
              { ok: false, error: "Only one PDF file is allowed." },
              400,
            );
          }
          if (files[0] instanceof File) rawFile = files[0];
          continue;
        }
        if (typeof value === "string") fields[key] = value;
        else if (Array.isArray(value) && typeof value[0] === "string") {
          fields[key] = value[0];
        }
      }

      const parsed = parseJobApplyFields(fields);
      if (!parsed.success) {
        return c.json(
          {
            ok: false,
            error: parsed.error.issues[0]?.message ?? "Invalid form data",
          },
          400,
        );
      }
      const payload = parsed.data;

      const cvResult = await validateJobCv(rawFile, rawFile?.name);
      if (!cvResult.ok) {
        return c.json({ ok: false, error: cvResult.error }, 400);
      }
      const cv = cvResult.cv;

      const scan = await scanUpload({
        buffer: cv.buffer,
        fileName: cv.fileName,
        mimeType: cv.mimeType,
      });
      if (scan.status === "infected") {
        return c.json(
          {
            ok: false,
            error: "CV rejected by security scan. Please upload a clean PDF.",
          },
          400,
        );
      }

      const captchaOk = await verifyRecaptcha(payload.recaptchaToken, ip);
      if (!captchaOk) {
        return c.json(
          { ok: false, error: "Captcha verification failed. Please try again." },
          400,
        );
      }

      // Confirm job exists / is published when slug matches.
      const db = getDb();
      const [job] = await db
        .select({
          id: jobPosts.id,
          slug: jobPosts.slug,
          title: jobPosts.title,
          referenceCode: jobPosts.referenceCode,
          isPublished: jobPosts.isPublished,
        })
        .from(jobPosts)
        .where(eq(jobPosts.slug, payload.jobSlug))
        .limit(1);

      if (!job || !job.isPublished) {
        return c.json(
          { ok: false, error: "This job posting is not available." },
          400,
        );
      }

      const createdAt = new Date();
      const scannedAt = scan.status === "clean" ? createdAt : null;

      const [row] = await db
        .insert(jobApplications)
        .values({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          phone: payload.phone,
          message: payload.message,
          jobId: job.id,
          jobSlug: job.slug,
          jobTitle: payload.jobTitle.trim() || job.title,
          jobReference: payload.jobReference.trim() || job.referenceCode,
          sourcePage: payload.sourcePage,
          status: "new",
          ip,
          userAgent: c.req.header("user-agent")?.slice(0, 500) ?? null,
          createdAt,
          cvName: cv.fileName,
          cvMime: cv.mimeType,
          cvSize: cv.size,
          cvData: cv.buffer,
          scanStatus: scan.status,
          scanDetail: scan.detail ?? null,
          scanProvider: scan.provider ?? null,
          scannedAt,
        })
        .returning({
          id: jobApplications.id,
          createdAt: jobApplications.createdAt,
        });

      // Always persist first. SMTP is optional and must not block CMS.
      if (isJobApplyEmailConfigured()) {
        void sendJobApplyEmail(
          {
            ...payload,
            jobTitle: payload.jobTitle.trim() || job.title,
            jobReference: payload.jobReference.trim() || job.referenceCode,
          },
          { id: row.id, createdAt: row.createdAt },
          cv,
          scan,
        ).catch((mailErr) => {
          console.error("[job-apply] email failed", mailErr);
        });
      }

      return c.json({ ok: true, id: row.id });
    } catch (err) {
      console.error("[job-apply] error", err);
      const message =
        err instanceof Error && err.message.includes("DATABASE_URL")
          ? "Form service is temporarily unavailable."
          : "Something went wrong. Please try again.";
      return c.json({ ok: false, error: message }, 500);
    }
  });

  // ── Admin applications ──────────────────────────────────────────────
  app.get("/api/admin/applications", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const rows = await getDb()
        .select({
          id: jobApplications.id,
          createdAt: jobApplications.createdAt,
          firstName: jobApplications.firstName,
          lastName: jobApplications.lastName,
          email: jobApplications.email,
          phone: jobApplications.phone,
          jobTitle: jobApplications.jobTitle,
          jobReference: jobApplications.jobReference,
          jobSlug: jobApplications.jobSlug,
          status: jobApplications.status,
          scanStatus: jobApplications.scanStatus,
          cvName: jobApplications.cvName,
        })
        .from(jobApplications)
        .orderBy(desc(jobApplications.createdAt))
        .limit(200);
      return c.json({
        ok: true,
        applications: rows.map((r) => ({
          ...r,
          createdAt: r.createdAt.toISOString(),
          name: `${r.firstName} ${r.lastName}`.trim(),
        })),
      });
    } catch (e) {
      console.error("[admin applications] list failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Database unavailable" },
        500,
      );
    }
  });

  app.get("/api/admin/applications/:id", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    const id = c.req.param("id");
    const [row] = await getDb()
      .select({
        id: jobApplications.id,
        createdAt: jobApplications.createdAt,
        firstName: jobApplications.firstName,
        lastName: jobApplications.lastName,
        email: jobApplications.email,
        phone: jobApplications.phone,
        message: jobApplications.message,
        jobId: jobApplications.jobId,
        jobSlug: jobApplications.jobSlug,
        jobTitle: jobApplications.jobTitle,
        jobReference: jobApplications.jobReference,
        sourcePage: jobApplications.sourcePage,
        status: jobApplications.status,
        ip: jobApplications.ip,
        userAgent: jobApplications.userAgent,
        cvName: jobApplications.cvName,
        cvMime: jobApplications.cvMime,
        cvSize: jobApplications.cvSize,
        scanStatus: jobApplications.scanStatus,
        scanDetail: jobApplications.scanDetail,
        scanProvider: jobApplications.scanProvider,
        scannedAt: jobApplications.scannedAt,
      })
      .from(jobApplications)
      .where(eq(jobApplications.id, id))
      .limit(1);
    if (!row) return c.json({ error: "Not found" }, 404);
    return c.json({
      ok: true,
      application: {
        ...row,
        createdAt: row.createdAt.toISOString(),
        scannedAt: row.scannedAt?.toISOString() ?? null,
        name: `${row.firstName} ${row.lastName}`.trim(),
      },
    });
  });

  app.get("/api/admin/applications/:id/cv", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    const id = c.req.param("id");
    const [row] = await getDb()
      .select({
        cvName: jobApplications.cvName,
        cvMime: jobApplications.cvMime,
        cvData: jobApplications.cvData,
      })
      .from(jobApplications)
      .where(eq(jobApplications.id, id))
      .limit(1);
    if (!row?.cvData || !row.cvName) {
      return c.json({ error: "Not found" }, 404);
    }
    const safeName = row.cvName.replace(/[/\\?%*:|"<>]/g, "_");
    c.header("Content-Type", row.cvMime || "application/pdf");
    c.header("Content-Disposition", `attachment; filename="${safeName}"`);
    c.header("X-Content-Type-Options", "nosniff");
    return c.body(new Uint8Array(row.cvData));
  });

  app.post("/api/admin/applications/:id/read", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    const id = c.req.param("id");
    await getDb()
      .update(jobApplications)
      .set({ status: "read" })
      .where(eq(jobApplications.id, id));
    return c.json({ ok: true });
  });
}
