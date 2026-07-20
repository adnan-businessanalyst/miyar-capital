import { PageHero } from "./PageHero";
import { ReportCard } from "./ReportCard";
import { REPORTS } from "../data/reports";

interface ReportsPageProps {
  title: string;
}

export function ReportsPage({ title }: ReportsPageProps) {
  return (
    <div className="page">
      <PageHero title={title} crumb={`Investor Relations / ${title}`} />
      <section className="blk">
        <div className="wrap">
          <div className="reports-grid">
            {REPORTS.map((report, i) => (
              <ReportCard key={`${report.title}-${i}`} {...report} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
