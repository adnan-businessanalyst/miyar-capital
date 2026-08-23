import type { Metadata } from "next";
import { FrontPage } from "@/views/FrontPage";
import { fetchHomepageHero } from "@/lib/homepageHero";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Miyar Capital - independent Saudi investment firm. Asset management and investment banking, Shariah-compliant.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const hero = await fetchHomepageHero();
  return <FrontPage hero={hero} />;
}
