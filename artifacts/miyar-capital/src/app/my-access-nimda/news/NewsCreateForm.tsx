"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { apiUrl } from "@/lib/api";
import { translateToArabic } from "@/lib/translate";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}

export function NewsCreateForm() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [title, setTitle] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [date, setDate] = useState("");
  const [dateAr, setDateAr] = useState("");
  const [blurb, setBlurb] = useState("");
  const [blurbAr, setBlurbAr] = useState("");
  const [body, setBody] = useState("");
  const [bodyAr, setBodyAr] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [translating, setTranslating] = useState(false);

  async function generateArabic() {
    setError("");
    const texts: Record<string, string> = {};
    if (title.trim() && !titleAr.trim()) texts.title = title;
    if (date.trim() && !dateAr.trim()) texts.date = date;
    if (blurb.trim() && !blurbAr.trim()) texts.blurb = blurb;
    if (body.trim() && !bodyAr.trim()) texts.body = body;
    if (Object.keys(texts).length === 0) {
      setError("Arabic fields are already filled, or enter English first.");
      return;
    }
    setTranslating(true);
    try {
      const out = await translateToArabic(texts);
      if (out.title) setTitleAr(out.title);
      if (out.date) setDateAr(out.date);
      if (out.blurb) setBlurbAr(out.blurb);
      if (out.body) setBodyAr(out.body);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Translation failed");
    } finally {
      setTranslating(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const finalSlug = slug.trim() || slugify(title);
    if (!finalSlug) {
      setError("Slug is required.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(apiUrl("/api/admin/news"), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: finalSlug,
          title,
          titleAr,
          date,
          dateAr,
          blurb,
          blurbAr,
          body,
          bodyAr,
          imageUrl,
          isPublished,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error || "Save failed");
        return;
      }
      setSlug("");
      setSlugTouched(false);
      setTitle("");
      setTitleAr("");
      setDate("");
      setDateAr("");
      setBlurb("");
      setBlurbAr("");
      setBody("");
      setBodyAr("");
      setImageUrl("");
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
      <div className="admin-form-section-row">
        <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>Add article</h2>
        <button
          type="button"
          className="admin-btn admin-btn--ghost"
          onClick={generateArabic}
          disabled={busy || translating}
        >
          {translating ? "Generating…" : "Generate Arabic"}
        </button>
      </div>
      <p className="admin-meta" style={{ marginTop: 0 }}>
        Body paragraphs: separate with a blank line. Image URL is a site path
        (e.g. /media/content/…).
      </p>
      <div className="admin-form-grid">
        <label>
          Title (EN)
          <input
            value={title}
            onChange={(e) => {
              const next = e.target.value;
              setTitle(next);
              if (!slugTouched) setSlug(slugify(next));
            }}
            required
            maxLength={500}
          />
        </label>
        <label>
          Title (AR)
          <input
            value={titleAr}
            onChange={(e) => setTitleAr(e.target.value)}
            maxLength={500}
            dir="rtl"
            lang="ar"
          />
        </label>
        <label>
          Slug
          <input
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            required
            maxLength={200}
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            title="lowercase letters, numbers, hyphens"
            placeholder="my-article-slug"
          />
        </label>
        <label>
          Image URL
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            maxLength={500}
            placeholder="/media/content/example.webp"
          />
        </label>
        <label>
          Date (EN)
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            maxLength={80}
            placeholder="12 March 2026"
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
          />
        </label>
        <label className="admin-form-span">
          Blurb (EN)
          <textarea
            value={blurb}
            onChange={(e) => setBlurb(e.target.value)}
            required
            rows={2}
          />
        </label>
        <label className="admin-form-span">
          Blurb (AR)
          <textarea
            value={blurbAr}
            onChange={(e) => setBlurbAr(e.target.value)}
            rows={2}
            dir="rtl"
            lang="ar"
          />
        </label>
        <label className="admin-form-span">
          Body (EN)
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={8}
          />
        </label>
        <label className="admin-form-span">
          Body (AR)
          <textarea
            value={bodyAr}
            onChange={(e) => setBodyAr(e.target.value)}
            rows={8}
            dir="rtl"
            lang="ar"
          />
        </label>
        <label>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            Published (visible on site)
          </span>
        </label>
      </div>
      {error ? <p className="form-error">{error}</p> : null}
      <button className="admin-btn" type="submit" disabled={busy || translating}>
        {busy ? "Saving…" : "Publish article"}
      </button>
    </form>
  );
}
