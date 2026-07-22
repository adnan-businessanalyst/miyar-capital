import type { Metadata } from "next";
import { InvestmentManagement } from "@/views/InvestmentManagement";

export const metadata: Metadata = {
  title: "Investment Management",
};

export default function Page() {
  return <InvestmentManagement />;
}