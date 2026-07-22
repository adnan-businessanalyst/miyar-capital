import type { Metadata } from "next";
import { AnnualReports } from "@/views/AnnualReports";

export const metadata: Metadata = {
  title: "Annual Reports",
};

export default function Page() {
  return <AnnualReports />;
}