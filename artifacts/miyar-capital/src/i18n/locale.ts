import type { Lang } from "../site/types";

/** Arabic is default (unprefixed). English uses `/en` prefix. */
export const DEFAULT_LANG: Lang = "ar";
export const LOCALE_COOKIE = "miyar_lang";
export const LOCALE_STORAGE_KEY = "miyar_lang";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

const EN_PREFIX = "/en";

/** Paths that never receive a locale prefix. */
export function isLocaleExemptPath(pathname: string): boolean {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/my-access-nimda") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/docs") ||
    pathname.startsWith("/media") ||
    pathname.startsWith("/favicon")
  );
}

export function getLocaleFromPathname(pathname: string): Lang {
  if (pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`)) {
    return "en";
  }
  return "ar";
}

/** Strip `/en` prefix → canonical Arabic path. */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === EN_PREFIX || pathname === `${EN_PREFIX}/`) return "/";
  if (pathname.startsWith(`${EN_PREFIX}/`)) {
    const rest = pathname.slice(EN_PREFIX.length);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname || "/";
}

/**
 * Prefix an internal href for the active language.
 * Pass locale-less paths from nav/data (`/who-we-are`); English becomes `/en/who-we-are`.
 */
export function localePath(href: string, lang: Lang): string {
  if (!href.startsWith("/")) return href;
  if (isLocaleExemptPath(href)) return href;

  const bare = stripLocalePrefix(href);
  if (lang === "en") {
    return bare === "/" ? EN_PREFIX : `${EN_PREFIX}${bare}`;
  }
  return bare;
}

/** Switch the current pathname to another language. */
export function switchLocalePath(pathname: string, next: Lang): string {
  return localePath(stripLocalePrefix(pathname || "/"), next);
}

export function persistLocalePreference(lang: Lang): void {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${lang};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};samesite=lax`;
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, lang);
  } catch {
    /* private mode */
  }
}

export function readStoredLocale(): Lang | null {
  if (typeof window === "undefined") return null;
  try {
    const fromStorage = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (fromStorage === "en" || fromStorage === "ar") return fromStorage;
  } catch {
    /* ignore */
  }
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE}=(en|ar)(?:;|$)`),
  );
  return match ? (match[1] as Lang) : null;
}
