import { PageHero } from "./PageHero";
import { IntroCard } from "./IntroCard";
import { StatIcon } from "./StatIcon";
import type { FundData, FundReport, FundStat } from "../data/funds";
import { CONTENT_IMAGES } from "../site/contentImages";

const signingImg = CONTENT_IMAGES.service_asset_management;

function StatSection({ title, stats }: { title: string; stats: FundStat[] }) {
  return (
    <section className="blk blk--cream">
      <div className="wrap">
        <div className="sec-head sec-head--center">
          <h2>{title}</h2>
        </div>
        <div className="stat-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <div className="stat-icon" aria-hidden="true">
                <StatIcon name={stat.icon} />
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReportSection({
  title,
  reports,
}: {
  title: string;
  reports: FundReport[];
}) {
  return (
    <section className="blk">
      <div className="wrap">
        <div className="sec-head sec-head--center">
          <h2>{title}</h2>
        </div>
        <div className="fund-reports">
          {reports.map((report, i) => (
            <div className="fund-report" key={`${report.title}-${report.year}-${i}`}>
              <h4>{report.title}</h4>
              <div className="fund-report-year">{report.year}</div>
              <div className="fund-report-actions">
                <a className="fund-report-btn">Download</a>
                <a className="fund-report-btn fund-report-btn--ghost">View</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FundPage({ fund }: { fund: FundData }) {
  return (
    <div className="page">
      <PageHero title={fund.name} crumb={`Asset Management / ${fund.name}`} />
      <IntroCard image={signingImg} />
      <StatSection title="Fund Overview" stats={fund.overview} />
      <StatSection title="Performance & Fees" stats={fund.performance} />
      <StatSection title="Operation" stats={fund.operation} />
      <ReportSection title="Quarterly Reports" reports={fund.quarterlyReports} />
      <ReportSection title="Annual Reports" reports={fund.annualReports} />
    </div>
  );
}
