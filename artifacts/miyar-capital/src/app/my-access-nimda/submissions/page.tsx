import Link from "next/link";
import { redirect } from "next/navigation";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import { AdminBar } from "../AdminBar";

export const metadata = { title: "Inbox · Admin" };
export const dynamic = "force-dynamic";

type ContactRow = {
  id: string;
  createdAt: string;
  name: string;
  email: string | null;
  subject: string | null;
  pageTitle?: string | null;
  sourcePage: string;
  status: string;
};

type ApplicationRow = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  jobTitle: string;
  jobReference: string;
  status: string;
};

type InboxKind = "all" | "contact" | "job";

type InboxItem = {
  id: string;
  kind: "contact" | "job";
  createdAt: string;
  name: string;
  email: string | null;
  regarding: string;
  status: string;
  href: string;
};

function parseKind(raw: string | undefined): InboxKind {
  if (raw === "contact" || raw === "job") return raw;
  return "all";
}

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");

  const { type: typeParam } = await searchParams;
  const kind = parseKind(typeParam);

  let items: InboxItem[] = [];
  let dbError = "";
  try {
    const [contactRes, jobRes] = await Promise.all([
      apiServerFetch("/api/admin/submissions"),
      apiServerFetch("/api/admin/applications"),
    ]);
    const contactJson = (await contactRes.json()) as {
      ok?: boolean;
      submissions?: ContactRow[];
      error?: string;
    };
    const jobJson = (await jobRes.json()) as {
      ok?: boolean;
      applications?: ApplicationRow[];
      error?: string;
    };
    if (!contactRes.ok) {
      dbError = contactJson.error || "Failed to load contact submissions";
    } else if (!jobRes.ok) {
      dbError = jobJson.error || "Failed to load job applications";
    } else {
      const contacts = (contactJson.submissions ?? []).map(
        (r): InboxItem => ({
          id: `contact-${r.id}`,
          kind: "contact",
          createdAt: r.createdAt,
          name: r.name,
          email: r.email,
          regarding: r.subject || r.pageTitle || r.sourcePage,
          status: r.status,
          href: `/my-access-nimda/submissions/${r.id}`,
        }),
      );
      const jobs = (jobJson.applications ?? []).map(
        (r): InboxItem => ({
          id: `job-${r.id}`,
          kind: "job",
          createdAt: r.createdAt,
          name: r.name,
          email: r.email,
          regarding: r.jobReference
            ? `${r.jobTitle} (${r.jobReference})`
            : r.jobTitle,
          status: r.status,
          href: `/my-access-nimda/applications/${r.id}`,
        }),
      );
      items = [...contacts, ...jobs].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      );
    }
  } catch (e) {
    dbError = e instanceof Error ? e.message : "API unavailable";
  }

  const visible =
    kind === "all" ? items : items.filter((row) => row.kind === kind);
  const contactCount = items.filter((row) => row.kind === "contact").length;
  const jobCount = items.filter((row) => row.kind === "job").length;

  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <h1>Inbox</h1>
        <p className="admin-meta">
          Contact forms and job applications are stored here even when SMTP is
          not configured. Newest first.
        </p>
        <nav className="admin-tabs" aria-label="Inbox filters">
          <Link
            className={kind === "all" ? "is-active" : undefined}
            href="/my-access-nimda/submissions"
          >
            All ({items.length})
          </Link>
          <Link
            className={kind === "contact" ? "is-active" : undefined}
            href="/my-access-nimda/submissions?type=contact"
          >
            Contact forms ({contactCount})
          </Link>
          <Link
            className={kind === "job" ? "is-active" : undefined}
            href="/my-access-nimda/submissions?type=job"
          >
            Job applications ({jobCount})
          </Link>
        </nav>
        <div className="admin-card" style={{ marginTop: 20 }}>
          {dbError ? (
            <p className="form-error">{dbError}</p>
          ) : visible.length === 0 ? (
            <p className="admin-meta">No submissions yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Regarding</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => (
                  <tr key={r.id}>
                    <td>{r.createdAt.replace("T", " ").slice(0, 19)}</td>
                    <td>
                      <span
                        className={
                          r.kind === "job"
                            ? "admin-badge admin-badge--job"
                            : "admin-badge"
                        }
                      >
                        {r.kind === "job" ? "Job" : "Contact"}
                      </span>
                    </td>
                    <td>{r.name}</td>
                    <td>{r.email || "—"}</td>
                    <td>{r.regarding}</td>
                    <td>{r.status}</td>
                    <td>
                      <Link href={r.href}>View</Link>
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
