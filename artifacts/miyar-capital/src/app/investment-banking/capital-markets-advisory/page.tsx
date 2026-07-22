import type { Metadata } from "next";
import { CapitalMarketsAdvisory } from "@/views/CapitalMarketsAdvisory";

export const metadata: Metadata = {
  title: "Capital Markets Advisory",
};

export default function Page() {
  return <CapitalMarketsAdvisory />;
}