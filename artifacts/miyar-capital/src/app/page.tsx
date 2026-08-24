import type { Metadata } from "next";
import { fetchHomepageHero } from "@/lib/homepageHero";
import { socialMetadata } from "@/site/social";
import { FrontPage } from "@/views/FrontPage";

const homeDescription =
  "Miyar Capital - independent Saudi investment firm. Asset management and investment banking, Shariah-compliant.";

export const metadata: Metadata = {
  title: "Home",
  description: homeDescription,
  ...socialMetadata({
    title: "Miyar Capital",
    description: homeDescription,
    url: "/",
  }),
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const hero = await fetchHomepageHero();
  return <FrontPage hero={hero} />;
}
