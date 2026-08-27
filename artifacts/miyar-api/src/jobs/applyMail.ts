import {
  isSmtpConfigured,
  mailFrom as smtpMailFrom,
  mailTo as smtpMailTo,
  sendSmtpMail,
} from "../contact/smtp.js";
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

/** Outbound mail for job applications via Office 365 SMTP. */

export function isJobApplyEmailConfigured(): boolean {
  return isSmtpConfigured();
}

function mailFrom(): string {
  return smtpMailFrom();
}

function mailTo(): string {
  return (
    (process.env.JOB_APPLY_TO_EMAIL || "").trim() || smtpMailTo()
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
    await sendSmtpMail({
      from,
      to,
      subject: subjectLine,
      text,
      html,
      replyTo: payload.email,
      attachments: [
        {
          filename: cv.fileName,
          content: cv.buffer,
          contentType: cv.mimeType,
        },
      ],
    });
    return { skipped: false as const, transport: "smtp" as const };
  }

  throw new Error("SMTP is not configured");
}
