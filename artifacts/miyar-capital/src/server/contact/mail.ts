import { Resend } from "resend";
import type { ContactPayload } from "./schema";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactEmail(payload: ContactPayload, meta: { id: string; createdAt: Date }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    throw new Error("Resend email is not configured (RESEND_API_KEY / CONTACT_FROM_EMAIL / CONTACT_TO_EMAIL)");
  }

  const resend = new Resend(apiKey);
  const when = meta.createdAt.toISOString();
  const subjectLine = `Miyar Capital inquiry — ${payload.subject || "General"} — ${payload.name}`;

  const text = [
    "New contact form submission",
    `ID: ${meta.id}`,
    `Time: ${when}`,
    `Source: ${payload.sourcePage}`,
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "—"}`,
    `Subject: ${payload.subject || "—"}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  const html = `
    <div style="font-family:Georgia,serif;color:#0c476e;line-height:1.5">
      <h2 style="margin:0 0 12px">New contact form submission</h2>
      <p style="margin:0 0 8px;color:#5a6b7a;font-size:13px">ID ${escapeHtml(meta.id)} · ${escapeHtml(when)}</p>
      <table style="border-collapse:collapse;width:100%;max-width:560px;font-size:14px">
        <tr><td style="padding:6px 0;color:#5a6b7a;width:110px">Source</td><td>${escapeHtml(payload.sourcePage)}</td></tr>
        <tr><td style="padding:6px 0;color:#5a6b7a">Name</td><td>${escapeHtml(payload.name)}</td></tr>
        <tr><td style="padding:6px 0;color:#5a6b7a">Email</td><td><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#5a6b7a">Phone</td><td>${escapeHtml(payload.phone || "—")}</td></tr>
        <tr><td style="padding:6px 0;color:#5a6b7a">Subject</td><td>${escapeHtml(payload.subject || "—")}</td></tr>
      </table>
      <p style="margin:18px 0 6px;color:#5a6b7a">Message</p>
      <div style="white-space:pre-wrap;background:#f4f7f9;border:1px solid #d5e0e6;border-radius:8px;padding:14px">${escapeHtml(payload.message)}</div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject: subjectLine,
    text,
    html,
  });

  if (error) {
    throw new Error(error.message || "Failed to send email via Resend");
  }
}
