import type { Metadata } from "next";
import { MurabahaFund } from "@/views/MurabahaFund";

export const metadata: Metadata = {
  title: "Murabaha Fund",
};

export default function Page() {
  return <MurabahaFund />;
}