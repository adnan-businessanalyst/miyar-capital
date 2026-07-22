import Link from "next/link";
import { redirect } from "next/navigation";
import { desc } from "drizzle-orm";
import { isAdminAuthenticated } from "@/server/admin/auth";
import { getDb } from "@/server/db";
import { contactSubmissions } from "@/server/db/schema";
import { AdminLogoutButton } from "../AdminLogoutButton";

export const metadata = { title: "Submissions · Admin" };
export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin");

  let rows: Array<typeof contactSubmissions.$inferSelect> = [];
  let dbError = "";
  try {
    rows = await getDb().select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt)).limit(200);
  } catch (e) {
    dbError = e instanceof Error ? e.message : "Database unavailable";
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
                    <td>{r.createdAt.toISOString().replace("T", " ").slice(0, 19)}</td>
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
