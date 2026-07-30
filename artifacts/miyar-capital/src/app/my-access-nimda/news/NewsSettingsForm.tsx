"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { apiUrl } from "@/lib/api";
import type { NewsSettings } from "@/data/news";

export function NewsSettingsForm({ initial }: { initial: NewsSettings }) {
  const router = useRouter();
  const [headingEn, setHeadingEn] = useState(initial.headingEn);
  const [headingAr, setHeadingAr] = useState(initial.headingAr);
  const [introEn, setIntroEn] = useState(initial.introEn);
  const [introAr, setIntroAr] = useState(initial.introAr);
  const [emptyEn, setEmptyEn] = useState(initial.emptyEn);
  const [emptyAr, setEmptyAr] = useState(initial.emptyAr);
  const [readMoreEn, setReadMoreEn] = useState(initial.readMoreEn);
  const [readMoreAr, setReadMoreAr] = useState(initial.readMoreAr);
  const [backLabelEn, setBackLabelEn] = useState(initial.backLabelEn);
  const [backLabelAr, setBackLabelAr] = useState(initial.backLabelAr);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setOk(false);
    setBusy(true);
    try {
      const res = await fetch(apiUrl("/api/admin/news-settings"), {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headingEn,
          headingAr,
          introEn,
          introAr,
          emptyEn,
          emptyAr,
          readMoreEn,
          readMoreAr,
          backLabelEn,
          backLabelAr,
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
      <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>News page settings</h2>
      <div className="admin-form-grid">
        <label>
          Heading (EN)
          <input
            value={headingEn}
            onChange={(e) => setHeadingEn(e.target.value)}
            required
            maxLength={300}
          />
        </label>
        <label>
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
          Intro (EN)
          <textarea
            value={introEn}
            onChange={(e) => setIntroEn(e.target.value)}
            required
            rows={2}
          />
        </label>
        <label className="admin-form-span">
          Intro (AR)
          <textarea
            value={introAr}
            onChange={(e) => setIntroAr(e.target.value)}
            rows={2}
            dir="rtl"
            lang="ar"
          />
        </label>
        <label className="admin-form-span">
          Empty state (EN)
          <input
            value={emptyEn}
            onChange={(e) => setEmptyEn(e.target.value)}
            required
            maxLength={1000}
          />
        </label>
        <label className="admin-form-span">
          Empty state (AR)
          <input
            value={emptyAr}
            onChange={(e) => setEmptyAr(e.target.value)}
            maxLength={1000}
            dir="rtl"
            lang="ar"
          />
        </label>
        <label>
          Read more (EN)
          <input
            value={readMoreEn}
            onChange={(e) => setReadMoreEn(e.target.value)}
            required
            maxLength={80}
          />
        </label>
        <label>
          Read more (AR)
          <input
            value={readMoreAr}
            onChange={(e) => setReadMoreAr(e.target.value)}
            maxLength={80}
            dir="rtl"
            lang="ar"
          />
        </label>
        <label>
          Back label (EN)
          <input
            value={backLabelEn}
            onChange={(e) => setBackLabelEn(e.target.value)}
            required
            maxLength={120}
          />
        </label>
        <label>
          Back label (AR)
          <input
            value={backLabelAr}
            onChange={(e) => setBackLabelAr(e.target.value)}
            maxLength={120}
            dir="rtl"
            lang="ar"
          />
        </label>
      </div>
      {error ? <p className="form-error">{error}</p> : null}
      {ok ? <p className="admin-meta">Settings saved.</p> : null}
      <button className="admin-btn" type="submit" disabled={busy}>
        {busy ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}
