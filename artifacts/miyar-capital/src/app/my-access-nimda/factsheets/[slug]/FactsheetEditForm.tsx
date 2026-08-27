"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/lib/api";
import type { CmsFactsheet, CmsFactsheetRow } from "@/data/factsheets";

function emptyRow(): CmsFactsheetRow {
  return { labelEn: "", labelAr: "", valueEn: "", valueAr: "" };
}

function formatBytes(n: number | null) {
  if (!n) return "";
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function FactsheetEditForm({ initial }: { initial: CmsFactsheet }) {
  const router = useRouter();
  const [titleEn, setTitleEn] = useState(initial.titleEn);
  const [titleAr, setTitleAr] = useState(initial.titleAr);
  const [rows, setRows] = useState<CmsFactsheetRow[]>(
    initial.rows.length ? initial.rows : [emptyRow()],
  );
  const [ctaShow, setCtaShow] = useState(initial.ctaShow);
  const [ctaLabelEn, setCtaLabelEn] = useState(initial.ctaLabelEn);
  const [ctaLabelAr, setCtaLabelAr] = useState(initial.ctaLabelAr);
  const [file, setFile] = useState<File | null>(null);
  const [fileAr, setFileAr] = useState<File | null>(null);
  const [clearFile, setClearFile] = useState(false);
  const [clearFileAr, setClearFileAr] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  function updateRow(index: number, patch: Partial<CmsFactsheetRow>) {
    setRows((current) =>
      current.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  }

  function moveRow(index: number, dir: -1 | 1) {
    setRows((current) => {
      const next = [...current];
      const target = index + dir;
      if (target < 0 || target >= next.length) return current;
      const [item] = next.splice(index, 1);
      next.splice(target, 0, item);
      return next;
    });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaved(false);
    setBusy(true);
    try {
      const body = new FormData();
      body.set("titleEn", titleEn);
      body.set("titleAr", titleAr);
      body.set("rows", JSON.stringify(rows));
      body.set("ctaShow", ctaShow ? "true" : "false");
      body.set("ctaLabelEn", ctaLabelEn);
      body.set("ctaLabelAr", ctaLabelAr);
      if (file) body.set("file", file);
      if (fileAr) body.set("fileAr", fileAr);
      if (clearFile) body.set("clearFile", "1");
      if (clearFileAr) body.set("clearFileAr", "1");

      const res = await fetch(
        apiUrl(`/api/admin/factsheets/${initial.slug}`),
        { method: "PUT", credentials: "include", body },
      );
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error || "Save failed");
        return;
      }
      setFile(null);
      setFileAr(null);
      setClearFile(false);
      setClearFileAr(false);
      setSaved(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h3 className="admin-form-section">Title</h3>
      <div className="admin-form-grid">
        <label>
          Title (EN)
          <input
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            required
            maxLength={300}
          />
        </label>
        <label>
          Title (AR)
          <input
            value={titleAr}
            onChange={(e) => setTitleAr(e.target.value)}
            maxLength={300}
            dir="rtl"
            lang="ar"
          />
        </label>
      </div>

      <div className="admin-form-section-row">
        <h3 className="admin-form-section">Rows</h3>
        <button
          type="button"
          className="admin-btn admin-btn--ghost"
          onClick={() => setRows((current) => [...current, emptyRow()])}
        >
          Add row
        </button>
      </div>
      {rows.map((row, index) => (
        <div key={index} className="admin-card" style={{ marginBottom: 12 }}>
          <div className="admin-form-grid">
            <label>
              Label (EN)
              <input
                value={row.labelEn}
                onChange={(e) => updateRow(index, { labelEn: e.target.value })}
                required
                maxLength={200}
              />
            </label>
            <label>
              Label (AR)
              <input
                value={row.labelAr}
                onChange={(e) => updateRow(index, { labelAr: e.target.value })}
                maxLength={200}
                dir="rtl"
                lang="ar"
              />
            </label>
            <label className="admin-form-span">
              Value (EN)
              <input
                value={row.valueEn}
                onChange={(e) => updateRow(index, { valueEn: e.target.value })}
                required
                maxLength={800}
              />
            </label>
            <label className="admin-form-span">
              Value (AR)
              <input
                value={row.valueAr}
                onChange={(e) => updateRow(index, { valueAr: e.target.value })}
                maxLength={800}
                dir="rtl"
                lang="ar"
              />
            </label>
          </div>
          <div className="admin-row-actions" style={{ marginTop: 12 }}>
            <button
              type="button"
              className="admin-btn admin-btn--ghost"
              onClick={() => moveRow(index, -1)}
              disabled={index === 0}
            >
              Up
            </button>
            <button
              type="button"
              className="admin-btn admin-btn--ghost"
              onClick={() => moveRow(index, 1)}
              disabled={index === rows.length - 1}
            >
              Down
            </button>
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              onClick={() =>
                setRows((current) => current.filter((_, i) => i !== index))
              }
              disabled={rows.length <= 1}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h3 className="admin-form-section">Download button</h3>
      <div className="admin-form-grid">
        <label className="admin-form-span admin-check">
          <input
            type="checkbox"
            checked={ctaShow}
            onChange={(e) => setCtaShow(e.target.checked)}
          />
          Show download button (only appears on the site when a PDF is uploaded)
        </label>
        <label>
          Button label (EN)
          <input
            value={ctaLabelEn}
            onChange={(e) => setCtaLabelEn(e.target.value)}
            required
            maxLength={300}
          />
        </label>
        <label>
          Button label (AR)
          <input
            value={ctaLabelAr}
            onChange={(e) => setCtaLabelAr(e.target.value)}
            maxLength={300}
            dir="rtl"
            lang="ar"
          />
        </label>
      </div>

      <h3 className="admin-form-section">PDF files</h3>
      <div className="admin-form-grid">
        <label>
          English PDF
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => {
              setFile(e.target.files?.[0] ?? null);
              setClearFile(false);
            }}
          />
          {initial.hasFile ? (
            <span className="admin-meta">
              Current: {initial.fileName} {formatBytes(initial.fileSize)}
            </span>
          ) : (
            <span className="admin-meta">No English PDF uploaded</span>
          )}
        </label>
        <label>
          Arabic PDF
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => {
              setFileAr(e.target.files?.[0] ?? null);
              setClearFileAr(false);
            }}
          />
          {initial.hasFileAr ? (
            <span className="admin-meta">
              Current: {initial.fileNameAr} {formatBytes(initial.fileSizeAr)}
            </span>
          ) : (
            <span className="admin-meta">No Arabic PDF uploaded</span>
          )}
        </label>
        {initial.hasFile ? (
          <label className="admin-check">
            <input
              type="checkbox"
              checked={clearFile}
              onChange={(e) => setClearFile(e.target.checked)}
            />
            Remove English PDF
          </label>
        ) : null}
        {initial.hasFileAr ? (
          <label className="admin-check">
            <input
              type="checkbox"
              checked={clearFileAr}
              onChange={(e) => setClearFileAr(e.target.checked)}
            />
            Remove Arabic PDF
          </label>
        ) : null}
      </div>

      {error ? <p className="form-error">{error}</p> : null}
      {saved ? (
        <p className="admin-meta" style={{ color: "#0c476e" }}>
          Saved. The public page will use the new fact sheet.
        </p>
      ) : null}
      <button className="admin-btn" type="submit" disabled={busy}>
        {busy ? "Saving…" : "Save fact sheet"}
      </button>
    </form>
  );
}
