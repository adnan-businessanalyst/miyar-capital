import {
  EMPTY_NEWS_PAGE,
  EMPTY_NEWS_SETTINGS,
  bodyToParagraphs,
  type NewsArticle,
  type NewsPageData,
  type NewsSettings,
} from "@/data/news";
import { apiInternalBase } from "@/lib/api-server";

type ApiArticle = {
  id: string;
  slug: string;
  title: string;
  titleAr: string | null;
  date: string;
  dateAr: string | null;
  blurb: string;
  blurbAr: string | null;
  body: string;
  bodyAr: string | null;
  imageUrl: string;
  isPublished: boolean;
  sortOrder: number;
};

function mapArticle(a: ApiArticle): NewsArticle {
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    titleAr: a.titleAr ?? null,
    date: a.date,
    dateAr: a.dateAr ?? null,
    blurb: a.blurb,
    blurbAr: a.blurbAr ?? null,
    body: bodyToParagraphs(a.body),
    bodyAr: bodyToParagraphs(a.bodyAr),
    imageUrl: a.imageUrl || "",
    isPublished: Boolean(a.isPublished),
    sortOrder: a.sortOrder ?? 0,
  };
}

function mapSettings(s: Partial<NewsSettings> | undefined): NewsSettings {
  return { ...EMPTY_NEWS_SETTINGS, ...s };
}

export async function fetchNewsPage(): Promise<NewsPageData> {
  try {
    const res = await fetch(`${apiInternalBase()}/api/news`, {
      cache: "no-store",
    });
    if (!res.ok) return EMPTY_NEWS_PAGE;
    const json = (await res.json()) as {
      settings?: NewsSettings;
      articles?: ApiArticle[];
    };
    return {
      settings: mapSettings(json.settings),
      articles: (json.articles ?? []).map(mapArticle),
    };
  } catch {
    return EMPTY_NEWS_PAGE;
  }
}

export async function fetchNewsBySlug(
  slug: string,
): Promise<{ settings: NewsSettings; article: NewsArticle } | null> {
  try {
    const res = await fetch(
      `${apiInternalBase()}/api/news/${encodeURIComponent(slug)}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      settings?: NewsSettings;
      article?: ApiArticle;
    };
    if (!json.article) return null;
    return {
      settings: mapSettings(json.settings),
      article: mapArticle(json.article),
    };
  } catch {
    return null;
  }
}
