import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import { AdminBar } from "../../AdminBar";
import { MarkReadButton } from "./MarkReadButton";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

type Application = {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  jobSlug: string;
  jobTitle: string;
  jobReference: string;
  sourcePage: string;
  status: string;
  ip: string | null;
  userAgent: string | null;
  cvName: string;
  cvSize: number;
  scanStatus: string;
  scanDetail: string | null;
  scanProvider: string | null;
  scannedAt: string | null;
};

export default async function ApplicationDetailPage({ params }: Props) {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");
  const { id } = await params;

  const res = await apiServerFetch(`/api/admin/applications/${id}`);
  if (res.status === 404) notFound();
  if (!res.ok) {
    redirect("/my-access-nimda/applications");
  }
  const json = (await res.json()) as { application?: Application };
  const row = json.application;
  if (!row) notFound();

  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <p>
          <Link href="/my-access-nimda/submissions?type=job">
            ← Back to inbox
          </Link>
        </p>
        <div className="admin-card">
          <h1 style={{ marginTop: 0 }}>{row.name}</h1>
          <p className="admin-meta">
            {row.createdAt} · {row.jobTitle} · {row.status}
          </p>
          <table className="admin-table" style={{ marginTop: 16 }}>
            <tbody>
              <tr>
                <th>First name</th>
                <td>{row.firstName}</td>
              </tr>
              <tr>
                <th>Last name</th>
                <td>{row.lastName}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>
                  <a href={`mailto:${row.email}`}>{row.email}</a>
                </td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{row.phone}</td>
              </tr>
              <tr>
                <th>Job</th>
                <td>
                  {row.jobTitle} ({row.jobReference})
                </td>
              </tr>
              <tr>
                <th>Slug</th>
                <td>{row.jobSlug}</td>
              </tr>
              <tr>
                <th>Source path</th>
                <td>{row.sourcePage}</td>
              </tr>
              <tr>
                <th>CV</th>
                <td>
                  <a
                    href={`/api/admin/applications/${row.id}/cv`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {row.cvName}
                  </a>{" "}
                  <span className="admin-meta">
                    ({Math.round(row.cvSize / 1024)} KB)
                  </span>
                </td>
              </tr>
              <tr>
                <th>Scan status</th>
                <td>
                  {row.scanStatus}
                  {row.scanProvider ? ` · ${row.scanProvider}` : ""}
                  {row.scanDetail ? (
                    <div className="admin-meta">{row.scanDetail}</div>
                  ) : null}
                </td>
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
          <div
            style={{
              whiteSpace: "pre-wrap",
              background: "#f4f7f9",
              padding: 16,
              borderRadius: 8,
            }}
          >
            {row.message}
          </div>
          {row.status === "new" ? <MarkReadButton id={row.id} /> : null}
        </div>
      </div>
    </>
  );
}
