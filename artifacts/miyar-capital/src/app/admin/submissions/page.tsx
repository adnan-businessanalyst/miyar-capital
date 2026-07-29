import Link from "next/link";
import { redirect } from "next/navigation";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import { AdminLogoutButton } from "../AdminLogoutButton";

export const metadata = { title: "Submissions · Admin" };
export const dynamic = "force-dynamic";

type SubmissionRow = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  sourcePage: string;
  status: string;
};

export default async function SubmissionsPage() {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/admin");

  let rows: SubmissionRow[] = [];
  let dbError = "";
  try {
    const res = await apiServerFetch("/api/admin/submissions");
    const json = (await res.json()) as {
      ok?: boolean;
      submissions?: SubmissionRow[];
      error?: string;
    };
    if (!res.ok) {
      dbError = json.error || "Failed to load submissions";
    } else {
      rows = json.submissions ?? [];
    }
  } catch (e) {
    dbError = e instanceof Error ? e.message : "API unavailable";
  }

  return (
    <>
      <div className="admin-bar">
        <strong>Miyar Admin</strong>
        <div>
          <Link href="/admin/submissions">Submissions</Link>
          <AdminLogoutButton />
        </div>
      </div>
      <div className="admin-wrap">
        <h1>Form submissions</h1>
        <p className="admin-meta">Newest first. Public API is not exposed — this view is auth-only.</p>
        <div className="admin-card" style={{ marginTop: 20 }}>
          {dbError ? (
            <p className="form-error">{dbError}</p>
          ) : rows.length === 0 ? (
            <p className="admin-meta">No submissions yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Source</th>
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
                    <td>{r.sourcePage}</td>
                    <td>{r.status}</td>
                    <td>
                      <Link href={`/admin/submissions/${r.id}`}>View</Link>
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
