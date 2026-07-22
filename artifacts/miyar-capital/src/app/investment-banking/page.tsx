import type { Metadata } from "next";
import { InvestmentBanking } from "@/views/InvestmentBanking";

export const metadata: Metadata = {
  title: "Investment Banking",
};

export default function Page() {
  return <InvestmentBanking />;
}