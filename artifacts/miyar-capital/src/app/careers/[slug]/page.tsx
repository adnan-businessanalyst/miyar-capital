import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchJobBySlug } from "@/lib/jobs";
import { socialMetadata } from "@/site/social";
import { JobDetail } from "@/views/JobDetail";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchJobBySlug(slug);
  if (!data) return { title: "Careers" };
  const title = data.job.title;
  const description = data.job.summary;
  return {
    title,
    description,
    ...socialMetadata({
      title,
      description,
      url: `/careers/${data.job.slug}`,
    }),
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await fetchJobBySlug(slug);
  if (!data) notFound();
  return <JobDetail job={data.job} settings={data.settings} />;
}
