import { createHmac, timingSafeEqual } from "node:crypto";
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

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
  deleteCookie(c, ADMIN_COOKIE, { path: "/" });
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

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || !password) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
