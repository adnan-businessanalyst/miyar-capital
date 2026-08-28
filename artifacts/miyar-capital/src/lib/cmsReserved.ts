const PREFIXES = [
  "/asset-management",
  "/investment-banking",
  "/investment-advisory",
  "/arrangement-management",
  "/who-we-are",
  "/board-of-directors",
  "/executive-team",
  "/our-team",
  "/careers",
  "/news",
  "/insights",
  "/disclosures",
  "/annual-reports",
  "/financial-reports",
  "/funds-reports",
  "/governance-independence",
  "/shariah-principles",
  "/privacy-policy",
  "/fatca",
  "/investment-management",
  "/murabaha-fund",
  "/saudi-equity-fund",
  "/rakiza",
  "/front-page",
  "/my-access-nimda",
  "/admin",
  "/docs",
  "/media",
  "/api",
];

export function slugifyLeaf(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function joinCmsPath(parentPath: string | null | undefined, slug: string): string {
  const leaf = slugifyLeaf(slug);
  if (!leaf) return "";
  const parent = !parentPath || parentPath === "/" ? "/" : parentPath.replace(/\/+$/, "");
  return parent === "/" ? `/${leaf}` : `${parent}/${leaf}`;
}

export function isReservedCmsPath(path: string): boolean {
  if (!path || path === "/") return true;
  return PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

export function defaultDesign(type: string) {
  if (type === "cards" || type === "steps") {
    return { bg: "solid" as const, solid: "navy" as const, glass: true, overlay: false };
  }
  if (type === "band") {
    return {
      bg: "gradient" as const,
      gradient: "navy-mid" as const,
      overlay: false,
      glass: false,
    };
  }
  return { bg: "none" as const, overlay: false, glass: false };
}

export function defaultBlockProps(type: string): Record<string, unknown> {
  const design = defaultDesign(type);
  switch (type) {
    case "hero":
      return { design, titleEn: "Page title", titleAr: "", crumbEn: "", crumbAr: "" };
    case "intro":
      return { design, headingEn: "Introduction", headingAr: "", bodyEn: "", bodyAr: "" };
    case "cards":
      return {
        design,
        headingEn: "",
        headingAr: "",
        items: [
          { titleEn: "Card one", titleAr: "", bodyEn: "Describe this offer.", bodyAr: "" },
          { titleEn: "Card two", titleAr: "", bodyEn: "Describe this offer.", bodyAr: "" },
        ],
      };
    case "steps":
      return {
        design,
        headingEn: "",
        headingAr: "",
        items: [
          { titleEn: "Step one", titleAr: "", bodyEn: "What happens first.", bodyAr: "", num: "01" },
          { titleEn: "Step two", titleAr: "", bodyEn: "What happens next.", bodyAr: "", num: "02" },
        ],
      };
    case "band":
      return { design, headingEn: "Section title", headingAr: "", bodyEn: "", bodyAr: "" };
    case "register":
      return { design, titleEn: "", titleAr: "", bodyEn: "", bodyAr: "" };
    default:
      return { design, bodyEn: "", bodyAr: "" };
  }
}
