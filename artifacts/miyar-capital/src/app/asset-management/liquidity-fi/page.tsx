import type { Metadata } from "next";
import { LiquidityFI } from "@/views/LiquidityFI";

export const metadata: Metadata = {
  title: "Miyar Murabaha Fund",
};

export default function Page() {
  return <LiquidityFI />;
}
