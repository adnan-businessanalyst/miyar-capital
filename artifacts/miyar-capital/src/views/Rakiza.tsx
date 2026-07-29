import { ReportsPage } from "../components/ReportsPage";
import type { Report } from "../data/reports";

interface RakizaProps {
  reports: Report[];
}

export function Rakiza({ reports }: RakizaProps) {
  return <ReportsPage title="Rakiza" reports={reports} />;
}
