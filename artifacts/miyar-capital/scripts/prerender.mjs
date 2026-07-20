/**
 * Optional build-time prerender for SEO (Vite SPA + wouter).
 *
 * Commands:
 * - Vercel / CI: `pnpm build` (Vite only — do not run this script)
 * - Local SEO HTML: `pnpm run build:prerender` (requires Playwright Chromium)
 *
 * Flow: Vite writes dist/public → this script serves that folder, opens each
 * route in headless Chromium, waits for React to paint text, then writes
 * HTML to dist/public/<route>/index.html (and overwrites index.html for "/").
 *
 * Add routes in ./prerender-routes.mjs when you add pages in App.tsx.
 * SPA fallback still covers client routes via public/_redirects + root vercel.json.
 *
 * Skipped automatically when VERCEL=1 or SKIP_PRERENDER=1.
 * Caveat: LanguageContext defaults to EN; Arabic is client-only after toggle.
 */
import { execSync } from "node:child_process";
import http from "node:http";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { PRERENDER_ROUTES } from "./prerender-routes.mjs";

if (process.env.VERCEL === "1" || process.env.SKIP_PRERENDER === "1") {
  console.log(
    "Skipping prerender (VERCEL or SKIP_PRERENDER is set). Use local `pnpm run build:prerender` for SEO HTML.",
  );
  process.exit(0);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../dist/public");
const packageRoot = path.resolve(__dirname, "..");

const rawBase = process.env.BASE_PATH ?? "/";
const basePath = rawBase === "/" ? "" : rawBase.replace(/\/$/, "");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".map": "application/json",
};

function resolveFile(urlPath) {
  let pathname = decodeURIComponent(urlPath.split("?")[0] || "/");
  if (basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))) {
    pathname = pathname.slice(basePath.length) || "/";
  }
  if (!pathname.startsWith("/")) pathname = `/${pathname}`;

  const candidates = [];
  if (pathname.endsWith("/")) {
    candidates.push(path.join(outDir, pathname, "index.html"));
  } else {
    candidates.push(path.join(outDir, pathname));
    candidates.push(path.join(outDir, `${pathname}.html`));
    candidates.push(path.join(outDir, pathname, "index.html"));
  }
  // SPA fallback so wouter can render deep links before we write their HTML
  candidates.push(path.join(outDir, "index.html"));

  for (const file of candidates) {
    const resolved = path.resolve(file);
    if (!resolved.startsWith(outDir)) continue;
    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) return resolved;
  }
  return null;
}

function createStaticServer() {
  return http.createServer((req, res) => {
    const file = resolveFile(req.url || "/");
    if (!file) {
      res.writeHead(404).end("Not found");
      return;
    }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
}

async function launchBrowser() {
  try {
    return await chromium.launch({ headless: true });
  } catch {
    console.log("Playwright Chromium missing — installing…");
    execSync("pnpm exec playwright install chromium", {
      stdio: "inherit",
      cwd: packageRoot,
    });
    return await chromium.launch({ headless: true });
  }
}

function outPathForRoute(route) {
  if (route === "/") return path.join(outDir, "index.html");
  const segments = route.replace(/^\//, "").split("/");
  return path.join(outDir, ...segments, "index.html");
}

async function main() {
  if (!fs.existsSync(path.join(outDir, "index.html"))) {
    console.error(`Missing ${path.join(outDir, "index.html")}. Run vite build first.`);
    process.exit(1);
  }

  const server = createStaticServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  const origin = `http://127.0.0.1:${port}${basePath}`;

  const browser = await launchBrowser();
  const page = await browser.newPage();

  let ok = 0;
  for (const route of PRERENDER_ROUTES) {
    const url = route === "/" ? `${origin}/` : `${origin}${route}`;
    process.stdout.write(`prerender ${route} … `);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForFunction(
      () => {
        const root = document.getElementById("root");
        return !!root && (root.innerText || "").trim().length > 80;
      },
      { timeout: 90_000 },
    );
    // Allow MetaInjector / lang effects to settle
    await page.waitForTimeout(150);
    const textLen = await page.evaluate(
      () => (document.getElementById("root")?.innerText || "").trim().length,
    );
    if (textLen < 80) {
      throw new Error(`Prerender produced empty content for ${route} (${textLen} chars)`);
    }
    const html = await page.content();
    const dest = outPathForRoute(route);
    await fsp.mkdir(path.dirname(dest), { recursive: true });
    const body = html.replace(/^<!DOCTYPE html>\s*/i, "");
    await fsp.writeFile(dest, `<!DOCTYPE html>\n${body}`, "utf8");
    console.log(`ok (${textLen} chars)`);
    ok += 1;
  }

  await browser.close();
  server.close();
  console.log(`Prerendered ${ok} routes → ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
