"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { LanguageOverrideProvider } from "@/i18n/LanguageContext";
import { apiUrl } from "@/lib/api";
import {
  asDesign,
  bool,
  str,
  type CmsBlock,
  type CmsBlockType,
  type CmsDesign,
  type CmsPageData,
  type CmsPageListItem,
  type CmsSitePage,
} from "@/lib/cmsPages";
import { defaultBlockProps, joinCmsPath, slugifyLeaf } from "@/lib/cmsReserved";
import type { Lang } from "@/site/types";
import { CmsPage } from "@/views/CmsPage";
import { ParentSelect, parseParentSelect, parentSelectValue } from "../ParentSelect";

const PALETTE: CmsBlockType[] = [
  "hero",
  "intro",
  "cards",
  "steps",
  "band",
  "register",
  "richtext",
];

function descendantIds(pages: CmsPageListItem[], id: string): Set<string> {
  const ids = new Set<string>();
  const queue = [id];
  while (queue.length) {
    const cur = queue.shift();
    if (!cur) break;
    for (const child of pages.filter((page) => page.parentId === cur)) {
      if (!ids.has(child.id)) {
        ids.add(child.id);
        queue.push(child.id);
      }
    }
  }
  return ids;
}

function itemsOf(block: CmsBlock): Array<Record<string, unknown>> {
  return Array.isArray(block.props.items)
    ? (block.props.items as Array<Record<string, unknown>>)
    : [];
}

