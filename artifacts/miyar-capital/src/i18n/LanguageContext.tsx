"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { DICTS, EN, type TranslationKey } from "../data/frontpage";
import type { Lang } from "../site/types";
import {
  DEFAULT_LANG,
  getLocaleFromPathname,
  persistLocalePreference,
} from "./locale";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const urlLang = getLocaleFromPathname(pathname);
  const [lang, setLangState] = useState<Lang>(urlLang || DEFAULT_LANG);

  // URL is the source of truth; keep preference in sync.
  useEffect(() => {
    setLangState(urlLang);
    persistLocalePreference(urlLang);
  }, [urlLang]);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
    document.body.setAttribute("dir", dir);
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    persistLocalePreference(next);
  }, []);

  const t = useCallback(
    (key: TranslationKey) => DICTS[lang][key] ?? EN[key],
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

/** Preview-only language context — does not touch the document or locale cookie. */
export function LanguageOverrideProvider({
  lang,
  onLangChange,
  children,
}: {
  lang: Lang;
  onLangChange?: (lang: Lang) => void;
  children: ReactNode;
}) {
  const setLang = useCallback(
    (next: Lang) => {
      onLangChange?.(next);
    },
    [onLangChange],
  );
  const t = useCallback(
    (key: TranslationKey) => DICTS[lang][key] ?? EN[key],
    [lang],
  );
  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}
