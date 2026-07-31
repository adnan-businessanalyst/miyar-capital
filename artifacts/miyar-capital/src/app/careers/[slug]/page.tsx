import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchJobBySlug } from "@/lib/jobs";
import { JobDetail } from "@/views/JobDetail";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchJobBySlug(slug);
  if (!data) return { title: "Careers" };
  return {
    title: data.job.title,
    description: data.job.summary,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await fetchJobBySlug(slug);
  if (!data) notFound();
  return <JobDetail job={data.job} settings={data.settings} />;
}
