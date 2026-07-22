import type { Metadata } from "next";
import { RealAssets } from "@/views/RealAssets";

export const metadata: Metadata = {
  title: "Real Assets",
};

export default function Page() {
  return <RealAssets />;
}