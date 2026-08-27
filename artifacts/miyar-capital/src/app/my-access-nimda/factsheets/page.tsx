import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminBar } from "../AdminBar";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import type { CmsFactsheet } from "@/data/factsheets";
import { apiUrl } from "@/lib/api";

export const metadata = { title: "Fact sheets · Admin" };
export const dynamic = "force-dynamic";

function formatBytes(n: number | null) {
  if (!n) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function AdminFactsheetsPage() {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");

  let rows: CmsFactsheet[] = [];
  let dbError = "";
  try {
    const res = await apiServerFetch("/api/admin/factsheets");
    const json = (await res.json()) as {
      factsheets?: CmsFactsheet[];
      error?: string;
    };
    if (!res.ok) {
      dbError = json.error || "Failed to load fact sheets";
    } else {
      rows = json.factsheets ?? [];
    }
  } catch (e) {
    dbError = e instanceof Error ? e.message : "API unavailable";
  }

  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <h1>Fact sheets</h1>
        <p className="admin-meta">
          Edit each page fact sheet separately: title, rows, download button,
          and English / Arabic PDFs.
        </p>
        {dbError ? <p className="form-error">{dbError}</p> : null}

        <div className="admin-card" style={{ marginTop: 20 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>Title (EN / AR)</th>
                <th>Rows</th>
                <th>PDF EN</th>
                <th>PDF AR</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.slug}>
                  <td>
                    <div>{row.pageLabelEn}</div>
                    <div className="admin-meta" style={{ margin: 0 }}>
                      <a href={row.pagePath}>{row.pagePath}</a>
                    </div>
                  </td>
                  <td>
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
                  <td>{row.rows.length}</td>
                  <td>
                    {row.hasFile && row.fileUrl ? (
                      <a
                        href={apiUrl(`${row.fileUrl}?download=1`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.fileName || "EN PDF"} ({formatBytes(row.fileSize)})
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    {row.hasFileAr && row.fileUrlAr ? (
                      <a
                        href={apiUrl(`${row.fileUrlAr}&download=1`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.fileNameAr || "AR PDF"} ({formatBytes(row.fileSizeAr)})
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    <Link
                      className="admin-btn"
                      href={`/my-access-nimda/factsheets/${row.slug}`}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
