import { eq } from "drizzle-orm";
import type { Hono } from "hono";
import { isAdminAuthenticated } from "../admin/auth.js";
import { getDb } from "../db/index.js";
import { pageFactsheets, type PageFactsheetRow } from "../db/schema.js";
import {
  defaultFor,
  FACTSHEET_DEFAULTS,
  isFactsheetSlug,
} from "./defaults.js";
import {
  factsheetUpdateSchema,
  isPdfUpload,
  MAX_FACTSHEET_BYTES,
  sanitizeDownloadName,
} from "./schema.js";

export type FactsheetPublic = {
  slug: string;
  pagePath: string;
  pageLabelEn: string;
  pageLabelAr: string;
  titleEn: string;
  titleAr: string;
  rows: PageFactsheetRow[];
  ctaShow: boolean;
  ctaLabelEn: string;
  ctaLabelAr: string;
  hasFile: boolean;
  hasFileAr: boolean;
  fileName: string | null;
  fileNameAr: string | null;
  fileSize: number | null;
  fileSizeAr: number | null;
  fileUrl: string | null;
  fileUrlAr: string | null;
  updatedAt: string;
};

const listColumns = {
  slug: pageFactsheets.slug,
  titleEn: pageFactsheets.titleEn,
  titleAr: pageFactsheets.titleAr,
  rows: pageFactsheets.rows,
  ctaShow: pageFactsheets.ctaShow,
  ctaLabelEn: pageFactsheets.ctaLabelEn,
  ctaLabelAr: pageFactsheets.ctaLabelAr,
  fileName: pageFactsheets.fileName,
  fileNameAr: pageFactsheets.fileNameAr,
  fileSize: pageFactsheets.fileSize,
  fileSizeAr: pageFactsheets.fileSizeAr,
  updatedAt: pageFactsheets.updatedAt,
};

function toPublic(row: {
  slug: string;
  titleEn: string;
  titleAr: string;
  rows: PageFactsheetRow[];
  ctaShow: boolean;
  ctaLabelEn: string;
  ctaLabelAr: string;
  fileName: string | null;
  fileNameAr: string | null;
  fileSize: number | null;
  fileSizeAr: number | null;
  updatedAt: Date;
}): FactsheetPublic {
  const catalog = defaultFor(row.slug);
  const hasFile = typeof row.fileSize === "number" && row.fileSize > 0;
  const hasFileAr = typeof row.fileSizeAr === "number" && row.fileSizeAr > 0;
  return {
    slug: row.slug,
    pagePath: catalog?.pagePath ?? "",
    pageLabelEn: catalog?.pageLabelEn ?? row.slug,
    pageLabelAr: catalog?.pageLabelAr ?? row.slug,
    titleEn: row.titleEn,
    titleAr: row.titleAr,
    rows: row.rows ?? [],
    ctaShow: row.ctaShow,
    ctaLabelEn: row.ctaLabelEn,
    ctaLabelAr: row.ctaLabelAr,
    hasFile,
    hasFileAr,
    fileName: row.fileName,
    fileNameAr: row.fileNameAr,
    fileSize: row.fileSize,
    fileSizeAr: row.fileSizeAr,
    fileUrl: hasFile || hasFileAr ? `/api/factsheets/${row.slug}/file` : null,
    fileUrlAr: hasFileAr ? `/api/factsheets/${row.slug}/file?lang=ar` : null,
    updatedAt: row.updatedAt.toISOString(),
  };
}

async function ensureSlug(slug: string) {
  const seed = defaultFor(slug);
  if (!seed) return null;
  const db = getDb();
  const [existing] = await db
    .select(listColumns)
    .from(pageFactsheets)
    .where(eq(pageFactsheets.slug, slug))
    .limit(1);
  if (existing) return existing;
  const [created] = await db
    .insert(pageFactsheets)
    .values({
      slug: seed.slug,
      titleEn: seed.titleEn,
      titleAr: seed.titleAr,
      rows: seed.rows,
      ctaShow: seed.ctaShow,
      ctaLabelEn: seed.ctaLabelEn,
      ctaLabelAr: seed.ctaLabelAr,
      updatedAt: new Date(),
    })
    .returning(listColumns);
  return created;
}

async function ensureAll() {
  const rows = [];
  for (const item of FACTSHEET_DEFAULTS) {
    const row = await ensureSlug(item.slug);
    if (row) rows.push(row);
  }
  return rows;
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
): Promise<
  | { ok: true; buffer: Buffer; uploadName: string; mimeType: string }
  | { ok: true; buffer: null }
  | { ok: false; error: string }
