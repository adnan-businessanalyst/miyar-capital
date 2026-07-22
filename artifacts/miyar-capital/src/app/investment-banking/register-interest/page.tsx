import type { Metadata } from "next";
import { IBRegisterInterest } from "@/views/IBRegisterInterest";

export const metadata: Metadata = {
  title: "Register Interest",
};

export default function Page() {
  return <IBRegisterInterest />;
}