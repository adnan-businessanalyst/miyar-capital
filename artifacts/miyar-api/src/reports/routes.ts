import { asc, desc, eq } from "drizzle-orm";
import type { Hono } from "hono";
import { isAdminAuthenticated } from "../admin/auth.js";
import { getDb } from "../db/index.js";
import { reports, type ReportSection } from "../db/schema.js";
import {
  isImageUpload,
  isPdfUpload,
  MAX_REPORT_BYTES,
  MAX_REPORT_IMAGE_BYTES,
  reportMetaSchema,
  reportUpdateSchema,
  sanitizeDownloadName,
} from "./schema.js";
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
  hasImage: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  fileUrl: string;
  fileUrlAr: string | null;
  imageUrl: string | null;
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
  hasImage: boolean;
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
    hasImage: row.hasImage,
    sortOrder: row.sortOrder,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    /* Default (EN) URL falls back to Arabic on the server when EN is missing. */
    fileUrl: `/api/reports/${row.id}/file`,
    fileUrlAr: row.hasArabicFile
      ? `/api/reports/${row.id}/file?lang=ar`
      : null,
    imageUrl: row.hasImage ? `/api/reports/${row.id}/image` : null,
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
  imageSize: reports.imageSize,
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
  imageSize: number | null;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}): ReportRowMeta {
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
    hasArabicFile: typeof row.fileSizeAr === "number" && row.fileSizeAr > 0,
    hasImage: typeof row.imageSize === "number" && row.imageSize > 0,
    sortOrder: row.sortOrder,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
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

async function imageFromBody(
  body: Record<string, unknown>,
): Promise<
  | { ok: true; buffer: Buffer; mimeType: string }
  | { ok: true; buffer: null }
  | { ok: false; error: string }
> {
  const raw = body.image;
  if (!isUploadFile(raw)) return { ok: true, buffer: null };

  const uploadName = raw.name?.trim() || "card.jpg";
  if (!isImageUpload(raw, uploadName)) {
    return { ok: false, error: "Card image must be JPEG, PNG, WebP, GIF, or SVG" };
  }

  const buffer = Buffer.from(await raw.arrayBuffer());
  if (buffer.byteLength === 0) {
    return { ok: false, error: "Uploaded image is empty" };
  }
  if (buffer.byteLength > MAX_REPORT_IMAGE_BYTES) {
    return { ok: false, error: "Card image must be 5 MB or smaller" };
  }

  return {
    ok: true,
    buffer,
    mimeType: raw.type || "image/jpeg",
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

      /* Arabic is canonical. Prefer requested lang, then fall back to the other. */
      const primary = arabic ? row.fileDataAr : row.fileData;
      const fallback = arabic ? row.fileData : row.fileDataAr;
      const fileData =
        primary && primary.byteLength > 0
          ? primary
          : fallback && fallback.byteLength > 0
            ? fallback
            : null;
      if (!fileData) {
        return c.json({ error: "Not found" }, 404);
      }

      const usedArabic =
        Boolean(arabic && primary && primary.byteLength > 0) ||
        Boolean(!arabic && !(primary && primary.byteLength > 0) && fallback);
      const displayName = usedArabic
        ? row.fileNameAr || row.fileName
        : row.fileName || row.fileNameAr;
      const mimeType = usedArabic
        ? row.mimeTypeAr || row.mimeType || "application/pdf"
        : row.mimeType || row.mimeTypeAr || "application/pdf";

      const safeName = sanitizeDownloadName(displayName || "report.pdf");
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

  app.get("/api/reports/:id/image", async (c) => {
    try {
      const id = c.req.param("id");
      const [row] = await getDb()
        .select({
          imageMimeType: reports.imageMimeType,
          imageData: reports.imageData,
        })
        .from(reports)
        .where(eq(reports.id, id))
        .limit(1);

      if (!row?.imageData || row.imageData.byteLength === 0) {
        return c.json({ error: "Image not found" }, 404);
      }

      c.header("Content-Type", row.imageMimeType || "image/jpeg");
      c.header("Cache-Control", "public, max-age=3600");
      return c.body(new Uint8Array(row.imageData));
    } catch (e) {
      console.error("[reports] image failed", e);
      return c.json({ error: "Image unavailable" }, 500);
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

      /* Arabic PDF is required (canonical). English PDF is optional. */
      const pdfAr = await pdfFromBody(body, "fileAr", true);
      if (!pdfAr.ok) return c.json({ error: pdfAr.error }, 400);
      if (!pdfAr.buffer) return c.json({ error: "Arabic PDF file is required" }, 400);

      const pdf = await pdfFromBody(body, "file", false);
      if (!pdf.ok) return c.json({ error: pdf.error }, 400);

      const image = await imageFromBody(body);
      if (!image.ok) return c.json({ error: image.error }, 400);

      const fileNameArInput =
        fieldString(body, "fileNameAr") || pdfAr.uploadName || "report.pdf";
      const fileNameInput =
        fieldString(body, "fileName") ||
        (pdf.buffer ? pdf.uploadName : "") ||
        fileNameArInput;
      const parsed = reportMetaSchema.safeParse({
        section: fieldString(body, "section"),
        title: fieldString(body, "title"),
        titleAr: fieldString(body, "titleAr"),
        date: fieldString(body, "date"),
        dateAr: fieldString(body, "dateAr"),
        fileName: sanitizeDownloadName(fileNameInput),
        fileNameAr: sanitizeDownloadName(fileNameArInput),
      });
      if (!parsed.success) {
        return c.json(
          { error: parsed.error.issues[0]?.message ?? "Invalid report data" },
          400,
        );
      }

      /* If no English PDF, use the Arabic file as the default EN slot too. */
      const enBuffer = pdf.buffer ?? pdfAr.buffer;
      const enMime = pdf.buffer
        ? pdf.mimeType || "application/pdf"
        : pdfAr.mimeType || "application/pdf";
      const enName = sanitizeDownloadName(
        parsed.data.fileName || parsed.data.fileNameAr || pdfAr.uploadName,
      );
      const arName = sanitizeDownloadName(
        parsed.data.fileNameAr || parsed.data.fileName || pdfAr.uploadName,
      );

      const now = new Date();
      const [row] = await getDb()
        .insert(reports)
        .values({
          section: parsed.data.section,
          title: parsed.data.title,
          titleAr: parsed.data.titleAr || "",
          date: parsed.data.date,
          dateAr: parsed.data.dateAr || "",
          fileName: enName,
          fileNameAr: arName,
          mimeType: enMime,
          mimeTypeAr: pdfAr.mimeType || "application/pdf",
          fileSize: enBuffer.byteLength,
          fileSizeAr: pdfAr.buffer.byteLength,
          fileData: enBuffer,
          fileDataAr: pdfAr.buffer,
          imageMimeType: image.buffer ? image.mimeType : null,
          imageSize: image.buffer ? image.buffer.byteLength : null,
          imageData: image.buffer ?? null,
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
      const image = await imageFromBody(body);
      if (!image.ok) return c.json({ error: image.error }, 400);

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
        imageMimeType: string;
        imageSize: number;
        imageData: Buffer;
        updatedAt: Date;
      }> = { updatedAt: new Date() };

      if (parsed.data.section) patch.section = parsed.data.section;
      if (parsed.data.title) patch.title = parsed.data.title;
      if (parsed.data.titleAr !== undefined) {
        patch.titleAr = parsed.data.titleAr || "";
      }
      if (parsed.data.date) patch.date = parsed.data.date;
      if (parsed.data.dateAr !== undefined) {
        patch.dateAr = parsed.data.dateAr || "";
      }
      if (parsed.data.fileName) patch.fileName = parsed.data.fileName;
      if (parsed.data.fileNameAr) {
        patch.fileNameAr = sanitizeDownloadName(parsed.data.fileNameAr);
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
      if (image.buffer) {
        patch.imageData = image.buffer;
        patch.imageSize = image.buffer.byteLength;
        patch.imageMimeType = image.mimeType;
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
