import { asc, desc, eq } from "drizzle-orm";
import type { Hono } from "hono";
import { isAdminAuthenticated } from "../admin/auth.js";
import { getDb } from "../db/index.js";
import { reports, type ReportSection } from "../db/schema.js";
import {
  isPdfUpload,
  MAX_REPORT_BYTES,
  reportMetaSchema,
  reportUpdateSchema,
  sanitizeDownloadName,
} from "./schema.js";
import { ensureArabicFields } from "../i18n/translate.js";

type ReportListItem = {
  id: string;
  section: ReportSection;
  title: string;
  titleAr: string | null;
  date: string;
  dateAr: string | null;
  fileName: string;
  fileNameAr: string | null;
  fileSize: number;
  fileSizeAr: number | null;
  mimeType: string;
  hasArabicFile: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  fileUrl: string;
  fileUrlAr: string | null;
};

type ReportRowMeta = {
  id: string;
  section: ReportSection;
  title: string;
  titleAr: string | null;
  date: string;
  dateAr: string | null;
  fileName: string;
  fileNameAr: string | null;
  fileSize: number;
  fileSizeAr: number | null;
  mimeType: string;
  hasArabicFile: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

function toListItem(row: ReportRowMeta): ReportListItem {
  return {
    id: row.id,
    section: row.section,
    title: row.title,
    titleAr: row.titleAr,
    date: row.date,
    dateAr: row.dateAr,
    fileName: row.fileName,
    fileNameAr: row.fileNameAr,
    fileSize: row.fileSize,
    fileSizeAr: row.fileSizeAr,
    mimeType: row.mimeType,
    hasArabicFile: row.hasArabicFile,
    sortOrder: row.sortOrder,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    fileUrl: `/api/reports/${row.id}/file`,
    fileUrlAr: row.hasArabicFile ? `/api/reports/${row.id}/file?lang=ar` : null,
  };
}

const listColumns = {
  id: reports.id,
  section: reports.section,
  title: reports.title,
  titleAr: reports.titleAr,
  date: reports.date,
  dateAr: reports.dateAr,
  fileName: reports.fileName,
  fileNameAr: reports.fileNameAr,
  fileSize: reports.fileSize,
  fileSizeAr: reports.fileSizeAr,
  mimeType: reports.mimeType,
  sortOrder: reports.sortOrder,
  createdAt: reports.createdAt,
  updatedAt: reports.updatedAt,
};

function mapListRow(row: {
  id: string;
  section: ReportSection;
  title: string;
  titleAr: string | null;
  date: string;
  dateAr: string | null;
  fileName: string;
  fileNameAr: string | null;
  fileSize: number;
  fileSizeAr: number | null;
  mimeType: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}): ReportRowMeta {
  return {
    ...row,
    hasArabicFile: typeof row.fileSizeAr === "number" && row.fileSizeAr > 0,
  };
}

function fieldString(body: Record<string, unknown>, key: string): string {
  const v = body[key];
  return typeof v === "string" ? v : "";
}

function isUploadFile(value: unknown): value is File {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as File).arrayBuffer === "function" &&
    typeof (value as File).size === "number"
  );
}

async function pdfFromBody(
  body: Record<string, unknown>,
  field: string,
  required: boolean,
): Promise<
  | { ok: true; buffer: Buffer; uploadName: string; mimeType: string }
  | { ok: true; buffer: null }
  | { ok: false; error: string }
> {
  const raw = body[field];
  if (!isUploadFile(raw)) {
    if (required) {
      return {
        ok: false,
        error: field === "fileAr" ? "Arabic PDF file is required" : "PDF file is required",
      };
    }
    return { ok: true, buffer: null };
  }

  const uploadName = raw.name?.trim() || "report.pdf";

  if (!isPdfUpload(raw, uploadName)) {
    return { ok: false, error: "Only PDF files are allowed" };
  }

  const buffer = Buffer.from(await raw.arrayBuffer());
  if (buffer.byteLength === 0) {
    return { ok: false, error: "Uploaded file is empty" };
  }
  if (buffer.byteLength > MAX_REPORT_BYTES) {
    return { ok: false, error: "PDF must be 20 MB or smaller" };
  }

  return {
    ok: true,
    buffer,
    uploadName,
    mimeType: raw.type || "application/pdf",
  };
}

