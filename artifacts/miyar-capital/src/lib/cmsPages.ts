import type { Lang } from "@/site/types";

export type CmsDesign = {
  bg?: "none" | "solid" | "gradient" | "image";
  solid?: "navy" | "navy-mid" | "white";
  gradient?: "navy-mid" | "navy-fade";
  image?: string;
  imagePosition?: "center" | "top" | "bottom";
  overlay?: boolean;
  glass?: boolean;
};

export type CmsBlockType =
  | "hero"
  | "intro"
  | "cards"
  | "steps"
  | "band"
  | "register"
  | "richtext";

export type CmsBlock = {
  id: string;
  type: CmsBlockType;
  sort: number;
  props: Record<string, unknown>;
};

export type CmsAncestor = {
  titleEn: string;
  titleAr: string;
  path: string;
};

export type CmsSitePage = {
  path: string;
  titleEn: string;
  titleAr: string;
};

export type CmsPageData = {
  id: string;
  parentId: string | null;
  parentPath?: string | null;
  slug: string;
  path: string;
  titleEn: string;
  titleAr: string;
  published: boolean;
  navShow: boolean;
  reservedPath?: boolean;
  updatedAt: string;
  ancestors: CmsAncestor[];
  blocks: CmsBlock[];
};

export type CmsPageListItem = Omit<CmsPageData, "ancestors" | "blocks">;

export function asDesign(raw: unknown): CmsDesign {
  if (!raw || typeof raw !== "object") return { bg: "none" };
  return raw as CmsDesign;
}

export function str(raw: unknown): string {
  return typeof raw === "string" ? raw : "";
}

export function bool(raw: unknown, fallback = false): boolean {
  return typeof raw === "boolean" ? raw : fallback;
}

export function pickCms(en: unknown, ar: unknown, lang: Lang): string {
  const e = str(en);
  const a = str(ar);
  return lang === "ar" && a ? a : e;
}
