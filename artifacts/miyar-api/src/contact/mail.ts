import type { ContactPayload } from "./schema.js";
import type { ValidatedContactImage } from "./image.js";
import {
  isSmtpConfigured,
  mailFrom,
  mailTo,
  sendSmtpMail,
} from "./smtp.js";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** True when Office 365 SMTP can send. */
export function isContactEmailConfigured(): boolean {
  return isSmtpConfigured();
}

export async function sendContactEmail(
  payload: ContactPayload,
  meta: { id: string; createdAt: Date },
  attachment?: ValidatedContactImage | null,
) {
  if (!isContactEmailConfigured()) {
    return { skipped: true as const };
  }

  const from = mailFrom() || process.env.CONTACT_FROM_EMAIL!;
  const to = mailTo() || process.env.CONTACT_TO_EMAIL!;

  const when = meta.createdAt.toISOString();
  const email = payload.email?.trim() || "";
  const pageTitle =
    "pageTitle" in payload && payload.pageTitle
      ? String(payload.pageTitle)
      : "";
  const subjectLine = `Miyar Capital inquiry — ${payload.subject || pageTitle || "General"} — ${payload.name}`;

  const text = [
    "New contact form submission",
    `ID: ${meta.id}`,
    `Time: ${when}`,
    `Source: ${payload.sourcePage}`,
    pageTitle ? `Page: ${pageTitle}` : null,
    "",
    `Name: ${payload.name}`,
    `Email: ${email || "—"}`,
    `Phone: ${payload.phone || "—"}`,
    `Subject: ${payload.subject || "—"}`,
    attachment ? `Attachment: ${attachment.fileName}` : null,
    "",
    "Message:",
    payload.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const html = `
    <div style="font-family:Georgia,serif;color:#0c476e;line-height:1.5">
      <h2 style="margin:0 0 12px">New contact form submission</h2>
      <p style="margin:0 0 8px;color:#5a6b7a;font-size:13px">ID ${escapeHtml(meta.id)} · ${escapeHtml(when)}</p>
      <table style="border-collapse:collapse;width:100%;max-width:560px;font-size:14px">
        <tr><td style="padding:6px 0;color:#5a6b7a;width:110px">Source</td><td>${escapeHtml(payload.sourcePage)}</td></tr>
        ${
          pageTitle
            ? `<tr><td style="padding:6px 0;color:#5a6b7a">Page</td><td>${escapeHtml(pageTitle)}</td></tr>`
            : ""
        }
        <tr><td style="padding:6px 0;color:#5a6b7a">Name</td><td>${escapeHtml(payload.name)}</td></tr>
        <tr><td style="padding:6px 0;color:#5a6b7a">Email</td><td>${
          email
            ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`
            : "—"
        }</td></tr>
        <tr><td style="padding:6px 0;color:#5a6b7a">Phone</td><td>${escapeHtml(payload.phone || "—")}</td></tr>
        <tr><td style="padding:6px 0;color:#5a6b7a">Subject</td><td>${escapeHtml(payload.subject || "—")}</td></tr>
        ${
          attachment
            ? `<tr><td style="padding:6px 0;color:#5a6b7a">Attachment</td><td>${escapeHtml(attachment.fileName)}</td></tr>`
            : ""
        }
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
      ...(email ? { replyTo: email } : {}),
      attachments: attachment
        ? [
            {
              filename: attachment.fileName,
              content: attachment.buffer,
              contentType: attachment.mimeType,
            },
          ]
        : undefined,
    });
    return { skipped: false as const };
  }

  throw new Error("SMTP is not configured");
}
