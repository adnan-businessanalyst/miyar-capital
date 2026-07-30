import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { AdminBar } from "../../AdminBar";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import { JobEditForm } from "./JobEditForm";

export const dynamic = "force-dynamic";

type JobRow = {
  id: string;
  referenceCode: string;
  title: string;
  titleAr: string | null;
  location: string;
  locationAr: string | null;
  employmentType: string;
  employmentTypeAr: string | null;
  summary: string;
  summaryAr: string | null;
  emailSubject: string;
  emailSubjectAr: string | null;
  emailBody: string;
  emailBodyAr: string | null;
  isPublished: boolean;
};

export default async function AdminJobEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");
  const { id } = await params;

  const res = await apiServerFetch("/api/admin/jobs");
  const json = (await res.json()) as {
    jobs?: JobRow[];
    error?: string;
  };
  if (!res.ok) {
    return (
      <>
        <AdminBar />
        <div className="admin-wrap">
          <p className="form-error">{json.error || "Failed to load job"}</p>
        </div>
      </>
    );
  }

  const job = (json.jobs ?? []).find((d) => d.id === id);
  if (!job) notFound();

  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <p className="admin-meta">
          <Link href="/my-access-nimda/jobs">← Back to jobs</Link>
        </p>
        <h1>Edit job posting</h1>
        <div className="admin-card" style={{ marginTop: 20 }}>
          <JobEditForm
            id={job.id}
            initial={{
              referenceCode: job.referenceCode,
              title: job.title,
              titleAr: job.titleAr ?? "",
              location: job.location,
              locationAr: job.locationAr ?? "",
              employmentType: job.employmentType,
              employmentTypeAr: job.employmentTypeAr ?? "",
              summary: job.summary,
              summaryAr: job.summaryAr ?? "",
              emailSubject: job.emailSubject,
              emailSubjectAr: job.emailSubjectAr ?? "",
              emailBody: job.emailBody,
              emailBodyAr: job.emailBodyAr ?? "",
              isPublished: Boolean(job.isPublished),
            }}
          />
        </div>
      </div>
    </>
  );
}
