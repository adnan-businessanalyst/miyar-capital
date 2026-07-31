"use client";

import Link from "next/link";
import { PageHero } from "../components/PageHero";
import type {
  FundsReportFund,
  FundsReportsSettings,
} from "../data/fundsreports";
import { useLanguage } from "../i18n/LanguageContext";
import { useLocalePath } from "../i18n/useLocalePath";
import { apiUrl } from "../lib/api";
import { pickLang } from "../site/types";

export function FundsReports({
  settings,
  funds,
}: {
  settings: FundsReportsSettings;
  funds: FundsReportFund[];
}) {
  const { lang } = useLanguage();
  const withLocale = useLocalePath();
  const isAr = lang === "ar";

  return (
    <div className="page">
      <PageHero
        title={pickLang(settings.headingEn, settings.headingAr, lang)}
        crumb={pickLang(settings.crumbEn, settings.crumbAr, lang)}
        description={pickLang(settings.introEn, settings.introAr, lang)}
      />

      <section className="blk">
        <div className="wrap wrap--funds">
          {funds.length === 0 ? (
            <p className="fr-empty">
              {pickLang(settings.emptyEn, settings.emptyAr, lang)}
            </p>
          ) : (
            <div className="fr-funds">
              {funds.map((fund) => {
                const title = pickLang(fund.titleEn, fund.titleAr, lang);
                const href = withLocale(
                  `/funds-reports/${fund.slug}/reports`,
                );
                return (
                  <article className="fr-fund" key={fund.id}>
                    <h2 className="fr-fund-title">{title}</h2>
                    <p className="fr-fund-desc">
                      {pickLang(
                        fund.descriptionEn,
                        fund.descriptionAr,
                        lang,
                      )}
                    </p>
                    <div className="fr-fund-cards">
                      {fund.cards.slice(0, 15).map((card) => {
                        const preferAr =
                          isAr && card.hasArabicFile && card.fileUrlAr;
                        const fileUrl = preferAr
                          ? card.fileUrlAr
                          : card.fileUrl;
                        const titleText = pickLang(
                          card.titleEn,
                          card.titleAr,
                          lang,
                        );
                        const inner = (
                          <>
                            <h3 className="fr-card-title">{titleText}</h3>
                            <div className="fr-card-date">
                              {pickLang(card.dateEn, card.dateAr, lang)}
                            </div>
                          </>
                        );
                        return fileUrl ? (
                          <a
                            key={card.id}
                            className="fr-card fr-card--link"
                            href={apiUrl(fileUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {inner}
                          </a>
                        ) : (
                          <div className="fr-card" key={card.id}>
                            {inner}
                          </div>
                        );
                      })}
                    </div>
                    <Link className="fr-fund-link" href={href}>
                      {pickLang(
                        settings.viewReportsEn,
                        settings.viewReportsAr,
                        lang,
                      )}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
