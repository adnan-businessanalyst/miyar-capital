"use client";

import { useCallback } from "react";
import { useLanguage } from "./LanguageContext";
import { localePath } from "./locale";

/** Resolve a locale-less internal path for the active language. */
export function useLocalePath() {
  const { lang } = useLanguage();
  return useCallback((href: string) => localePath(href, lang), [lang]);
}
