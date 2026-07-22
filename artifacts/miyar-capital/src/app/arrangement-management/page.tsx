import type { Metadata } from "next";
import { ArrangementManagement } from "@/views/ArrangementManagement";

export const metadata: Metadata = {
  title: "Arrangement Management",
};

export default function Page() {
  return <ArrangementManagement />;
}