import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminBar } from "../../AdminBar";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import type { CmsFactsheet } from "@/data/factsheets";
import { FactsheetEditForm } from "./FactsheetEditForm";

export const metadata = { title: "Edit fact sheet · Admin" };
export const dynamic = "force-dynamic";

export default async function AdminFactsheetEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");

  const { slug } = await params;
  let factsheet: CmsFactsheet | null = null;
  let dbError = "";
  try {
    const res = await apiServerFetch(`/api/admin/factsheets/${slug}`);
    const json = (await res.json()) as {
      factsheet?: CmsFactsheet;
      error?: string;
    };
    if (res.status === 404) notFound();
    if (!res.ok) {
      dbError = json.error || "Failed to load fact sheet";
    } else {
      factsheet = json.factsheet ?? null;
    }
  } catch (e) {
    dbError = e instanceof Error ? e.message : "API unavailable";
  }

  if (!factsheet && !dbError) notFound();

  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <p className="admin-meta">
          <Link href="/my-access-nimda/factsheets">← All fact sheets</Link>
        </p>
        <h1>{factsheet?.pageLabelEn ?? "Fact sheet"}</h1>
        {factsheet ? (
          <p className="admin-meta">
            Controls the fact sheet on{" "}
            <a href={factsheet.pagePath}>{factsheet.pagePath}</a>.
          </p>
        ) : null}
        {dbError ? <p className="form-error">{dbError}</p> : null}
        {factsheet ? (
          <div className="admin-card" style={{ marginTop: 20 }}>
            <FactsheetEditForm initial={factsheet} />
          </div>
        ) : null}
      </div>
    </>
  );
}
