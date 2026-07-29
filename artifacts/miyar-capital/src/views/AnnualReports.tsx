import { ReportsPage } from "../components/ReportsPage";
import type { Report } from "../data/reports";

interface AnnualReportsProps {
  reports: Report[];
}

export function AnnualReports({ reports }: AnnualReportsProps) {
  return <ReportsPage title="Annual Reports" reports={reports} />;
}
