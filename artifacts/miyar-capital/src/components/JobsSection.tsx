/**
 * JobsSection — Careers listing section that shows job cards with links and apply actions.
 *
 * Used by:
 * - views/Careers.tsx
 */

"use client";

import Link from "next/link";
import type { JobsPageData } from "../data/jobs";
import { useLanguage } from "../i18n/LanguageContext";
import { useLocalePath } from "../i18n/useLocalePath";
import { pickLang } from "../site/types";
import { JobApplyButton } from "./JobApplyButton";

export function JobsSection({
  className = "",
  data,
  hideHead = false,
}: {
  className?: string;
  data: JobsPageData;
  hideHead?: boolean;
}) {
  const { lang } = useLanguage();
  const withLocale = useLocalePath();
  const { settings, jobs } = data;

  return (
    <section className={`blk fp-jobs ${className}`.trim()} id="jobs">
      <div className="wrap">
        {hideHead ? (
          settings.hrEmail ? (
            <p className="fp-jobs-hr">
              <span>{pickLang(settings.hrLabelEn, settings.hrLabelAr, lang)}</span>{" "}
              <a href={`mailto:${settings.hrEmail}`}>{settings.hrEmail}</a>
            </p>
          ) : null
        ) : (
          <div className="fp-center">
            <h2 className="fp-tag">
              {pickLang(settings.tagEn, settings.tagAr, lang)}
            </h2>
            <p className="subtitle fp-h2">
              {pickLang(settings.headingEn, settings.headingAr, lang)}
            </p>
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
        )}

        {jobs.length === 0 ? (
          <p className="fp-jobs-empty">
            {pickLang(settings.emptyEn, settings.emptyAr, lang)}
          </p>
        ) : (
          <ul className="fp-jobs-list">
            {jobs.map((job) => {
              const title = pickLang(job.title, job.titleAr ?? "", lang);
              const href = withLocale(`/careers/${job.slug}`);
              return (
                <li key={job.id} className="fp-job">
                  <div className="fp-job-main">
                    <h3 className="fp-job-title">
                      <Link href={href}>{title}</Link>
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
                  <JobApplyButton job={job} settings={settings} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
