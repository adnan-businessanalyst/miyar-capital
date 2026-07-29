import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { AdminBar } from "../../AdminBar";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import { ReportEditForm } from "./ReportEditForm";
import type { ReportSection } from "@/data/reports";

export const dynamic = "force-dynamic";

type ReportRow = {
  id: string;
  section: ReportSection;
  title: string;
  titleAr: string | null;
  date: string;
  dateAr: string | null;
  fileName: string;
  fileNameAr: string | null;
  hasArabicFile: boolean;
  hasImage: boolean;
  imageUrl: string | null;
};

export default async function AdminReportEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");
  const { id } = await params;

  const res = await apiServerFetch("/api/admin/reports");
  const json = (await res.json()) as {
    reports?: ReportRow[];
    error?: string;
  };
  if (!res.ok) {
    return (
      <>
        <AdminBar />
        <div className="admin-wrap">
          <p className="form-error">{json.error || "Failed to load report"}</p>
        </div>
      </>
    );
  }

  const report = (json.reports ?? []).find((r) => r.id === id);
  if (!report) notFound();

  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <p className="admin-meta">
          <Link href="/my-access-nimda/reports">← Back to reports</Link>
        </p>
        <h1>Edit report</h1>
        <div className="admin-card" style={{ marginTop: 20 }}>
          <ReportEditForm
            id={report.id}
            initial={{
              section: report.section,
              title: report.title,
              titleAr: report.titleAr ?? "",
              date: report.date,
              dateAr: report.dateAr ?? "",
              fileName: report.fileName,
              fileNameAr: report.fileNameAr ?? "",
              hasArabicFile: Boolean(report.hasArabicFile),
              hasImage: Boolean(report.hasImage),
              imageUrl: report.imageUrl ?? null,
            }}
          />
        </div>
      </div>
    </>
  );
}
