import { z } from "zod";

const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(200)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be lowercase letters, numbers, and hyphens",
  );

export const newsArticleSchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(1).max(500),
  titleAr: z.string().trim().max(500).optional().default(""),
  date: z.string().trim().min(1).max(80),
  dateAr: z.string().trim().max(80).optional().default(""),
  blurb: z.string().trim().min(1).max(2000),
  blurbAr: z.string().trim().max(2000).optional().default(""),
  body: z.string().trim().min(1).max(50000),
  bodyAr: z.string().trim().max(50000).optional().default(""),
  imageUrl: z.string().trim().max(500).optional().default(""),
  isPublished: z.boolean().optional().default(true),
  sortOrder: z.number().int().optional().default(0),
});

export const newsArticleUpdateSchema = newsArticleSchema.partial();

export type NewsArticlePayload = z.infer<typeof newsArticleSchema>;

export const newsSettingsSchema = z.object({
  headingEn: z.string().trim().min(1).max(300),
  headingAr: z.string().trim().max(300).optional().default(""),
  introEn: z.string().trim().min(1).max(2000),
  introAr: z.string().trim().max(2000).optional().default(""),
  emptyEn: z.string().trim().min(1).max(1000),
  emptyAr: z.string().trim().max(1000).optional().default(""),
  readMoreEn: z.string().trim().min(1).max(80),
  readMoreAr: z.string().trim().max(80).optional().default(""),
  backLabelEn: z.string().trim().min(1).max(120),
  backLabelAr: z.string().trim().max(120).optional().default(""),
});

export type NewsSettingsPayload = z.infer<typeof newsSettingsSchema>;

export const DEFAULT_NEWS_SETTINGS: NewsSettingsPayload = {
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
