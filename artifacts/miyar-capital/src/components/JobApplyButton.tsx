"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";
import {
  jobApplicationBody,
  jobApplicationSubject,
  jobMailtoHref,
  type JobPosting,
  type JobsSettings,
} from "../data/jobs";

type FallbackState = {
  subject: string;
  body: string;
};

function tryOpenMailto(href: string, onFail: () => void) {
  let leftPage = false;
  const markLeft = () => {
    leftPage = true;
  };

  window.addEventListener("blur", markLeft);
  document.addEventListener("visibilitychange", markLeft);

  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.rel = "noopener noreferrer";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  window.setTimeout(() => {
    window.removeEventListener("blur", markLeft);
    document.removeEventListener("visibilitychange", markLeft);
    if (!leftPage && document.visibilityState === "visible") {
      onFail();
    }
  }, 900);
}

function JobsMailtoFallback({
  state,
  settings,
  onClose,
}: {
  state: FallbackState;
  settings: JobsSettings;
  onClose: () => void;
}) {
  const { t, lang } = useLanguage();
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const hrEmail = settings.hrEmail;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      className="fp-jobs-modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="fp-jobs-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="fp-jobs-modal-close"
          onClick={onClose}
          aria-label={t("fp_jobs_modal_close")}
        >
          ×
        </button>
        <h3 id={titleId}>{t("fp_jobs_modal_title")}</h3>
        <p className="fp-jobs-modal-lead">{t("fp_jobs_modal_lead")}</p>
        <p className="fp-jobs-modal-disclaimer">
          {pickLang(settings.disclaimerEn, settings.disclaimerAr, lang)}
        </p>

        <label className="fp-jobs-field">
          <span>{t("fp_jobs_label_email")}</span>
          <div className="fp-jobs-field-row">
            <code>{hrEmail}</code>
            <button type="button" onClick={() => copy(hrEmail)}>
              {t("fp_jobs_copy")}
            </button>
          </div>
        </label>

        <label className="fp-jobs-field">
          <span>{t("fp_jobs_label_subject")}</span>
          <div className="fp-jobs-field-row">
            <code>{state.subject}</code>
            <button type="button" onClick={() => copy(state.subject)}>
              {t("fp_jobs_copy")}
            </button>
          </div>
        </label>

        <label className="fp-jobs-field">
          <span>{t("fp_jobs_label_body")}</span>
          <div className="fp-jobs-field-row fp-jobs-field-row--stack">
            <pre>{state.body}</pre>
            <button type="button" onClick={() => copy(state.body)}>
              {t("fp_jobs_copy")}
            </button>
          </div>
        </label>
      </div>
    </div>
  );
}

export function JobApplyButton({
  job,
  settings,
  className = "btn btn-gold fp-job-apply",
}: {
  job: JobPosting;
  settings: JobsSettings;
  className?: string;
}) {
  const { lang } = useLanguage();
  const [fallback, setFallback] = useState<FallbackState | null>(null);

  const apply = () => {
    const subject = jobApplicationSubject(job, lang);
    const body = jobApplicationBody(job, lang);
    tryOpenMailto(jobMailtoHref(job, settings.hrEmail, lang), () => {
      setFallback({ subject, body });
    });
  };

  return (
    <>
      <button type="button" className={className} onClick={apply}>
        {pickLang(settings.applyLabelEn, settings.applyLabelAr, lang)}
      </button>
      {fallback ? (
        <JobsMailtoFallback
          state={fallback}
          settings={settings}
          onClose={() => setFallback(null)}
        />
      ) : null}
    </>
  );
}
