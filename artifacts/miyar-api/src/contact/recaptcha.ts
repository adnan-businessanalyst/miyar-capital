import { resolveAppEnv } from "../env.js";

/**
 * reCAPTCHA v3 — production only.
 * Staging and local skip verification even if a secret is present.
 */
export async function verifyRecaptcha(
  token: string | undefined,
  _ip?: string | null,
): Promise<boolean> {
  if (resolveAppEnv() !== "production") {
    return true;
  }
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!secret) {
    console.error("[recaptcha] RECAPTCHA_SECRET_KEY is not set on this API host");
    return false;
  }
  if (!token) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) return false;
  const data = (await res.json()) as {
    success?: boolean;
    score?: number;
    "error-codes"?: string[];
  };
  if (!data.success) {
    console.warn("[recaptcha] siteverify failed", data["error-codes"] ?? []);
    return false;
  }
  if (typeof data.score === "number" && data.score < 0.3) return false;
  return true;
}
