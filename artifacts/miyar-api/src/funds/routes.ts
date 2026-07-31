import { and, asc, desc, eq, inArray } from "drizzle-orm";
import type { Hono } from "hono";
import { isAdminAuthenticated } from "../admin/auth.js";
import { getDb } from "../db/index.js";
import { fundReports, funds, fundsReportsSettings } from "../db/schema.js";
import {
  DEFAULT_FUNDS_REPORTS_SETTINGS,
  fundReportMetaSchema,
  fundReportUpdateSchema,
  fundSchema,
  fundUpdateSchema,
  fundsReportsSettingsSchema,
  isPdfUpload,
  MAX_REPORT_BYTES,
  sanitizeDownloadName,
  type FundsReportsSettingsPayload,
} from "./schema.js";

type FundListItem = {
  id: string;
  slug: string;
  title: string;
  titleAr: string | null;
  description: string;
  descriptionAr: string | null;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  reportCount: number;
};

type FundReportListItem = {
  id: string;
  fundId: string;
  section: string;
  title: string;
  titleAr: string | null;
  date: string;
  dateAr: string | null;
  fileName: string | null;
  fileNameAr: string | null;
  fileSize: number | null;
  fileSizeAr: number | null;
  hasFile: boolean;
  hasArabicFile: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  fileUrl: string | null;
  fileUrlAr: string | null;
};

const fundColumns = {
  id: funds.id,
  slug: funds.slug,
  title: funds.title,
  titleAr: funds.titleAr,
  description: funds.description,
  descriptionAr: funds.descriptionAr,
  isPublished: funds.isPublished,
  sortOrder: funds.sortOrder,
  createdAt: funds.createdAt,
  updatedAt: funds.updatedAt,
};

const reportMetaColumns = {
  id: fundReports.id,
  fundId: fundReports.fundId,
  section: fundReports.section,
  title: fundReports.title,
  titleAr: fundReports.titleAr,
  date: fundReports.date,
  dateAr: fundReports.dateAr,
  fileName: fundReports.fileName,
  fileNameAr: fundReports.fileNameAr,
  fileSize: fundReports.fileSize,
  fileSizeAr: fundReports.fileSizeAr,
  sortOrder: fundReports.sortOrder,
  createdAt: fundReports.createdAt,
  updatedAt: fundReports.updatedAt,
};

function toReportItem(row: {
  id: string;
  fundId: string;
  section: string;
  title: string;
  titleAr: string | null;
  date: string;
  dateAr: string | null;
  fileName: string | null;
  fileNameAr: string | null;
  fileSize: number | null;
  fileSizeAr: number | null;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}): FundReportListItem {
  const hasFile = Boolean(row.fileSize && row.fileSize > 0);
  const hasArabicFile = Boolean(row.fileSizeAr && row.fileSizeAr > 0);
  return {
    id: row.id,
    fundId: row.fundId,
    section: row.section,
    title: row.title,
    titleAr: row.titleAr,
    date: row.date,
    dateAr: row.dateAr,
    fileName: row.fileName,
    fileNameAr: row.fileNameAr,
    fileSize: row.fileSize,
    fileSizeAr: row.fileSizeAr,
    hasFile: hasFile || hasArabicFile,
    hasArabicFile,
    sortOrder: row.sortOrder,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    fileUrl: hasFile || hasArabicFile ? `/api/fund-reports/${row.id}/file` : null,
    fileUrlAr: hasArabicFile
      ? `/api/fund-reports/${row.id}/file?lang=ar`
      : null,
  };
}

