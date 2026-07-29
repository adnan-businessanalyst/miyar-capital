"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { apiUrl } from "@/lib/api";
import { translateToArabic } from "@/lib/translate";

export function DisclosureCreateForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [body, setBody] = useState("");
  const [bodyAr, setBodyAr] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileNameAr, setFileNameAr] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileAr, setFileAr] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [translating, setTranslating] = useState(false);

  async function generateArabic() {
    setError("");
    if (!title.trim() && !body.trim() && !fileName.trim()) {
      setError("Enter English title, paragraph, or file name first.");
      return;
    }
    setTranslating(true);
    try {
      const texts: Record<string, string> = {};
      if (title.trim() && !titleAr.trim()) texts.title = title;
      if (body.trim() && !bodyAr.trim()) texts.body = body;
      if ((fileName || file?.name || "").trim() && !fileNameAr.trim()) {
        texts.fileName = fileName || file?.name || "";
      }
      if (Object.keys(texts).length === 0) {
        setError("Arabic fields are already filled.");
        return;
      }
      const out = await translateToArabic(texts);
      if (out.title) setTitleAr(out.title);
      if (out.body) setBodyAr(out.body);
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
      const form = new FormData();
      form.set("title", title);
      form.set("titleAr", titleAr);
      form.set("body", body);
      form.set("bodyAr", bodyAr);
      form.set("fileName", fileName || file.name);
      form.set("fileNameAr", fileNameAr || fileAr?.name || "");
      form.set("file", file);
      if (fileAr) form.set("fileAr", fileAr);

      const res = await fetch(apiUrl("/api/admin/disclosures"), {
        method: "POST",
        credentials: "include",
        body: form,
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error || "Upload failed");
        return;
      }
      setTitle("");
      setTitleAr("");
      setBody("");
      setBodyAr("");
      setFileName("");
      setFileNameAr("");
      setFile(null);
      setFileAr(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>Add disclosure</h2>
      <p className="admin-meta" style={{ marginTop: 0 }}>
        Leave Arabic blank to auto-generate on save, or use Generate Arabic.
      </p>

      <h3 className="admin-form-section">English</h3>
      <div className="admin-form-grid">
        <label className="admin-form-span">
          Title (EN)
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={500}
            placeholder="Miyar Capital announces…"
          />
        </label>
        <label className="admin-form-span">
          Paragraph (EN)
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            maxLength={10000}
            placeholder="Disclosure details…"
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
        <label>
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
        <label className="admin-form-span">
          Title (AR)
          <input
            value={titleAr}
            onChange={(e) => setTitleAr(e.target.value)}
            maxLength={500}
            dir="rtl"
            lang="ar"
            placeholder="Auto-generated if empty"
          />
        </label>
        <label className="admin-form-span">
          Paragraph (AR)
          <textarea
            value={bodyAr}
            onChange={(e) => setBodyAr(e.target.value)}
            maxLength={10000}
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
        <label>
          PDF file (AR, optional)
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
        {busy ? "Uploading…" : "Upload disclosure"}
      </button>
    </form>
  );
}
