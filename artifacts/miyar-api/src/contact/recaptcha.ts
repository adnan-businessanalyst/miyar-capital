import { resolveAppEnv } from "../env.js";

/**
 * reCAPTCHA v3 verification.
 *
 * Enforced (fail closed) when:
 * - APP_ENV=production, or
 * - RECAPTCHA_SECRET_KEY is set on this host
 *
 * Staging/local with no secret still skips so forms work without Google keys.
 */
export function isRecaptchaEnforced(): boolean {
  if (resolveAppEnv() === "production") return true;
  return Boolean(process.env.RECAPTCHA_SECRET_KEY?.trim());
}

export async function verifyRecaptcha(
  token: string | undefined,
  _ip?: string | null,
): Promise<boolean> {
  if (!isRecaptchaEnforced()) {
    return true;
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!secret) {
    console.error(
      "[recaptcha] enforced but RECAPTCHA_SECRET_KEY is not set — rejecting",
    );
    return false;
  }
  if (!token?.trim()) {
    console.warn("[recaptcha] no token from the browser — rejecting");
    return false;
  }

  const body = new URLSearchParams({
    secret,
    response: token.trim(),
  });

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    console.warn("[recaptcha] siteverify HTTP", res.status);
    return false;
  }
  const data = (await res.json()) as {
    success?: boolean;
    score?: number;
    "error-codes"?: string[];
  };
  if (!data.success) {
    console.warn("[recaptcha] siteverify failed", data["error-codes"] ?? []);
    return false;
  }
  if (typeof data.score === "number" && data.score < 0.3) {
    console.warn("[recaptcha] low score", data.score);
    return false;
  }
  return true;
}
