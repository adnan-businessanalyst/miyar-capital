import { Resend } from "resend";
import { isSmtpAuthReady, mailFrom, sendSmtpMail } from "../contact/smtp.js";

function fromAddress(): string {
  return mailFrom() || (process.env.CONTACT_FROM_EMAIL || "").trim();
}

export function isAdminMailConfigured(): boolean {
  if (isSmtpAuthReady()) return true;
  return Boolean(process.env.RESEND_API_KEY?.trim() && fromAddress());
}

export async function sendAdminMail(opts: {
  to: string;
  subject: string;
  text: string;
  html: string;
}): Promise<void> {
  const from = fromAddress();
  if (!from) throw new Error("MAIL_FROM is not configured");

  if (isSmtpAuthReady()) {
    await sendSmtpMail({
      from,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    });
    return;
  }

  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) throw new Error("No mail transport configured");
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to: [opts.to],
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });
  if (error) throw new Error(error.message || "Failed to send email");
}

export function adminResetEmail(): string {
  return (
    (process.env.ADMIN_EMAIL || "").trim() ||
    (process.env.MAIL_TO || "").trim() ||
    (process.env.CONTACT_TO_EMAIL || "").trim()
  );
}

export function publicSiteOrigin(): string {
  const raw = process.env.FRONTEND_ORIGIN || "http://localhost:3001";
  return raw.split(",")[0]?.trim().replace(/\/$/, "") || "http://localhost:3001";
}
