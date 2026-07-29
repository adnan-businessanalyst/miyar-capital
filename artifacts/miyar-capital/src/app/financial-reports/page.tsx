import type { Metadata } from "next";
import { FinancialReports } from "@/views/FinancialReports";
import { fetchReports } from "@/lib/reports";
import type { Report } from "@/data/reports";

export const metadata: Metadata = {
  title: "Financial Reports",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  let annualReports: Report[] = [];
  let financialReports: Report[] = [];
  let loadError = "";

  try {
    const [annual, financial] = await Promise.all([
      fetchReports("annual"),
      fetchReports("financial"),
    ]);
    annualReports = annual;
    financialReports = financial;
  } catch (e) {
    loadError =
      e instanceof Error
        ? e.message
        : "Reports are temporarily unavailable. Please try again later.";
  }

  return (
    <FinancialReports
      annualReports={annualReports}
      financialReports={financialReports}
      loadError={loadError || undefined}
    />
  );
}
