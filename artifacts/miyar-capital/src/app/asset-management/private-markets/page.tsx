import type { Metadata } from "next";
import { PrivateMarketsPage } from "@/views/PrivateMarketsPage";

export const metadata: Metadata = {
  title: "Private Markets",
};

export default function Page() {
  return <PrivateMarketsPage />;
}
