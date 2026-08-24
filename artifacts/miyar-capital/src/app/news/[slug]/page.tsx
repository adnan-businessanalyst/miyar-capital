import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchNewsBySlug } from "@/lib/news";
import { socialMetadata } from "@/site/social";
import { NewsArticle } from "@/views/NewsArticle";

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
  const title = data.article.title;
  const description = data.article.blurb;
  return {
    title,
    description,
    ...socialMetadata({
      title,
      description,
      image: data.article.imageUrl || undefined,
      url: `/news/${data.article.slug}`,
    }),
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await fetchNewsBySlug(slug);
  if (!data) notFound();
  return <NewsArticle article={data.article} settings={data.settings} />;
}
