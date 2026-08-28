import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminBar } from "../../AdminBar";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import type { CmsPageData, CmsPageListItem, CmsSitePage } from "@/lib/cmsPages";
import { PageEditor } from "./PageEditor";

export const metadata = { title: "Edit page · Admin" };
export const dynamic = "force-dynamic";

export default async function AdminPageEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");

  const { id } = await params;
  let page: CmsPageData | null = null;
  let pages: CmsPageListItem[] = [];
  let sitePages: CmsSitePage[] = [];
  let dbError = "";

  try {
    const [one, list] = await Promise.all([
      apiServerFetch(`/api/admin/pages/${id}`),
      apiServerFetch("/api/admin/pages"),
    ]);
    const oneJson = (await one.json()) as { page?: CmsPageData; error?: string };
    const listJson = (await list.json()) as {
      pages?: CmsPageListItem[];
      sitePages?: CmsSitePage[];
      error?: string;
    };
    if (one.status === 404) notFound();
    if (!one.ok) dbError = oneJson.error || "Failed to load page";
    else page = oneJson.page ?? null;
    if (list.ok) {
      pages = listJson.pages ?? [];
      sitePages = listJson.sitePages ?? [];
    }
  } catch (e) {
    dbError = e instanceof Error ? e.message : "API unavailable";
  }

  if (!page && !dbError) notFound();

  return (
    <>
      <AdminBar />
      <div className="admin-wrap admin-wrap--wide">
        <p className="admin-meta">
          <Link href="/my-access-nimda/pages">← All pages</Link>
        </p>
        <h1>{page?.titleEn ?? "Page"}</h1>
        {dbError ? <p className="form-error">{dbError}</p> : null}
        {page ? <PageEditor initial={page} pages={pages} sitePages={sitePages} /> : null}
      </div>
    </>
  );
}
