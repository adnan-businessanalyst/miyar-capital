import type { Metadata } from "next";
import { News } from "@/views/News";
import { fetchNewsPage } from "@/lib/news";
import { EMPTY_NEWS_SETTINGS } from "@/data/news";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await fetchNewsPage();
  return {
    title: settings.headingEn || EMPTY_NEWS_SETTINGS.headingEn,
    description: settings.introEn || EMPTY_NEWS_SETTINGS.introEn,
  };
}

export default async function Page() {
  const { settings, articles } = await fetchNewsPage();
  return <News settings={settings} articles={articles} />;
}
