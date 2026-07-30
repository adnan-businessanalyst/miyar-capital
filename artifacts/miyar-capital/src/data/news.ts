export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  titleAr: string | null;
  date: string;
  dateAr: string | null;
  blurb: string;
  blurbAr: string | null;
  /** Full article body as paragraphs. */
  body: string[];
  bodyAr: string[];
  imageUrl: string;
  isPublished: boolean;
  sortOrder: number;
}

export interface NewsSettings {
  headingEn: string;
  headingAr: string;
  introEn: string;
  introAr: string;
  emptyEn: string;
  emptyAr: string;
  readMoreEn: string;
  readMoreAr: string;
  backLabelEn: string;
  backLabelAr: string;
}

export interface NewsPageData {
  settings: NewsSettings;
  articles: NewsArticle[];
}

export const EMPTY_NEWS_SETTINGS: NewsSettings = {
  headingEn: "News",
  headingAr: "الأخبار",
  introEn: "News and updates from Miyar Capital.",
  introAr: "أخبار وتحديثات من معيار المالية.",
  emptyEn: "No news articles at this time.",
  emptyAr: "لا توجد مقالات إخبارية في الوقت الحالي.",
  readMoreEn: "Read more",
  readMoreAr: "اقرأ المزيد",
  backLabelEn: "Back to News",
  backLabelAr: "العودة إلى الأخبار",
};

export const EMPTY_NEWS_PAGE: NewsPageData = {
  settings: EMPTY_NEWS_SETTINGS,
  articles: [],
};

/** Split CMS body text into paragraphs (blank-line separated). */
export function bodyToParagraphs(body: string | null | undefined): string[] {
  if (!body?.trim()) return [];
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function paragraphsToBody(paragraphs: string[]): string {
  return paragraphs.map((p) => p.trim()).filter(Boolean).join("\n\n");
}
