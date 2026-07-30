"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";
import {
  jobApplicationBody,
  jobApplicationSubject,
  jobMailtoHref,
  type JobPosting,
  type JobsPageData,
  type JobsSettings,
} from "../data/jobs";

type FallbackState = {
  job: JobPosting;
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

export function JobsSection({
  className = "",
  data,
}: {
  className?: string;
  data: JobsPageData;
}) {
  const { t, lang } = useLanguage();
  const { settings, jobs } = data;
  const [fallback, setFallback] = useState<FallbackState | null>(null);

  const apply = (job: JobPosting) => {
    const subject = jobApplicationSubject(job, lang);
    const body = jobApplicationBody(job, lang);
    tryOpenMailto(jobMailtoHref(job, settings.hrEmail, lang), () => {
      setFallback({ job, subject, body });
    });
  };

  if (!settings.hrEmail && jobs.length === 0) {
    return null;
  }

  return (
    <section className={`blk fp-jobs ${className}`.trim()}>
      <div className="wrap">
        <div className="fp-center">
          <div className="fp-tag">
            {pickLang(settings.tagEn, settings.tagAr, lang)}
          </div>
          <h2 className="fp-h2">
            {pickLang(settings.headingEn, settings.headingAr, lang)}
          </h2>
          <p className="fp-jobs-intro">
            {pickLang(settings.introEn, settings.introAr, lang)}
          </p>
          {settings.hrEmail ? (
            <p className="fp-jobs-hr">
              <span>{pickLang(settings.hrLabelEn, settings.hrLabelAr, lang)}</span>{" "}
              <a href={`mailto:${settings.hrEmail}`}>{settings.hrEmail}</a>
            </p>
          ) : null}
        </div>

        {jobs.length === 0 ? (
          <p className="fp-jobs-empty">
            {pickLang(settings.emptyEn, settings.emptyAr, lang)}
          </p>
        ) : (
          <ul className="fp-jobs-list">
            {jobs.map((job) => (
              <li key={job.id} className="fp-job">
                <div className="fp-job-main">
                  <h3 className="fp-job-title">
                    {pickLang(job.title, job.titleAr ?? "", lang)}
                  </h3>
                  <div className="fp-job-meta">
                    <span>
                      {pickLang(job.location, job.locationAr ?? "", lang)}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {pickLang(
                        job.employmentType,
                        job.employmentTypeAr ?? "",
                        lang,
                      )}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="fp-job-ref">{job.referenceCode}</span>
                  </div>
                  <p className="fp-job-summary">
                    {pickLang(job.summary, job.summaryAr ?? "", lang)}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-gold fp-job-apply"
                  onClick={() => apply(job)}
                >
                  {pickLang(settings.applyLabelEn, settings.applyLabelAr, lang)}
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="fp-jobs-disclaimer">
          {pickLang(settings.disclaimerEn, settings.disclaimerAr, lang)}
        </p>
      </div>

      {fallback ? (
        <JobsMailtoFallback
          state={fallback}
          settings={settings}
          onClose={() => setFallback(null)}
        />
      ) : null}
    </section>
  );
}
