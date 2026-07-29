export async function verifyRecaptcha(
  token: string | undefined,
  ip?: string | null,
): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.warn("[contact] RECAPTCHA_SECRET_KEY missing in production");
      return false;
    }
    return true;
  }
  if (!token) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (ip) body.set("remoteip", ip);

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean; score?: number };
  if (!data.success) return false;
  if (typeof data.score === "number" && data.score < 0.3) return false;
  return true;
}
