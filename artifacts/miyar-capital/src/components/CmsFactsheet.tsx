/**
 * CmsFactsheet — Loads a CMS fact sheet by slug and renders Factsheet, with PDF download when uploaded.
 *
 * Used by:
 * - views/EquityManagement.tsx
 * - views/LiquidityFI.tsx
 * - views/PrivateMarketsPage.tsx
 * - views/RealAssets.tsx
 */

"use client";

import { useEffect, useState } from "react";
import type { CmsFactsheet as CmsFactsheetData } from "../data/factsheets";
import { useLanguage } from "../i18n/LanguageContext";
import { apiUrl } from "../lib/api";
import { pickLang } from "../site/types";
import { Factsheet, type FactsheetRow } from "./Factsheet";

export type CmsFactsheetFallback = {
  titleEn: string;
  titleAr: string;
  rows: Array<{
    labelEn: string;
    labelAr: string;
    valueEn: string;
    valueAr: string;
  }>;
  ctaEn?: string;
  ctaAr?: string;
};

export function CmsFactsheet({
  slug,
  fallback,
  className = "",
}: {
  slug: string;
  fallback: CmsFactsheetFallback;
  className?: string;
}) {
  const { lang } = useLanguage();
  const [cms, setCms] = useState<CmsFactsheetData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(apiUrl(`/api/factsheets/${slug}`), { cache: "no-store" })
      .then(async (res) => {
        const json = (await res.json().catch(() => ({}))) as {
          factsheet?: CmsFactsheetData;
        };
        if (!cancelled && res.ok && json.factsheet) setCms(json.factsheet);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const title = pickLang(
    cms?.titleEn ?? fallback.titleEn,
    cms?.titleAr ?? fallback.titleAr,
    lang,
  );
  const sourceRows = cms?.rows?.length ? cms.rows : fallback.rows;
  const rows: FactsheetRow[] = sourceRows.map((row) => ({
    label: pickLang(row.labelEn, row.labelAr, lang),
    value: pickLang(row.valueEn, row.valueAr, lang),
  }));

  const ctaShow = cms ? cms.ctaShow : Boolean(fallback.ctaEn);
  const hasFile = Boolean(cms?.hasFile || cms?.hasFileAr);
  const fileUrl =
    lang === "ar"
      ? cms?.fileUrlAr || cms?.fileUrl
      : cms?.fileUrl || cms?.fileUrlAr;
  const ctaLabel = pickLang(
    cms?.ctaLabelEn ?? fallback.ctaEn ?? "",
    cms?.ctaLabelAr ?? fallback.ctaAr ?? "",
    lang,
  );

  return (
    <Factsheet
      className={className}
      title={title}
      rows={rows}
      primaryCta={ctaShow && hasFile && ctaLabel ? ctaLabel : undefined}
      primaryCtaHref={
        ctaShow && hasFile && fileUrl
          ? apiUrl(`${fileUrl}${fileUrl.includes("?") ? "&" : "?"}download=1`)
          : undefined
      }
    />
  );
}
