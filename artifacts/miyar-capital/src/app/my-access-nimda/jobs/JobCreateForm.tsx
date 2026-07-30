"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { apiUrl } from "@/lib/api";
import { translateToArabic } from "@/lib/translate";

export function JobCreateForm() {
  const router = useRouter();
  const [referenceCode, setReferenceCode] = useState("");
  const [title, setTitle] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [location, setLocation] = useState("");
  const [locationAr, setLocationAr] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [employmentTypeAr, setEmploymentTypeAr] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryAr, setSummaryAr] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailSubjectAr, setEmailSubjectAr] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailBodyAr, setEmailBodyAr] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [translating, setTranslating] = useState(false);

  async function generateArabic() {
    setError("");
    const texts: Record<string, string> = {};
    if (title.trim() && !titleAr.trim()) texts.title = title;
    if (location.trim() && !locationAr.trim()) texts.location = location;
    if (employmentType.trim() && !employmentTypeAr.trim()) {
      texts.employmentType = employmentType;
    }
    if (summary.trim() && !summaryAr.trim()) texts.summary = summary;
    if (emailSubject.trim() && !emailSubjectAr.trim()) {
      texts.emailSubject = emailSubject;
    }
    if (emailBody.trim() && !emailBodyAr.trim()) texts.emailBody = emailBody;
    if (Object.keys(texts).length === 0) {
      setError("Arabic fields are already filled, or enter English first.");
      return;
    }
    setTranslating(true);
    try {
      const out = await translateToArabic(texts);
      if (out.title) setTitleAr(out.title);
      if (out.location) setLocationAr(out.location);
      if (out.employmentType) setEmploymentTypeAr(out.employmentType);
      if (out.summary) setSummaryAr(out.summary);
      if (out.emailSubject) setEmailSubjectAr(out.emailSubject);
      if (out.emailBody) setEmailBodyAr(out.emailBody);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Translation failed");
    } finally {
      setTranslating(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch(apiUrl("/api/admin/jobs"), {
        method: "POST",
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
        setError(json.error || "Save failed");
        return;
      }
      setReferenceCode("");
      setTitle("");
      setTitleAr("");
      setLocation("");
      setLocationAr("");
      setEmploymentType("");
      setEmploymentTypeAr("");
      setSummary("");
      setSummaryAr("");
      setEmailSubject("");
      setEmailSubjectAr("");
      setEmailBody("");
      setEmailBodyAr("");
      setIsPublished(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>Add job posting</h2>
      <p className="admin-meta" style={{ marginTop: 0 }}>
        Leave Arabic blank to auto-generate on save, or use Generate Arabic.
        Email subject/body are what applicants must send exactly.
      </p>

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

      <div className="admin-form-section-row">
        <h3 className="admin-form-section">Arabic · العربية</h3>
        <button
          type="button"
          className="admin-btn admin-btn--ghost"
          onClick={generateArabic}
          disabled={busy || translating}
        >
          {translating ? "Generating…" : "Generate Arabic"}
        </button>
      </div>
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
      <button className="admin-btn" type="submit" disabled={busy || translating}>
        {busy ? "Saving…" : "Add job posting"}
      </button>
    </form>
  );
}
