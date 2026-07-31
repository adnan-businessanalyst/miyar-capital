import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminBar } from "../AdminBar";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import {
  EMPTY_FUNDS_REPORTS_SETTINGS,
  type FundsReportsSettings,
} from "@/data/fundsreports";
import { FundCreateForm } from "./FundCreateForm";
import { FundSettingsForm } from "./FundSettingsForm";
import {
  FundDeleteButton,
  FundEditLink,
  FundVisibilityButton,
} from "./FundActions";

export const metadata = { title: "Funds Reports · Admin" };
export const dynamic = "force-dynamic";

type FundRow = {
  id: string;
  slug: string;
  title: string;
  titleAr: string | null;
  isPublished: boolean;
  reportCount: number;
  updatedAt: string;
};

export default async function AdminFundsReportsPage() {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");

  let rows: FundRow[] = [];
  let settings: FundsReportsSettings = EMPTY_FUNDS_REPORTS_SETTINGS;
  let dbError = "";

  try {
    const [fundsRes, settingsRes] = await Promise.all([
      apiServerFetch("/api/admin/funds"),
      apiServerFetch("/api/admin/funds-reports-settings"),
    ]);

    const fundsJson = (await fundsRes.json()) as {
      ok?: boolean;
      funds?: FundRow[];
      error?: string;
    };
    const settingsJson = (await settingsRes.json()) as {
      ok?: boolean;
      settings?: FundsReportsSettings;
      error?: string;
    };

    if (!fundsRes.ok) {
      dbError = fundsJson.error || "Failed to load funds";
    } else {
      rows = fundsJson.funds ?? [];
    }

    if (settingsRes.ok && settingsJson.settings) {
      settings = { ...EMPTY_FUNDS_REPORTS_SETTINGS, ...settingsJson.settings };
    } else if (!dbError) {
      dbError = settingsJson.error || "Failed to load settings";
    }
  } catch (e) {
    dbError = e instanceof Error ? e.message : "API unavailable";
  }

  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <h1>Funds Reports</h1>
        <p className="admin-meta">
          Manage{" "}
          <a href="/funds-reports" target="_blank" rel="noopener noreferrer">
            /funds-reports
          </a>{" "}
          and each fund&apos;s{" "}
          <code>/funds-reports/&#123;slug&#125;/reports</code> page.
        </p>

        <div className="admin-card" style={{ marginTop: 20 }}>
          <FundSettingsForm initial={settings} />
        </div>

        <div className="admin-card" style={{ marginTop: 24 }}>
          <FundCreateForm />
        </div>

        <div className="admin-card" style={{ marginTop: 24 }}>
          <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>Funds</h2>
          {dbError ? (
            <p className="form-error">{dbError}</p>
          ) : rows.length === 0 ? (
            <p className="admin-meta">No funds yet. Add one above.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title / Slug</th>
                  <th>Cards</th>
                  <th>Status</th>
                  <th>Updated</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div>{row.title}</div>
                      <div className="admin-meta">
                        <Link
                          href={`/funds-reports/${row.slug}/reports`}
                          target="_blank"
                        >
                          /{row.slug}
                        </Link>
                        {row.titleAr ? ` · ${row.titleAr}` : ""}
                      </div>
                    </td>
                    <td>{row.reportCount}</td>
                    <td>{row.isPublished ? "Published" : "Hidden"}</td>
                    <td className="admin-meta">
                      {new Date(row.updatedAt).toLocaleString()}
                    </td>
                    <td className="admin-row-actions">
                      <FundEditLink id={row.id} />
                      <FundVisibilityButton
                        id={row.id}
                        isPublished={row.isPublished}
                      />
                      <FundDeleteButton id={row.id} />
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
