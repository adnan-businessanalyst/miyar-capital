import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { AdminBar } from "../../AdminBar";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import { DisclosureEditForm } from "./DisclosureEditForm";

export const dynamic = "force-dynamic";

type DisclosureRow = {
  id: string;
  title: string;
  titleAr: string | null;
  body: string;
  bodyAr: string | null;
  fileName: string;
  fileNameAr: string | null;
  hasArabicFile: boolean;
};

export default async function AdminDisclosureEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");
  const { id } = await params;

  const res = await apiServerFetch("/api/admin/disclosures");
  const json = (await res.json()) as {
    disclosures?: DisclosureRow[];
    error?: string;
  };
  if (!res.ok) {
    return (
      <>
        <AdminBar />
        <div className="admin-wrap">
          <p className="form-error">{json.error || "Failed to load disclosure"}</p>
        </div>
      </>
    );
  }

  const disclosure = (json.disclosures ?? []).find((d) => d.id === id);
  if (!disclosure) notFound();

  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <p className="admin-meta">
          <Link href="/my-access-nimda/disclosures">← Back to disclosures</Link>
        </p>
        <h1>Edit disclosure</h1>
        <div className="admin-card" style={{ marginTop: 20 }}>
          <DisclosureEditForm
            id={disclosure.id}
            initial={{
              title: disclosure.title,
              titleAr: disclosure.titleAr ?? "",
              body: disclosure.body,
              bodyAr: disclosure.bodyAr ?? "",
              fileName: disclosure.fileName,
              fileNameAr: disclosure.fileNameAr ?? "",
              hasArabicFile: Boolean(disclosure.hasArabicFile),
            }}
          />
        </div>
      </div>
    </>
  );
}
