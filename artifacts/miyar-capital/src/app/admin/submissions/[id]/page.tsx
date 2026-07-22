import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { isAdminAuthenticated } from "@/server/admin/auth";
import { getDb } from "@/server/db";
import { contactSubmissions } from "@/server/db/schema";
import { AdminLogoutButton } from "../../AdminLogoutButton";
import { MarkReadButton } from "./MarkReadButton";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function SubmissionDetailPage({ params }: Props) {
  if (!(await isAdminAuthenticated())) redirect("/admin");
  const { id } = await params;

  const [row] = await getDb()
    .select()
    .from(contactSubmissions)
    .where(eq(contactSubmissions.id, id))
    .limit(1);

  if (!row) notFound();

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
        <p>
          <Link href="/admin/submissions">← Back to list</Link>
        </p>
        <div className="admin-card">
          <h1 style={{ marginTop: 0 }}>{row.name}</h1>
          <p className="admin-meta">
            {row.createdAt.toISOString()} · {row.sourcePage} · {row.status}
          </p>
          <table className="admin-table" style={{ marginTop: 16 }}>
            <tbody>
              <tr>
                <th>Email</th>
                <td>
                  <a href={`mailto:${row.email}`}>{row.email}</a>
                </td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{row.phone || "—"}</td>
              </tr>
              <tr>
                <th>Subject</th>
                <td>{row.subject || "—"}</td>
              </tr>
              <tr>
                <th>IP</th>
                <td>{row.ip || "—"}</td>
              </tr>
              <tr>
                <th>User agent</th>
                <td>{row.userAgent || "—"}</td>
              </tr>
            </tbody>
          </table>
          <h3>Message</h3>
          <div style={{ whiteSpace: "pre-wrap", background: "#f4f7f9", padding: 16, borderRadius: 8 }}>
            {row.message}
          </div>
          {row.status === "new" ? <MarkReadButton id={row.id} /> : null}
        </div>
      </div>
    </>
  );
}
