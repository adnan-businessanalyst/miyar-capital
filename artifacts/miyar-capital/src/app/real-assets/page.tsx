import type { Metadata } from "next";
import { RealAssetsPage } from "@/views/RealAssetsPage";

export const metadata: Metadata = {
  title: "Real Assets",
};

export default function Page() {
  return <RealAssetsPage />;
}