"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/lib/api";
import { translateToArabic } from "@/lib/translate";

type Props = {
  id: string;
  initial: {
    title: string;
    titleAr: string;
    body: string;
    bodyAr: string;
    fileName: string;
    fileNameAr: string;
    hasArabicFile: boolean;
  };
};

export function DisclosureEditForm({ id, initial }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initial.title);
  const [titleAr, setTitleAr] = useState(initial.titleAr);
  const [body, setBody] = useState(initial.body);
  const [bodyAr, setBodyAr] = useState(initial.bodyAr);
  const [fileName, setFileName] = useState(initial.fileName);
  const [fileNameAr, setFileNameAr] = useState(initial.fileNameAr);
  const [file, setFile] = useState<File | null>(null);
  const [fileAr, setFileAr] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [translating, setTranslating] = useState(false);

  async function generateArabic() {
    setError("");
    setTranslating(true);
    try {
      const texts: Record<string, string> = {};
      if (title.trim() && !titleAr.trim()) texts.title = title;
      if (body.trim() && !bodyAr.trim()) texts.body = body;
      if (fileName.trim() && !fileNameAr.trim()) texts.fileName = fileName;
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
    setBusy(true);
    try {
      const form = new FormData();
      form.set("title", title);
      form.set("titleAr", titleAr);
      form.set("body", body);
      form.set("bodyAr", bodyAr);
      form.set("fileName", fileName);
      form.set("fileNameAr", fileNameAr);
      if (file) form.set("file", file);
      if (fileAr) form.set("fileAr", fileAr);

      const res = await fetch(apiUrl(`/api/admin/disclosures/${id}`), {
        method: "PATCH",
        credentials: "include",
        body: form,
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error || "Update failed");
        return;
      }
      router.push("/my-access-nimda/disclosures");
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
          />
        </label>
        <label className="admin-form-span">
          Paragraph (EN)
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            maxLength={10000}
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
        <label>
          Replace PDF (EN, optional)
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
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
          {initial.hasArabicFile
            ? "Replace PDF (AR, optional)"
            : "PDF file (AR, optional)"}
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => setFileAr(e.target.files?.[0] ?? null)}
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
