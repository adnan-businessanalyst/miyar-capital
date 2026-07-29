import type { Metadata } from "next";
import { Rakiza } from "@/views/Rakiza";
import { fetchReports } from "@/lib/reports";
import type { Report } from "@/data/reports";

export const metadata: Metadata = {
  title: "Rakiza",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  let reports: Report[] = [];
  try {
    reports = await fetchReports("annual");
  } catch {
    reports = [];
  }
  return <Rakiza reports={reports} />;
}
