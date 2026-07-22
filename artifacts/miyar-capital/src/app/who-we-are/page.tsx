import type { Metadata } from "next";
import { WhoWeAre } from "@/views/WhoWeAre";

export const metadata: Metadata = {
  title: "Who We Are",
};

export default function Page() {
  return <WhoWeAre />;
}