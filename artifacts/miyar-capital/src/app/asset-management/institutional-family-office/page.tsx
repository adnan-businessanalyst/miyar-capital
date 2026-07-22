import type { Metadata } from "next";
import { InstitutionalFamilyOffice } from "@/views/InstitutionalFamilyOffice";

export const metadata: Metadata = {
  title: "Institutional & Family Office",
};

export default function Page() {
  return <InstitutionalFamilyOffice />;
}