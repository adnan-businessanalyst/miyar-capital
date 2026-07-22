import type { Metadata } from "next";
import { GovernanceIndependence } from "@/views/GovernanceIndependence";

export const metadata: Metadata = {
  title: "Governance & Independence",
};

export default function Page() {
  return <GovernanceIndependence />;
}