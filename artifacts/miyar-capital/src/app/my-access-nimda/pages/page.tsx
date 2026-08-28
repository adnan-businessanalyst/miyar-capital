import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminBar } from "../AdminBar";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import type { CmsPageListItem, CmsSitePage } from "@/lib/cmsPages";
import { CreatePageForm } from "./CreatePageForm";

export const metadata = { title: "Pages · Admin" };
export const dynamic = "force-dynamic";

function depthOf(
  pages: CmsPageListItem[],
  sitePages: CmsSitePage[],
  page: CmsPageListItem,
): number {
  let depth = 0;
  if (page.parentPath) {
    depth += sitePages.filter(
      (item) =>
        item.path === page.parentPath ||
        (page.parentPath?.startsWith(`${item.path}/`) ?? false),
    ).length;
  }
  let parentId = page.parentId;
  const seen = new Set<string>();
  while (parentId && !seen.has(parentId)) {
    seen.add(parentId);
    const parent = pages.find((item) => item.id === parentId);
    if (parent?.parentPath && !page.parentPath) {
      depth += sitePages.filter(
        (item) =>
          item.path === parent.parentPath ||
          (parent.parentPath?.startsWith(`${item.path}/`) ?? false),
      ).length;
    }
    depth += 1;
    parentId = parent?.parentId ?? null;
  }
  return depth;
}

export default async function AdminPagesList() {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");

  let pages: CmsPageListItem[] = [];
  let sitePages: CmsSitePage[] = [];
  let dbError = "";
  try {
    const res = await apiServerFetch("/api/admin/pages");
    const json = (await res.json()) as {
      pages?: CmsPageListItem[];
      sitePages?: CmsSitePage[];
      error?: string;
    };
    if (!res.ok) dbError = json.error || "Failed to load pages";
    else {
      pages = json.pages ?? [];
      sitePages = json.sitePages ?? [];
    }
  } catch (e) {
    dbError = e instanceof Error ? e.message : "API unavailable";
  }

  const sorted = [...pages].sort((a, b) => a.path.localeCompare(b.path));

  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <h1>Pages</h1>
        <p className="admin-meta">
          Section pages. Design (glass, overlay, bands) applies only to these
          CMS pages — existing marketing pages stay unchanged and can be chosen
          as a parent.
        </p>
        {dbError ? <p className="form-error">{dbError}</p> : null}

        <CreatePageForm pages={sorted} sitePages={sitePages} />

        <div className="admin-card" style={{ marginTop: 20 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Path</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={4} className="admin-meta">
                    No CMS pages yet. Create a parent, then a child.
                  </td>
                </tr>
              ) : (
                sorted.map((row) => (
                  <tr key={row.id}>
                    <td style={{ paddingInlineStart: 8 + depthOf(sorted, sitePages, row) * 18 }}>
                      {row.titleEn}
                      {row.titleAr ? (
                        <>
                          <br />
                          <span dir="rtl" lang="ar">
                            {row.titleAr}
                          </span>
                        </>
                      ) : null}
                    </td>
                    <td>
                      <code>{row.path}</code>
                      {row.reservedPath ? (
                        <div className="form-warning">
                          This path is owned by a hardcoded page.
                        </div>
                      ) : null}
                    </td>
                    <td>
                      <span className="admin-badge">
                        {row.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td>
                      <Link href={`/my-access-nimda/pages/${row.id}`}>Edit</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
