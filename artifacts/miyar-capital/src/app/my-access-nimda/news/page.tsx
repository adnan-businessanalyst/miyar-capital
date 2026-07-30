import { AdminBar } from "../AdminBar";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import { redirect } from "next/navigation";
import { NewsCreateForm } from "./NewsCreateForm";
import { NewsSettingsForm } from "./NewsSettingsForm";
import {
  NewsDeleteButton,
  NewsEditLink,
  NewsVisibilityButton,
} from "./NewsActions";
import type { NewsSettings } from "@/data/news";
import { EMPTY_NEWS_SETTINGS } from "@/data/news";

export const metadata = { title: "News · Admin" };
export const dynamic = "force-dynamic";

type NewsRow = {
  id: string;
  slug: string;
  title: string;
  titleAr: string | null;
  date: string;
  isPublished: boolean;
  updatedAt: string;
};

export default async function AdminNewsPage() {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");

  let rows: NewsRow[] = [];
  let settings: NewsSettings = EMPTY_NEWS_SETTINGS;
  let dbError = "";

  try {
    const [newsRes, settingsRes] = await Promise.all([
      apiServerFetch("/api/admin/news"),
      apiServerFetch("/api/admin/news-settings"),
    ]);

    const newsJson = (await newsRes.json()) as {
      ok?: boolean;
      articles?: NewsRow[];
      error?: string;
    };
    const settingsJson = (await settingsRes.json()) as {
      ok?: boolean;
      settings?: NewsSettings;
      error?: string;
    };

    if (!newsRes.ok) {
      dbError = newsJson.error || "Failed to load news";
    } else {
      rows = newsJson.articles ?? [];
    }

    if (settingsRes.ok && settingsJson.settings) {
      settings = { ...EMPTY_NEWS_SETTINGS, ...settingsJson.settings };
    } else if (!dbError) {
      dbError = settingsJson.error || "Failed to load news settings";
    }
  } catch (e) {
    dbError = e instanceof Error ? e.message : "API unavailable";
  }

  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <h1>News</h1>
        <p className="admin-meta">
          Manage the{" "}
          <a href="/news" target="_blank" rel="noopener noreferrer">
            /news
          </a>{" "}
          page. Hidden articles stay in the CMS but are not shown publicly.
        </p>

        <div className="admin-card" style={{ marginTop: 20 }}>
          <NewsSettingsForm initial={settings} />
        </div>

        <div className="admin-card" style={{ marginTop: 24 }}>
          <NewsCreateForm />
        </div>

        <div className="admin-card" style={{ marginTop: 24 }}>
          <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>Articles</h2>
          {dbError ? (
            <p className="form-error">{dbError}</p>
          ) : rows.length === 0 ? (
            <p className="admin-meta">No articles yet. Add one above.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title / Slug</th>
                  <th>Date</th>
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
                      <div className="admin-meta">{r.slug}</div>
                    </td>
                    <td>{r.date}</td>
                    <td>{r.isPublished ? "Visible" : "Hidden"}</td>
                    <td>{r.updatedAt.replace("T", " ").slice(0, 19)}</td>
                    <td className="admin-row-actions">
                      <NewsEditLink id={r.id} />
                      <NewsVisibilityButton
                        id={r.id}
                        isPublished={r.isPublished}
                      />
                      <NewsDeleteButton id={r.id} />
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
