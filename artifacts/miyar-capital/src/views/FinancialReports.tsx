"use client";

import { PageHero } from "../components/PageHero";
import { ReportCard } from "../components/ReportCard";
import { ANNUAL_REPORTS, FINANCIAL_REPORTS } from "../data/reports";

export function FinancialReports() {
  return (
    <div className="page">
      <PageHero
        title="Financial Reports"
        crumb="Investor Relations / Financial Reports"
      />
      <section className="blk">
        <div className="wrap">
          <div className="sec-head">
            <h2>Annual Reports</h2>
          </div>
          <div className="reports-grid">
            {ANNUAL_REPORTS.map((report, i) => (
              <ReportCard key={`annual-${report.title}-${i}`} {...report} />
            ))}
          </div>
        </div>
      </section>
      <section className="blk blk--cream">
        <div className="wrap">
          <div className="sec-head">
            <h2>Financial Reports</h2>
          </div>
          <div className="reports-grid">
            {FINANCIAL_REPORTS.map((report, i) => (
              <ReportCard key={`financial-${report.title}-${i}`} {...report} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
