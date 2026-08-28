import { resolveAppEnv } from "../env.js";

/**
 * reCAPTCHA v3 — production only.
 * Staging and local skip verification even if a secret is present.
 * Set RECAPTCHA_STRICT=1 on Railway after Google domains + secret match,
 * otherwise a missing token or hostname mismatch blocks every form.
 */
export async function verifyRecaptcha(
  token: string | undefined,
  _ip?: string | null,
): Promise<boolean> {
  if (resolveAppEnv() !== "production") {
    return true;
  }
  const strict = process.env.RECAPTCHA_STRICT === "1";
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!secret) {
    console.error("[recaptcha] RECAPTCHA_SECRET_KEY is not set on this API host");
    return !strict;
  }
  if (!token) {
    console.warn("[recaptcha] no token from the browser");
    return !strict;
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    console.warn("[recaptcha] siteverify HTTP", res.status);
    return !strict;
  }
  const data = (await res.json()) as {
    success?: boolean;
    score?: number;
    "error-codes"?: string[];
  };
  if (!data.success) {
    console.warn("[recaptcha] siteverify failed", data["error-codes"] ?? []);
    return !strict;
  }
  if (typeof data.score === "number" && data.score < 0.3) {
    console.warn("[recaptcha] low score", data.score);
    return !strict;
  }
  return true;
}
