import { timingSafeEqual } from "node:crypto";

export const MIYAR_CLIENT_IP_HEADER = "x-miyar-client-ip";
export const MIYAR_PROXY_HEADER = "x-miyar-proxy";

type HeaderReader = { req: { header: (name: string) => string | undefined } };

function lastForwardedHop(raw: string | undefined): string | undefined {
  const parts = (raw ?? "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.at(-1);
}

function secretsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function isApiProxySecretConfigured(): boolean {
  return Boolean(process.env.API_PROXY_SECRET?.trim());
}

/** Rate-limit key: Vercel visitor IP when the proxy secret matches, else last XFF hop. */
export function clientIp(c: HeaderReader): string {
  const expected = process.env.API_PROXY_SECRET?.trim() ?? "";
  const provided = c.req.header(MIYAR_PROXY_HEADER) ?? "";
  const claimed = c.req.header(MIYAR_CLIENT_IP_HEADER)?.trim() ?? "";
  if (expected && claimed && secretsMatch(provided, expected)) {
    return claimed;
  }

  return (
    lastForwardedHop(c.req.header("x-forwarded-for")) ||
    c.req.header("x-real-ip")?.trim() ||
    "unknown"
  );
}