> {
  const raw = body[field];
  if (!isUploadFile(raw)) return { ok: true, buffer: null };

  const uploadName = raw.name?.trim() || "factsheet.pdf";
  if (!isPdfUpload(raw, uploadName)) {
    return { ok: false, error: "Only PDF files are allowed" };
  }

  const buffer = Buffer.from(await raw.arrayBuffer());
  if (buffer.byteLength === 0) {
    return { ok: false, error: "Uploaded file is empty" };
  }
  if (buffer.byteLength > MAX_FACTSHEET_BYTES) {
    return { ok: false, error: "PDF must be 20 MB or smaller" };
  }

  return {
    ok: true,
    buffer,
    uploadName,
    mimeType: raw.type || "application/pdf",
  };
}

function parseRows(raw: string): PageFactsheetRow[] | null {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed.map((row) => ({
      labelEn: typeof row?.labelEn === "string" ? row.labelEn : "",
      labelAr: typeof row?.labelAr === "string" ? row.labelAr : "",
      valueEn: typeof row?.valueEn === "string" ? row.valueEn : "",
      valueAr: typeof row?.valueAr === "string" ? row.valueAr : "",
    }));
  } catch {
    return null;
  }
}

export function registerFactsheetRoutes(app: Hono) {
  app.get("/api/factsheets", async (c) => {
    try {
      const rows = await ensureAll();
      return c.json({ ok: true, factsheets: rows.map(toPublic) });
    } catch (e) {
      console.error("[factsheets] list failed", e);
      return c.json({
        ok: true,
        factsheets: FACTSHEET_DEFAULTS.map((item) =>
          toPublic({
            slug: item.slug,
            titleEn: item.titleEn,
            titleAr: item.titleAr,
            rows: item.rows,
            ctaShow: item.ctaShow,
            ctaLabelEn: item.ctaLabelEn,
            ctaLabelAr: item.ctaLabelAr,
            fileName: null,
            fileNameAr: null,
            fileSize: null,
            fileSizeAr: null,
            updatedAt: new Date(0),
          }),
        ),
      });
    }
  });

  app.get("/api/factsheets/:slug", async (c) => {
    const slug = c.req.param("slug");
    if (!isFactsheetSlug(slug)) return c.json({ error: "Not found" }, 404);
    try {
      const row = await ensureSlug(slug);
      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({ ok: true, factsheet: toPublic(row) });
    } catch (e) {
      console.error("[factsheets] get failed", e);
      const seed = defaultFor(slug);
      if (!seed) return c.json({ error: "Not found" }, 404);
      return c.json({
        ok: true,
        factsheet: toPublic({
          slug: seed.slug,
          titleEn: seed.titleEn,
          titleAr: seed.titleAr,
          rows: seed.rows,
          ctaShow: seed.ctaShow,
          ctaLabelEn: seed.ctaLabelEn,
          ctaLabelAr: seed.ctaLabelAr,
          fileName: null,
          fileNameAr: null,
          fileSize: null,
          fileSizeAr: null,
          updatedAt: new Date(0),
        }),
      });
    }
  });

  app.get("/api/factsheets/:slug/file", async (c) => {
    const slug = c.req.param("slug");
    if (!isFactsheetSlug(slug)) return c.json({ error: "Not found" }, 404);
    try {
      const lang = c.req.query("lang");
      const arabic = lang === "ar";
      const disposition =
        c.req.query("download") === "1" ? "attachment" : "inline";
      const [row] = await getDb()
        .select({
          fileName: pageFactsheets.fileName,
          fileNameAr: pageFactsheets.fileNameAr,
          mimeType: pageFactsheets.mimeType,
          mimeTypeAr: pageFactsheets.mimeTypeAr,
          fileData: pageFactsheets.fileData,
          fileDataAr: pageFactsheets.fileDataAr,
        })
        .from(pageFactsheets)
        .where(eq(pageFactsheets.slug, slug))
        .limit(1);

      if (!row) return c.json({ error: "Not found" }, 404);

      const primary = arabic ? row.fileDataAr : row.fileData;
      const fallback = arabic ? row.fileData : row.fileDataAr;
      const fileData =
        primary && primary.byteLength > 0
          ? primary
          : fallback && fallback.byteLength > 0
            ? fallback
            : null;
      if (!fileData) return c.json({ error: "Not found" }, 404);

      const usedArabic =
        Boolean(arabic && primary && primary.byteLength > 0) ||
        Boolean(
          !arabic &&
            !(primary && primary.byteLength > 0) &&
            fallback &&
            fallback.byteLength > 0,
        );
      const displayName = usedArabic
        ? row.fileNameAr || row.fileName
        : row.fileName || row.fileNameAr;
      const mimeType = usedArabic
        ? row.mimeTypeAr || row.mimeType || "application/pdf"
        : row.mimeType || row.mimeTypeAr || "application/pdf";
      const safeName = sanitizeDownloadName(displayName || "factsheet.pdf");

      c.header("Content-Type", mimeType);
      c.header(
        "Content-Disposition",
        `${disposition}; filename="${safeName.replace(/"/g, "")}"`,
      );
      c.header("X-Content-Type-Options", "nosniff");
      return c.body(new Uint8Array(fileData));
    } catch (e) {
      console.error("[factsheets] file failed", e);
      return c.json({ error: "Not found" }, 404);
    }
  });

  app.get("/api/admin/factsheets", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const rows = await ensureAll();
      return c.json({ ok: true, factsheets: rows.map(toPublic) });
    } catch (e) {
      console.error("[admin factsheets] list failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Database unavailable" },
        500,
      );
    }
  });

  app.get("/api/admin/factsheets/:slug", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    const slug = c.req.param("slug");
    if (!isFactsheetSlug(slug)) return c.json({ error: "Not found" }, 404);
    try {
      const row = await ensureSlug(slug);
      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({ ok: true, factsheet: toPublic(row) });
    } catch (e) {
      console.error("[admin factsheets] get failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Database unavailable" },
        500,
      );
    }
  });

  app.put("/api/admin/factsheets/:slug", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    const slug = c.req.param("slug");
    if (!isFactsheetSlug(slug)) return c.json({ error: "Not found" }, 404);

    try {
      await ensureSlug(slug);
      const body = (await c.req.parseBody({ all: true })) as Record<
        string,
        unknown
      >;
      const pdf = await pdfFromBody(body, "file");
      if (!pdf.ok) return c.json({ error: pdf.error }, 400);
      const pdfAr = await pdfFromBody(body, "fileAr");
      if (!pdfAr.ok) return c.json({ error: pdfAr.error }, 400);

      const rows = parseRows(fieldString(body, "rows"));
      if (!rows) return c.json({ error: "Invalid fact sheet rows" }, 400);

      const parsed = factsheetUpdateSchema.safeParse({
        titleEn: fieldString(body, "titleEn"),
        titleAr: fieldString(body, "titleAr"),
        rows,
        ctaShow:
          fieldString(body, "ctaShow") === "true" ||
          fieldString(body, "ctaShow") === "1",
        ctaLabelEn: fieldString(body, "ctaLabelEn"),
        ctaLabelAr: fieldString(body, "ctaLabelAr"),
      });
      if (!parsed.success) {
        return c.json(
          { error: parsed.error.issues[0]?.message ?? "Invalid data" },
          400,
        );
      }

      const clearFile = fieldString(body, "clearFile") === "1";
      const clearFileAr = fieldString(body, "clearFileAr") === "1";

      const patch: {
        titleEn: string;
        titleAr: string;
        rows: PageFactsheetRow[];
        ctaShow: boolean;
        ctaLabelEn: string;
        ctaLabelAr: string;
        updatedAt: Date;
        fileData?: Buffer | null;
        fileSize?: number | null;
        mimeType?: string | null;
        fileName?: string | null;
        fileDataAr?: Buffer | null;
        fileSizeAr?: number | null;
        mimeTypeAr?: string | null;
        fileNameAr?: string | null;
      } = {
        titleEn: parsed.data.titleEn,
        titleAr: parsed.data.titleAr || "",
        rows: parsed.data.rows,
        ctaShow: parsed.data.ctaShow,
        ctaLabelEn: parsed.data.ctaLabelEn,
        ctaLabelAr: parsed.data.ctaLabelAr || "",
        updatedAt: new Date(),
      };

      if (pdf.buffer) {
        patch.fileData = pdf.buffer;
        patch.fileSize = pdf.buffer.byteLength;
        patch.mimeType = pdf.mimeType;
        patch.fileName = sanitizeDownloadName(pdf.uploadName);
      } else if (clearFile) {
        patch.fileData = null;
        patch.fileSize = null;
        patch.mimeType = null;
        patch.fileName = null;
      }

      if (pdfAr.buffer) {
        patch.fileDataAr = pdfAr.buffer;
        patch.fileSizeAr = pdfAr.buffer.byteLength;
        patch.mimeTypeAr = pdfAr.mimeType;
        patch.fileNameAr = sanitizeDownloadName(pdfAr.uploadName);
      } else if (clearFileAr) {
        patch.fileDataAr = null;
        patch.fileSizeAr = null;
        patch.mimeTypeAr = null;
        patch.fileNameAr = null;
      }

      const [row] = await getDb()
        .update(pageFactsheets)
        .set(patch)
        .where(eq(pageFactsheets.slug, slug))
        .returning(listColumns);

      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({ ok: true, factsheet: toPublic(row) });
    } catch (e) {
      console.error("[admin factsheets] update failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not save fact sheet" },
        500,
      );
    }
  });
}
