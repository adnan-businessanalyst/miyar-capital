"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { apiUrl } from "@/lib/api";
import { translateToArabic } from "@/lib/translate";
import type { ReportSection } from "@/data/reports";

export function ReportCreateForm() {
  const router = useRouter();
  const [section, setSection] = useState<ReportSection>("annual");
  const [title, setTitle] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [date, setDate] = useState("");
  const [dateAr, setDateAr] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileNameAr, setFileNameAr] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileAr, setFileAr] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [translating, setTranslating] = useState(false);

  async function generateArabic() {
    setError("");
    if (!title.trim() && !date.trim() && !fileName.trim()) {
      setError("Enter English title, date, or file name first.");
      return;
    }
    setTranslating(true);
    try {
      const texts: Record<string, string> = {};
      if (title.trim() && !titleAr.trim()) texts.title = title;
      if (date.trim() && !dateAr.trim()) texts.date = date;
      if ((fileName || file?.name || "").trim() && !fileNameAr.trim()) {
        texts.fileName = fileName || file?.name || "";
      }
      if (Object.keys(texts).length === 0) {
        setError("Arabic fields are already filled.");
        return;
      }
      const out = await translateToArabic(texts);
      if (out.title) setTitleAr(out.title);
      if (out.date) setDateAr(out.date);
      if (out.fileName) setFileNameAr(out.fileName);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Translation failed");
    } finally {
      setTranslating(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!file) {
      setError("Please choose an English PDF file.");
      return;
    }
    setBusy(true);
    try {
      const body = new FormData();
      body.set("section", section);
      body.set("title", title);
      body.set("titleAr", titleAr);
      body.set("date", date);
      body.set("dateAr", dateAr);
      body.set("fileName", fileName || file.name);
      body.set("fileNameAr", fileNameAr || fileAr?.name || "");
      body.set("file", file);
      if (fileAr) body.set("fileAr", fileAr);
      if (image) body.set("image", image);

      const res = await fetch(apiUrl("/api/admin/reports"), {
        method: "POST",
        credentials: "include",
        body,
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error || "Upload failed");
        return;
      }
      setTitle("");
      setTitleAr("");
      setDate("");
      setDateAr("");
      setFileName("");
      setFileNameAr("");
      setFile(null);
      setFileAr(null);
      setImage(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>Add report</h2>
      <p className="admin-meta" style={{ marginTop: 0 }}>
        Leave Arabic blank to auto-generate on save, or use Generate Arabic.
      </p>
      <div className="admin-form-grid">
        <label>
          Section
          <select
            value={section}
            onChange={(e) => setSection(e.target.value as ReportSection)}
            required
          >
            <option value="annual">Annual Reports</option>
            <option value="financial">Financial Reports</option>
          </select>
        </label>
        <label>
          Card image (optional)
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,.jpg,.jpeg,.png,.webp,.gif,.svg"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>
      <p className="admin-meta" style={{ marginTop: -8 }}>
        If no image is uploaded, the Miyar logo is shown on the card.
      </p>

      <h3 className="admin-form-section">English</h3>
      <div className="admin-form-grid">
        <label>
          Title (EN)
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={300}
            placeholder="Audited Annual Financial Reports"
          />
        </label>
        <label>
          Date (EN)
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            maxLength={80}
            placeholder="2023 or 31 Dec 2023"
          />
        </label>
        <label>
          File name (EN)
          <input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            maxLength={300}
            placeholder="Defaults to uploaded PDF name"
          />
        </label>
        <label className="admin-form-span">
          PDF file (EN)
          <input
            type="file"
            accept="application/pdf,.pdf"
            required
            onChange={(e) => {
              const next = e.target.files?.[0] ?? null;
              setFile(next);
              if (next && !fileName) setFileName(next.name);
            }}
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
          Title (AR)
          <input
            value={titleAr}
            onChange={(e) => setTitleAr(e.target.value)}
            maxLength={300}
            dir="rtl"
            lang="ar"
            placeholder="Auto-generated if empty"
          />
        </label>
        <label>
          Date (AR)
          <input
            value={dateAr}
            onChange={(e) => setDateAr(e.target.value)}
            maxLength={80}
            dir="rtl"
            lang="ar"
            placeholder="Auto-generated if empty"
          />
        </label>
        <label>
          File name (AR)
          <input
            value={fileNameAr}
            onChange={(e) => setFileNameAr(e.target.value)}
            maxLength={300}
            dir="rtl"
            lang="ar"
            placeholder="Auto-generated if empty"
          />
        </label>
        <label className="admin-form-span">
          PDF file (AR, optional — English PDF used if missing)
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => {
              const next = e.target.files?.[0] ?? null;
              setFileAr(next);
              if (next && !fileNameAr) setFileNameAr(next.name);
            }}
          />
        </label>
      </div>

      {error ? <p className="form-error">{error}</p> : null}
      <button className="admin-btn" type="submit" disabled={busy || translating}>
        {busy ? "Uploading…" : "Upload report"}
      </button>
    </form>
  );
}
