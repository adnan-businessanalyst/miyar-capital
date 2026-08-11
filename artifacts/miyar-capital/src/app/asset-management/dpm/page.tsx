import type { Metadata } from "next";
import { DPM } from "@/views/DPM";

export const metadata: Metadata = {
  title: "Discretionary Portfolio Management",
};

export default function Page() {
  return <DPM />;
}