export function PageEditor({
  initial,
  pages,
  sitePages,
}: {
  initial: CmsPageData;
  pages: CmsPageListItem[];
  sitePages: CmsSitePage[];
}) {
  const router = useRouter();
  const [titleEn, setTitleEn] = useState(initial.titleEn);
  const [titleAr, setTitleAr] = useState(initial.titleAr);
  const [slug, setSlug] = useState(initial.slug);
  const [parentValue, setParentValue] = useState(
    parentSelectValue(initial.parentId, initial.parentPath),
  );
  const [navShow, setNavShow] = useState(initial.navShow);
  const [published, setPublished] = useState(initial.published);
  const [path, setPath] = useState(initial.path);
  const [blocks, setBlocks] = useState<CmsBlock[]>(initial.blocks);
  const [selected, setSelected] = useState(0);
  const [previewLang, setPreviewLang] = useState<Lang>("en");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const [busy, setBusy] = useState(false);

  const blockedParents = descendantIds(pages, initial.id);
  const parentOptions = pages.filter(
    (page) => page.id !== initial.id && !blockedParents.has(page.id),
  );
  const { parentId, parentPath } = parseParentSelect(parentValue);
  const cmsParent = pages.find((page) => page.id === parentId);
  const siteParent = sitePages.find((page) => page.path === parentPath);
  const nextPath = joinCmsPath(cmsParent?.path ?? siteParent?.path, slug) || path;
  const taken = sitePages.some((page) => page.path === nextPath);

  const previewPage: CmsPageData = useMemo(
    () => ({
      ...initial,
      titleEn,
      titleAr,
      slug,
      parentId: parentId,
      parentPath,
      path: nextPath,
      navShow,
      published,
      ancestors: (() => {
        const cms: CmsPageListItem[] = [];
        let cur: CmsPageListItem | undefined = cmsParent;
        const seen = new Set<string>();
        while (cur && !seen.has(cur.id)) {
          seen.add(cur.id);
          cms.unshift(cur);
          cur = pages.find((item) => item.id === cur?.parentId);
        }
        const siteFrom = cms[0]?.parentPath ?? parentPath;
        const site = siteFrom
          ? sitePages
              .filter(
                (item) =>
                  item.path === siteFrom || siteFrom.startsWith(`${item.path}/`),
              )
              .sort((a, b) => a.path.length - b.path.length)
          : [];
        return [
          ...site.map((page) => ({
            titleEn: page.titleEn,
            titleAr: page.titleAr,
            path: page.path,
          })),
          ...cms.map((page) => ({
            titleEn: page.titleEn,
            titleAr: page.titleAr,
            path: page.path,
          })),
        ];
      })(),
      blocks,
    }),
    [blocks, cmsParent, initial, navShow, nextPath, parentId, parentPath, pages, published, sitePages, slug, titleAr, titleEn],
  );

  const current = blocks[selected];

  function updateBlock(index: number, patch: Record<string, unknown>) {
    setBlocks((prev) =>
      prev.map((block, i) =>
        i === index ? { ...block, props: { ...block.props, ...patch } } : block,
      ),
    );
  }

  function updateDesign(index: number, patch: Partial<CmsDesign>) {
    const design = { ...asDesign(blocks[index]?.props.design), ...patch };
    if (patch.bg === "image" && patch.overlay === undefined) design.overlay = true;
    updateBlock(index, { design });
  }

  function updateItem(index: number, itemIndex: number, patch: Record<string, unknown>) {
    const list = itemsOf(blocks[index]).map((item, i) =>
      i === itemIndex ? { ...item, ...patch } : item,
    );
    updateBlock(index, { items: list });
  }

  function addBlock(type: CmsBlockType) {
    const next: CmsBlock = {
      id: crypto.randomUUID(),
      type,
      sort: blocks.length,
      props: defaultBlockProps(type),
    };
    setBlocks((prev) => [...prev, next]);
    setSelected(blocks.length);
  }

  function moveBlock(index: number, dir: -1 | 1) {
    const next = index + dir;
    if (next < 0 || next >= blocks.length) return;
    setBlocks((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      copy.splice(next, 0, item);
      return copy.map((block, i) => ({ ...block, sort: i }));
    });
    setSelected(next);
  }

  async function persist(nextPublished: boolean) {
    setError("");
    setSaved("");
    setBusy(true);
    try {
      const pageRes = await fetch(apiUrl(`/api/admin/pages/${initial.id}`), {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titleEn,
          titleAr,
          slug,
          parentId,
          parentPath,
          published: nextPublished,
          navShow,
        }),
      });
      const pageJson = (await pageRes.json().catch(() => ({}))) as {
        error?: string;
        page?: { path: string };
      };
      if (!pageRes.ok) {
        setError(pageJson.error || "Save failed");
        return;
      }
      if (pageJson.page?.path) setPath(pageJson.page.path);
      setPublished(nextPublished);

      const blocksRes = await fetch(apiUrl(`/api/admin/pages/${initial.id}/blocks`), {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blocks: blocks.map((block, index) => ({
            id: block.id,
            type: block.type,
            sort: index,
            props: block.props,
          })),
        }),
      });
      const blocksJson = (await blocksRes.json().catch(() => ({}))) as {
        error?: string;
        blocks?: CmsBlock[];
      };
      if (!blocksRes.ok) {
        setError(blocksJson.error || "Blocks failed to save");
        return;
      }
      if (blocksJson.blocks) setBlocks(blocksJson.blocks);
      setSaved(nextPublished ? "Published." : "Draft saved.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete() {
    const kids = pages.filter((page) => page.parentId === initial.id);
    const ok = kids.length
      ? window.confirm("This page has children. Delete this page and all descendants?")
      : window.confirm("Delete this page?");
    if (!ok) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(
        apiUrl(`/api/admin/pages/${initial.id}${kids.length ? "?cascade=1" : ""}`),
        { method: "DELETE", credentials: "include" },
      );
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error || "Delete failed");
        return;
      }
      router.push("/my-access-nimda/pages");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <LanguageOverrideProvider lang={previewLang} onLangChange={setPreviewLang}>
      <div className="cms-editor-settings admin-card admin-form">
        <div className="admin-form-grid">
          <label>
            Title (EN)
            <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required />
          </label>
          <label>
            Title (AR)
            <input
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              dir="rtl"
              lang="ar"
            />
          </label>
          <ParentSelect
            value={parentValue}
            onChange={setParentValue}
            cmsPages={parentOptions}
            sitePages={sitePages}
          />
          <label>
            Slug
            <input
              value={slug}
              onChange={(e) => setSlug(slugifyLeaf(e.target.value))}
              required
            />
          </label>
          <label className="admin-form-span">
            Full path
            <input value={nextPath} readOnly />
          </label>
          <label className="admin-check">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            Published
          </label>
          <label className="admin-check">
            <input
              type="checkbox"
              checked={navShow}
              onChange={(e) => setNavShow(e.target.checked)}
            />
            Show in nav (stored only)
          </label>
        </div>
        {taken ? (
          <p className="form-warning">
            This exact path is a current site page. Choose a different slug.
          </p>
        ) : null}
        <div className="admin-row-actions">
          <button
            className="admin-btn admin-btn--ghost"
            type="button"
            disabled={busy || taken}
            onClick={() => persist(false)}
          >
            Save draft
          </button>
          <button
            className="admin-btn"
            type="button"
            disabled={busy || taken}
            onClick={() => persist(true)}
          >
            Publish
          </button>
          <a
            className="admin-btn admin-btn--ghost"
            href={nextPath}
            target="_blank"
            rel="noreferrer"
          >
            Preview
          </a>
          <button
            className="admin-btn admin-btn--danger"
            type="button"
            disabled={busy}
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
        {error ? <p className="form-error">{error}</p> : null}
        {saved ? <p className="admin-meta">{saved}</p> : null}
      </div>

      <div className="cms-editor">
        <aside className="cms-editor-col admin-card">
          <h3 className="admin-form-section">Blocks</h3>
          <div className="cms-palette">
            {PALETTE.map((type) => (
              <button
                key={type}
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => addBlock(type)}
              >
                + {type}
              </button>
            ))}
          </div>
          <ol className="cms-block-list">
            {blocks.map((block, index) => (
              <li key={block.id || index}>
                <button
                  type="button"
                  className={`cms-block-item${selected === index ? " is-active" : ""}`}
                  onClick={() => setSelected(index)}
                >
                  {index + 1}. {block.type}
                  {bool(block.props.hidden) ? " (hidden)" : ""}
                </button>
                <span className="cms-block-move">
                  <button type="button" onClick={() => moveBlock(index, -1)}>
                    ↑
                  </button>
                  <button type="button" onClick={() => moveBlock(index, 1)}>
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateBlock(index, { hidden: !bool(block.props.hidden) })
                    }
                  >
                    {bool(block.props.hidden) ? "Show" : "Hide"}
                  </button>
                </span>
              </li>
            ))}
          </ol>
        </aside>

        <div className="cms-editor-preview admin-card">
          <div className="cms-preview-bar">
            <strong>Live preview</strong>
            <div className="admin-tabs">
              <button
                type="button"
                className={previewLang === "en" ? "is-active" : ""}
                onClick={() => setPreviewLang("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={previewLang === "ar" ? "is-active" : ""}
                onClick={() => setPreviewLang("ar")}
              >
                عربي
              </button>
            </div>
          </div>
          <CmsPage
            page={previewPage}
            lang={previewLang}
            preview
            selectedIndex={selected}
            onSelectBlock={setSelected}
          />
        </div>

        <aside className="cms-editor-col admin-card admin-form">
          {current ? (
            <>
              <h3 className="admin-form-section">
                {current.type} fields
              </h3>
              <BlockFields
                block={current}
                onChange={(patch) => updateBlock(selected, patch)}
                onItemChange={(itemIndex, patch) =>
                  updateItem(selected, itemIndex, patch)
                }
              />
              <h3 className="admin-form-section">Design</h3>
              <DesignFields
                design={asDesign(current.props.design)}
                onChange={(patch) => updateDesign(selected, patch)}
              />
            </>
          ) : (
            <p className="admin-meta">Add a block to edit its fields.</p>
          )}
        </aside>
      </div>
    </LanguageOverrideProvider>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
  rtl,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  rtl?: boolean;
}) {
  return (
    <label className="admin-form-span">
      {label}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir={rtl ? "rtl" : undefined}
          lang={rtl ? "ar" : undefined}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir={rtl ? "rtl" : undefined}
          lang={rtl ? "ar" : undefined}
        />
      )}
    </label>
  );
}

