"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/lib/api";
import { translateToArabic } from "@/lib/translate";
import type { HomepageHero } from "@/data/homepageHero";

export function HomepageHeroForm({ initial }: { initial: HomepageHero }) {
  const router = useRouter();
  const [ctaShow, setCtaShow] = useState(initial.ctaShow);
  const [ctaHref, setCtaHref] = useState(initial.ctaHref);
  const [ctaLabelEn, setCtaLabelEn] = useState(initial.ctaLabelEn);
  const [ctaLabelAr, setCtaLabelAr] = useState(initial.ctaLabelAr);
  const [promoShow, setPromoShow] = useState(initial.promoShow);
  const [promoHref, setPromoHref] = useState(initial.promoHref);
  const [promoTitleEn, setPromoTitleEn] = useState(initial.promoTitleEn);
  const [promoTitleAr, setPromoTitleAr] = useState(initial.promoTitleAr);
  const [promoBodyEn, setPromoBodyEn] = useState(initial.promoBodyEn);
  const [promoBodyAr, setPromoBodyAr] = useState(initial.promoBodyAr);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [saved, setSaved] = useState(false);

  async function generateArabic() {
    setError("");
    setSaved(false);
    setTranslating(true);
    try {
      const texts: Record<string, string> = {};
      if (ctaLabelEn.trim() && !ctaLabelAr.trim()) texts.ctaLabel = ctaLabelEn;
      if (promoTitleEn.trim() && !promoTitleAr.trim()) texts.promoTitle = promoTitleEn;
      if (promoBodyEn.trim() && !promoBodyAr.trim()) texts.promoBody = promoBodyEn;
      if (Object.keys(texts).length === 0) {
        setError("Arabic fields are already filled.");
        return;
      }
      const out = await translateToArabic(texts);
      if (out.ctaLabel) setCtaLabelAr(out.ctaLabel);
      if (out.promoTitle) setPromoTitleAr(out.promoTitle);
      if (out.promoBody) setPromoBodyAr(out.promoBody);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Translation failed");
    } finally {
      setTranslating(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaved(false);
    setBusy(true);
    try {
      const res = await fetch(apiUrl("/api/admin/homepage-hero"), {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ctaShow,
          ctaHref,
          ctaLabelEn,
          ctaLabelAr,
          promoShow,
          promoHref,
          promoTitleEn,
          promoTitleAr,
          promoBodyEn,
          promoBodyAr,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        hero?: HomepageHero;
      };
      if (!res.ok) {
        setError(json.error || "Save failed");
        return;
      }
      if (json.hero) {
        setCtaLabelAr(json.hero.ctaLabelAr);
        setPromoTitleAr(json.hero.promoTitleAr);
        setPromoBodyAr(json.hero.promoBodyAr);
      }
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
      <p className="admin-meta" style={{ marginTop: 0 }}>
        Controls the homepage hero CTA button and promo card. Leave Arabic blank
        to auto-generate on save.
      </p>

      <div className="admin-form-section-row">
        <h3 className="admin-form-section">Hero CTA button</h3>
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
        <label className="admin-form-span admin-check">
          <input
            type="checkbox"
            checked={ctaShow}
            onChange={(e) => setCtaShow(e.target.checked)}
          />
          Show CTA button
        </label>
        <label>
          Label (EN)
          <input
            value={ctaLabelEn}
            onChange={(e) => setCtaLabelEn(e.target.value)}
            required
            maxLength={200}
          />
        </label>
        <label>
          Label (AR)
          <input
            value={ctaLabelAr}
            onChange={(e) => setCtaLabelAr(e.target.value)}
            maxLength={200}
            dir="rtl"
            lang="ar"
            placeholder="Auto-generated if empty"
          />
        </label>
        <label className="admin-form-span">
          Link
          <input
            value={ctaHref}
            onChange={(e) => setCtaHref(e.target.value)}
            required
            maxLength={500}
            placeholder="#what-we-do or /path or https://…"
          />
        </label>
      </div>

      <h3 className="admin-form-section">Promo card</h3>
      <div className="admin-form-grid">
        <label className="admin-form-span admin-check">
          <input
            type="checkbox"
            checked={promoShow}
            onChange={(e) => setPromoShow(e.target.checked)}
          />
          Show promo card
        </label>
        <label>
          Title (EN)
          <input
            value={promoTitleEn}
            onChange={(e) => setPromoTitleEn(e.target.value)}
            required
            maxLength={300}
          />
        </label>
        <label>
          Title (AR)
          <input
            value={promoTitleAr}
            onChange={(e) => setPromoTitleAr(e.target.value)}
            maxLength={300}
            dir="rtl"
            lang="ar"
            placeholder="Auto-generated if empty"
          />
        </label>
        <label className="admin-form-span">
          Body (EN)
          <textarea
            value={promoBodyEn}
            onChange={(e) => setPromoBodyEn(e.target.value)}
            required
            maxLength={2000}
          />
        </label>
        <label className="admin-form-span">
          Body (AR)
          <textarea
            value={promoBodyAr}
            onChange={(e) => setPromoBodyAr(e.target.value)}
            maxLength={2000}
            dir="rtl"
            lang="ar"
            placeholder="Auto-generated if empty"
          />
        </label>
        <label className="admin-form-span">
          Link
          <input
            value={promoHref}
            onChange={(e) => setPromoHref(e.target.value)}
            required
            maxLength={500}
            placeholder="/path or https://…"
          />
        </label>
      </div>

      {error ? <p className="form-error">{error}</p> : null}
      {saved ? (
        <p className="admin-meta" style={{ color: "#0c476e" }}>
          Saved. Homepage will use the new settings.
        </p>
      ) : null}
      <button className="admin-btn" type="submit" disabled={busy || translating}>
        {busy ? "Saving…" : "Save homepage hero"}
      </button>
    </form>
  );
}
