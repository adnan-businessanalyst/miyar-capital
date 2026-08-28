import { apiInternalBase } from "./api-server";
import type { CmsPageData } from "./cmsPages";

export async function fetchPublishedCmsPage(
  path: string,
): Promise<CmsPageData | null> {
  try {
    const res = await fetch(
      `${apiInternalBase()}/api/cms-page?path=${encodeURIComponent(path)}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { page?: CmsPageData };
    return json.page ?? null;
  } catch {
    return null;
  }
}
