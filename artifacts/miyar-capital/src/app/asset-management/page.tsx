import type { Metadata } from "next";
import { AssetManagement } from "@/views/AssetManagement";

export const metadata: Metadata = {
  title: "Asset Management",
};

export default function Page() {
  return <AssetManagement />;
}