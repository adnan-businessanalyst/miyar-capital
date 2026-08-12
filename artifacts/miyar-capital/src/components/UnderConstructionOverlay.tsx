"use client";

import { useLanguage } from "../i18n/LanguageContext";

/** Full-viewport notice that the page is still being built. */
export function UnderConstructionOverlay() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div
      className="uc-overlay"
      role="status"
      aria-live="polite"
      aria-label={isAr ? "الصفحة قيد الإنشاء" : "Page under construction"}
    >
      <div className="uc-card">
        <div className="uc-worker" aria-hidden="true">
          <div className="uc-worker-body">
            <div className="uc-hat" />
            <div className="uc-head" />
            <div className="uc-torso" />
            <div className="uc-arm uc-arm-left" />
            <div className="uc-arm uc-arm-right">
              <span className="uc-hammer" />
            </div>
            <div className="uc-leg uc-leg-left" />
            <div className="uc-leg uc-leg-right" />
          </div>
          <div className="uc-cone" />
          <div className="uc-dust" />
        </div>

        <p className="uc-eyebrow">
          {isAr ? "قريباً" : "Coming soon"}
        </p>
        <h2 className="uc-title">
          {isAr ? "هذه الصفحة قيد الإنشاء" : "This page is under construction"}
        </h2>
        <p className="uc-body">
          {isAr
            ? "نعمل على تجهيز هذا المحتوى. شكراً لصبركم — يمكنكم متابعة التصفح عبر القائمة."
            : "We’re preparing this content. Thank you for your patience — you can keep browsing via the menu."}
        </p>
      </div>
    </div>
  );
}
