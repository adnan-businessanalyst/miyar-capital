/**
 * CmsPage — Renders a CMS section page. Styles are scoped to .cms-page only.
 *
 * Used by:
 * - app/[...slug]/page.tsx
 * - app/my-access-nimda/pages/[id]/PageEditor.tsx
 */

"use client";

import { PageHero, type PageHeroCrumb } from "@/components/PageHero";
import { PrimaryCard, PrimaryCardGrid } from "@/components/PrimaryCard";
import { RegisterInterestSection } from "@/components/RegisterInterestSection";
import { RichText } from "@/components/RichText";
import { SectionHead } from "@/components/SectionHead";
import { Steps } from "@/components/Steps";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  asDesign,
  bool,
  pickCms,
  str,
  type CmsBlock,
  type CmsPageData,
} from "@/lib/cmsPages";
import type { Lang } from "@/site/types";
import { CmsBand } from "./CmsBand";

type Props = {
  page: CmsPageData;
  lang?: Lang;
  selectedIndex?: number;
  onSelectBlock?: (index: number) => void;
  preview?: boolean;
};

function items(raw: unknown): Array<Record<string, unknown>> {
  return Array.isArray(raw) ? (raw as Array<Record<string, unknown>>) : [];
}

export function CmsPage({
  page,
  lang: langProp,
  selectedIndex,
  onSelectBlock,
  preview = false,
}: Props) {
  const ctx = useLanguage();
  const lang = langProp ?? ctx.lang;

  const crumbs: PageHeroCrumb[] = [
    ...page.ancestors.map((a) => ({
      label: pickCms(a.titleEn, a.titleAr, lang),
      href: a.path,
    })),
    { label: pickCms(page.titleEn, page.titleAr, lang) },
  ];

  return (
    <div className="cms-page" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
      {page.blocks.map((block, index) => {
        if (bool(block.props.hidden)) return null;
        const selected = selectedIndex === index;
        return (
          <div
            key={block.id || `${block.type}-${index}`}
            className={`cms-block${selected ? " is-selected" : ""}${preview ? " is-preview" : ""}`}
            onClick={
              onSelectBlock
                ? (event) => {
                    event.preventDefault();
                    onSelectBlock(index);
                  }
                : undefined
            }
          >
            <CmsBlockView block={block} page={page} lang={lang} crumbs={crumbs} />
          </div>
        );
      })}
    </div>
  );
}

function CmsBlockView({
  block,
  page,
  lang,
  crumbs,
}: {
  block: CmsBlock;
  page: CmsPageData;
  lang: Lang;
  crumbs: PageHeroCrumb[];
}) {
  const design = asDesign(block.props.design);
  const glass = design.glass ?? (block.type === "cards" || block.type === "steps");

  switch (block.type) {
    case "hero":
      return (
        <PageHero
          title={pickCms(block.props.titleEn, block.props.titleAr, lang) || page.titleEn}
          crumbs={crumbs}
          backgroundImage={str(block.props.media) || undefined}
        />
      );
    case "intro":
      return (
        <CmsBand design={design}>
          <SectionHead
            title={pickCms(block.props.headingEn, block.props.headingAr, lang)}
          />
          {str(block.props.image) ? (
            <figure className="cms-intro-figure">
              <img src={str(block.props.image)} alt="" />
            </figure>
          ) : null}
          {pickCms(block.props.bodyEn, block.props.bodyAr, lang) ? (
            <RichText
              as="p"
              className="cms-copy"
              html={pickCms(block.props.bodyEn, block.props.bodyAr, lang)}
            />
          ) : null}
        </CmsBand>
      );
    case "cards": {
      const list = items(block.props.items);
      return (
        <CmsBand design={{ ...design, bg: design.bg ?? "solid", solid: design.solid ?? "navy" }}>
          {pickCms(block.props.headingEn, block.props.headingAr, lang) ? (
            <SectionHead
              title={pickCms(block.props.headingEn, block.props.headingAr, lang)}
            />
          ) : null}
          <PrimaryCardGrid columns={list.length >= 4 ? 4 : list.length === 3 ? 3 : 2}>
            {list.map((item, i) => (
              <PrimaryCard
                key={`${str(item.titleEn)}-${i}`}
                className={glass ? "cms-glass" : undefined}
                title={pickCms(item.titleEn, item.titleAr, lang)}
                href={str(item.href) || undefined}
                icon={
                  str(item.icon) ? (
                    <img src={str(item.icon)} alt="" />
                  ) : undefined
                }
              >
                <RichText as="p" html={pickCms(item.bodyEn, item.bodyAr, lang)} />
              </PrimaryCard>
            ))}
          </PrimaryCardGrid>
        </CmsBand>
      );
    }
    case "steps":
      return (
        <CmsBand design={{ ...design, bg: design.bg ?? "solid", solid: design.solid ?? "navy-mid" }}>
          {pickCms(block.props.headingEn, block.props.headingAr, lang) ? (
            <SectionHead
              title={pickCms(block.props.headingEn, block.props.headingAr, lang)}
            />
          ) : null}
          <Steps
            className={glass ? "cms-glass" : ""}
            items={items(block.props.items).map((item) => ({
              title: pickCms(item.titleEn, item.titleAr, lang),
              body: pickCms(item.bodyEn, item.bodyAr, lang),
              num: str(item.num) || undefined,
            }))}
          />
        </CmsBand>
      );
    case "band":
      return (
        <CmsBand design={design?.bg === "none" ? { ...design, bg: "gradient", gradient: "navy-mid" } : design}>
          {pickCms(block.props.headingEn, block.props.headingAr, lang) ? (
            <h2 className="cms-band-title">
              {pickCms(block.props.headingEn, block.props.headingAr, lang)}
            </h2>
          ) : null}
          {pickCms(block.props.bodyEn, block.props.bodyAr, lang) ? (
            <RichText
              as="p"
              className="cms-copy"
              html={pickCms(block.props.bodyEn, block.props.bodyAr, lang)}
            />
          ) : null}
        </CmsBand>
      );
    case "register":
      return (
        <CmsBand design={design}>
          <RegisterInterestSection
            sourcePage={page.path}
            pageTitleEn={page.titleEn}
            pageTitleAr={page.titleAr}
            titleEn={str(block.props.titleEn) || undefined}
            titleAr={str(block.props.titleAr) || undefined}
            bodyEn={str(block.props.bodyEn) || undefined}
            bodyAr={str(block.props.bodyAr) || undefined}
            buttonLabelEn={str(block.props.buttonLabelEn) || undefined}
            buttonLabelAr={str(block.props.buttonLabelAr) || undefined}
          />
        </CmsBand>
      );
    case "richtext":
      return (
        <CmsBand design={design}>
          <RichText
            as="div"
            className="cms-copy"
            html={pickCms(block.props.bodyEn, block.props.bodyAr, lang)}
          />
        </CmsBand>
      );
    default:
      return null;
  }
}
