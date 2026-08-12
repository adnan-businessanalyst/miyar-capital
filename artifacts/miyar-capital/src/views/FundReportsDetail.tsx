"use client";

import { PageHero } from "../components/PageHero";
import { SectionHead } from "../components/SectionHead";
import {
  FUND_REPORT_SECTIONS,
  sectionHeading,
  type FundsReportCard,
  type FundsReportFund,
  type FundsReportsSettings,
  type FundReportSectionId,
} from "../data/fundsreports";
import { useLanguage } from "../i18n/LanguageContext";
import { apiUrl } from "../lib/api";
import { pickLang } from "../site/types";

function DownloadIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ViewIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function FileBox({
  card,
  lang,
  isAr,
  viewLabel,
  downloadLabel,
}: {
  card: FundsReportCard;
  lang: "en" | "ar";
  isAr: boolean;
  viewLabel: string;
  downloadLabel: string;
}) {
  const preferAr = isAr && card.hasArabicFile && card.fileUrlAr;
  const fileUrl = preferAr ? card.fileUrlAr : card.fileUrl;
  const fileName =
    (preferAr ? card.fileNameAr : card.fileName) ||
    card.fileNameAr ||
    card.fileName ||
    "report.pdf";
  const hasFile = Boolean(fileUrl);

  return (
    <div className="fr-file-box">
      <div className="fr-file-box-date">
        {pickLang(card.dateEn, card.dateAr, lang)}
      </div>
      <h3 className="fr-file-box-title">
        {pickLang(card.titleEn, card.titleAr, lang)}
      </h3>
      <div className="fr-file-box-actions">
        {hasFile ? (
          <>
            <a
              className="report-btn"
              href={apiUrl(
                `${fileUrl}${fileUrl!.includes("?") ? "&" : "?"}download=1`,
              )}
              download={fileName}
            >
              <DownloadIcon />
              {downloadLabel}
            </a>
            <a
              className="report-btn"
              href={apiUrl(fileUrl!)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ViewIcon />
              {viewLabel}
            </a>
          </>
        ) : (
          <>
            <span className="report-btn report-btn--disabled" aria-disabled="true">
              <DownloadIcon />
              {downloadLabel}
            </span>
            <span className="report-btn report-btn--disabled" aria-disabled="true">
              <ViewIcon />
              {viewLabel}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export function FundReportsDetail({
  settings,
  fund,
}: {
  settings: FundsReportsSettings;
  fund: FundsReportFund;
}) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const title = pickLang(fund.titleEn, fund.titleAr, lang);
  const reportsLabel = pickLang(
    settings.childCrumbReportsEn,
    settings.childCrumbReportsAr,
    lang,
  );
  const parentTitle = pickLang(settings.headingEn, settings.headingAr, lang);
  const viewLabel = isAr ? "عرض" : "View";
  const downloadLabel = isAr ? "تحميل" : "Download";

  const bySection = (section: FundReportSectionId) =>
    fund.cards.filter((c) => c.section === section);

  return (
    <div className="page">
      <PageHero
        title={`${title} — ${reportsLabel}`}
        crumbs={[
          { label: parentTitle, href: "/funds-reports" },
          { label: `${title} — ${reportsLabel}` },
        ]}
        description={pickLang(fund.descriptionEn, fund.descriptionAr, lang)}
      />

      {FUND_REPORT_SECTIONS.map((section, index) => {
        const cards = bySection(section);
        const heading = sectionHeading(settings, section, lang);
        const multi = section === "quarterly_disclosures";
        return (
          <section
            key={section}
            className={`blk${index % 2 === 1 ? " blk--cream" : ""}`}
          >
            <div className="wrap">
              <SectionHead title={heading} />
              {cards.length === 0 ? (
                <p className="fr-empty">
                  {pickLang(settings.emptyEn, settings.emptyAr, lang)}
                </p>
              ) : (
                <div
                  className={
                    multi ? "fr-file-grid fr-file-grid--multi" : "fr-file-grid"
                  }
                >
                  {cards.map((card) => (
                    <FileBox
                      key={card.id}
                      card={card}
                      lang={lang}
                      isAr={isAr}
                      viewLabel={viewLabel}
                      downloadLabel={downloadLabel}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
