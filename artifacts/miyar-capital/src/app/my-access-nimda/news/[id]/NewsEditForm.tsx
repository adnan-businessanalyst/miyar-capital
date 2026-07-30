"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { apiUrl } from "@/lib/api";
import { translateToArabic } from "@/lib/translate";

type Props = {
  id: string;
  initial: {
    slug: string;
    title: string;
    titleAr: string;
    date: string;
    dateAr: string;
    blurb: string;
    blurbAr: string;
    body: string;
    bodyAr: string;
    imageUrl: string;
    isPublished: boolean;
    sortOrder: number;
  };
};

export function NewsEditForm({ id, initial }: Props) {
  const router = useRouter();
  const [slug, setSlug] = useState(initial.slug);
  const [title, setTitle] = useState(initial.title);
  const [titleAr, setTitleAr] = useState(initial.titleAr);
  const [date, setDate] = useState(initial.date);
  const [dateAr, setDateAr] = useState(initial.dateAr);
  const [blurb, setBlurb] = useState(initial.blurb);
  const [blurbAr, setBlurbAr] = useState(initial.blurbAr);
  const [body, setBody] = useState(initial.body);
  const [bodyAr, setBodyAr] = useState(initial.bodyAr);
  const [imageUrl, setImageUrl] = useState(initial.imageUrl);
  const [isPublished, setIsPublished] = useState(initial.isPublished);
  const [sortOrder, setSortOrder] = useState(String(initial.sortOrder));
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
      setError("Arabic fields are already filled.");
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
    setBusy(true);
    try {
      const res = await fetch(apiUrl(`/api/admin/news/${id}`), {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
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
          sortOrder: Number.parseInt(sortOrder, 10) || 0,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error || "Update failed");
        return;
      }
      router.push("/my-access-nimda/news");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <div className="admin-form-section-row">
        <p className="admin-meta" style={{ marginTop: 0 }}>
          Leave Arabic blank to auto-generate on save, or use Generate Arabic.
        </p>
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
          Title (EN)
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setSlug(e.target.value)}
            required
            maxLength={200}
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
          />
        </label>
        <label>
          Image URL
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            maxLength={500}
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
          Date (AR)
          <input
            value={dateAr}
            onChange={(e) => setDateAr(e.target.value)}
            maxLength={80}
            dir="rtl"
            lang="ar"
          />
        </label>
        <label>
          Sort order
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          />
        </label>
        <label>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            Published
          </span>
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
            rows={10}
          />
        </label>
        <label className="admin-form-span">
          Body (AR)
          <textarea
            value={bodyAr}
            onChange={(e) => setBodyAr(e.target.value)}
            rows={10}
            dir="rtl"
            lang="ar"
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
