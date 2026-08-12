import { Resend } from "resend";
import type { JobApplyPayload } from "./applySchema.js";
import type { ValidatedJobCv } from "./cv.js";
import type { ScanResult } from "./scan.js";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Outbound mail for job applications.
 *
 * Preferred (when you set SMTP later):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO
 *   (or JOB_APPLY_TO_EMAIL)
 *
 * Current / fallback (Resend):
 *   RESEND_API_KEY, CONTACT_FROM_EMAIL|MAIL_FROM, JOB_APPLY_TO_EMAIL|CONTACT_TO_EMAIL|MAIL_TO
 *
 * If neither is configured, sending is skipped (row is still saved).
 */
/**
 * SMTP is prepared via env vars but inactive until SMTP_ENABLED=true and
 * nodemailer is installed. Until then, Resend is used when configured.
 *
 * Env: SMTP_ENABLED, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS,
 *      MAIL_FROM, JOB_APPLY_TO_EMAIL|MAIL_TO|CONTACT_TO_EMAIL
 */
export function isSmtpConfigured(): boolean {
  const enabled = (process.env.SMTP_ENABLED || "").trim().toLowerCase();
  if (enabled !== "1" && enabled !== "true" && enabled !== "yes") {
    return false;
  }
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      (process.env.MAIL_FROM?.trim() || process.env.CONTACT_FROM_EMAIL?.trim()) &&
      (
        process.env.JOB_APPLY_TO_EMAIL?.trim() ||
        process.env.MAIL_TO?.trim() ||
        process.env.CONTACT_TO_EMAIL?.trim()
      ),
  );
}

export function isResendConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      (process.env.MAIL_FROM?.trim() || process.env.CONTACT_FROM_EMAIL?.trim()) &&
      (
        process.env.JOB_APPLY_TO_EMAIL?.trim() ||
        process.env.MAIL_TO?.trim() ||
        process.env.CONTACT_TO_EMAIL?.trim()
      ),
  );
}

export function isJobApplyEmailConfigured(): boolean {
  return isSmtpConfigured() || isResendConfigured();
}

function mailFrom(): string {
  return (
    process.env.MAIL_FROM?.trim() ||
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    ""
  );
}

function mailTo(): string {
  return (
    process.env.JOB_APPLY_TO_EMAIL?.trim() ||
    process.env.MAIL_TO?.trim() ||
    process.env.CONTACT_TO_EMAIL?.trim() ||
    ""
  );
}

async function sendViaSmtp(opts: {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  attachment: ValidatedJobCv;
}): Promise<void> {
  // SMTP transport placeholder — wire nodemailer (or similar) when SMTP_* is live.
  // Keeping the hook so env can be set without changing call sites.
  const host = process.env.SMTP_HOST?.trim();
  if (!host) {
    throw new Error("SMTP_HOST is not configured");
  }

  /*
   * SMTP path — set SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS + MAIL_FROM + MAIL_TO
   * (or JOB_APPLY_TO_EMAIL). Install `nodemailer` when you go live with SMTP.
   * Until then, configure Resend (RESEND_API_KEY + CONTACT_FROM/TO) instead.
   */
  void host;
  throw new Error(
    "SMTP transport is prepared but not active yet. Install nodemailer and wire createTransport, or use Resend env vars (RESEND_API_KEY, CONTACT_FROM_EMAIL, JOB_APPLY_TO_EMAIL).",
  );
}

export async function sendJobApplyEmail(
  payload: JobApplyPayload,
  meta: { id: string; createdAt: Date },
  cv: ValidatedJobCv,
  scan: ScanResult,
) {
  if (!isJobApplyEmailConfigured()) {
    return { skipped: true as const };
  }

  const from = mailFrom();
  const to = mailTo();
  const when = meta.createdAt.toISOString();
  const fullName = `${payload.firstName} ${payload.lastName}`.trim();
  const subjectLine = `Miyar Capital job application — ${payload.jobTitle} — ${fullName}`;

  const text = [
    "New job application",
    `ID: ${meta.id}`,
    `Time: ${when}`,
    `Source: ${payload.sourcePage}`,
    "",
    `Job: ${payload.jobTitle}`,
    `Reference: ${payload.jobReference}`,
    `Slug: ${payload.jobSlug}`,
    "",
    `First name: ${payload.firstName}`,
    `Last name: ${payload.lastName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `CV: ${cv.fileName} (${cv.size} bytes)`,
    `Scan: ${scan.status}${scan.detail ? ` — ${scan.detail}` : ""}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  const html = `
    <div style="font-family:Georgia,serif;color:#0c476e;line-height:1.5">
      <h2 style="margin:0 0 12px">New job application</h2>
      <p style="margin:0 0 8px;color:#5a6b7a;font-size:13px">ID ${escapeHtml(meta.id)} · ${escapeHtml(when)}</p>
      <table style="border-collapse:collapse;width:100%;max-width:560px;font-size:14px">
        <tr><td style="padding:6px 0;color:#5a6b7a;width:120px">Job</td><td>${escapeHtml(payload.jobTitle)}</td></tr>
        <tr><td style="padding:6px 0;color:#5a6b7a">Reference</td><td>${escapeHtml(payload.jobReference)}</td></tr>
        <tr><td style="padding:6px 0;color:#5a6b7a">Slug</td><td>${escapeHtml(payload.jobSlug)}</td></tr>
        <tr><td style="padding:6px 0;color:#5a6b7a">First name</td><td>${escapeHtml(payload.firstName)}</td></tr>
        <tr><td style="padding:6px 0;color:#5a6b7a">Last name</td><td>${escapeHtml(payload.lastName)}</td></tr>
        <tr><td style="padding:6px 0;color:#5a6b7a">Email</td><td><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#5a6b7a">Phone</td><td>${escapeHtml(payload.phone)}</td></tr>
        <tr><td style="padding:6px 0;color:#5a6b7a">CV</td><td>${escapeHtml(cv.fileName)}</td></tr>
        <tr><td style="padding:6px 0;color:#5a6b7a">Scan</td><td>${escapeHtml(scan.status)}${scan.detail ? ` — ${escapeHtml(scan.detail)}` : ""}</td></tr>
        <tr><td style="padding:6px 0;color:#5a6b7a">Source</td><td>${escapeHtml(payload.sourcePage)}</td></tr>
      </table>
      <p style="margin:18px 0 6px;color:#5a6b7a">Message</p>
      <div style="white-space:pre-wrap;background:#f4f7f9;border:1px solid #d5e0e6;border-radius:8px;padding:14px">${escapeHtml(payload.message)}</div>
    </div>
  `;

  if (isSmtpConfigured()) {
    await sendViaSmtp({ from, to, subject: subjectLine, text, html, attachment: cv });
    return { skipped: false as const, transport: "smtp" as const };
  }

  const resend = new Resend(process.env.RESEND_API_KEY!);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject: subjectLine,
    text,
    html,
    attachments: [
      {
        filename: cv.fileName,
        content: cv.buffer.toString("base64"),
        contentType: cv.mimeType,
      },
    ],
  });

  if (error) {
    throw new Error(error.message || "Failed to send email via Resend");
  }
  return { skipped: false as const, transport: "resend" as const };
}
