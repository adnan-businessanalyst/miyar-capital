/**
 * Client-side API base.
 * Prefer empty string so browser hits same-origin `/api/*` (Next rewrite → miyar-api).
 * Set NEXT_PUBLIC_API_URL only for direct cross-origin calls (needs CORS + cookie strategy).
 */
export function apiUrl(path: string): string {
  const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
