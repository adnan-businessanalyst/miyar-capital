import type { Metadata } from "next";
import { ShariahPrinciples } from "@/views/ShariahPrinciples";

export const metadata: Metadata = {
  title: "Shariah Principles",
};

export default function Page() {
  return <ShariahPrinciples />;
}