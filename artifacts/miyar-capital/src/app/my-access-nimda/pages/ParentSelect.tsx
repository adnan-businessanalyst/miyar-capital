import type { CmsPageListItem, CmsSitePage } from "@/lib/cmsPages";

export function parentSelectValue(
  parentId: string | null | undefined,
  parentPath: string | null | undefined,
) {
  if (parentId) return `cms:${parentId}`;
  if (parentPath) return `site:${parentPath}`;
  return "";
}

export function parseParentSelect(value: string): {
  parentId: string | null;
  parentPath: string | null;
} {
  if (value.startsWith("cms:")) return { parentId: value.slice(4), parentPath: null };
  if (value.startsWith("site:")) return { parentId: null, parentPath: value.slice(5) };
  return { parentId: null, parentPath: null };
}

export function ParentSelect({
  value,
  onChange,
  cmsPages,
  sitePages,
}: {
  value: string;
  onChange: (value: string) => void;
  cmsPages: CmsPageListItem[];
  sitePages: CmsSitePage[];
}) {
  return (
    <label>
      Parent
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">None (top-level)</option>
        {sitePages.length ? (
          <optgroup label="Current site pages">
            {sitePages.map((page) => (
              <option key={`site:${page.path}`} value={`site:${page.path}`}>
                {page.titleEn} — {page.path}
              </option>
            ))}
          </optgroup>
        ) : null}
        {cmsPages.length ? (
          <optgroup label="CMS pages">
            {cmsPages.map((page) => (
              <option key={page.id} value={`cms:${page.id}`}>
                {page.titleEn} — {page.path}
              </option>
            ))}
          </optgroup>
        ) : null}
      </select>
    </label>
  );
}
