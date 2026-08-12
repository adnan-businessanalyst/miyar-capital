import Link from "next/link";
import { redirect } from "next/navigation";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import { AdminBar } from "../AdminBar";

export const metadata = { title: "Applications · Admin" };
export const dynamic = "force-dynamic";

type ApplicationRow = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  jobTitle: string;
  jobReference: string;
  status: string;
  scanStatus: string;
};

export default async function ApplicationsPage() {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");

  let rows: ApplicationRow[] = [];
  let dbError = "";
  try {
    const res = await apiServerFetch("/api/admin/applications");
    const json = (await res.json()) as {
      ok?: boolean;
      applications?: ApplicationRow[];
      error?: string;
    };
    if (!res.ok) {
      dbError = json.error || "Failed to load applications";
    } else {
      rows = json.applications ?? [];
    }
  } catch (e) {
    dbError = e instanceof Error ? e.message : "API unavailable";
  }

  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <h1>Job applications</h1>
        <p className="admin-meta">
          Newest first. PDF CVs are stored in the database; scan status is shown when a scanner is configured.
        </p>
        <div className="admin-card" style={{ marginTop: 20 }}>
          {dbError ? (
            <p className="form-error">{dbError}</p>
          ) : rows.length === 0 ? (
            <p className="admin-meta">No applications yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Job</th>
                  <th>Scan</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td>{r.createdAt.replace("T", " ").slice(0, 19)}</td>
                    <td>{r.name}</td>
                    <td>{r.email}</td>
                    <td>
                      {r.jobTitle}
                      <div className="admin-meta">{r.jobReference}</div>
                    </td>
                    <td>{r.scanStatus}</td>
                    <td>{r.status}</td>
                    <td>
                      <Link href={`/my-access-nimda/applications/${r.id}`}>
                        View
                      </Link>
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
