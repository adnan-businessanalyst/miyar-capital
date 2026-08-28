"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { apiUrl } from "@/lib/api";
import type { CmsPageListItem, CmsSitePage } from "@/lib/cmsPages";
import { joinCmsPath, slugifyLeaf } from "@/lib/cmsReserved";
import { ParentSelect, parseParentSelect } from "./ParentSelect";

export function CreatePageForm({
  pages,
  sitePages,
}: {
  pages: CmsPageListItem[];
  sitePages: CmsSitePage[];
}) {
  const router = useRouter();
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [parentValue, setParentValue] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const { parentId, parentPath } = parseParentSelect(parentValue);
  const cmsParent = pages.find((page) => page.id === parentId);
  const siteParent = sitePages.find((page) => page.path === parentPath);
  const nextPath = useMemo(
    () => joinCmsPath(cmsParent?.path ?? siteParent?.path, slug),
    [cmsParent?.path, siteParent?.path, slug],
  );
  const taken = nextPath ? sitePages.some((page) => page.path === nextPath) : false;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch(apiUrl("/api/admin/pages"), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentId,
          parentPath,
          slug,
          titleEn,
          titleAr,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        page?: { id: string };
      };
      if (!res.ok || !json.page) {
        setError(json.error || "Save failed");
        return;
      }
      router.push(`/my-access-nimda/pages/${json.page.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="admin-form admin-card" onSubmit={onSubmit}>
      <h2 className="admin-form-section" style={{ marginTop: 0 }}>
        New page
      </h2>
      <div className="admin-form-grid">
        <label>
          Title (EN)
          <input
            value={titleEn}
            onChange={(e) => {
              setTitleEn(e.target.value);
              if (!slugTouched) setSlug(slugifyLeaf(e.target.value));
            }}
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
        <ParentSelect
          value={parentValue}
          onChange={setParentValue}
          cmsPages={pages}
          sitePages={sitePages}
        />
        <label>
          Slug
          <input
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugifyLeaf(e.target.value));
            }}
            required
            maxLength={80}
            placeholder="investment-advisory"
          />
        </label>
        <label className="admin-form-span">
          Full path
          <input value={nextPath || "—"} readOnly />
        </label>
      </div>
      {taken ? (
        <p className="form-warning">
          This exact path is a current site page. Choose a different slug.
        </p>
      ) : null}
      {error ? <p className="form-error">{error}</p> : null}
      <button className="admin-btn" type="submit" disabled={busy || taken}>
        {busy ? "Creating…" : "Create page"}
      </button>
    </form>
  );
}
