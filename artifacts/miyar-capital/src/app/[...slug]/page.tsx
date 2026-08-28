import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { stripLocalePrefix } from "@/i18n/locale";
import { fetchPublishedCmsPage } from "@/lib/cmsPages.server";
import { CmsPage } from "@/views/CmsPage";

export const dynamic = "force-dynamic";

function cmsPathFromSlug(slug: string[]) {
  return stripLocalePrefix(`/${slug.filter(Boolean).join("/")}`);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await fetchPublishedCmsPage(cmsPathFromSlug(slug));
  if (!page) return { title: "Not found" };
  return { title: page.titleEn || page.titleAr };
}

export default async function CmsCatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = cmsPathFromSlug(slug);
  if (path === "/") notFound();
  const page = await fetchPublishedCmsPage(path);
  if (!page) notFound();
  return <CmsPage page={page} />;
}