function BlockFields({
  block,
  onChange,
  onItemChange,
}: {
  block: CmsBlock;
  onChange: (patch: Record<string, unknown>) => void;
  onItemChange: (itemIndex: number, patch: Record<string, unknown>) => void;
}) {
  const p = block.props;
  if (block.type === "hero") {
    return (
      <>
        <Field label="Title EN" value={str(p.titleEn)} onChange={(v) => onChange({ titleEn: v })} />
        <Field label="Title AR" value={str(p.titleAr)} onChange={(v) => onChange({ titleAr: v })} rtl />
        <Field label="Crumb EN" value={str(p.crumbEn)} onChange={(v) => onChange({ crumbEn: v })} />
        <Field label="Crumb AR" value={str(p.crumbAr)} onChange={(v) => onChange({ crumbAr: v })} rtl />
        <Field
          label="Media path"
          value={str(p.media)}
          onChange={(v) => onChange({ media: v })}
        />
      </>
    );
  }
  if (block.type === "intro" || block.type === "band") {
    return (
      <>
        <Field label="Heading EN" value={str(p.headingEn)} onChange={(v) => onChange({ headingEn: v })} />
        <Field label="Heading AR" value={str(p.headingAr)} onChange={(v) => onChange({ headingAr: v })} rtl />
        <Field label="Body EN" value={str(p.bodyEn)} onChange={(v) => onChange({ bodyEn: v })} multiline />
        <Field label="Body AR" value={str(p.bodyAr)} onChange={(v) => onChange({ bodyAr: v })} multiline rtl />
        {block.type === "intro" ? (
          <Field label="Image path" value={str(p.image)} onChange={(v) => onChange({ image: v })} />
        ) : null}
      </>
    );
  }
  if (block.type === "register") {
    return (
      <>
        <Field label="Title EN" value={str(p.titleEn)} onChange={(v) => onChange({ titleEn: v })} />
        <Field label="Title AR" value={str(p.titleAr)} onChange={(v) => onChange({ titleAr: v })} rtl />
        <Field label="Body EN" value={str(p.bodyEn)} onChange={(v) => onChange({ bodyEn: v })} multiline />
        <Field label="Body AR" value={str(p.bodyAr)} onChange={(v) => onChange({ bodyAr: v })} multiline rtl />
        <Field
          label="CTA EN"
          value={str(p.buttonLabelEn)}
          onChange={(v) => onChange({ buttonLabelEn: v })}
        />
        <Field
          label="CTA AR"
          value={str(p.buttonLabelAr)}
          onChange={(v) => onChange({ buttonLabelAr: v })}
          rtl
        />
      </>
    );
  }
  if (block.type === "richtext") {
    return (
      <>
        <Field label="Body EN" value={str(p.bodyEn)} onChange={(v) => onChange({ bodyEn: v })} multiline />
        <Field label="Body AR" value={str(p.bodyAr)} onChange={(v) => onChange({ bodyAr: v })} multiline rtl />
      </>
    );
  }
  if (block.type === "cards" || block.type === "steps") {
    const list = itemsOf(block);
    const min = block.type === "cards" ? 2 : 1;
    const max = block.type === "cards" ? 4 : 8;
    return (
      <>
        <Field label="Heading EN" value={str(p.headingEn)} onChange={(v) => onChange({ headingEn: v })} />
        <Field label="Heading AR" value={str(p.headingAr)} onChange={(v) => onChange({ headingAr: v })} rtl />
        {list.map((item, index) => (
          <div key={index} className="cms-item-fields">
            <strong>
              {block.type === "cards" ? "Card" : "Step"} {index + 1}
            </strong>
            {block.type === "steps" ? (
              <Field
                label="Number"
                value={str(item.num)}
                onChange={(v) => onItemChange(index, { num: v })}
              />
            ) : null}
            <Field
              label="Title EN"
              value={str(item.titleEn)}
              onChange={(v) => onItemChange(index, { titleEn: v })}
            />
            <Field
              label="Title AR"
              value={str(item.titleAr)}
              onChange={(v) => onItemChange(index, { titleAr: v })}
              rtl
            />
            <Field
              label="Body EN"
              value={str(item.bodyEn)}
              onChange={(v) => onItemChange(index, { bodyEn: v })}
              multiline
            />
            <Field
              label="Body AR"
              value={str(item.bodyAr)}
              onChange={(v) => onItemChange(index, { bodyAr: v })}
              multiline
              rtl
            />
            {block.type === "cards" ? (
              <>
                <Field
                  label="Href"
                  value={str(item.href)}
                  onChange={(v) => onItemChange(index, { href: v })}
                />
                <Field
                  label="Icon path"
                  value={str(item.icon)}
                  onChange={(v) => onItemChange(index, { icon: v })}
                />
              </>
            ) : null}
            {list.length > min ? (
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() =>
                  onChange({ items: list.filter((_, i) => i !== index) })
                }
              >
                Remove
              </button>
            ) : null}
          </div>
        ))}
        {list.length < max ? (
          <button
            type="button"
            className="admin-btn admin-btn--ghost"
            onClick={() =>
              onChange({
                items: [
                  ...list,
                  block.type === "steps"
                    ? {
                        titleEn: "New step",
                        titleAr: "",
                        bodyEn: "",
                        bodyAr: "",
                        num: String(list.length + 1).padStart(2, "0"),
                      }
                    : { titleEn: "New card", titleAr: "", bodyEn: "", bodyAr: "" },
                ],
              })
            }
          >
            Add item
          </button>
        ) : null}
      </>
    );
  }
  return null;
}

