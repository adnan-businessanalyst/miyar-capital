import { randomBytes } from "node:crypto";

/** Max CV size for job applications (5 MB). */
export const JOB_CV_MAX_BYTES = 5 * 1024 * 1024;

export type ValidatedJobCv = {
  buffer: Buffer;
  mimeType: "application/pdf";
  fileName: string;
  size: number;
};

function isPdfMagic(buf: Buffer): boolean {
  // %PDF-
  return (
    buf.length >= 5 &&
    buf[0] === 0x25 &&
    buf[1] === 0x50 &&
    buf[2] === 0x44 &&
    buf[3] === 0x46 &&
    buf[4] === 0x2d
  );
}

/** Reject HTML/script polyglots, executables, and active PDF features. */
function looksMalicious(buf: Buffer): boolean {
  const head = buf.subarray(0, Math.min(buf.length, 512)).toString("latin1");
  const lower = head.toLowerCase();
  if (
    lower.includes("<!doctype") ||
    lower.includes("<html") ||
    lower.includes("<script") ||
    lower.includes("<?php") ||
    lower.includes("<%") ||
    lower.includes("<svg")
  ) {
    return true;
  }
  // Common executable / archive signatures in the first bytes
  if (buf[0] === 0x4d && buf[1] === 0x5a) return true; // MZ (PE)
  if (buf[0] === 0x7f && buf[1] === 0x45 && buf[2] === 0x4c && buf[3] === 0x46)
    return true; // ELF
  if (buf[0] === 0x50 && buf[1] === 0x4b && buf[2] === 0x03 && buf[3] === 0x04)
    return true; // ZIP (docx/xlsx disguised)

  const probe = buf
    .subarray(0, Math.min(buf.length, 64 * 1024))
    .toString("latin1");
  if (
    /\/JavaScript|\/JS[\s\/]|\/OpenAction|\/Launch|\/EmbeddedFile|\/RichMedia|\/AA\s/.test(
      probe,
    )
  ) {
    return true;
  }
  return false;
}

function sanitizePdfName(_name: string): string {
  return `cv-${randomBytes(8).toString("hex")}.pdf`;
}

/**
 * Validate a required job-application CV: PDF only, size limit, magic bytes,
 * extension/MIME checks, and basic polyglot rejection.
 * Malware scanning is handled separately via `scanUpload`.
 */
export async function validateJobCv(
  file: File | Blob | undefined | null,
  originalName?: string,
): Promise<
  { ok: true; cv: ValidatedJobCv } | { ok: false; error: string }
> {
  if (!file || file.size <= 0) {
    return { ok: false, error: "A PDF CV attachment is required." };
  }

  const name =
    (originalName || ("name" in file ? file.name : "") || "cv.pdf").trim() ||
    "cv.pdf";

  if (file.size > JOB_CV_MAX_BYTES) {
    return {
      ok: false,
      error: "CV must be a PDF of 5 MB or smaller.",
    };
  }

  if (!/\.pdf$/i.test(name)) {
    return { ok: false, error: "CV must be a PDF file." };
  }

  const declared =
    "type" in file && typeof file.type === "string" ? file.type : "";
  if (
    declared &&
    declared !== "application/pdf" &&
    declared !== "application/x-pdf"
  ) {
    return { ok: false, error: "CV must be a PDF file." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.byteLength > JOB_CV_MAX_BYTES) {
    return {
      ok: false,
      error: "CV must be a PDF of 5 MB or smaller.",
    };
  }

  if (!isPdfMagic(buffer)) {
    return {
      ok: false,
      error: "CV is not a valid PDF file.",
    };
  }

  if (looksMalicious(buffer)) {
    return {
      ok: false,
      error: "CV rejected for security reasons.",
    };
  }

  return {
    ok: true,
    cv: {
      buffer,
      mimeType: "application/pdf",
      fileName: sanitizePdfName(name),
      size: buffer.byteLength,
    },
  };
}
