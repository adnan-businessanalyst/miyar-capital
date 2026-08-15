/**
 * ReportCard — Localized report download/view card that prefers the matching EN/AR PDF when available.
 *
 * Used by:
 * - components/ReportsPage.tsx
 * - views/FinancialReports.tsx
 */

"use client";

import type { Report } from "../data/reports";
import { useLanguage } from "../i18n/LanguageContext";
import { apiUrl } from "../lib/api";
import { mediaUrl } from "../site/resolveAssetUrl";

const DEFAULT_CARD_IMAGE =
  mediaUrl("brand", "logo-nav-dark") ||
  mediaUrl("brand", "logo-footer") ||
  "/media/brand/logo-nav-dark.svg";

export function ReportCard(report: Report) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const title =
    (isAr ? report.titleAr : report.title) || report.title;
  const date = (isAr ? report.dateAr : report.date) || report.date;
  const fileName =
    (isAr ? report.fileNameAr : report.fileName) || report.fileName;

  /* AR site → Arabic PDF when present. EN site → EN PDF, with API fallback
     to Arabic when English was not uploaded. */
  const preferArabic = isAr && report.hasArabicFile && report.fileUrlAr;
  const fileUrl = preferArabic ? report.fileUrlAr! : report.fileUrl;
  const hasFile = Boolean(fileUrl);

  const thumbSrc =
    report.hasImage && report.imageUrl
      ? apiUrl(report.imageUrl)
      : DEFAULT_CARD_IMAGE;
  const isDefaultLogo = !(report.hasImage && report.imageUrl);

  const viewHref = hasFile ? apiUrl(fileUrl) : undefined;
  const downloadHref = hasFile
    ? apiUrl(`${fileUrl}${fileUrl.includes("?") ? "&" : "?"}download=1`)
    : undefined;

  const downloadLabel = isAr ? "تحميل" : "Download";
  const viewLabel = isAr ? "عرض" : "View";

  return (
    <div className="report-card">
      <div className={`report-thumb${isDefaultLogo ? " report-thumb--logo" : ""}`}>
        <img src={thumbSrc} alt="" />
      </div>
      <div className="report-body">
        <h3 lang={isAr && report.titleAr ? "ar" : undefined}>{title}</h3>
        <div className="report-year">{date}</div>
        <div className="report-actions">
          {hasFile ? (
            <>
              <a className="report-btn" href={downloadHref} download={fileName}>
                <DownloadIcon />
                {downloadLabel}
              </a>
              <a
                className="report-btn"
                href={viewHref}
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
    </div>
  );
}

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
