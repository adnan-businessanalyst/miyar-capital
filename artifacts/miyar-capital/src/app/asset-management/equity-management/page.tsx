import type { Metadata } from "next";
import { EquityManagement } from "@/views/EquityManagement";

export const metadata: Metadata = {
  title: "Equity Management",
};

export default function Page() {
  return <EquityManagement />;
}