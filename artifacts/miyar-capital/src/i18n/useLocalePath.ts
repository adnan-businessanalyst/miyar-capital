"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, localePath } from "./locale";

/**
 * Resolve a locale-less internal path for the active language.
 * Uses the URL pathname (source of truth) so hrefs stay correct
 * even before LanguageContext state catches up after a locale switch.
 */
export function useLocalePath() {
  const pathname = usePathname() || "/";
  const lang = getLocaleFromPathname(pathname);
  return useCallback((href: string) => localePath(href, lang), [lang]);
}
