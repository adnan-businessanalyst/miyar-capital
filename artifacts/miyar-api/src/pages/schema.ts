import { z } from "zod";

export const cmsDesignSchema = z.object({
  bg: z.enum(["none", "solid", "gradient", "image"]).default("none"),
  solid: z.enum(["navy", "navy-mid", "white"]).optional(),
  gradient: z.enum(["navy-mid", "navy-fade"]).optional(),
  image: z.string().trim().max(500).optional().or(z.literal("")),
  imagePosition: z.enum(["center", "top", "bottom"]).optional(),
  overlay: z.boolean().optional(),
  glass: z.boolean().optional(),
});

export type CmsDesign = z.infer<typeof cmsDesignSchema>;

const bilingual = z.string().trim().max(4000).optional().default("");
const shortBi = z.string().trim().max(300).optional().default("");

export const cmsHeroPropsSchema = z.object({
  hidden: z.boolean().optional(),
  design: cmsDesignSchema.optional(),
  titleEn: shortBi,
  titleAr: shortBi,
  crumbEn: shortBi,
  crumbAr: shortBi,
  media: z.string().trim().max(500).optional().or(z.literal("")),
});

export const cmsIntroPropsSchema = z.object({
  hidden: z.boolean().optional(),
  design: cmsDesignSchema.optional(),
  headingEn: shortBi,
  headingAr: shortBi,
  bodyEn: bilingual,
  bodyAr: bilingual,
  image: z.string().trim().max(500).optional().or(z.literal("")),
});

const cardItemSchema = z.object({
  titleEn: shortBi,
  titleAr: shortBi,
  bodyEn: bilingual,
  bodyAr: bilingual,
  href: z.string().trim().max(500).optional().or(z.literal("")),
  icon: z.string().trim().max(500).optional().or(z.literal("")),
});

export const cmsCardsPropsSchema = z.object({
  hidden: z.boolean().optional(),
  design: cmsDesignSchema.optional(),
  headingEn: shortBi,
  headingAr: shortBi,
  items: z.array(cardItemSchema).min(2).max(4),
});

const stepItemSchema = z.object({
  titleEn: shortBi,
  titleAr: shortBi,
  bodyEn: bilingual,
  bodyAr: bilingual,
  num: z.string().trim().max(8).optional().or(z.literal("")),
});

export const cmsStepsPropsSchema = z.object({
  hidden: z.boolean().optional(),
  design: cmsDesignSchema.optional(),
  headingEn: shortBi,
  headingAr: shortBi,
  items: z.array(stepItemSchema).min(1).max(8),
});

export const cmsBandPropsSchema = z.object({
  hidden: z.boolean().optional(),
  design: cmsDesignSchema.optional(),
  headingEn: shortBi,
  headingAr: shortBi,
  bodyEn: bilingual,
  bodyAr: bilingual,
});

export const cmsRegisterPropsSchema = z.object({
  hidden: z.boolean().optional(),
  design: cmsDesignSchema.optional(),
  titleEn: shortBi,
  titleAr: shortBi,
  bodyEn: bilingual,
  bodyAr: bilingual,
  buttonLabelEn: shortBi,
  buttonLabelAr: shortBi,
});

export const cmsRichtextPropsSchema = z.object({
  hidden: z.boolean().optional(),
  design: cmsDesignSchema.optional(),
  bodyEn: bilingual,
  bodyAr: bilingual,
});

export const CMS_BLOCK_TYPES = [
  "hero",
  "intro",
  "cards",
  "steps",
  "band",
  "register",
  "richtext",
] as const;

export type CmsBlockType = (typeof CMS_BLOCK_TYPES)[number];

export const cmsBlockSchema = z.object({
  id: z.string().uuid().optional(),
  type: z.enum(CMS_BLOCK_TYPES),
  sort: z.number().int().optional(),
  props: z.record(z.string(), z.unknown()).default({}),
});

export function parseBlockProps(type: CmsBlockType, raw: unknown) {
  switch (type) {
    case "hero":
      return cmsHeroPropsSchema.safeParse(raw ?? {});
    case "intro":
      return cmsIntroPropsSchema.safeParse(raw ?? {});
    case "cards":
      return cmsCardsPropsSchema.safeParse(raw ?? {});
    case "steps":
      return cmsStepsPropsSchema.safeParse(raw ?? {});
    case "band":
      return cmsBandPropsSchema.safeParse(raw ?? {});
    case "register":
      return cmsRegisterPropsSchema.safeParse(raw ?? {});
    case "richtext":
      return cmsRichtextPropsSchema.safeParse(raw ?? {});
  }
}

export function defaultDesignFor(type: CmsBlockType): CmsDesign {
  if (type === "cards" || type === "steps") {
    return { bg: "solid", solid: "navy", glass: true, overlay: false };
  }
  if (type === "band") {
    return { bg: "gradient", gradient: "navy-mid", overlay: false, glass: false };
  }
  return { bg: "none", overlay: false, glass: false };
}

export function defaultPropsFor(type: CmsBlockType): Record<string, unknown> {
  const design = defaultDesignFor(type);
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
    case "richtext":
      return { design, bodyEn: "", bodyAr: "" };
  }
}

const parentPathField = z
  .string()
  .trim()
  .max(400)
  .nullable()
  .optional()
  .or(z.literal(""));

export const createPageSchema = z.object({
  parentId: z.string().uuid().nullable().optional(),
  parentPath: parentPathField,
  slug: z.string().trim().min(1).max(80),
  titleEn: z.string().trim().min(1).max(300),
  titleAr: z.string().trim().max(300).optional().default(""),
  published: z.boolean().optional(),
  navShow: z.boolean().optional(),
});

export const updatePageSchema = z.object({
  parentId: z.string().uuid().nullable().optional(),
  parentPath: parentPathField,
  slug: z.string().trim().min(1).max(80).optional(),
  titleEn: z.string().trim().min(1).max(300).optional(),
  titleAr: z.string().trim().max(300).optional(),
  published: z.boolean().optional(),
  navShow: z.boolean().optional(),
});

export const replaceBlocksSchema = z.object({
  blocks: z.array(cmsBlockSchema).max(40),
});
