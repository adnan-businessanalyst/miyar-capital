import type { Metadata } from "next";
import { FundsReports } from "@/views/FundsReports";
import { fetchFundsReportsPage } from "@/lib/funds-reports";

export const metadata: Metadata = {
  title: "Funds Reports",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const { settings, funds } = await fetchFundsReportsPage();
  return <FundsReports settings={settings} funds={funds} />;
}