function DesignFields({
  design,
  onChange,
}: {
  design: CmsDesign;
  onChange: (patch: Partial<CmsDesign>) => void;
}) {
  const bg = design.bg ?? "none";
  return (
    <>
      <label>
        Background
        <select
          value={bg}
          onChange={(e) =>
            onChange({ bg: e.target.value as CmsDesign["bg"] })
          }
        >
          <option value="none">none</option>
          <option value="solid">solid</option>
          <option value="gradient">gradient</option>
          <option value="image">image</option>
        </select>
      </label>
      {bg === "solid" ? (
        <label>
          Solid
          <select
            value={design.solid ?? "navy"}
            onChange={(e) =>
              onChange({ solid: e.target.value as CmsDesign["solid"] })
            }
          >
            <option value="navy">navy</option>
            <option value="navy-mid">navy-mid</option>
            <option value="white">white</option>
          </select>
        </label>
      ) : null}
      {bg === "gradient" ? (
        <label>
          Gradient
          <select
            value={design.gradient ?? "navy-mid"}
            onChange={(e) =>
              onChange({ gradient: e.target.value as CmsDesign["gradient"] })
            }
          >
            <option value="navy-mid">navy → navy-mid</option>
            <option value="navy-fade">navy → transparent</option>
          </select>
        </label>
      ) : null}
      {bg === "image" ? (
        <>
          <Field
            label="Image path"
            value={design.image ?? ""}
            onChange={(v) => onChange({ image: v })}
          />
          <label>
            Position
            <select
              value={design.imagePosition ?? "center"}
              onChange={(e) =>
                onChange({
                  imagePosition: e.target.value as CmsDesign["imagePosition"],
                })
              }
            >
              <option value="center">center</option>
              <option value="top">top</option>
              <option value="bottom">bottom</option>
            </select>
          </label>
        </>
      ) : null}
      {bg === "image" || bg === "gradient" ? (
        <label className="admin-check">
          <input
            type="checkbox"
            checked={design.overlay ?? bg === "image"}
            onChange={(e) => onChange({ overlay: e.target.checked })}
          />
          Overlay
        </label>
      ) : null}
      <label className="admin-check">
        <input
          type="checkbox"
          checked={Boolean(design.glass)}
          onChange={(e) => onChange({ glass: e.target.checked })}
        />
        Glass
      </label>
    </>
  );
}
