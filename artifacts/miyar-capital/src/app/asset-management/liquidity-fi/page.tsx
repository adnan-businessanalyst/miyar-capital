import type { Metadata } from "next";
import { LiquidityFI } from "@/views/LiquidityFI";

export const metadata: Metadata = {
  title: "Liquidity & Fixed Income",
};

export default function Page() {
  return <LiquidityFI />;
}