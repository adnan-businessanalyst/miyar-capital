import { randomBytes } from "node:crypto";

/** Max contact image size (2 MB). */
export const CONTACT_IMAGE_MAX_BYTES = 2 * 1024 * 1024;

const ALLOWED_MIME = new Set(["image/jpeg", "image/png"]);

export type ValidatedContactImage = {
  buffer: Buffer;
  mimeType: "image/jpeg" | "image/png";
  fileName: string;
};

function sniffImageMime(buf: Buffer): "image/jpeg" | "image/png" | null {
  if (buf.length < 12) return null;
  // JPEG
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  // PNG
  if (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  ) {
    return "image/png";
  }
  return null;
}

/** Reject obvious script / markup polyglots even if magic looks image-like. */
function looksLikeMarkupOrScript(buf: Buffer): boolean {
  const head = buf.subarray(0, Math.min(buf.length, 256)).toString("utf8");
  const lower = head.toLowerCase();
  return (
    lower.includes("<!doctype") ||
    lower.includes("<html") ||
    lower.includes("<svg") ||
    lower.includes("<script") ||
    lower.includes("<?php") ||
    lower.includes("<%")
  );
}

function sanitizeFileName(_name: string, mime: ValidatedContactImage["mimeType"]): string {
  const ext = mime === "image/jpeg" ? "jpg" : "png";
  return `contact-${randomBytes(8).toString("hex")}.${ext}`;
}

/**
 * Validate a single optional contact image: size, declared MIME, magic bytes,
 * and basic polyglot rejection. SVG and other formats are not allowed.
 */
export async function validateContactImage(
  file: File | Blob | undefined | null,
  originalName?: string,
): Promise<
  | { ok: true; image: null }
  | { ok: true; image: ValidatedContactImage }
  | { ok: false; error: string }
> {
  if (!file) return { ok: true, image: null };

  const name =
    (originalName || ("name" in file ? file.name : "") || "image").trim() ||
    "image";

  if (file.size <= 0) {
    return { ok: false, error: "Attached image is empty." };
  }
  if (file.size > CONTACT_IMAGE_MAX_BYTES) {
    return {
      ok: false,
      error: "Attached image must be 2 MB or smaller.",
    };
  }

  const declared =
    "type" in file && typeof file.type === "string" ? file.type : "";
  if (declared && !ALLOWED_MIME.has(declared)) {
    return {
      ok: false,
      error: "Attachment must be a PNG, JPG, or JPEG image.",
    };
  }

  if (!/\.(jpe?g|png)$/i.test(name) && declared === "") {
    return {
      ok: false,
      error: "Attachment must be a PNG, JPG, or JPEG image.",
    };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.byteLength > CONTACT_IMAGE_MAX_BYTES) {
    return {
      ok: false,
      error: "Attached image must be 2 MB or smaller.",
    };
  }

  const sniffed = sniffImageMime(buffer);
  if (!sniffed) {
    return {
      ok: false,
      error: "Attachment is not a valid PNG, JPG, or JPEG image.",
    };
  }

  if (declared && declared !== sniffed) {
    return {
      ok: false,
      error: "Attachment type does not match file contents.",
    };
  }

  if (looksLikeMarkupOrScript(buffer)) {
    return { ok: false, error: "Attachment rejected for security reasons." };
  }

  return {
    ok: true,
    image: {
      buffer,
      mimeType: sniffed,
      fileName: sanitizeFileName(name, sniffed),
    },
  };
}