function toSettingsPayload(row: {
  headingEn: string;
  headingAr: string;
  crumbEn: string;
  crumbAr: string;
  introEn: string;
  introAr: string;
  emptyEn: string;
  emptyAr: string;
  viewReportsEn: string;
  viewReportsAr: string;
  childCrumbReportsEn: string;
  childCrumbReportsAr: string;
  votingPolicyEn: string;
  votingPolicyAr: string;
  termsEn: string;
  termsAr: string;
  quarterlyEn: string;
  quarterlyAr: string;
}): FundsReportsSettingsPayload {
  return {
    headingEn: row.headingEn,
    headingAr: row.headingAr,
    crumbEn: row.crumbEn,
    crumbAr: row.crumbAr,
    introEn: row.introEn,
    introAr: row.introAr,
    emptyEn: row.emptyEn,
    emptyAr: row.emptyAr,
    viewReportsEn: row.viewReportsEn,
    viewReportsAr: row.viewReportsAr,
    childCrumbReportsEn: row.childCrumbReportsEn,
    childCrumbReportsAr: row.childCrumbReportsAr,
    votingPolicyEn: row.votingPolicyEn,
    votingPolicyAr: row.votingPolicyAr,
    termsEn: row.termsEn,
    termsAr: row.termsAr,
    quarterlyEn: row.quarterlyEn,
    quarterlyAr: row.quarterlyAr,
  };
}

async function ensureSettings(): Promise<FundsReportsSettingsPayload> {
  const db = getDb();
  const [existing] = await db
    .select()
    .from(fundsReportsSettings)
    .where(eq(fundsReportsSettings.id, 1))
    .limit(1);
  if (existing) return toSettingsPayload(existing);

  const [created] = await db
    .insert(fundsReportsSettings)
    .values({ id: 1, ...DEFAULT_FUNDS_REPORTS_SETTINGS, updatedAt: new Date() })
    .returning();
  return toSettingsPayload(created);
}

async function reportCountsByFund(
  fundIds: string[],
): Promise<Map<string, number>> {
  const map = new Map<string, number>();
  if (fundIds.length === 0) return map;
  const rows = await getDb()
    .select({
      fundId: fundReports.fundId,
      id: fundReports.id,
    })
    .from(fundReports)
    .where(inArray(fundReports.fundId, fundIds));
  for (const row of rows) {
    map.set(row.fundId, (map.get(row.fundId) ?? 0) + 1);
  }
  return map;
}

