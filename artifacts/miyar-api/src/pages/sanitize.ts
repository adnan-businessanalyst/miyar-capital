import sanitizeHtml from "sanitize-html";
import type { CmsBlockType } from "./schema.js";

const HTML_FIELDS = [
  "titleEn",
  "titleAr",
  "headingEn",
  "headingAr",
  "bodyEn",
  "bodyAr",
  "crumbEn",
  "crumbAr",
  "buttonLabelEn",
  "buttonLabelAr",
] as const;

const ITEM_HTML_FIELDS = ["titleEn", "titleAr", "bodyEn", "bodyAr"] as const;

const ALLOWED_SPAN_CLASS = ["rt-navy", "rt-accent", "rt-muted", "rt-white"];

function applyHtmlFields<T extends Record<string, unknown>>(
  row: T,
  keys: readonly string[],
): T {
  for (const key of keys) {
    if (typeof row[key] === "string") {
      (row as Record<string, unknown>)[key] = sanitizeCmsHtml(row[key] as string);
    }
  }
  return row;
}

/** Allowlisted markup for CMS copy (same tags RichText already documents). */
export function sanitizeCmsHtml(raw: string): string {
  return sanitizeHtml(raw, {
    allowedTags: ["br", "strong", "em", "span", "p", "ul", "ol", "li", "a"],
    allowedAttributes: {
      span: ["class"],
      a: ["href", "target", "rel"],
    },
    allowedClasses: { span: ALLOWED_SPAN_CLASS },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { a: ["http", "https", "mailto"] },
    allowProtocolRelative: false,
    transformTags: {
      a: (_tag, attribs) => {
        const href = sanitizeCmsHref(attribs.href ?? "");
        if (!href) return { tagName: "span", attribs: {} as Record<string, string> };
        const next: Record<string, string> = { href };
        if (attribs.target === "_blank") {
          next.target = "_blank";
          next.rel = "noopener noreferrer";
        }
        return { tagName: "a", attribs: next };
      },
    },
  });
}

export function sanitizeCmsHref(raw: string): string {
  const href = raw.trim();
  if (!href) return "";
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  if (href.startsWith("#") && !href.toLowerCase().startsWith("#javascript")) return href;
  try {
    const url = new URL(href);
    if (url.protocol === "http:" || url.protocol === "https:" || url.protocol === "mailto:") {
      return href;
    }
  } catch {
    return "";
  }
  return "";
}

export function sanitizeCmsSrc(raw: string): string {
  const src = raw.trim();
  if (!src) return "";
  if (src.startsWith("/") && !src.startsWith("//")) return src;
  try {
    const url = new URL(src);
    if (url.protocol === "http:" || url.protocol === "https:") return src;
  } catch {
    return "";
  }
  return "";
}

export function sanitizeCmsBlockProps(
  _type: CmsBlockType | string,
  props: Record<string, unknown>,
): Record<string, unknown> {
  const next = applyHtmlFields({ ...props }, HTML_FIELDS);
  if (typeof next.media === "string") next.media = sanitizeCmsSrc(next.media);
  if (typeof next.image === "string") next.image = sanitizeCmsSrc(next.image);
  if (typeof next.href === "string") next.href = sanitizeCmsHref(next.href);
  if (next.design && typeof next.design === "object") {
    const design = { ...(next.design as Record<string, unknown>) };
    if (typeof design.image === "string") design.image = sanitizeCmsSrc(design.image);
    next.design = design;
  }
  if (Array.isArray(next.items)) {
    next.items = next.items.map((item) => {
      if (!item || typeof item !== "object") return item;
      const row = applyHtmlFields({ ...(item as Record<string, unknown>) }, ITEM_HTML_FIELDS);
      if (typeof row.href === "string") row.href = sanitizeCmsHref(row.href);
      if (typeof row.icon === "string") row.icon = sanitizeCmsSrc(row.icon);
      return row;
    });
  }
  return next;
}
