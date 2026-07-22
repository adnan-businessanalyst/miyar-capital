import type { Metadata } from "next";
import { ValuationFinancialAdvisory } from "@/views/ValuationFinancialAdvisory";

export const metadata: Metadata = {
  title: "Valuation & Financial Advisory",
};

export default function Page() {
  return <ValuationFinancialAdvisory />;
}