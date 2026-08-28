const ALLOWED_TAGS = new Set(["BR", "STRONG", "EM", "SPAN", "P", "UL", "OL", "LI", "A"]);
const ALLOWED_SPAN_CLASS = new Set(["rt-navy", "rt-accent", "rt-muted", "rt-white"]);

export function sanitizeCmsHref(raw: string): string {
  const href = raw.trim();
  if (!href) return "";
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  if (href.startsWith("#") && !href.toLowerCase().startsWith("#javascript")) return href;
  try {
    const url = new URL(href);
    if (url.protocol === "http:" || url.protocol === "https:" || url.protocol === "mailto:") {
      return href;
    }
  } catch {
    return "";
  }
  return "";
}

export function sanitizeCmsSrc(raw: string): string {
  const src = raw.trim();
  if (!src) return "";
  if (src.startsWith("/") && !src.startsWith("//")) return src;
  try {
    const url = new URL(src);
    if (url.protocol === "http:" || url.protocol === "https:") return src;
  } catch {
    return "";
  }
  return "";
}

function looksDangerous(html: string): boolean {
  return (
    /<\/?(script|iframe|object|embed|svg|math|link|meta|style|form|input|textarea)\b/i.test(html) ||
    /\son[a-z]+\s*=/i.test(html) ||
    /javascript:/i.test(html) ||
    /data:/i.test(html)
  );
}

function rewriteNode(node: Node, dest: ParentNode, doc: Document) {
  if (node.nodeType === Node.TEXT_NODE) {
    dest.appendChild(doc.createTextNode(node.textContent ?? ""));
    return;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return;
  const el = node as Element;
  const tag = el.tagName;
  if (!ALLOWED_TAGS.has(tag)) {
    for (const child of Array.from(el.childNodes)) rewriteNode(child, dest, doc);
    return;
  }
  const clean = doc.createElement(tag.toLowerCase());
  if (tag === "SPAN") {
    const cls = (el.getAttribute("class") ?? "")
      .split(/\s+/)
      .filter((name) => ALLOWED_SPAN_CLASS.has(name));
    if (cls.length) clean.setAttribute("class", cls.join(" "));
  }
  if (tag === "A") {
    const href = sanitizeCmsHref(el.getAttribute("href") ?? "");
    if (href) {
      clean.setAttribute("href", href);
      if (el.getAttribute("target") === "_blank") {
        clean.setAttribute("target", "_blank");
        clean.setAttribute("rel", "noopener noreferrer");
      }
    }
  }
  for (const child of Array.from(el.childNodes)) rewriteNode(child, clean, doc);
  dest.appendChild(clean);
}

/** Same allowlist as the API. Used so CmsPage never feeds raw CMS HTML to RichText. */
export function sanitizeCmsHtml(raw: string): string {
  if (!raw) return "";
  if (typeof DOMParser === "undefined") {
    return looksDangerous(raw) ? raw.replace(/<[^>]*>/g, "") : raw;
  }
  const doc = new DOMParser().parseFromString(`<div id="miyar-cms-html">${raw}</div>`, "text/html");
  const root = doc.getElementById("miyar-cms-html");
  const out = doc.createElement("div");
  if (root) {
    for (const child of Array.from(root.childNodes)) rewriteNode(child, out, doc);
  }
  return out.innerHTML;
}
