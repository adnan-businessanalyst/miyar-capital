import { createHmac, timingSafeEqual } from "node:crypto";
import { eq } from "drizzle-orm";
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { getDb } from "../db/index.js";
import { adminCredentials } from "../db/schema.js";
import { verifyPasswordHash } from "./password.js";

export const ADMIN_COOKIE = "miyar_admin_session";
const MAX_AGE_SEC = 60 * 60 * 12; // 12h

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("ADMIN_SESSION_SECRET is not configured");
  return s;
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function cookieOptions() {
  const sameSiteEnv = (process.env.COOKIE_SAME_SITE || "lax").toLowerCase();
  const crossSite = sameSiteEnv === "none";
  return {
    httpOnly: true,
    secure: crossSite || process.env.NODE_ENV === "production",
    sameSite: (crossSite ? "None" : "Lax") as "None" | "Lax",
    path: "/",
    maxAge: MAX_AGE_SEC,
  };
}

export function createAdminSession(c: Context): void {
  const issued = String(Date.now());
  const token = `${issued}.${sign(issued)}`;
  setCookie(c, ADMIN_COOKIE, token, cookieOptions());
}

export function clearAdminSession(c: Context): void {
  const opts = cookieOptions();
  deleteCookie(c, ADMIN_COOKIE, {
    path: opts.path,
    secure: opts.secure,
    sameSite: opts.sameSite,
  });
}

export function isAdminAuthenticated(c: Context): boolean {
  try {
    const raw = getCookie(c, ADMIN_COOKIE);
    if (!raw) return false;
    const [issued, sig] = raw.split(".");
    if (!issued || !sig) return false;
    const expected = sign(issued);
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
    const ageMs = Date.now() - Number(issued);
    if (!Number.isFinite(ageMs) || ageMs < 0 || ageMs > MAX_AGE_SEC * 1000) return false;
    return true;
  } catch {
    return false;
  }
}

export function verifyEnvAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || !password) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** DB hash wins after reset-password or change-password; otherwise ADMIN_PASSWORD. */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  if (!password) return false;
  try {
    const rows = await getDb()
      .select({ passwordHash: adminCredentials.passwordHash })
      .from(adminCredentials)
      .where(eq(adminCredentials.id, 1))
      .limit(1);
    const stored = rows[0]?.passwordHash;
    if (stored) return verifyPasswordHash(password, stored);
  } catch {
    // Table may not exist yet — fall back to env.
  }
  return verifyEnvAdminPassword(password);
}
