import type { Metadata } from "next";
import { Careers } from "@/views/Careers";
import { fetchJobsPage } from "@/lib/jobs";
import { EMPTY_JOBS_SETTINGS } from "@/data/jobs";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await fetchJobsPage();
  return {
    title: settings.headingEn || EMPTY_JOBS_SETTINGS.headingEn,
    description: settings.introEn || EMPTY_JOBS_SETTINGS.introEn,
  };
}

export default async function Page() {
  const data = await fetchJobsPage();
  return <Careers data={data} />;
}
