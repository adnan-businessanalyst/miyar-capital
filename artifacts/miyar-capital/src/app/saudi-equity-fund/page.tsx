import type { Metadata } from "next";
import { SaudiEquityFund } from "@/views/SaudiEquityFund";

export const metadata: Metadata = {
  title: "Saudi Equity Fund",
};

export default function Page() {
  return <SaudiEquityFund />;
}