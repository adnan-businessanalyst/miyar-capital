"use client";

import { useLanguage } from "../i18n/LanguageContext";
import { SITE_FOOTER } from "../site/footer";
import { pickLang } from "../site/types";

/** Regulatory disclaimer — rendered inside the site footer. */
export function Disclaimer({ className = "" }: { className?: string }) {
  const { lang } = useLanguage();
  const label = pickLang(
    SITE_FOOTER.disclaimerLabelEn,
    SITE_FOOTER.disclaimerLabelAr,
    lang,
  );
  const body = pickLang(
    SITE_FOOTER.disclaimerEn,
    SITE_FOOTER.disclaimerAr,
    lang,
  );

  return (
    <div className={`disclaimer${className ? ` ${className}` : ""}`}>
      <p>
        <b>{label}</b> {body}
      </p>
    </div>
  );
}
