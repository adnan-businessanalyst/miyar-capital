"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { apiUrl } from "@/lib/api";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}

export function FundCreateForm() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [title, setTitle] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

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
      const res = await fetch(apiUrl("/api/admin/funds"), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: finalSlug,
          title,
          titleAr,
          description,
          descriptionAr,
          isPublished,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        fund?: { id: string };
      };
      if (!res.ok) {
        setError(json.error || "Save failed");
        return;
      }
      if (json.fund?.id) {
        router.push(`/my-access-nimda/funds-reports/${json.fund.id}`);
        router.refresh();
        return;
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>Add fund</h2>
      <p className="admin-meta" style={{ marginTop: 0 }}>
        URL becomes /funds-reports/&#123;slug&#125;/reports. Add report cards on
        the fund edit page.
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
          />
        </label>
        <label>
          Title (AR)
          <input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} dir="rtl" />
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
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
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
        {busy ? "Saving…" : "Create fund"}
      </button>
    </form>
  );
}
