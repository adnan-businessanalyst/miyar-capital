import type { Metadata } from "next";
import { DirectMurabaha } from "@/views/DirectMurabaha";

export const metadata: Metadata = {
  title: "Direct Murabaha",
};

export default function Page() {
  return <DirectMurabaha />;
}
