import { AdminBar } from "../AdminBar";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import { redirect } from "next/navigation";
import { JobCreateForm } from "./JobCreateForm";
import { JobsSettingsForm } from "./JobsSettingsForm";
import {
  JobDeleteButton,
  JobEditLink,
  JobVisibilityButton,
} from "./JobActions";
import type { JobsSettings } from "@/data/jobs";
import { EMPTY_JOBS_PAGE } from "@/data/jobs";

export const metadata = { title: "Jobs · Admin" };
export const dynamic = "force-dynamic";

type JobRow = {
  id: string;
  referenceCode: string;
  title: string;
  titleAr: string | null;
  location: string;
  isPublished: boolean;
  updatedAt: string;
};

export default async function AdminJobsPage() {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");

  let rows: JobRow[] = [];
  let settings: JobsSettings = EMPTY_JOBS_PAGE.settings;
  let dbError = "";

  try {
    const [jobsRes, settingsRes] = await Promise.all([
      apiServerFetch("/api/admin/jobs"),
      apiServerFetch("/api/admin/jobs-settings"),
    ]);

    async function readJson(res: Response): Promise<{
      ok?: boolean;
      jobs?: JobRow[];
      settings?: JobsSettings;
      error?: string;
    }> {
      const raw = await res.text();
      try {
        return raw ? (JSON.parse(raw) as {
          ok?: boolean;
          jobs?: JobRow[];
          settings?: JobsSettings;
          error?: string;
        }) : {};
      } catch {
        return {
          error:
            res.status === 404
              ? "Careers API not found — restart/redeploy miyar-api so /api/admin/jobs is available."
              : raw && raw.length < 200
                ? raw
                : `Invalid API response (${res.status})`,
        };
      }
    }

    const jobsJson = await readJson(jobsRes);
    const settingsJson = await readJson(settingsRes);

    if (!jobsRes.ok) {
      dbError = jobsJson.error || "Failed to load jobs";
    } else {
      rows = jobsJson.jobs ?? [];
    }

    if (settingsRes.ok && settingsJson.settings) {
      settings = { ...EMPTY_JOBS_PAGE.settings, ...settingsJson.settings };
    } else if (!dbError) {
      dbError = settingsJson.error || "Failed to load careers settings";
    }
  } catch (e) {
    dbError = e instanceof Error ? e.message : "API unavailable";
  }

  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <h1>Jobs</h1>
        <p className="admin-meta">
          Manage careers section copy, HR email, and job postings on the{" "}
          <a href="/">homepage</a>. Hidden posts stay in the CMS but are not
          shown publicly.
        </p>

        <div className="admin-card" style={{ marginTop: 20 }}>
          <JobsSettingsForm initial={settings} />
        </div>

        <div className="admin-card" style={{ marginTop: 24 }}>
          <JobCreateForm />
        </div>

        <div className="admin-card" style={{ marginTop: 24 }}>
          <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>Job postings</h2>
          {dbError ? (
            <p className="form-error">{dbError}</p>
          ) : rows.length === 0 ? (
            <p className="admin-meta">No job postings yet. Add one above.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title / Ref</th>
                  <th>Location</th>
                  <th>Status</th>
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
                      ) : null}
                      <div className="admin-meta">{r.referenceCode}</div>
                    </td>
                    <td>{r.location}</td>
                    <td>{r.isPublished ? "Visible" : "Hidden"}</td>
                    <td>{r.updatedAt.replace("T", " ").slice(0, 19)}</td>
                    <td className="admin-row-actions">
                      <JobEditLink id={r.id} />
                      <JobVisibilityButton
                        id={r.id}
                        isPublished={r.isPublished}
                      />
                      <JobDeleteButton id={r.id} />
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
