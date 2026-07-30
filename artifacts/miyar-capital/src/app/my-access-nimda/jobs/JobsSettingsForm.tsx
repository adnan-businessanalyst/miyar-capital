"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { apiUrl } from "@/lib/api";
import { translateToArabic } from "@/lib/translate";
import type { JobsSettings } from "@/data/jobs";

export function JobsSettingsForm({ initial }: { initial: JobsSettings }) {
  const router = useRouter();
  const [hrEmail, setHrEmail] = useState(initial.hrEmail);
  const [tagEn, setTagEn] = useState(initial.tagEn);
  const [tagAr, setTagAr] = useState(initial.tagAr);
  const [headingEn, setHeadingEn] = useState(initial.headingEn);
  const [headingAr, setHeadingAr] = useState(initial.headingAr);
  const [introEn, setIntroEn] = useState(initial.introEn);
  const [introAr, setIntroAr] = useState(initial.introAr);
  const [hrLabelEn, setHrLabelEn] = useState(initial.hrLabelEn);
  const [hrLabelAr, setHrLabelAr] = useState(initial.hrLabelAr);
  const [applyLabelEn, setApplyLabelEn] = useState(initial.applyLabelEn);
  const [applyLabelAr, setApplyLabelAr] = useState(initial.applyLabelAr);
  const [emptyEn, setEmptyEn] = useState(initial.emptyEn);
  const [emptyAr, setEmptyAr] = useState(initial.emptyAr);
  const [disclaimerEn, setDisclaimerEn] = useState(initial.disclaimerEn);
  const [disclaimerAr, setDisclaimerAr] = useState(initial.disclaimerAr);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [translating, setTranslating] = useState(false);

  async function generateArabic() {
    setError("");
    const texts: Record<string, string> = {};
    if (tagEn.trim() && !tagAr.trim()) texts.tagEn = tagEn;
    if (headingEn.trim() && !headingAr.trim()) texts.headingEn = headingEn;
    if (introEn.trim() && !introAr.trim()) texts.introEn = introEn;
    if (hrLabelEn.trim() && !hrLabelAr.trim()) texts.hrLabelEn = hrLabelEn;
    if (applyLabelEn.trim() && !applyLabelAr.trim()) {
      texts.applyLabelEn = applyLabelEn;
    }
    if (emptyEn.trim() && !emptyAr.trim()) texts.emptyEn = emptyEn;
    if (disclaimerEn.trim() && !disclaimerAr.trim()) {
      texts.disclaimerEn = disclaimerEn;
    }
    if (Object.keys(texts).length === 0) {
      setError("Arabic fields are already filled.");
      return;
    }
    setTranslating(true);
    try {
      const out = await translateToArabic(texts);
      if (out.tagEn) setTagAr(out.tagEn);
      if (out.headingEn) setHeadingAr(out.headingEn);
      if (out.introEn) setIntroAr(out.introEn);
      if (out.hrLabelEn) setHrLabelAr(out.hrLabelEn);
      if (out.applyLabelEn) setApplyLabelAr(out.applyLabelEn);
      if (out.emptyEn) setEmptyAr(out.emptyEn);
      if (out.disclaimerEn) setDisclaimerAr(out.disclaimerEn);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Translation failed");
    } finally {
      setTranslating(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setOk(false);
    setBusy(true);
    try {
      const res = await fetch(apiUrl("/api/admin/jobs-settings"), {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hrEmail,
          tagEn,
          tagAr,
          headingEn,
          headingAr,
          introEn,
          introAr,
          hrLabelEn,
          hrLabelAr,
          applyLabelEn,
          applyLabelAr,
          emptyEn,
          emptyAr,
          disclaimerEn,
          disclaimerAr,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error || "Save failed");
        return;
      }
      setOk(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>Careers section settings</h2>
      <p className="admin-meta" style={{ marginTop: 0 }}>
        HR email and homepage careers copy. Leave Arabic blank to auto-fill on
        save.
      </p>

      <label className="admin-form-span">
        HR email
        <input
          type="email"
          value={hrEmail}
          onChange={(e) => setHrEmail(e.target.value)}
          required
          maxLength={320}
        />
      </label>

      <h3 className="admin-form-section">English</h3>
      <div className="admin-form-grid">
        <label>
          Tag (EN)
          <input value={tagEn} onChange={(e) => setTagEn(e.target.value)} required maxLength={120} />
        </label>
        <label>
          Apply button (EN)
          <input
            value={applyLabelEn}
            onChange={(e) => setApplyLabelEn(e.target.value)}
            required
            maxLength={120}
          />
        </label>
        <label className="admin-form-span">
          Heading (EN)
          <input
            value={headingEn}
            onChange={(e) => setHeadingEn(e.target.value)}
            required
            maxLength={300}
          />
        </label>
        <label className="admin-form-span">
          Intro (EN)
          <textarea
            value={introEn}
            onChange={(e) => setIntroEn(e.target.value)}
            required
            maxLength={2000}
          />
        </label>
        <label>
          HR label (EN)
          <input
            value={hrLabelEn}
            onChange={(e) => setHrLabelEn(e.target.value)}
            required
            maxLength={120}
          />
        </label>
        <label className="admin-form-span">
          Empty state (EN)
          <textarea
            value={emptyEn}
            onChange={(e) => setEmptyEn(e.target.value)}
            required
            maxLength={1000}
          />
        </label>
        <label className="admin-form-span">
          Exact-match disclaimer (EN)
          <textarea
            value={disclaimerEn}
            onChange={(e) => setDisclaimerEn(e.target.value)}
            required
            maxLength={2000}
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
          Tag (AR)
          <input value={tagAr} onChange={(e) => setTagAr(e.target.value)} maxLength={120} dir="rtl" lang="ar" />
        </label>
        <label>
          Apply button (AR)
          <input
            value={applyLabelAr}
            onChange={(e) => setApplyLabelAr(e.target.value)}
            maxLength={120}
            dir="rtl"
            lang="ar"
          />
        </label>
        <label className="admin-form-span">
          Heading (AR)
          <input
            value={headingAr}
            onChange={(e) => setHeadingAr(e.target.value)}
            maxLength={300}
            dir="rtl"
            lang="ar"
          />
        </label>
        <label className="admin-form-span">
          Intro (AR)
          <textarea
            value={introAr}
            onChange={(e) => setIntroAr(e.target.value)}
            maxLength={2000}
            dir="rtl"
            lang="ar"
          />
        </label>
        <label>
          HR label (AR)
          <input
            value={hrLabelAr}
            onChange={(e) => setHrLabelAr(e.target.value)}
            maxLength={120}
            dir="rtl"
            lang="ar"
          />
        </label>
        <label className="admin-form-span">
          Empty state (AR)
          <textarea
            value={emptyAr}
            onChange={(e) => setEmptyAr(e.target.value)}
            maxLength={1000}
            dir="rtl"
            lang="ar"
          />
        </label>
        <label className="admin-form-span">
          Exact-match disclaimer (AR)
          <textarea
            value={disclaimerAr}
            onChange={(e) => setDisclaimerAr(e.target.value)}
            maxLength={2000}
            dir="rtl"
            lang="ar"
          />
        </label>
      </div>

      {error ? <p className="form-error">{error}</p> : null}
      {ok ? <p className="admin-meta">Saved.</p> : null}
      <button className="admin-btn" type="submit" disabled={busy || translating}>
        {busy ? "Saving…" : "Save careers settings"}
      </button>
    </form>
  );
}
