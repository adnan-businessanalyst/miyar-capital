import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminBar } from "../../AdminBar";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import { FundEditForm } from "./FundEditForm";
import { FundReportCreateForm } from "../FundReportCreateForm";
import { FundReportDeleteButton } from "../FundActions";

export const metadata = { title: "Edit fund · Admin" };
export const dynamic = "force-dynamic";

type FundRow = {
  id: string;
  slug: string;
  title: string;
  titleAr: string | null;
  description: string;
  descriptionAr: string | null;
  isPublished: boolean;
  sortOrder: number;
};

type ReportRow = {
  id: string;
  section: string;
  title: string;
  titleAr: string | null;
  date: string;
  hasFile: boolean;
  hasArabicFile: boolean;
  sortOrder: number;
};

function sectionLabel(section: string): string {
  if (section === "voting_policy") return "Voting Policy";
  if (section === "terms_and_conditions") return "Terms & Conditions";
  return "Quarterly Disclosures";
}

export default async function AdminFundEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");
  const { id } = await params;

  let fund: FundRow | null = null;
  let reports: ReportRow[] = [];
  let error = "";

  try {
    const [fundsRes, reportsRes] = await Promise.all([
      apiServerFetch("/api/admin/funds"),
      apiServerFetch(`/api/admin/funds/${id}/reports`),
    ]);

    const fundsJson = (await fundsRes.json()) as {
      funds?: FundRow[];
      error?: string;
    };
    const reportsJson = (await reportsRes.json()) as {
      reports?: ReportRow[];
      error?: string;
    };

    if (!fundsRes.ok) {
      error = fundsJson.error || "Failed to load fund";
    } else {
      fund = (fundsJson.funds ?? []).find((f) => f.id === id) ?? null;
      if (!fund) {
        notFound();
      }
    }

    if (reportsRes.ok) {
      reports = reportsJson.reports ?? [];
    } else if (!error) {
      error = reportsJson.error || "Failed to load reports";
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "API unavailable";
  }

  if (!fund) {
    if (error) {
      return (
        <>
          <AdminBar />
          <div className="admin-wrap">
            <p className="form-error">{error}</p>
            <Link href="/my-access-nimda/funds-reports">← Back</Link>
          </div>
        </>
      );
    }
    notFound();
  }

  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <p className="admin-meta">
          <Link href="/my-access-nimda/funds-reports">← Back to funds</Link>
          {" · "}
          <a
            href={`/funds-reports/${fund.slug}/reports`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View public page
          </a>
        </p>

        <div className="admin-card">
          <FundEditForm
            id={fund.id}
            initial={{
              slug: fund.slug,
              title: fund.title,
              titleAr: fund.titleAr || "",
              description: fund.description,
              descriptionAr: fund.descriptionAr || "",
              isPublished: fund.isPublished,
              sortOrder: fund.sortOrder,
            }}
          />
        </div>

        <div className="admin-card" style={{ marginTop: 24 }}>
          <FundReportCreateForm fundId={fund.id} />
        </div>

        <div className="admin-card" style={{ marginTop: 24 }}>
          <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>
            Report cards ({reports.length})
          </h2>
          {error ? <p className="form-error">{error}</p> : null}
          {reports.length === 0 ? (
            <p className="admin-meta">No cards yet. Add one above.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>PDF</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id}>
                    <td>{sectionLabel(r.section)}</td>
                    <td>
                      <div>{r.title}</div>
                      {r.titleAr ? (
                        <div className="admin-meta">{r.titleAr}</div>
                      ) : null}
                    </td>
                    <td>{r.date}</td>
                    <td className="admin-meta">
                      {r.hasFile || r.hasArabicFile
                        ? [
                            r.hasFile ? "EN" : null,
                            r.hasArabicFile ? "AR" : null,
                          ]
                            .filter(Boolean)
                            .join(" + ")
                        : "None"}
                    </td>
                    <td className="admin-row-actions">
                      <FundReportDeleteButton id={r.id} />
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
