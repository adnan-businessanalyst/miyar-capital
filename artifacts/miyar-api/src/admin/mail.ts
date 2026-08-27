import { isSmtpAuthReady, mailFrom, sendSmtpMail } from "../contact/smtp.js";
import { resolveFrontendOrigin } from "../env.js";

function fromAddress(): string {
  return mailFrom() || (process.env.CONTACT_FROM_EMAIL || "").trim();
}

export function isAdminMailConfigured(): boolean {
  return isSmtpAuthReady();
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

  throw new Error("SMTP is not configured");
}

export function adminResetEmail(): string {
  return (
    (process.env.ADMIN_EMAIL || "").trim() ||
    (process.env.MAIL_TO || "").trim() ||
    (process.env.CONTACT_TO_EMAIL || "").trim()
  );
}

export function publicSiteOrigin(): string {
  return resolveFrontendOrigin();
}
