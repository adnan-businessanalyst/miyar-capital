import type { Metadata } from "next";
import { FATCA } from "@/views/FATCA";

export const metadata: Metadata = {
  title: "FATCA",
};

export default function Page() {
  return <FATCA />;
}