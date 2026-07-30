import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArticle } from "@/views/NewsArticle";
import { getNewsBySlug, listNews } from "@/data/news";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listNews().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) {
    return { title: "News" };
  }
  return {
    title: article.title,
    description: article.blurb,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();
  return <NewsArticle article={article} />;
}
