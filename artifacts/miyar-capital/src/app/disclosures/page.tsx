import type { Metadata } from "next";
import { Disclosures } from "@/views/Disclosures";

export const metadata: Metadata = {
  title: "Disclosures",
};

export default function Page() {
  return <Disclosures />;
}