async function pdfFromBody(
  body: Record<string, unknown>,
  field: string,
): Promise<{ ok: true; buffer: Buffer | null; fileName: string } | { ok: false; error: string }> {
  const file = body[field];
  if (!(file instanceof File) || file.size === 0) {
    return { ok: true, buffer: null, fileName: "" };
  }
  if (file.size > MAX_REPORT_BYTES) {
    return { ok: false, error: `${field} exceeds 20 MB limit` };
  }
  if (!isPdfUpload(file, file.name)) {
    return { ok: false, error: `${field} must be a PDF` };
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  return { ok: true, buffer, fileName: file.name };
}

export function registerFundRoutes(app: Hono) {
  /* ── Public ───────────────────────────────────────────────────── */

  app.get("/api/funds", async (c) => {
    try {
      const settings = await ensureSettings();
      const rows = await getDb()
        .select(fundColumns)
        .from(funds)
        .where(eq(funds.isPublished, true))
        .orderBy(asc(funds.sortOrder), desc(funds.createdAt));

      const fundIds = rows.map((r) => r.id);
      const counts = await reportCountsByFund(fundIds);
      const reportRows =
        fundIds.length === 0
          ? []
          : await getDb()
              .select(reportMetaColumns)
              .from(fundReports)
              .where(inArray(fundReports.fundId, fundIds))
              .orderBy(asc(fundReports.sortOrder), desc(fundReports.createdAt));

      const byFund = new Map<string, FundReportListItem[]>();
      for (const r of reportRows) {
        const list = byFund.get(r.fundId) ?? [];
        list.push(toReportItem(r));
        byFund.set(r.fundId, list);
      }

      return c.json({
        ok: true,
        settings,
        funds: rows.map((row) => ({
          id: row.id,
          slug: row.slug,
          title: row.title,
          titleAr: row.titleAr,
          description: row.description,
          descriptionAr: row.descriptionAr,
          isPublished: row.isPublished,
          sortOrder: row.sortOrder,
          createdAt: row.createdAt.toISOString(),
          updatedAt: row.updatedAt.toISOString(),
          reportCount: counts.get(row.id) ?? 0,
          reports: byFund.get(row.id) ?? [],
        })),
      });
    } catch (e) {
      console.error("[funds] list failed", e);
      return c.json({
        ok: true,
        settings: DEFAULT_FUNDS_REPORTS_SETTINGS,
        funds: [],
      });
    }
  });

  app.get("/api/funds/:slug", async (c) => {
    try {
      const slug = c.req.param("slug");
      const settings = await ensureSettings();
      const [row] = await getDb()
        .select(fundColumns)
        .from(funds)
        .where(and(eq(funds.slug, slug), eq(funds.isPublished, true)))
        .limit(1);
      if (!row) return c.json({ error: "Not found" }, 404);

      const reportRows = await getDb()
        .select(reportMetaColumns)
        .from(fundReports)
        .where(eq(fundReports.fundId, row.id))
        .orderBy(asc(fundReports.sortOrder), desc(fundReports.createdAt));

      return c.json({
        ok: true,
        settings,
        fund: {
          id: row.id,
          slug: row.slug,
          title: row.title,
          titleAr: row.titleAr,
          description: row.description,
          descriptionAr: row.descriptionAr,
          isPublished: row.isPublished,
          sortOrder: row.sortOrder,
          createdAt: row.createdAt.toISOString(),
          updatedAt: row.updatedAt.toISOString(),
          reports: reportRows.map(toReportItem),
        },
      });
    } catch (e) {
      console.error("[funds] get failed", e);
      return c.json({ error: "Unavailable" }, 500);
    }
  });

  app.get("/api/fund-reports/:id/file", async (c) => {
    try {
      const id = c.req.param("id");
      const wantAr = c.req.query("lang") === "ar";
      const download = c.req.query("download") === "1";
      const [row] = await getDb()
        .select({
          fileData: fundReports.fileData,
          fileDataAr: fundReports.fileDataAr,
          fileName: fundReports.fileName,
          fileNameAr: fundReports.fileNameAr,
          mimeType: fundReports.mimeType,
          mimeTypeAr: fundReports.mimeTypeAr,
        })
        .from(fundReports)
        .where(eq(fundReports.id, id))
        .limit(1);
      if (!row) return c.json({ error: "Not found" }, 404);

      const preferAr = wantAr && row.fileDataAr;
      const data = preferAr ? row.fileDataAr : row.fileData ?? row.fileDataAr;
      if (!data) return c.json({ error: "No file" }, 404);

      const name = sanitizeDownloadName(
        (preferAr ? row.fileNameAr : row.fileName) ||
          row.fileNameAr ||
          row.fileName ||
          "report.pdf",
      );
      const mime =
        (preferAr ? row.mimeTypeAr : row.mimeType) ||
        row.mimeTypeAr ||
        row.mimeType ||
        "application/pdf";

      return new Response(new Uint8Array(data), {
        headers: {
          "Content-Type": mime,
          "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${name}"`,
          "Cache-Control": "public, max-age=3600",
        },
      });
    } catch (e) {
      console.error("[fund-reports] file failed", e);
      return c.json({ error: "Unavailable" }, 500);
    }
  });

  /* ── Admin settings ───────────────────────────────────────────── */

  app.get("/api/admin/funds-reports-settings", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      return c.json({ ok: true, settings: await ensureSettings() });
    } catch (e) {
      console.error("[admin funds-settings] get failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Database unavailable" },
        500,
      );
    }
  });

  app.put("/api/admin/funds-reports-settings", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const json = await c.req.json().catch(() => null);
      const parsed = fundsReportsSettingsSchema.safeParse(json);
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
        crumbEn: data.crumbEn,
        crumbAr: data.crumbAr || "",
        introEn: data.introEn,
        introAr: data.introAr || "",
        emptyEn: data.emptyEn,
        emptyAr: data.emptyAr || "",
        viewReportsEn: data.viewReportsEn,
        viewReportsAr: data.viewReportsAr || "",
        childCrumbReportsEn: data.childCrumbReportsEn,
        childCrumbReportsAr: data.childCrumbReportsAr || "",
        votingPolicyEn: data.votingPolicyEn,
        votingPolicyAr: data.votingPolicyAr || "",
        termsEn: data.termsEn,
        termsAr: data.termsAr || "",
        quarterlyEn: data.quarterlyEn,
        quarterlyAr: data.quarterlyAr || "",
        updatedAt: new Date(),
      };
      const [row] = await getDb()
        .insert(fundsReportsSettings)
        .values({ id: 1, ...payload })
        .onConflictDoUpdate({
          target: fundsReportsSettings.id,
          set: payload,
        })
        .returning();
      if (!row) return c.json({ error: "Could not save settings" }, 500);
      return c.json({ ok: true, settings: toSettingsPayload(row) });
    } catch (e) {
      console.error("[admin funds-settings] update failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not save settings" },
        500,
      );
    }
  });

  /* ── Admin funds ──────────────────────────────────────────────── */

  app.get("/api/admin/funds", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const rows = await getDb()
        .select(fundColumns)
        .from(funds)
        .orderBy(asc(funds.sortOrder), desc(funds.createdAt));
      const counts = await reportCountsByFund(rows.map((r) => r.id));
      const list: FundListItem[] = rows.map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        titleAr: row.titleAr,
        description: row.description,
        descriptionAr: row.descriptionAr,
        isPublished: row.isPublished,
        sortOrder: row.sortOrder,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
        reportCount: counts.get(row.id) ?? 0,
      }));
      return c.json({ ok: true, funds: list });
    } catch (e) {
      console.error("[admin funds] list failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Database unavailable" },
        500,
      );
    }
  });

  app.post("/api/admin/funds", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const json = await c.req.json().catch(() => null);
      const parsed = fundSchema.safeParse(json);
      if (!parsed.success) {
        return c.json(
          { error: parsed.error.issues[0]?.message ?? "Invalid fund data" },
          400,
        );
      }
      const now = new Date();
      const [row] = await getDb()
        .insert(funds)
        .values({
          slug: parsed.data.slug,
          title: parsed.data.title,
          titleAr: parsed.data.titleAr || "",
          description: parsed.data.description,
          descriptionAr: parsed.data.descriptionAr || "",
          isPublished: parsed.data.isPublished ?? true,
          sortOrder: parsed.data.sortOrder ?? 0,
          createdAt: now,
          updatedAt: now,
        })
        .returning(fundColumns);
      return c.json(
        {
          ok: true,
          fund: {
            ...row,
            createdAt: row.createdAt.toISOString(),
            updatedAt: row.updatedAt.toISOString(),
            reportCount: 0,
          },
        },
        201,
      );
    } catch (e) {
      console.error("[admin funds] create failed", e);
      const msg = e instanceof Error ? e.message : "Could not save fund";
      if (/unique|duplicate/i.test(msg)) {
        return c.json({ error: "Slug already exists" }, 400);
      }
      return c.json({ error: msg }, 500);
    }
  });

  app.patch("/api/admin/funds/:id", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const id = c.req.param("id");
      const json = await c.req.json().catch(() => null);
      const parsed = fundUpdateSchema.safeParse(json);
      if (!parsed.success) {
        return c.json(
          { error: parsed.error.issues[0]?.message ?? "Invalid fund data" },
          400,
        );
      }
      const data = parsed.data;
      const patch: Record<string, unknown> = { updatedAt: new Date() };
      if (data.slug !== undefined) patch.slug = data.slug;
      if (data.title !== undefined) patch.title = data.title;
      if (data.titleAr !== undefined) patch.titleAr = data.titleAr || "";
      if (data.description !== undefined) patch.description = data.description;
      if (data.descriptionAr !== undefined) {
        patch.descriptionAr = data.descriptionAr || "";
      }
      if (data.isPublished !== undefined) patch.isPublished = data.isPublished;
      if (data.sortOrder !== undefined) patch.sortOrder = data.sortOrder;

      const [row] = await getDb()
        .update(funds)
        .set(patch)
        .where(eq(funds.id, id))
        .returning(fundColumns);
      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({
        ok: true,
        fund: {
          ...row,
          createdAt: row.createdAt.toISOString(),
          updatedAt: row.updatedAt.toISOString(),
        },
      });
    } catch (e) {
      console.error("[admin funds] update failed", e);
      const msg = e instanceof Error ? e.message : "Could not update fund";
      if (/unique|duplicate/i.test(msg)) {
        return c.json({ error: "Slug already exists" }, 400);
      }
      return c.json({ error: msg }, 500);
    }
  });

  app.post("/api/admin/funds/:id/visibility", async (c) => {
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
        .update(funds)
        .set({ isPublished: json.isPublished, updatedAt: new Date() })
        .where(eq(funds.id, id))
        .returning(fundColumns);
      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({
        ok: true,
        fund: {
          ...row,
          createdAt: row.createdAt.toISOString(),
          updatedAt: row.updatedAt.toISOString(),
        },
      });
    } catch (e) {
      console.error("[admin funds] visibility failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not update visibility" },
        500,
      );
    }
  });

  app.delete("/api/admin/funds/:id", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const id = c.req.param("id");
      const [row] = await getDb()
        .delete(funds)
        .where(eq(funds.id, id))
        .returning({ id: funds.id });
      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({ ok: true });
    } catch (e) {
      console.error("[admin funds] delete failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not delete fund" },
        500,
      );
    }
  });

  /* ── Admin fund reports ───────────────────────────────────────── */

  app.get("/api/admin/funds/:fundId/reports", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const fundId = c.req.param("fundId");
      const [fund] = await getDb()
        .select({ id: funds.id })
        .from(funds)
        .where(eq(funds.id, fundId))
        .limit(1);
      if (!fund) return c.json({ error: "Fund not found" }, 404);

      const rows = await getDb()
        .select(reportMetaColumns)
        .from(fundReports)
        .where(eq(fundReports.fundId, fundId))
        .orderBy(asc(fundReports.sortOrder), desc(fundReports.createdAt));
      return c.json({ ok: true, reports: rows.map(toReportItem) });
    } catch (e) {
      console.error("[admin fund-reports] list failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Database unavailable" },
        500,
      );
    }
  });

  app.post("/api/admin/funds/:fundId/reports", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const fundId = c.req.param("fundId");
      const [fund] = await getDb()
        .select({ id: funds.id })
        .from(funds)
        .where(eq(funds.id, fundId))
        .limit(1);
      if (!fund) return c.json({ error: "Fund not found" }, 404);

      const body = await c.req.parseBody({ all: true });
      const metaRaw = {
        section: String(body.section ?? "quarterly_disclosures"),
        title: String(body.title ?? ""),
        titleAr: String(body.titleAr ?? ""),
        date: String(body.date ?? ""),
        dateAr: String(body.dateAr ?? ""),
        fileName: String(body.fileName ?? ""),
        fileNameAr: String(body.fileNameAr ?? ""),
        sortOrder: body.sortOrder ?? 0,
      };
      const parsed = fundReportMetaSchema.safeParse(metaRaw);
      if (!parsed.success) {
        return c.json(
          { error: parsed.error.issues[0]?.message ?? "Invalid report data" },
          400,
        );
      }

      const pdf = await pdfFromBody(body, "file");
      if (!pdf.ok) return c.json({ error: pdf.error }, 400);
      const pdfAr = await pdfFromBody(body, "fileAr");
      if (!pdfAr.ok) return c.json({ error: pdfAr.error }, 400);

      const now = new Date();
      const fileName =
        parsed.data.fileName ||
        (pdf.fileName ? sanitizeDownloadName(pdf.fileName) : null);
      const fileNameAr =
        parsed.data.fileNameAr ||
        (pdfAr.fileName ? sanitizeDownloadName(pdfAr.fileName) : null);

      const [row] = await getDb()
        .insert(fundReports)
        .values({
          fundId,
          section: parsed.data.section,
          title: parsed.data.title,
          titleAr: parsed.data.titleAr || "",
          date: parsed.data.date,
          dateAr: parsed.data.dateAr || "",
          fileName,
          fileNameAr,
          mimeType: pdf.buffer ? "application/pdf" : null,
          mimeTypeAr: pdfAr.buffer ? "application/pdf" : null,
          fileSize: pdf.buffer?.length ?? null,
          fileSizeAr: pdfAr.buffer?.length ?? null,
          fileData: pdf.buffer,
          fileDataAr: pdfAr.buffer,
          sortOrder: parsed.data.sortOrder ?? 0,
          createdAt: now,
          updatedAt: now,
        })
        .returning(reportMetaColumns);

      return c.json({ ok: true, report: toReportItem(row) }, 201);
    } catch (e) {
      console.error("[admin fund-reports] create failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not save report" },
        500,
      );
    }
  });

  app.patch("/api/admin/fund-reports/:id", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const id = c.req.param("id");
      const body = await c.req.parseBody({ all: true });
      const metaRaw = {
        section: body.section !== undefined ? String(body.section) : undefined,
        title: body.title !== undefined ? String(body.title) : undefined,
        titleAr: body.titleAr !== undefined ? String(body.titleAr) : undefined,
        date: body.date !== undefined ? String(body.date) : undefined,
        dateAr: body.dateAr !== undefined ? String(body.dateAr) : undefined,
        fileName: body.fileName !== undefined ? String(body.fileName) : undefined,
        fileNameAr:
          body.fileNameAr !== undefined ? String(body.fileNameAr) : undefined,
        sortOrder: body.sortOrder !== undefined ? body.sortOrder : undefined,
      };
      const parsed = fundReportUpdateSchema.safeParse(metaRaw);
      if (!parsed.success) {
        return c.json(
          { error: parsed.error.issues[0]?.message ?? "Invalid report data" },
          400,
        );
      }

      const pdf = await pdfFromBody(body, "file");
      if (!pdf.ok) return c.json({ error: pdf.error }, 400);
      const pdfAr = await pdfFromBody(body, "fileAr");
      if (!pdfAr.ok) return c.json({ error: pdfAr.error }, 400);

      const patch: Record<string, unknown> = { updatedAt: new Date() };
      const data = parsed.data;
      if (data.section !== undefined) patch.section = data.section;
      if (data.title !== undefined) patch.title = data.title;
      if (data.titleAr !== undefined) patch.titleAr = data.titleAr || "";
      if (data.date !== undefined) patch.date = data.date;
      if (data.dateAr !== undefined) patch.dateAr = data.dateAr || "";
      if (data.fileName !== undefined) {
        patch.fileName = data.fileName || null;
      }
      if (data.fileNameAr !== undefined) {
        patch.fileNameAr = data.fileNameAr || null;
      }
      if (data.sortOrder !== undefined) patch.sortOrder = data.sortOrder;
      if (pdf.buffer) {
        patch.fileData = pdf.buffer;
        patch.fileSize = pdf.buffer.length;
        patch.mimeType = "application/pdf";
        if (!data.fileName) {
          patch.fileName = sanitizeDownloadName(pdf.fileName);
        }
      }
      if (pdfAr.buffer) {
        patch.fileDataAr = pdfAr.buffer;
        patch.fileSizeAr = pdfAr.buffer.length;
        patch.mimeTypeAr = "application/pdf";
        if (!data.fileNameAr) {
          patch.fileNameAr = sanitizeDownloadName(pdfAr.fileName);
        }
      }

      const [row] = await getDb()
        .update(fundReports)
        .set(patch)
        .where(eq(fundReports.id, id))
        .returning(reportMetaColumns);
      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({ ok: true, report: toReportItem(row) });
    } catch (e) {
      console.error("[admin fund-reports] update failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not update report" },
        500,
      );
    }
  });

  app.delete("/api/admin/fund-reports/:id", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const id = c.req.param("id");
      const [row] = await getDb()
        .delete(fundReports)
        .where(eq(fundReports.id, id))
        .returning({ id: fundReports.id });
      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({ ok: true });
    } catch (e) {
      console.error("[admin fund-reports] delete failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not delete report" },
        500,
      );
    }
  });
}
