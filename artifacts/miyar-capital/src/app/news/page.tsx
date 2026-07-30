import type { Metadata } from "next";
import { News } from "@/views/News";

export const metadata: Metadata = {
  title: "News",
  description: "News and updates from Miyar Capital.",
};

export default function Page() {
  return <News />;
}
