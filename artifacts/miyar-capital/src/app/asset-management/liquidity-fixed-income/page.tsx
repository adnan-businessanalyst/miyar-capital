import type { Metadata } from "next";
import { LiquidityAndFixedIncome } from "@/views/LiquidityAndFixedIncome";

export const metadata: Metadata = {
  title: "Liquidity and Fixed Income Solutions",
};

export default function Page() {
  return <LiquidityAndFixedIncome />;
}
