import type { Metadata } from "next";
import { DebtFinancingArrangement } from "@/views/DebtFinancingArrangement";

export const metadata: Metadata = {
  title: "Debt & Financing Arrangement",
};

export default function Page() {
  return <DebtFinancingArrangement />;
}