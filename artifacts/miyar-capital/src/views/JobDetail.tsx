"use client";

import Link from "next/link";
import { JobApplyButton } from "../components/JobApplyButton";
import { PageHero } from "../components/PageHero";
import {
  splitJobParagraphs,
  type JobPosting,
  type JobsSettings,
} from "../data/jobs";
import { useLanguage } from "../i18n/LanguageContext";
import { useLocalePath } from "../i18n/useLocalePath";
import { pickLang } from "../site/types";

export function JobDetail({
  job,
  settings,
}: {
  job: JobPosting;
  settings: JobsSettings;
}) {
  const { lang } = useLanguage();
  const withLocale = useLocalePath();
  const title = pickLang(job.title, job.titleAr ?? "", lang);
  const careersLabel = pickLang(settings.headingEn, settings.headingAr, lang);
  const description = pickLang(
    job.description || job.summary,
    job.descriptionAr || job.summaryAr || "",
    lang,
  );
  const howToApply = pickLang(
    job.howToApply,
    job.howToApplyAr ?? "",
    lang,
  );
  const backLabel = lang === "ar" ? "العودة إلى الوظائف" : "Back to careers";
  const detailsHeading =
    lang === "ar" ? "تفاصيل الوظيفة" : "About the role";
  const applyHeading = lang === "ar" ? "كيفية التقديم" : "How to apply";

  return (
    <div className="page">
      <PageHero
        title={title}
        crumbs={[
          { label: careersLabel, href: "/" },
          { label: title },
        ]}
        description={`${pickLang(job.location, job.locationAr ?? "", lang)} · ${pickLang(job.employmentType, job.employmentTypeAr ?? "", lang)} · ${job.referenceCode}`}
      />

      <section className="blk">
        <div className="wrap job-detail">
          <Link
            href={`${withLocale("/")}#jobs`}
            className="job-detail-back"
          >
            {lang === "ar" ? "→" : "←"} {backLabel}
          </Link>

          <div className="job-detail-meta">
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

          <section className="job-detail-block">
            <h2>{detailsHeading}</h2>
            <div className="job-detail-prose">
              {splitJobParagraphs(description).map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
            </div>
          </section>

          {howToApply.trim() ? (
            <section className="job-detail-block">
              <h2>{applyHeading}</h2>
              <div className="job-detail-prose">
                {splitJobParagraphs(howToApply).map((para) => (
                  <p key={para.slice(0, 48)}>{para}</p>
                ))}
              </div>
            </section>
          ) : null}

          <div className="job-detail-apply">
            <JobApplyButton job={job} settings={settings} />
            <p className="fp-jobs-disclaimer">
              {pickLang(settings.disclaimerEn, settings.disclaimerAr, lang)}
            </p>
            {settings.hrEmail ? (
              <p className="fp-jobs-hr">
                <span>
                  {pickLang(settings.hrLabelEn, settings.hrLabelAr, lang)}
                </span>{" "}
                <a href={`mailto:${settings.hrEmail}`}>{settings.hrEmail}</a>
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
