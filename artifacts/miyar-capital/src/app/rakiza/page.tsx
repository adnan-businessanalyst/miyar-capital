import type { Metadata } from "next";
import { Rakiza } from "@/views/Rakiza";

export const metadata: Metadata = {
  title: "Rakiza",
};

export default function Page() {
  return <Rakiza />;
}