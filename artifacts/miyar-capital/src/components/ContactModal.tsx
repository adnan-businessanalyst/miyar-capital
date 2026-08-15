/**
 * ContactModal — Accessible modal shell with optional side image, used to host contact or apply forms.
 *
 * Used by:
 * - components/GetInTouch.tsx
 * - components/JobApplyButton.tsx
 * - components/RegisterInterest.tsx
 */

"use client";

import {
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { MAN_ON_PHONE_IMG } from "../site/manOnPhone";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Defaults to man_on_phone. Pass `null` to hide media. */
  image?: string | null;
};

export function ContactModal({
  open,
  onClose,
  title,
  children,
  image = MAN_ON_PHONE_IMG,
}: Props) {
  const { lang } = useLanguage();
  const dir = lang === "ar" ? "rtl" : "ltr";
  const media = image || null;
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="contact-modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className={`contact-modal${media ? " contact-modal--with-media" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        dir={dir}
        lang={lang}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="contact-modal-close"
          onClick={onClose}
          aria-label={lang === "ar" ? "إغلاق" : "Close"}
        >
          ×
        </button>
        {media ? (
          <div className="contact-modal-layout">
            <div className="contact-modal-media" aria-hidden="true">
              <img src={media} alt="" />
            </div>
            <div className="contact-modal-body">
              <h2 id={titleId} className="contact-modal-title">
                {title}
              </h2>
              {children}
            </div>
          </div>
        ) : (
          <div className="contact-modal-body">
            <h2 id={titleId} className="contact-modal-title">
              {title}
            </h2>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
