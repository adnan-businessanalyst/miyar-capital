import type { Metadata } from "next";
import { FinancialReports } from "@/views/FinancialReports";

export const metadata: Metadata = {
  title: "Financial Reports",
};

export default function Page() {
  return <FinancialReports />;
}