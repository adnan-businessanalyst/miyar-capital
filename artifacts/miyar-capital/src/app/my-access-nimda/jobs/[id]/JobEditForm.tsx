"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { apiUrl } from "@/lib/api";

type Props = {
  id: string;
  initial: {
    referenceCode: string;
    title: string;
    titleAr: string;
    location: string;
    locationAr: string;
    employmentType: string;
    employmentTypeAr: string;
    summary: string;
    summaryAr: string;
    emailSubject: string;
    emailSubjectAr: string;
    emailBody: string;
    emailBodyAr: string;
    isPublished: boolean;
  };
};

export function JobEditForm({ id, initial }: Props) {
  const router = useRouter();
  const [referenceCode, setReferenceCode] = useState(initial.referenceCode);
  const [title, setTitle] = useState(initial.title);
  const [titleAr, setTitleAr] = useState(initial.titleAr);
  const [location, setLocation] = useState(initial.location);
  const [locationAr, setLocationAr] = useState(initial.locationAr);
  const [employmentType, setEmploymentType] = useState(initial.employmentType);
  const [employmentTypeAr, setEmploymentTypeAr] = useState(
    initial.employmentTypeAr,
  );
  const [summary, setSummary] = useState(initial.summary);
  const [summaryAr, setSummaryAr] = useState(initial.summaryAr);
  const [emailSubject, setEmailSubject] = useState(initial.emailSubject);
  const [emailSubjectAr, setEmailSubjectAr] = useState(initial.emailSubjectAr);
  const [emailBody, setEmailBody] = useState(initial.emailBody);
  const [emailBodyAr, setEmailBodyAr] = useState(initial.emailBodyAr);
  const [isPublished, setIsPublished] = useState(initial.isPublished);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch(apiUrl(`/api/admin/jobs/${id}`), {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceCode,
          title,
          titleAr,
          location,
          locationAr,
          employmentType,
          employmentTypeAr,
          summary,
          summaryAr,
          emailSubject,
          emailSubjectAr,
          emailBody,
          emailBodyAr,
          isPublished,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error || "Update failed");
        return;
      }
      router.push("/my-access-nimda/jobs");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <label>
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
        />{" "}
        Visible on homepage
      </label>

      <h3 className="admin-form-section">English</h3>
      <div className="admin-form-grid">
        <label>
          Reference code
          <input
            value={referenceCode}
            onChange={(e) => setReferenceCode(e.target.value)}
            required
            maxLength={80}
          />
        </label>
        <label>
          Employment type (EN)
          <input
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            required
            maxLength={120}
          />
        </label>
        <label className="admin-form-span">
          Title (EN)
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={300}
          />
        </label>
        <label className="admin-form-span">
          Location (EN)
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            maxLength={200}
          />
        </label>
        <label className="admin-form-span">
          Summary (EN)
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
            maxLength={5000}
          />
        </label>
        <label className="admin-form-span">
          Application email subject (EN)
          <input
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            required
            maxLength={500}
          />
        </label>
        <label className="admin-form-span">
          Application email body (EN)
          <textarea
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            required
            maxLength={10000}
            rows={8}
          />
        </label>
      </div>

      <h3 className="admin-form-section">Arabic · العربية</h3>
      <div className="admin-form-grid">
        <label>
          Employment type (AR)
          <input
            value={employmentTypeAr}
            onChange={(e) => setEmploymentTypeAr(e.target.value)}
            maxLength={120}
            dir="rtl"
            lang="ar"
          />
        </label>
        <label className="admin-form-span">
          Title (AR)
          <input
            value={titleAr}
            onChange={(e) => setTitleAr(e.target.value)}
            maxLength={300}
            dir="rtl"
            lang="ar"
          />
        </label>
        <label className="admin-form-span">
          Location (AR)
          <input
            value={locationAr}
            onChange={(e) => setLocationAr(e.target.value)}
            maxLength={200}
            dir="rtl"
            lang="ar"
          />
        </label>
        <label className="admin-form-span">
          Summary (AR)
          <textarea
            value={summaryAr}
            onChange={(e) => setSummaryAr(e.target.value)}
            maxLength={5000}
            dir="rtl"
            lang="ar"
          />
        </label>
        <label className="admin-form-span">
          Application email subject (AR)
          <input
            value={emailSubjectAr}
            onChange={(e) => setEmailSubjectAr(e.target.value)}
            maxLength={500}
            dir="rtl"
            lang="ar"
          />
        </label>
        <label className="admin-form-span">
          Application email body (AR)
          <textarea
            value={emailBodyAr}
            onChange={(e) => setEmailBodyAr(e.target.value)}
            maxLength={10000}
            rows={8}
            dir="rtl"
            lang="ar"
          />
        </label>
      </div>

      {error ? <p className="form-error">{error}</p> : null}
      <button className="admin-btn" type="submit" disabled={busy}>
        {busy ? "Saving…" : "Save job posting"}
      </button>
    </form>
  );
}
