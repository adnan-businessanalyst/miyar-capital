import type { Metadata } from "next";
import { FrontPage } from "@/views/FrontPage";
import { fetchHomepageHero } from "@/lib/homepageHero";
import { fetchJobsPage } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Miyar Capital - independent Saudi investment firm. Asset management and investment banking, Shariah-compliant.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const [hero, jobs] = await Promise.all([
    fetchHomepageHero(),
    fetchJobsPage(),
  ]);
  return <FrontPage hero={hero} jobs={jobs} />;
}
