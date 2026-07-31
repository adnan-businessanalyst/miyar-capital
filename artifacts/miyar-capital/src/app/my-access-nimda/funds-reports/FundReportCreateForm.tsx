"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { apiUrl } from "@/lib/api";

export function FundReportCreateForm({ fundId }: { fundId: string }) {
  const router = useRouter();
  const [section, setSection] = useState("quarterly_disclosures");
  const [title, setTitle] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [date, setDate] = useState("");
  const [dateAr, setDateAr] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileAr, setFileAr] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const body = new FormData();
      body.set("section", section);
      body.set("title", title);
      body.set("titleAr", titleAr);
      body.set("date", date);
      body.set("dateAr", dateAr);
      if (file) body.set("file", file);
      if (fileAr) body.set("fileAr", fileAr);

      const res = await fetch(apiUrl(`/api/admin/funds/${fundId}/reports`), {
        method: "POST",
        credentials: "include",
        body,
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error || "Save failed");
        return;
      }
      setTitle("");
      setTitleAr("");
      setDate("");
      setDateAr("");
      setFile(null);
      setFileAr(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h3 className="admin-form-section">Add report card</h3>
      <p className="admin-meta" style={{ marginTop: 0 }}>
        Choose a section. Voting Policy and Terms usually have one file;
        Quarterly Disclosures can have many (one box per quarter).
      </p>
      <div className="admin-form-grid">
        <label>
          Section
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            <option value="voting_policy">Voting Policy</option>
            <option value="terms_and_conditions">Terms and Conditions</option>
            <option value="quarterly_disclosures">Quarterly Disclosures</option>
          </select>
        </label>
        <label>
          Title (EN)
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Title (AR)
          <input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} dir="rtl" />
        </label>
        <label>
          Date (EN)
          <input value={date} onChange={(e) => setDate(e.target.value)} required placeholder="2024" />
        </label>
        <label>
          Date (AR)
          <input value={dateAr} onChange={(e) => setDateAr(e.target.value)} dir="rtl" />
        </label>
        <label>
          PDF (EN, optional)
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>
        <label>
          PDF (AR, optional)
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFileAr(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>
      {error ? <p className="form-error">{error}</p> : null}
      <button type="submit" className="admin-btn" disabled={busy}>
        {busy ? "Saving…" : "Add report card"}
      </button>
    </form>
  );
}
