import type { Metadata } from "next";
import { InvestmentAdvisory } from "@/views/InvestmentAdvisory";

export const metadata: Metadata = {
  title: "Investment Advisory",
};

export default function Page() {
  return <InvestmentAdvisory />;
}