/** System prefixes CMS pages must never use, including children. */
export const SYSTEM_PATH_PREFIXES = [
  "/my-access-nimda",
  "/admin",
  "/docs",
  "/media",
  "/api",
  "/front-page",
] as const;

export function normalizePath(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed || trimmed === "/") return "/";
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withSlash.replace(/\/+$/, "") || "/";
}

export function isSystemPath(path: string): boolean {
  const p = normalizePath(path);
  if (p === "/") return true;
  return SYSTEM_PATH_PREFIXES.some(
    (prefix) => p === prefix || p.startsWith(`${prefix}/`),
  );
}

export function slugifyLeaf(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function joinPagePath(parentPath: string | null | undefined, slug: string): string {
  const leaf = slugifyLeaf(slug);
  if (!leaf) return "";
  const parent = parentPath ? normalizePath(parentPath) : "/";
  if (parent === "/") return `/${leaf}`;
  return `${parent}/${leaf}`;
}
