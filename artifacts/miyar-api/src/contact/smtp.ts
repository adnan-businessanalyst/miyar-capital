/**
 * Office 365 SMTP (STARTTLS on 587).
 *
 * Host/port/TLS are set. Username, password, from, and to come from env
 * so the client can fill them later:
 *   SMTP_USER, SMTP_PASS, MAIL_FROM|CONTACT_FROM_EMAIL, MAIL_TO|CONTACT_TO_EMAIL
 */

import nodemailer from "nodemailer";

export const SMTP_DEFAULT_HOST = "smtp.office365.com";
export const SMTP_DEFAULT_PORT = 587;

export type SmtpAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

function env(name: string): string {
  return (process.env[name] || "").trim();
}

export function smtpHost(): string {
  return env("SMTP_HOST") || SMTP_DEFAULT_HOST;
}

export function smtpPort(): number {
  const n = Number(env("SMTP_PORT") || SMTP_DEFAULT_PORT);
  return Number.isFinite(n) && n > 0 ? n : SMTP_DEFAULT_PORT;
}

export function mailFrom(): string {
  return env("MAIL_FROM") || env("CONTACT_FROM_EMAIL");
}

export function mailTo(): string {
  return (
    env("MAIL_TO") || env("CONTACT_TO_EMAIL") || env("JOB_APPLY_TO_EMAIL")
  );
}

/** True when Office 365 SMTP can authenticate and send (from + user + pass). */
export function isSmtpAuthReady(): boolean {
  return Boolean(smtpHost() && env("SMTP_USER") && env("SMTP_PASS") && mailFrom());
}

/** True when Office 365 SMTP can send contact/job mail (auth + from + to). */
export function isSmtpConfigured(): boolean {
  return Boolean(isSmtpAuthReady() && mailTo());
}

export async function sendSmtpMail(opts: {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  attachments?: SmtpAttachment[];
}): Promise<void> {
  if (!isSmtpAuthReady()) {
    throw new Error("SMTP is not fully configured (user/password/from).");
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost(),
    port: smtpPort(),
    secure: false,
    requireTLS: true,
    auth: {
      user: env("SMTP_USER"),
      pass: env("SMTP_PASS"),
    },
    tls: {
      minVersion: "TLSv1.2",
    },
  });

  await transporter.sendMail({
    from: opts.from,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
    attachments: opts.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
      contentType: a.contentType,
      contentDisposition: "attachment" as const,
    })),
  });
}
