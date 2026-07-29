import { AdminBar } from "../AdminBar";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import { redirect } from "next/navigation";
import { ReportCreateForm } from "./ReportCreateForm";
import { ReportDeleteButton, ReportEditLink } from "./ReportActions";
import { apiUrl } from "@/lib/api";

export const metadata = { title: "Reports · Admin" };
export const dynamic = "force-dynamic";

type ReportRow = {
  id: string;
  section: string;
  title: string;
  titleAr: string | null;
  date: string;
  dateAr: string | null;
  fileName: string;
  fileNameAr: string | null;
  fileSize: number;
  fileUrl: string;
  fileUrlAr: string | null;
  hasArabicFile: boolean;
  updatedAt: string;
};

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function AdminReportsPage() {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");

  let rows: ReportRow[] = [];
  let dbError = "";
  try {
    const res = await apiServerFetch("/api/admin/reports");
    const json = (await res.json()) as {
      ok?: boolean;
      reports?: ReportRow[];
      error?: string;
    };
    if (!res.ok) {
      dbError = json.error || "Failed to load reports";
    } else {
      rows = json.reports ?? [];
    }
  } catch (e) {
    dbError = e instanceof Error ? e.message : "API unavailable";
  }

  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <h1>Financial reports</h1>
        <p className="admin-meta">
          Upload English and Arabic PDFs for the Annual Reports and Financial
          Reports sections on <a href="/financial-reports">/financial-reports</a>.
          Arabic mode on the site uses the Arabic title, date, and PDF.
        </p>

        <div className="admin-card" style={{ marginTop: 20 }}>
          <ReportCreateForm />
        </div>

        <div className="admin-card" style={{ marginTop: 24 }}>
          <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>Published reports</h2>
          {dbError ? (
            <p className="form-error">{dbError}</p>
          ) : rows.length === 0 ? (
            <p className="admin-meta">No reports yet. Upload one above.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Title (EN / AR)</th>
                  <th>Date</th>
                  <th>Files</th>
                  <th>Size</th>
                  <th>Updated</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td>{r.section === "annual" ? "Annual" : "Financial"}</td>
                    <td>
                      <div>{r.title}</div>
                      {r.titleAr ? (
                        <div className="admin-meta" dir="rtl" lang="ar">
                          {r.titleAr}
                        </div>
                      ) : (
                        <div className="admin-meta">No Arabic title</div>
                      )}
                    </td>
                    <td>
                      <div>{r.date}</div>
                      {r.dateAr ? (
                        <div className="admin-meta" dir="rtl" lang="ar">
                          {r.dateAr}
                        </div>
                      ) : null}
                    </td>
                    <td>
                      <div>
                        <a
                          href={apiUrl(`${r.fileUrl}?download=1`)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          EN: {r.fileName}
                        </a>
                      </div>
                      {r.hasArabicFile && r.fileUrlAr ? (
                        <div>
                          <a
                            href={apiUrl(`${r.fileUrlAr}&download=1`)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            AR: {r.fileNameAr || "Arabic PDF"}
                          </a>
                        </div>
                      ) : (
                        <div className="admin-meta">No Arabic PDF</div>
                      )}
                    </td>
                    <td>{formatBytes(r.fileSize)}</td>
                    <td>{r.updatedAt.replace("T", " ").slice(0, 19)}</td>
                    <td className="admin-row-actions">
                      <ReportEditLink id={r.id} />
                      <ReportDeleteButton id={r.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