export function registerReportRoutes(app: Hono) {
  app.get("/api/reports", async (c) => {
    try {
      const section = c.req.query("section");
      const db = getDb();
      const rows =
        section === "annual" || section === "financial"
          ? await db
              .select(listColumns)
              .from(reports)
              .where(eq(reports.section, section))
              .orderBy(asc(reports.sortOrder), desc(reports.createdAt))
          : await db
              .select(listColumns)
              .from(reports)
              .orderBy(asc(reports.sortOrder), desc(reports.createdAt));

      return c.json({ ok: true, reports: rows.map((r) => toListItem(mapListRow(r))) });
    } catch (e) {
      console.error("[reports] list failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Database unavailable" },
        500,
      );
    }
  });

  app.get("/api/reports/:id/file", async (c) => {
    try {
      const id = c.req.param("id");
      const lang = c.req.query("lang");
      const arabic = lang === "ar";
      const disposition = c.req.query("download") === "1" ? "attachment" : "inline";
      const [row] = await getDb()
        .select({
          fileName: reports.fileName,
          fileNameAr: reports.fileNameAr,
          mimeType: reports.mimeType,
          mimeTypeAr: reports.mimeTypeAr,
          fileData: reports.fileData,
          fileDataAr: reports.fileDataAr,
        })
        .from(reports)
        .where(eq(reports.id, id))
        .limit(1);

      if (!row) return c.json({ error: "Not found" }, 404);

      const fileData = arabic ? row.fileDataAr : row.fileData;
      if (!fileData || fileData.byteLength === 0) {
        return c.json({ error: arabic ? "Arabic file not found" : "Not found" }, 404);
      }

      const displayName = arabic
        ? row.fileNameAr || row.fileName
        : row.fileName;
      const mimeType = arabic
        ? row.mimeTypeAr || row.mimeType || "application/pdf"
        : row.mimeType || "application/pdf";

      const safeName = sanitizeDownloadName(displayName);
      c.header("Content-Type", mimeType);
      c.header(
        "Content-Disposition",
        `${disposition}; filename="${safeName.replace(/"/g, "")}"`,
      );
      c.header("Cache-Control", "public, max-age=3600");
      return c.body(new Uint8Array(fileData));
    } catch (e) {
      console.error("[reports] file failed", e);
      return c.json({ error: "File unavailable" }, 500);
    }
  });

  app.get("/api/admin/reports", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const rows = await getDb()
        .select(listColumns)
        .from(reports)
        .orderBy(asc(reports.section), asc(reports.sortOrder), desc(reports.createdAt));
      return c.json({ ok: true, reports: rows.map((r) => toListItem(mapListRow(r))) });
    } catch (e) {
      console.error("[admin reports] list failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Database unavailable" },
        500,
      );
    }
  });

  app.post("/api/admin/reports", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const body = (await c.req.parseBody({ all: true })) as Record<string, unknown>;
      const pdf = await pdfFromBody(body, "file", true);
      if (!pdf.ok) return c.json({ error: pdf.error }, 400);
      if (!pdf.buffer) return c.json({ error: "PDF file is required" }, 400);

      const pdfAr = await pdfFromBody(body, "fileAr", false);
      if (!pdfAr.ok) return c.json({ error: pdfAr.error }, 400);

      const fileNameInput =
        fieldString(body, "fileName") || pdf.uploadName || "report.pdf";
      const fileNameArInput =
        fieldString(body, "fileNameAr") ||
        (pdfAr.buffer ? pdfAr.uploadName : "") ||
        "";
      const parsed = reportMetaSchema.safeParse({
        section: fieldString(body, "section"),
        title: fieldString(body, "title"),
        titleAr: fieldString(body, "titleAr"),
        date: fieldString(body, "date"),
        dateAr: fieldString(body, "dateAr"),
        fileName: sanitizeDownloadName(fileNameInput),
        fileNameAr: fileNameArInput
          ? sanitizeDownloadName(fileNameArInput)
          : "",
      });
      if (!parsed.success) {
        return c.json(
          { error: parsed.error.issues[0]?.message ?? "Invalid report data" },
          400,
        );
      }

      const filled = await ensureArabicFields(
        {
          title: parsed.data.title,
          titleAr: parsed.data.titleAr || "",
          date: parsed.data.date,
          dateAr: parsed.data.dateAr || "",
          fileName: parsed.data.fileName,
          fileNameAr: parsed.data.fileNameAr || "",
        },
        [
          ["title", "titleAr"],
          ["date", "dateAr"],
          ["fileName", "fileNameAr"],
        ],
      );

      const now = new Date();
      const [row] = await getDb()
        .insert(reports)
        .values({
          section: parsed.data.section,
          title: filled.title,
          titleAr: filled.titleAr,
          date: filled.date,
          dateAr: filled.dateAr,
          fileName: filled.fileName,
          fileNameAr: sanitizeDownloadName(filled.fileNameAr || filled.fileName),
          mimeType: pdf.mimeType || "application/pdf",
          mimeTypeAr: pdfAr.buffer
            ? pdfAr.mimeType || "application/pdf"
            : null,
          fileSize: pdf.buffer.byteLength,
          fileSizeAr: pdfAr.buffer ? pdfAr.buffer.byteLength : null,
          fileData: pdf.buffer,
          fileDataAr: pdfAr.buffer ?? null,
          sortOrder: 0,
          createdAt: now,
          updatedAt: now,
        })
        .returning(listColumns);

      return c.json({ ok: true, report: toListItem(mapListRow(row)) }, 201);
    } catch (e) {
      console.error("[admin reports] create failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not save report" },
        500,
      );
    }
  });

  app.patch("/api/admin/reports/:id", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const id = c.req.param("id");
      const body = (await c.req.parseBody({ all: true })) as Record<string, unknown>;
      const pdf = await pdfFromBody(body, "file", false);
      if (!pdf.ok) return c.json({ error: pdf.error }, 400);
      const pdfAr = await pdfFromBody(body, "fileAr", false);
      if (!pdfAr.ok) return c.json({ error: pdfAr.error }, 400);

      const updateRaw: Record<string, string> = {};
      for (const key of [
        "section",
        "title",
        "titleAr",
        "date",
        "dateAr",
        "fileName",
        "fileNameAr",
      ] as const) {
        const v = fieldString(body, key);
        if (v) {
          updateRaw[key] =
            key === "fileName" || key === "fileNameAr"
              ? sanitizeDownloadName(v)
              : v;
        }
      }
      if (!updateRaw.fileName && pdf.buffer) {
        updateRaw.fileName = sanitizeDownloadName(pdf.uploadName);
      }
      if (!updateRaw.fileNameAr && pdfAr.buffer) {
        updateRaw.fileNameAr = sanitizeDownloadName(pdfAr.uploadName);
      }

      const parsed = reportUpdateSchema.safeParse(updateRaw);
      if (!parsed.success) {
        return c.json(
          { error: parsed.error.issues[0]?.message ?? "Invalid report data" },
          400,
        );
      }

      const filled = await ensureArabicFields(
        {
          title: parsed.data.title || "",
          titleAr: parsed.data.titleAr || "",
          date: parsed.data.date || "",
          dateAr: parsed.data.dateAr || "",
          fileName: parsed.data.fileName || "",
          fileNameAr: parsed.data.fileNameAr || "",
        },
        [
          ["title", "titleAr"],
          ["date", "dateAr"],
          ["fileName", "fileNameAr"],
        ],
      );

      const patch: Partial<{
        section: ReportSection;
        title: string;
        titleAr: string;
        date: string;
        dateAr: string;
        fileName: string;
        fileNameAr: string;
        mimeType: string;
        mimeTypeAr: string;
        fileSize: number;
        fileSizeAr: number;
        fileData: Buffer;
        fileDataAr: Buffer;
        updatedAt: Date;
      }> = { updatedAt: new Date() };

      if (parsed.data.section) patch.section = parsed.data.section;
      if (parsed.data.title) patch.title = filled.title;
      if (filled.titleAr) patch.titleAr = filled.titleAr;
      if (parsed.data.date) patch.date = filled.date;
      if (filled.dateAr) patch.dateAr = filled.dateAr;
      if (parsed.data.fileName) patch.fileName = filled.fileName;
      if (filled.fileNameAr) {
        patch.fileNameAr = sanitizeDownloadName(filled.fileNameAr);
      }
      if (pdf.buffer) {
        patch.fileData = pdf.buffer;
        patch.fileSize = pdf.buffer.byteLength;
        patch.mimeType = pdf.mimeType || "application/pdf";
      }
      if (pdfAr.buffer) {
        patch.fileDataAr = pdfAr.buffer;
        patch.fileSizeAr = pdfAr.buffer.byteLength;
        patch.mimeTypeAr = pdfAr.mimeType || "application/pdf";
      }

      const [row] = await getDb()
        .update(reports)
        .set(patch)
        .where(eq(reports.id, id))
        .returning(listColumns);

      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({ ok: true, report: toListItem(mapListRow(row)) });
    } catch (e) {
      console.error("[admin reports] update failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not update report" },
        500,
      );
    }
  });

  app.delete("/api/admin/reports/:id", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const id = c.req.param("id");
      const [row] = await getDb()
        .delete(reports)
        .where(eq(reports.id, id))
        .returning({ id: reports.id });
      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({ ok: true });
    } catch (e) {
      console.error("[admin reports] delete failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not delete report" },
        500,
      );
    }
  });
}
