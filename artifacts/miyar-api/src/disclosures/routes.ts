import { asc, desc, eq } from "drizzle-orm";
import type { Hono } from "hono";
import { isAdminAuthenticated } from "../admin/auth.js";
import { getDb } from "../db/index.js";
import { disclosures } from "../db/schema.js";
import {
  isPdfUpload,
  sanitizeDownloadName,
} from "../reports/schema.js";
import {
  disclosureMetaSchema,
  disclosureUpdateSchema,
  MAX_DISCLOSURE_BYTES,
} from "./schema.js";
type DisclosureListItem = {
  id: string;
  title: string;
  titleAr: string | null;
  body: string;
  bodyAr: string | null;
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

type DisclosureRowMeta = {
  id: string;
  title: string;
  titleAr: string | null;
  body: string;
  bodyAr: string | null;
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

function toListItem(row: DisclosureRowMeta): DisclosureListItem {
  return {
    id: row.id,
    title: row.title,
    titleAr: row.titleAr,
    body: row.body,
    bodyAr: row.bodyAr,
    fileName: row.fileName,
    fileNameAr: row.fileNameAr,
    fileSize: row.fileSize,
    fileSizeAr: row.fileSizeAr,
    mimeType: row.mimeType,
    hasArabicFile: row.hasArabicFile,
    sortOrder: row.sortOrder,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    fileUrl: `/api/disclosures/${row.id}/file`,
    fileUrlAr: row.hasArabicFile
      ? `/api/disclosures/${row.id}/file?lang=ar`
      : null,
  };
}

const listColumns = {
  id: disclosures.id,
  title: disclosures.title,
  titleAr: disclosures.titleAr,
  body: disclosures.body,
  bodyAr: disclosures.bodyAr,
  fileName: disclosures.fileName,
  fileNameAr: disclosures.fileNameAr,
  fileSize: disclosures.fileSize,
  fileSizeAr: disclosures.fileSizeAr,
  mimeType: disclosures.mimeType,
  sortOrder: disclosures.sortOrder,
  createdAt: disclosures.createdAt,
  updatedAt: disclosures.updatedAt,
};

function mapListRow(row: {
  id: string;
  title: string;
  titleAr: string | null;
  body: string;
  bodyAr: string | null;
  fileName: string;
  fileNameAr: string | null;
  fileSize: number;
  fileSizeAr: number | null;
  mimeType: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}): DisclosureRowMeta {
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

  const uploadName = raw.name?.trim() || "disclosure.pdf";

  if (!isPdfUpload(raw, uploadName)) {
    return { ok: false, error: "Only PDF files are allowed" };
  }

  const buffer = Buffer.from(await raw.arrayBuffer());
  if (buffer.byteLength === 0) {
    return { ok: false, error: "Uploaded file is empty" };
  }
  if (buffer.byteLength > MAX_DISCLOSURE_BYTES) {
    return { ok: false, error: "PDF must be 20 MB or smaller" };
  }

  return {
    ok: true,
    buffer,
    uploadName,
    mimeType: raw.type || "application/pdf",
  };
}

export function registerDisclosureRoutes(app: Hono) {
  app.get("/api/disclosures", async (c) => {
    try {
      const rows = await getDb()
        .select(listColumns)
        .from(disclosures)
        .orderBy(asc(disclosures.sortOrder), desc(disclosures.createdAt));
      return c.json({
        ok: true,
        disclosures: rows.map((r) => toListItem(mapListRow(r))),
      });
    } catch (e) {
      console.error("[disclosures] list failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Database unavailable" },
        500,
      );
    }
  });

  app.get("/api/disclosures/:id/file", async (c) => {
    try {
      const id = c.req.param("id");
      const arabic = c.req.query("lang") === "ar";
      const disposition = c.req.query("download") === "1" ? "attachment" : "inline";
      const [row] = await getDb()
        .select({
          fileName: disclosures.fileName,
          fileNameAr: disclosures.fileNameAr,
          mimeType: disclosures.mimeType,
          mimeTypeAr: disclosures.mimeTypeAr,
          fileData: disclosures.fileData,
          fileDataAr: disclosures.fileDataAr,
        })
        .from(disclosures)
        .where(eq(disclosures.id, id))
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
      console.error("[disclosures] file failed", e);
      return c.json({ error: "File unavailable" }, 500);
    }
  });

  app.get("/api/admin/disclosures", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const rows = await getDb()
        .select(listColumns)
        .from(disclosures)
        .orderBy(asc(disclosures.sortOrder), desc(disclosures.createdAt));
      return c.json({
        ok: true,
        disclosures: rows.map((r) => toListItem(mapListRow(r))),
      });
    } catch (e) {
      console.error("[admin disclosures] list failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Database unavailable" },
        500,
      );
    }
  });

  app.post("/api/admin/disclosures", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const body = (await c.req.parseBody({ all: true })) as Record<string, unknown>;
      const pdf = await pdfFromBody(body, "file", true);
      if (!pdf.ok) return c.json({ error: pdf.error }, 400);
      if (!pdf.buffer) return c.json({ error: "PDF file is required" }, 400);

      const pdfAr = await pdfFromBody(body, "fileAr", false);
      if (!pdfAr.ok) return c.json({ error: pdfAr.error }, 400);

      const fileNameInput =
        fieldString(body, "fileName") || pdf.uploadName || "disclosure.pdf";
      const fileNameArInput =
        fieldString(body, "fileNameAr") ||
        (pdfAr.buffer ? pdfAr.uploadName : "") ||
        "";
      const parsed = disclosureMetaSchema.safeParse({
        title: fieldString(body, "title"),
        titleAr: fieldString(body, "titleAr"),
        body: fieldString(body, "body"),
        bodyAr: fieldString(body, "bodyAr"),
        fileName: sanitizeDownloadName(fileNameInput),
        fileNameAr: fileNameArInput
          ? sanitizeDownloadName(fileNameArInput)
          : "",
      });
      if (!parsed.success) {
        return c.json(
          { error: parsed.error.issues[0]?.message ?? "Invalid disclosure data" },
          400,
        );
      }

      const now = new Date();
      const [row] = await getDb()
        .insert(disclosures)
        .values({
          title: parsed.data.title,
          titleAr: parsed.data.titleAr || "",
          body: parsed.data.body,
          bodyAr: parsed.data.bodyAr || "",
          fileName: parsed.data.fileName,
          fileNameAr: sanitizeDownloadName(
            parsed.data.fileNameAr || parsed.data.fileName,
          ),
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

      return c.json({ ok: true, disclosure: toListItem(mapListRow(row)) }, 201);
    } catch (e) {
      console.error("[admin disclosures] create failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not save disclosure" },
        500,
      );
    }
  });

  app.patch("/api/admin/disclosures/:id", async (c) => {
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
        "title",
        "titleAr",
        "body",
        "bodyAr",
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

      const parsed = disclosureUpdateSchema.safeParse(updateRaw);
      if (!parsed.success) {
        return c.json(
          { error: parsed.error.issues[0]?.message ?? "Invalid disclosure data" },
          400,
        );
      }

      const patch: Partial<{
        title: string;
        titleAr: string;
        body: string;
        bodyAr: string;
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

      if (parsed.data.title) patch.title = parsed.data.title;
      if (parsed.data.titleAr !== undefined) {
        patch.titleAr = parsed.data.titleAr || "";
      }
      if (parsed.data.body) patch.body = parsed.data.body;
      if (parsed.data.bodyAr !== undefined) {
        patch.bodyAr = parsed.data.bodyAr || "";
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

      const [row] = await getDb()
        .update(disclosures)
        .set(patch)
        .where(eq(disclosures.id, id))
        .returning(listColumns);

      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({ ok: true, disclosure: toListItem(mapListRow(row)) });
    } catch (e) {
      console.error("[admin disclosures] update failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not update disclosure" },
        500,
      );
    }
  });

  app.delete("/api/admin/disclosures/:id", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const id = c.req.param("id");
      const [row] = await getDb()
        .delete(disclosures)
        .where(eq(disclosures.id, id))
        .returning({ id: disclosures.id });
      if (!row) return c.json({ error: "Not found" }, 404);
      return c.json({ ok: true });
    } catch (e) {
      console.error("[admin disclosures] delete failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Could not delete disclosure" },
        500,
      );
    }
  });
}
