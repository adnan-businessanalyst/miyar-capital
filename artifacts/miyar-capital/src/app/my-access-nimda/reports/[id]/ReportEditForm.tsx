"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/lib/api";
import { translateToArabic } from "@/lib/translate";
import type { ReportSection } from "@/data/reports";

type Props = {
  id: string;
  initial: {
    section: ReportSection;
    title: string;
    titleAr: string;
    date: string;
    dateAr: string;
    fileName: string;
    fileNameAr: string;
    hasArabicFile: boolean;
    hasImage: boolean;
    imageUrl: string | null;
  };
};

export function ReportEditForm({ id, initial }: Props) {
  const router = useRouter();
  const [section, setSection] = useState(initial.section);
  const [title, setTitle] = useState(initial.title);
  const [titleAr, setTitleAr] = useState(initial.titleAr);
  const [date, setDate] = useState(initial.date);
  const [dateAr, setDateAr] = useState(initial.dateAr);
  const [fileName, setFileName] = useState(initial.fileName);
  const [fileNameAr, setFileNameAr] = useState(initial.fileNameAr);
  const [file, setFile] = useState<File | null>(null);
  const [fileAr, setFileAr] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [translating, setTranslating] = useState(false);

  async function generateArabic() {
    setError("");
    setTranslating(true);
    try {
      const texts: Record<string, string> = {};
      if (title.trim() && !titleAr.trim()) texts.title = title;
      if (date.trim() && !dateAr.trim()) texts.date = date;
      if (fileName.trim() && !fileNameAr.trim()) texts.fileName = fileName;
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
    setBusy(true);
    try {
      const body = new FormData();
      body.set("section", section);
      body.set("title", title);
      body.set("titleAr", titleAr);
      body.set("date", date);
      body.set("dateAr", dateAr);
      body.set("fileName", fileName);
      body.set("fileNameAr", fileNameAr);
      if (file) body.set("file", file);
      if (fileAr) body.set("fileAr", fileAr);
      if (image) body.set("image", image);

      const res = await fetch(apiUrl(`/api/admin/reports/${id}`), {
        method: "PATCH",
        credentials: "include",
        body,
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error || "Update failed");
        return;
      }
      router.push("/my-access-nimda/reports");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <p className="admin-meta" style={{ marginTop: 0 }}>
        Arabic PDF is the default. English PDF is optional — if missing, Arabic
        is used. Leave Arabic text blank to auto-generate on save.
      </p>
      <div className="admin-form-grid">
        <label>
          Section
          <select
            value={section}
            onChange={(e) => setSection(e.target.value as ReportSection)}
            required
          >
            <option value="financial">Financial Reports</option>
            <option value="annual">Annual Reports</option>
          </select>
        </label>
        <label>
          {initial.hasImage ? "Replace card image (optional)" : "Card image (optional)"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,.jpg,.jpeg,.png,.webp,.gif,.svg"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>
      {initial.hasImage && initial.imageUrl ? (
        <p className="admin-meta">
          Current image:{" "}
          <a href={apiUrl(initial.imageUrl)} target="_blank" rel="noopener noreferrer">
            view
          </a>
        </p>
      ) : (
        <p className="admin-meta">No card image yet — Miyar logo is used as default.</p>
      )}

      <div className="admin-form-section-row">
        <h3 className="admin-form-section">Arabic · العربية (default)</h3>
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
          {initial.hasArabicFile
            ? "Replace PDF (AR, optional)"
            : "PDF file (AR) — add if missing"}
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => setFileAr(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      <h3 className="admin-form-section">English (optional PDF)</h3>
      <div className="admin-form-grid">
        <label>
          Title (EN)
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={300}
          />
        </label>
        <label>
          Date (EN)
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            maxLength={80}
          />
        </label>
        <label>
          File name (EN)
          <input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            required
            maxLength={300}
          />
        </label>
        <label className="admin-form-span">
          Replace PDF (EN, optional — Arabic used if none)
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      {error ? <p className="form-error">{error}</p> : null}
      <button className="admin-btn" type="submit" disabled={busy || translating}>
        {busy ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
