import type { Metadata } from "next";
import { Insights } from "@/views/Insights";

export const metadata: Metadata = {
  title: "Insights",
};

export default function Page() {
  return <Insights />;
}