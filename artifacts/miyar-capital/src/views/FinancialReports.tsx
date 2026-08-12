"use client";

import { PageHero } from "../components/PageHero";
import { ReportCard } from "../components/ReportCard";
import { SectionHead } from "../components/SectionHead";
import { FINANCIAL_REPORTS } from "../data/financialreports";
import type { Report } from "../data/reports";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";

interface FinancialReportsProps {
  annualReports: Report[];
  financialReports: Report[];
  loadError?: string;
}

export function FinancialReports({
  annualReports,
  financialReports,
  loadError,
}: FinancialReportsProps) {
  const { lang } = useLanguage();
  const data = FINANCIAL_REPORTS;

  return (
    <div className="page">
      <PageHero
        title={pickLang(data.hero.titleEn, data.hero.titleAr, lang)}
        crumb={pickLang(data.hero.crumbEn, data.hero.crumbAr, lang)}
      />
      {loadError ? (
        <section className="blk">
          <div className="wrap">
            <p style={{ color: "#b42318" }}>
              {pickLang(data.loadErrorEn, data.loadErrorAr, lang)}
            </p>
          </div>
        </section>
      ) : null}
      <section className="blk">
        <div className="wrap">
          <SectionHead
            title={pickLang(
              data.annual.headingEn,
              data.annual.headingAr,
              lang,
            )}
          />
          {annualReports.length === 0 ? (
            <p style={{ color: "var(--muted)", marginTop: 8 }}>
              {pickLang(data.annual.emptyEn, data.annual.emptyAr, lang)}
            </p>
          ) : (
            <div className="reports-grid">
              {annualReports.map((report) => (
                <ReportCard key={report.id} {...report} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="blk blk--cream">
        <div className="wrap">
          <SectionHead
            title={pickLang(
              data.financial.headingEn,
              data.financial.headingAr,
              lang,
            )}
          />
          {financialReports.length === 0 ? (
            <p style={{ color: "var(--muted)", marginTop: 8 }}>
              {pickLang(
                data.financial.emptyEn,
                data.financial.emptyAr,
                lang,
              )}
            </p>
          ) : (
            <div className="reports-grid">
              {financialReports.map((report) => (
                <ReportCard key={report.id} {...report} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
