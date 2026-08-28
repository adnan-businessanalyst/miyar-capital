import { asc, eq } from "drizzle-orm";
import type { Context, Hono } from "hono";
import { isAdminAuthenticated } from "../admin/auth.js";
import { getDb } from "../db/index.js";
import { cmsPageBlocks, cmsPages, type CmsPageRow } from "../db/schema.js";
import {
  isSystemPath,
  joinPagePath,
  normalizePath,
  slugifyLeaf,
} from "./reserved.js";
import { findSiteParent, SITE_PARENTS, siteAncestorChain } from "./siteParents.js";
import {
  createPageSchema,
  parseBlockProps,
  replaceBlocksSchema,
  updatePageSchema,
  type CmsBlockType,
} from "./schema.js";
import { sanitizeCmsBlockProps, sanitizeCmsHtml } from "./sanitize.js";

function publicBlocks(
  blocks: Array<{ id: string; type: string; sort: number; props: Record<string, unknown> | null }>,
) {
  return blocks.map((block) => ({
    id: block.id,
    type: block.type,
    sort: block.sort,
    props: sanitizeCmsBlockProps(block.type, block.props ?? {}),
  }));
}

type PageRecord = CmsPageRow;

function publicPage(
  row: PageRecord,
  ancestors: Array<{ titleEn: string; titleAr: string; path: string }>,
  blocks: Array<{ id: string; type: string; sort: number; props: Record<string, unknown> }>,
) {
  return {
    id: row.id,
    parentId: row.parentId,
    slug: row.slug,
    path: row.path,
    titleEn: sanitizeCmsHtml(row.titleEn),
    titleAr: sanitizeCmsHtml(row.titleAr),
    published: row.published,
    parentPath: row.parentPath ?? null,
    navShow: row.navShow,
    reservedPath: pathTakenBySite(row.path),
    updatedAt: row.updatedAt.toISOString(),
    ancestors: ancestors.map((a) => ({
      ...a,
      titleEn: sanitizeCmsHtml(a.titleEn),
      titleAr: sanitizeCmsHtml(a.titleAr),
    })),
    blocks,
  };
}

