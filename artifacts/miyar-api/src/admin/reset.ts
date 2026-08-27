import { eq } from "drizzle-orm";
import { getDb } from "../db/index.js";
import { adminCredentials } from "../db/schema.js";
import {
  adminResetEmail,
  isAdminMailConfigured,
  publicSiteOrigin,
  sendAdminMail,
} from "./mail.js";
import { timingSafeEqual } from "node:crypto";
import {
  emailsMatch,
  hashPassword,
  hashToken,
  isStrongPassword,
  newResetToken,
} from "./password.js";

const RESET_TTL_MS = 60 * 60 * 1000;

async function ensureRow() {
  const db = getDb();
  const existing = await db
    .select({ id: adminCredentials.id })
    .from(adminCredentials)
    .where(eq(adminCredentials.id, 1))
    .limit(1);
  if (existing[0]) return;
  await db.insert(adminCredentials).values({ id: 1 });
}

export async function requestPasswordReset(email: string): Promise<{ ok: true }> {
  const expected = adminResetEmail();
  const match = expected && emailsMatch(email, expected);

  if (match && isAdminMailConfigured()) {
    await ensureRow();
    const token = newResetToken();
    const tokenHash = hashToken(token);
    await getDb()
      .update(adminCredentials)
      .set({
        resetTokenHash: tokenHash,
        resetExpiresAt: new Date(Date.now() + RESET_TTL_MS),
        updatedAt: new Date(),
      })
      .where(eq(adminCredentials.id, 1));

    const link = `${publicSiteOrigin()}/my-access-nimda/reset-password?token=${token}`;
    await sendAdminMail({
      to: expected,
      subject: "Miyar Admin password reset",
      text: `Reset your CMS password using this link (valid for 1 hour):\n\n${link}\n\nIf you did not request this, you can ignore this email.`,
      html: `<p>Reset your CMS password using this link (valid for 1 hour):</p><p><a href="${link}">${link}</a></p><p>If you did not request this, you can ignore this email.</p>`,
    });
  }

  return { ok: true };
}

export async function completePasswordReset(
  token: string,
  newPassword: string,
): Promise<{ ok: true } | { error: string; status: 400 }> {
  if (!token || !isStrongPassword(newPassword)) {
    return { error: "Password must be at least 10 characters.", status: 400 };
  }

  await ensureRow();
  const rows = await getDb()
    .select()
    .from(adminCredentials)
    .where(eq(adminCredentials.id, 1))
    .limit(1);
  const row = rows[0];
  if (!row?.resetTokenHash || !row.resetExpiresAt) {
    return { error: "This reset link is invalid or has expired.", status: 400 };
  }
  if (row.resetExpiresAt.getTime() < Date.now()) {
    return { error: "This reset link is invalid or has expired.", status: 400 };
  }
  const given = Buffer.from(hashToken(token), "hex");
  const stored = Buffer.from(row.resetTokenHash, "hex");
  if (given.length !== stored.length || !timingSafeEqual(given, stored)) {
    return { error: "This reset link is invalid or has expired.", status: 400 };
  }

  await getDb()
    .update(adminCredentials)
    .set({
      passwordHash: hashPassword(newPassword),
      resetTokenHash: null,
      resetExpiresAt: null,
      updatedAt: new Date(),
    })
    .where(eq(adminCredentials.id, 1));

  return { ok: true };
}
