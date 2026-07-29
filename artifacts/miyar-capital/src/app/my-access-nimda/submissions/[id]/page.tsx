import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import { AdminBar } from "../../AdminBar";
import { MarkReadButton } from "./MarkReadButton";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

type Submission = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  sourcePage: string;
  status: string;
  ip: string | null;
  userAgent: string | null;
};

export default async function SubmissionDetailPage({ params }: Props) {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");
  const { id } = await params;

  const res = await apiServerFetch(`/api/admin/submissions/${id}`);
  if (res.status === 404) notFound();
  if (!res.ok) {
    redirect("/my-access-nimda/submissions");
  }
  const json = (await res.json()) as { submission?: Submission };
  const row = json.submission;
  if (!row) notFound();

  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <p>
          <Link href="/my-access-nimda/submissions">← Back to list</Link>
        </p>
        <div className="admin-card">
          <h1 style={{ marginTop: 0 }}>{row.name}</h1>
          <p className="admin-meta">
            {row.createdAt} · {row.sourcePage} · {row.status}
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
