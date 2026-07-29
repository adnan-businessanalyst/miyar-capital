import { PageHero } from "./PageHero";
import { ReportCard } from "./ReportCard";
import type { Report } from "../data/reports";

interface ReportsPageProps {
  title: string;
  reports: Report[];
  emptyMessage?: string;
}

export function ReportsPage({
  title,
  reports,
  emptyMessage = "No reports published yet.",
}: ReportsPageProps) {
  return (
    <div className="page">
      <PageHero title={title} crumb={`Investor Relations / ${title}`} />
      <section className="blk">
        <div className="wrap">
          {reports.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>{emptyMessage}</p>
          ) : (
            <div className="reports-grid">
              {reports.map((report) => (
                <ReportCard key={report.id} {...report} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
