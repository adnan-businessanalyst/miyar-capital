import type { Metadata } from "next";
import { MergersAcquisitions } from "@/views/MergersAcquisitions";

export const metadata: Metadata = {
  title: "Mergers & Acquisitions",
};

export default function Page() {
  return <MergersAcquisitions />;
}