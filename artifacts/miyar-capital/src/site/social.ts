import type { Metadata } from "next";
import { SITE_META } from "./defaults";

/** Canonical origin for absolute Open Graph / Twitter image URLs. */
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://miyarcapital.com.sa";

/** Default share image (hero still). */
export const OG_IMAGE_PATH = "/media/page-hero/page-hero-bg.webp";

function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${suffix}`;
}

export function socialCardImage(path = OG_IMAGE_PATH, alt = SITE_META.metaTitle) {
  return {
    url: absoluteUrl(path),
    width: 1200,
    height: 630,
    alt,
  };
}

/** Open Graph + Twitter card fields for a page. */
export function socialMetadata(opts?: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const title = opts?.title || SITE_META.metaTitle;
  const description = opts?.description || SITE_META.metaDescription;
  const image = socialCardImage(opts?.image, title);
  return {
    openGraph: {
      type: "website",
      locale: "ar_SA",
      alternateLocale: ["en_US"],
      siteName: "Miyar Capital",
      title,
      description,
      url: opts?.url ? absoluteUrl(opts.url) : SITE_ORIGIN,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
