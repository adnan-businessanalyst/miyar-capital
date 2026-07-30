import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArticle } from "@/views/NewsArticle";
import { fetchNewsBySlug } from "@/lib/news";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchNewsBySlug(slug);
  if (!data) {
    return { title: "News" };
  }
  return {
    title: data.article.title,
    description: data.article.blurb,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await fetchNewsBySlug(slug);
  if (!data) notFound();
  return <NewsArticle article={data.article} settings={data.settings} />;
}
