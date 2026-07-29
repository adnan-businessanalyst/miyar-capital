import type { Metadata } from "next";
import { AnnualReports } from "@/views/AnnualReports";
import { fetchReports } from "@/lib/reports";
import type { Report } from "@/data/reports";

export const metadata: Metadata = {
  title: "Annual Reports",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  let reports: Report[] = [];
  try {
    reports = await fetchReports("annual");
  } catch {
    reports = [];
  }
  return <AnnualReports reports={reports} />;
}
