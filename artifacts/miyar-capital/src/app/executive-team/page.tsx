import type { Metadata } from "next";
import { ExecutiveTeam } from "@/views/ExecutiveTeam";

export const metadata: Metadata = {
  title: "Executive Team",
};

export default function Page() {
  return <ExecutiveTeam />;
}