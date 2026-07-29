import { AdminBar } from "../AdminBar";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import { redirect } from "next/navigation";
import { DisclosureCreateForm } from "./DisclosureCreateForm";
import {
  DisclosureDeleteButton,
  DisclosureEditLink,
} from "./DisclosureActions";
import { apiUrl } from "@/lib/api";

export const metadata = { title: "Disclosures · Admin" };
export const dynamic = "force-dynamic";

type DisclosureRow = {
  id: string;
  title: string;
  titleAr: string | null;
  body: string;
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

export default async function AdminDisclosuresPage() {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");

  let rows: DisclosureRow[] = [];
  let dbError = "";
  try {
    const res = await apiServerFetch("/api/admin/disclosures");
    const json = (await res.json()) as {
      ok?: boolean;
      disclosures?: DisclosureRow[];
      error?: string;
    };
    if (!res.ok) {
      dbError = json.error || "Failed to load disclosures";
    } else {
      rows = json.disclosures ?? [];
    }
  } catch (e) {
    dbError = e instanceof Error ? e.message : "API unavailable";
  }

  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <h1>Disclosures</h1>
        <p className="admin-meta">
          Manage bilingual disclosure items (title, paragraph, PDF) shown on{" "}
          <a href="/disclosures">/disclosures</a>.
        </p>

        <div className="admin-card" style={{ marginTop: 20 }}>
          <DisclosureCreateForm />
        </div>

        <div className="admin-card" style={{ marginTop: 24 }}>
          <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>
            Published disclosures
          </h2>
          {dbError ? (
            <p className="form-error">{dbError}</p>
          ) : rows.length === 0 ? (
            <p className="admin-meta">No disclosures yet. Add one above.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title (EN / AR)</th>
                  <th>Files</th>
                  <th>Size</th>
                  <th>Updated</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
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
                      <DisclosureEditLink id={r.id} />
                      <DisclosureDeleteButton id={r.id} />
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
