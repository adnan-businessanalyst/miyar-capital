import type { Metadata } from "next";
import { EquityManagementPage } from "@/views/EquityManagementPage";

export const metadata: Metadata = {
  title: "Equity Management",
};

export default function Page() {
  return <EquityManagementPage />;
}