function adminPage(row: PageRecord) {
  return {
    id: row.id,
    parentId: row.parentId,
    parentPath: row.parentPath ?? null,
    slug: row.slug,
    path: row.path,
    titleEn: sanitizeCmsHtml(row.titleEn),
    titleAr: sanitizeCmsHtml(row.titleAr),
    published: row.published,
    navShow: row.navShow,
    reservedPath: pathTakenBySite(row.path),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function pathTakenBySite(path: string) {
  return isSystemPath(path) || Boolean(findSiteParent(path));
}

function resolveParent(
  rows: PageRecord[],
  parentId: string | null | undefined,
  parentPath: string | null | undefined,
) {
  const site = findSiteParent(parentPath || "");
  if (parentId) {
    const parent = byId(rows, parentId);
    if (!parent) return { error: "Parent page not found" as const };
    return { parentId: parent.id, parentPath: null as string | null, basePath: parent.path };
  }
  if (parentPath) {
    if (!site) return { error: "Parent page not found" as const };
    return { parentId: null, parentPath: site.path, basePath: site.path };
  }
  return { parentId: null, parentPath: null as string | null, basePath: "/" };
}

function fullAncestors(rows: PageRecord[], row: PageRecord) {
  const cms = ancestorChain(rows, row);
  const top = cms[0] ? rows.find((item) => item.path === cms[0].path) : row;
  const siteFrom = top?.parentPath ?? row.parentPath;
  const site = siteFrom ? siteAncestorChain(siteFrom) : [];
  return [...site, ...cms];
}

async function allPages() {
  return getDb().select().from(cmsPages).orderBy(asc(cmsPages.path));
}

function byId(rows: PageRecord[], id: string | null | undefined) {
  if (!id) return undefined;
  return rows.find((row) => row.id === id);
}

function wouldCycle(rows: PageRecord[], id: string, newParentId: string | null) {
  let cur: string | null = newParentId;
  const seen = new Set<string>();
  while (cur) {
    if (cur === id) return true;
    if (seen.has(cur)) return true;
    seen.add(cur);
    cur = byId(rows, cur)?.parentId ?? null;
  }
  return false;
}

function ancestorChain(rows: PageRecord[], row: PageRecord) {
  const chain: Array<{ titleEn: string; titleAr: string; path: string }> = [];
  let cur = byId(rows, row.parentId ?? undefined);
  const seen = new Set<string>();
  while (cur && !seen.has(cur.id)) {
    seen.add(cur.id);
    chain.unshift({ titleEn: cur.titleEn, titleAr: cur.titleAr, path: cur.path });
    cur = byId(rows, cur.parentId ?? undefined);
  }
  return chain;
}

function ancestorsPublished(rows: PageRecord[], row: PageRecord) {
  return ancestorChain(rows, row).every((a) => {
    const match = rows.find((r) => r.path === a.path);
    return match?.published;
  });
}

function childrenOf(rows: PageRecord[], id: string) {
  return rows.filter((row) => row.parentId === id);
}

async function recomputeDescendantPaths(
  rows: PageRecord[],
  id: string,
  newPath: string,
) {
  const db = getDb();
  const queue = childrenOf(rows, id).map((child) => ({ child, parentPath: newPath }));
  while (queue.length) {
    const next = queue.shift();
    if (!next) break;
    const path = joinPagePath(next.parentPath, next.child.slug);
    await db
      .update(cmsPages)
      .set({ path, updatedAt: new Date() })
      .where(eq(cmsPages.id, next.child.id));
    next.child.path = path;
    for (const grandchild of childrenOf(rows, next.child.id)) {
      queue.push({ child: grandchild, parentPath: path });
    }
  }
}

async function publicByPath(path: string) {
  const rows = await allPages();
  const row = rows.find((item) => item.path === path);
  if (!row || !row.published || !ancestorsPublished(rows, row)) {
    return null;
  }
  const blocks = await getDb()
    .select()
    .from(cmsPageBlocks)
    .where(eq(cmsPageBlocks.pageId, row.id))
    .orderBy(asc(cmsPageBlocks.sort));
  return publicPage(
    row,
    fullAncestors(rows, row),
    publicBlocks(blocks),
  );
}

async function updateAdminPage(c: Context) {
  if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
  const id = c.req.param("id");
  if (!id) return c.json({ error: "Not found" }, 404);
  const parsed = updatePageSchema.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) {
    return c.json({ error: parsed.error.issues[0]?.message ?? "Invalid page" }, 400);
  }
  const rows = await allPages();
  const row = byId(rows, id);
  if (!row) return c.json({ error: "Not found" }, 404);

  const nextParentId =
    parsed.data.parentId === undefined ? row.parentId : parsed.data.parentId;
  const nextParentPath =
    parsed.data.parentPath === undefined
      ? row.parentPath
      : parsed.data.parentPath || null;
  if (nextParentId && wouldCycle(rows, id, nextParentId)) {
    return c.json({ error: "A page cannot be its own ancestor" }, 400);
  }
  const resolved = resolveParent(rows, nextParentId, nextParentId ? null : nextParentPath);
  if ("error" in resolved) return c.json({ error: resolved.error }, 400);
  const slug = parsed.data.slug ? slugifyLeaf(parsed.data.slug) : row.slug;
  if (!slug) return c.json({ error: "Slug is required" }, 400);
  const path = joinPagePath(resolved.basePath, slug);
  if (pathTakenBySite(path)) {
    return c.json({ error: "This path is owned by a current site page" }, 400);
  }
  if (rows.some((item) => item.path === path && item.id !== id)) {
    return c.json({ error: "A page already uses this path" }, 400);
  }

  const [updated] = await getDb()
    .update(cmsPages)
    .set({
      parentId: resolved.parentId,
      parentPath: resolved.parentPath,
      slug,
      path,
        titleEn: parsed.data.titleEn !== undefined ? sanitizeCmsHtml(parsed.data.titleEn) : row.titleEn,
        titleAr: parsed.data.titleAr !== undefined ? sanitizeCmsHtml(parsed.data.titleAr) : row.titleAr,
      published: parsed.data.published ?? row.published,
      navShow: parsed.data.navShow ?? row.navShow,
      updatedAt: new Date(),
    })
    .where(eq(cmsPages.id, id))
    .returning();

  if (path !== row.path) {
    await recomputeDescendantPaths(rows, id, path);
  }

  return c.json({ page: adminPage(updated), reservedPath: pathTakenBySite(path) });
}

export function registerCmsPageRoutes(app: Hono) {
  app.get("/api/cms-page", async (c) => {
    const path = normalizePath(c.req.query("path") || "");
    try {
      const page = await publicByPath(path);
      if (!page) return c.json({ error: "Not found" }, 404);
      return c.json({ page });
    } catch (err) {
      console.error("[cms-pages] public", err);
      return c.json({ error: "Not found" }, 404);
    }
  });

  app.get("/api/pages/*", async (c) => {
    const raw = c.req.path.replace(/^\/api\/pages/, "") || "/";
    const path = normalizePath(decodeURIComponent(raw));
    try {
      const page = await publicByPath(path);
      if (!page) return c.json({ error: "Not found" }, 404);
      return c.json({ page });
    } catch (err) {
      console.error("[cms-pages] public", err);
      return c.json({ error: "Not found" }, 404);
    }
  });

  app.get("/api/admin/pages", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    const rows = await allPages();
    return c.json({ pages: rows.map(adminPage), sitePages: SITE_PARENTS });
  });

  app.post("/api/admin/pages", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    const parsed = createPageSchema.safeParse(await c.req.json().catch(() => null));
    if (!parsed.success) {
      return c.json({ error: parsed.error.issues[0]?.message ?? "Invalid page" }, 400);
    }
    const slug = slugifyLeaf(parsed.data.slug);
    if (!slug) return c.json({ error: "Slug is required" }, 400);
    const rows = await allPages();
    const resolved = resolveParent(
      rows,
      parsed.data.parentId ?? null,
      parsed.data.parentId ? null : parsed.data.parentPath || null,
    );
    if ("error" in resolved) return c.json({ error: resolved.error }, 400);
    const path = joinPagePath(resolved.basePath, slug);
    if (!path) return c.json({ error: "Invalid path" }, 400);
    if (pathTakenBySite(path)) {
      return c.json({ error: "This path is owned by a current site page" }, 400);
    }
    if (rows.some((row) => row.path === path)) {
      return c.json({ error: "A page already uses this path" }, 400);
    }
    const [created] = await getDb()
      .insert(cmsPages)
      .values({
        parentId: resolved.parentId,
        parentPath: resolved.parentPath,
        slug,
        path,
        titleEn: sanitizeCmsHtml(parsed.data.titleEn),
        titleAr: sanitizeCmsHtml(parsed.data.titleAr || ""),
        published: parsed.data.published ?? false,
        navShow: parsed.data.navShow ?? false,
      })
      .returning();
    return c.json({ page: adminPage(created), reservedPath: pathTakenBySite(path) }, 201);
  });

  app.get("/api/admin/pages/:id", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    const id = c.req.param("id");
    if (!id) return c.json({ error: "Not found" }, 404);
    const rows = await allPages();
    const row = byId(rows, id);
    if (!row) return c.json({ error: "Not found" }, 404);
    const blocks = await getDb()
      .select()
      .from(cmsPageBlocks)
      .where(eq(cmsPageBlocks.pageId, id))
      .orderBy(asc(cmsPageBlocks.sort));
    return c.json({
      page: publicPage(
        row,
        fullAncestors(rows, row),
        publicBlocks(blocks),
      ),
    });
  });

  app.put("/api/admin/pages/:id", (c) => updateAdminPage(c));
  app.patch("/api/admin/pages/:id", (c) => updateAdminPage(c));

  app.delete("/api/admin/pages/:id", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    const id = c.req.param("id");
    if (!id) return c.json({ error: "Not found" }, 404);
    const rows = await allPages();
    const row = byId(rows, id);
    if (!row) return c.json({ error: "Not found" }, 404);
    const kids = childrenOf(rows, id);
    const cascade = c.req.query("cascade") === "1";
    if (kids.length && !cascade) {
      return c.json({ error: "Page has children. Confirm cascade to delete." }, 400);
    }
    const db = getDb();
    const ids = [id];
    const queue = [id];
    while (queue.length) {
      const cur = queue.shift();
      if (!cur) break;
      for (const kid of childrenOf(rows, cur)) {
        ids.push(kid.id);
        queue.push(kid.id);
      }
    }
    for (const delId of [...ids].reverse()) {
      await db.delete(cmsPages).where(eq(cmsPages.id, delId));
    }
    return c.json({ ok: true });
  });

  app.put("/api/admin/pages/:id/blocks", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    const id = c.req.param("id");
    if (!id) return c.json({ error: "Not found" }, 404);
    const [row] = await getDb().select().from(cmsPages).where(eq(cmsPages.id, id)).limit(1);
    if (!row) return c.json({ error: "Not found" }, 404);
    const parsed = replaceBlocksSchema.safeParse(await c.req.json().catch(() => null));
    if (!parsed.success) {
      return c.json({ error: parsed.error.issues[0]?.message ?? "Invalid blocks" }, 400);
    }

    const normalized = [];
    for (const [index, block] of parsed.data.blocks.entries()) {
      const props = parseBlockProps(block.type as CmsBlockType, block.props);
      if (!props.success) {
        return c.json(
          {
            error:
              props.error.issues[0]?.message ?? `Invalid ${block.type} block`,
          },
          400,
        );
      }
      normalized.push({
        id: block.id,
        type: block.type,
        sort: block.sort ?? index,
        props: sanitizeCmsBlockProps(block.type, props.data as Record<string, unknown>),
      });
    }

    const db = getDb();
    await db.delete(cmsPageBlocks).where(eq(cmsPageBlocks.pageId, id));
    if (normalized.length) {
      await db.insert(cmsPageBlocks).values(
        normalized.map((block, index) => ({
          ...(block.id ? { id: block.id } : {}),
          pageId: id,
          type: block.type,
          sort: index,
          props: block.props,
        })),
      );
    }
    const blocks = await db
      .select()
      .from(cmsPageBlocks)
      .where(eq(cmsPageBlocks.pageId, id))
      .orderBy(asc(cmsPageBlocks.sort));
    await db.update(cmsPages).set({ updatedAt: new Date() }).where(eq(cmsPages.id, id));
    return c.json({
      blocks: publicBlocks(blocks),
    });
  });
}
