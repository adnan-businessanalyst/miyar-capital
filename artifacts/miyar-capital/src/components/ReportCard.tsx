"use client";

import type { Report } from "../data/reports";
import { useLanguage } from "../i18n/LanguageContext";
import { apiUrl } from "../lib/api";

export function ReportCard(report: Report) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const title =
    (isAr ? report.titleAr : report.title) || report.title;
  const date = (isAr ? report.dateAr : report.date) || report.date;
  const fileName =
    (isAr ? report.fileNameAr : report.fileName) || report.fileName;

  const useArabicFile = isAr && report.hasArabicFile && report.fileUrlAr;
  const fileUrl = useArabicFile ? report.fileUrlAr! : report.fileUrl;
  const hasFile = Boolean(fileUrl);

  const viewHref = hasFile ? apiUrl(fileUrl) : undefined;
  const downloadHref = hasFile
    ? apiUrl(`${fileUrl}${fileUrl.includes("?") ? "&" : "?"}download=1`)
    : undefined;

  const downloadLabel = isAr ? "تحميل" : "Download";
  const viewLabel = isAr ? "عرض" : "View";

  return (
    <div className="report-card">
      <div className="report-thumb">
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="16" y2="17" />
        </svg>
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
