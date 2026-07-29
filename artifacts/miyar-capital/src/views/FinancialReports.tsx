import { PageHero } from "../components/PageHero";
import { ReportCard } from "../components/ReportCard";
import type { Report } from "../data/reports";

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
  return (
    <div className="page">
      <PageHero
        title="Financial Reports"
        crumb="Investor Relations / Financial Reports"
      />
      {loadError ? (
        <section className="blk">
          <div className="wrap">
            <p style={{ color: "#b42318" }}>{loadError}</p>
          </div>
        </section>
      ) : null}
      <section className="blk">
        <div className="wrap">
          <div className="sec-head">
            <h2>Annual Reports</h2>
          </div>
          {annualReports.length === 0 ? (
            <p style={{ color: "var(--muted)", marginTop: 8 }}>
              No annual reports published yet.
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
          <div className="sec-head">
            <h2>Financial Reports</h2>
          </div>
          {financialReports.length === 0 ? (
            <p style={{ color: "var(--muted)", marginTop: 8 }}>
              No financial reports published yet.
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
