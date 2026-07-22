import type { Metadata } from "next";
import { FrontPage } from "@/views/FrontPage";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Miyar Capital - independent Saudi investment firm. Asset management and investment banking, Shariah-compliant.",
};

export default function Page() {
  return <FrontPage />;
}
