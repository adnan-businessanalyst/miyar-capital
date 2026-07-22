import type { Metadata } from "next";
import { RealEstatePrivateArrangements } from "@/views/RealEstatePrivateArrangements";

export const metadata: Metadata = {
  title: "Real Estate & Private Arrangements",
};

export default function Page() {
  return <RealEstatePrivateArrangements />;
}