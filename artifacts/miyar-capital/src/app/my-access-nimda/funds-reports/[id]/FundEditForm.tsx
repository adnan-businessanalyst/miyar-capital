"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { apiUrl } from "@/lib/api";

type Props = {
  id: string;
  initial: {
    slug: string;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    isPublished: boolean;
    sortOrder: number;
  };
};

export function FundEditForm({ id, initial }: Props) {
  const router = useRouter();
  const [slug, setSlug] = useState(initial.slug);
  const [title, setTitle] = useState(initial.title);
  const [titleAr, setTitleAr] = useState(initial.titleAr);
  const [description, setDescription] = useState(initial.description);
  const [descriptionAr, setDescriptionAr] = useState(initial.descriptionAr);
  const [isPublished, setIsPublished] = useState(initial.isPublished);
  const [sortOrder, setSortOrder] = useState(String(initial.sortOrder));
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch(apiUrl(`/api/admin/funds/${id}`), {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          title,
          titleAr,
          description,
          descriptionAr,
          isPublished,
          sortOrder: Number.parseInt(sortOrder, 10) || 0,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error || "Update failed");
        return;
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>Edit fund</h2>
      <div className="admin-form-grid">
        <label>
          Title (EN)
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Title (AR)
          <input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} dir="rtl" />
        </label>
        <label>
          Slug
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
          />
        </label>
        <label>
          Sort order
          <input
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            inputMode="numeric"
          />
        </label>
        <label className="admin-form-span">
          Description (EN)
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
          />
        </label>
        <label className="admin-form-span">
          Description (AR)
          <textarea
            value={descriptionAr}
            onChange={(e) => setDescriptionAr(e.target.value)}
            rows={3}
            dir="rtl"
          />
        </label>
        <label className="admin-check">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          Published
        </label>
      </div>
      {error ? <p className="form-error">{error}</p> : null}
      <button type="submit" className="admin-btn" disabled={busy}>
        {busy ? "Saving…" : "Save fund"}
      </button>
    </form>
  );
}
