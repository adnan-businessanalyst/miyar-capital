/**
 * Combined Discretionary Portfolio Management page (DPM + Institutional & Family Office).
 *
 * Used by:
 * - app/asset-management/discretionary-portfolio-management/page.tsx
 *   (URL: /asset-management/Discretionary-portfolio-management)
 */

"use client";

import {
  Briefcase,
  Building2,
  ClipboardList,
  KeyRound,
  Landmark,
  Layers,
  MessageSquareText,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "../components/PageHero";
import { PrimaryCard, PrimaryCardGrid } from "../components/PrimaryCard";
import { RegisterInterestSection } from "../components/RegisterInterestSection";
import { RichText } from "../components/RichText";
import { SectionHead } from "../components/SectionHead";
import { Steps } from "../components/Steps";
import { DPM_PAGE } from "../data/dpm";
import {
  INSTITUTIONAL_FAMILY_OFFICE,
  type IfoIconId,
} from "../data/institutionalfamilyoffice";
import { useResolvedMedia } from "../hooks/useResolvedMedia";
import { useLanguage } from "../i18n/LanguageContext";
import { CONTENT_IMAGES } from "../site/contentImages";
import { pickLang } from "../site/types";

export const DPM_COMBINED_PATH =
  "/asset-management/Discretionary-portfolio-management";

const INTRO_MEDIA_BASENAME = "private_offers";

const ICONS: Record<IfoIconId, LucideIcon> = {
  landmark: Landmark,
  briefcase: Briefcase,
  building: Building2,
  sprout: Sprout,
  layers: Layers,
  message: MessageSquareText,
  key: KeyRound,
  clipboard: ClipboardList,
};

const HERO = {
  titleEn: "Discretionary Portfolio Management",
  titleAr: "الإدارة التقديرية للمحافظ",
  crumbAmEn: "Asset Management",
  crumbAmAr: "إدارة الأصول",
  crumbPageEn: "Discretionary Portfolio Management",
  crumbPageAr: "الإدارة التقديرية للمحافظ",
};

export function DiscretionaryPortfolioManagement() {
  const { lang } = useLanguage();
  const dpm = DPM_PAGE;
  const ifo = INSTITUTIONAL_FAMILY_OFFICE;
  const introImg = useResolvedMedia("content", INTRO_MEDIA_BASENAME);

  const title = pickLang(HERO.titleEn, HERO.titleAr, lang);

  return (
    <div className="page page--dpm page--institutional-family-office">
      <PageHero
        title={title}
        crumbs={[
          {
            label: pickLang(HERO.crumbAmEn, HERO.crumbAmAr, lang),
            href: "/asset-management",
          },
          {
            label: pickLang(HERO.crumbPageEn, HERO.crumbPageAr, lang),
          },
        ]}
        description={pickLang(
          ifo.hero.descriptionEn,
          ifo.hero.descriptionAr,
          lang,
        )}
        meta={ifo.hero.meta.map((item) => ({
          label: pickLang(item.labelEn, item.labelAr, lang),
          value: pickLang(item.valueEn, item.valueAr, lang),
        }))}
      />

      <section className="blk dpm-mandates">
        <div className="wrap">
          <SectionHead
            title={pickLang(dpm.mandates.tagEn, dpm.mandates.tagAr, lang)}
            subtitle={pickLang(
              dpm.mandates.headingEn,
              dpm.mandates.headingAr,
              lang,
            )}
          />
          <RichText
            as="p"
            className="dpm-lead"
            html={pickLang(dpm.mandates.leadEn, dpm.mandates.leadAr, lang)}
          />
        </div>
        <div className="dpm-photo">
          <div
            className="dpm-mandates-bg"
            style={{
              backgroundImage: `url("${CONTENT_IMAGES.client_solutions_section || "/media/content/client-solutions-section.jpg"}")`,
            }}
            aria-hidden="true"
          />
          <div className="wrap">
            <PrimaryCardGrid columns={4}>
              {dpm.mandates.items.map((item) => (
                <PrimaryCard
                  key={item.num}
                  badge={item.num}
                  title={pickLang(item.titleEn, item.titleAr, lang)}
                >
                  <RichText
                    as="p"
                    html={pickLang(item.bodyEn, item.bodyAr, lang)}
                  />
                </PrimaryCard>
              ))}
            </PrimaryCardGrid>
          </div>
        </div>
      </section>

      <section className="blk dpm-cycle">
        <div className="wrap">
          <SectionHead
            title={pickLang(dpm.cycle.tagEn, dpm.cycle.tagAr, lang)}
            subtitle={pickLang(dpm.cycle.headingEn, dpm.cycle.headingAr, lang)}
          />
        </div>
        <div className="dpm-photo">
          <div
            className="dpm-cycle-bg"
            style={{
              backgroundImage: `url("${CONTENT_IMAGES.section_bg_our_approach || "/media/content/section-bg-our-approach.jpg"}")`,
            }}
            aria-hidden="true"
          />
          <div className="wrap">
            <Steps
              className="dpm-cycle-steps"
              items={dpm.cycle.steps.map((step) => ({
                title: pickLang(step.titleEn, step.titleAr, lang),
                body: pickLang(step.bodyEn, step.bodyAr, lang),
              }))}
            />
          </div>
        </div>
      </section>

      <section className="blk ifo-overview">
        <div className="wrap">
          <div className="pi-intro">
            <div className="pi-intro-text">
              <SectionHead
                title={pickLang(ifo.overview.tagEn, ifo.overview.tagAr, lang)}
                subtitle={pickLang(
                  ifo.overview.headingEn,
                  ifo.overview.headingAr,
                  lang,
                )}
              />
              <RichText
                as="p"
                className="ifo-body"
                html={pickLang(ifo.overview.body1En, ifo.overview.body1Ar, lang)}
              />
              <RichText
                as="p"
                className="ifo-body"
                html={pickLang(ifo.overview.body2En, ifo.overview.body2Ar, lang)}
              />
            </div>
            <div
              className="pi-intro-img"
              role="img"
              aria-label={title}
              style={
                introImg ? { backgroundImage: `url(${introImg})` } : undefined
              }
            />
          </div>
        </div>
      </section>

      <section className="blk blk--cream ifo-serve">
        <div className="wrap">
          <SectionHead
            title={pickLang(ifo.serve.headingEn, ifo.serve.headingAr, lang)}
          />
          <PrimaryCardGrid columns={4}>
            {ifo.serve.items.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <PrimaryCard
                  key={item.titleEn}
                  icon={<Icon strokeWidth={1.5} />}
                  title={
                    <RichText
                      as="span"
                      html={pickLang(item.titleEn, item.titleAr, lang)}
                    />
                  }
                >
                  <RichText
                    as="p"
                    html={pickLang(item.bodyEn, item.bodyAr, lang)}
                  />
                </PrimaryCard>
              );
            })}
          </PrimaryCardGrid>
        </div>
      </section>

      <section
        className="blk am-process ifo-approach"
        style={{
          ["--ifo-approach-bg-img" as string]: `url("${CONTENT_IMAGES.section_bg_our_approach || "/media/content/section-bg-our-approach.jpg"}")`,
        }}
      >
        <div
          className="ifo-approach-bg"
          style={{
            backgroundImage: `url("${CONTENT_IMAGES.section_bg_our_approach || "/media/content/section-bg-our-approach.jpg"}")`,
          }}
          aria-hidden="true"
        />
        <div className="wrap">
          <div className="am-process-layout">
            <aside className="am-process-aside">
              <SectionHead
                title={pickLang(
                  ifo.approach.headingEn,
                  ifo.approach.headingAr,
                  lang,
                )}
              />
            </aside>
            <div className="am-process-cards">
              <Steps
                className="ifo-approach-steps"
                items={ifo.approach.steps.map((step) => ({
                  num: step.num,
                  title: pickLang(step.titleEn, step.titleAr, lang),
                  body: pickLang(step.bodyEn, step.bodyAr, lang),
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="blk blk--cream ifo-engagement">
        <div className="wrap">
          <SectionHead
            title={pickLang(ifo.engagement.tagEn, ifo.engagement.tagAr, lang)}
            subtitle={pickLang(
              ifo.engagement.headingEn,
              ifo.engagement.headingAr,
              lang,
            )}
          />
          <PrimaryCardGrid columns={2}>
            {ifo.engagement.items.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <PrimaryCard
                  key={item.titleEn}
                  icon={<Icon strokeWidth={1.5} />}
                  title={
                    <RichText
                      as="span"
                      html={pickLang(item.titleEn, item.titleAr, lang)}
                    />
                  }
                >
                  <RichText
                    as="p"
                    html={pickLang(item.bodyEn, item.bodyAr, lang)}
                  />
                </PrimaryCard>
              );
            })}
          </PrimaryCardGrid>
        </div>
      </section>

      <RegisterInterestSection
        sourcePage={DPM_COMBINED_PATH}
        pageTitleEn={HERO.titleEn}
        pageTitleAr={HERO.titleAr}
        titleEn={ifo.contact.titleEn}
        titleAr={ifo.contact.titleAr}
        bodyEn={ifo.contact.bodyEn}
        bodyAr={ifo.contact.bodyAr}
        buttonLabelEn={ifo.contact.buttonEn}
        buttonLabelAr={ifo.contact.buttonAr}
        modalTitleEn={ifo.contact.buttonEn}
        modalTitleAr={ifo.contact.buttonAr}
      />

      <section className="blk ifo-notes">
        <div className="wrap">
          <RichText
            as="p"
            className="ifo-notes-title"
            html={pickLang(ifo.notes.titleEn, ifo.notes.titleAr, lang)}
          />
          <ol className="ifo-note-list">
            {ifo.notes.items.map((note) => (
              <li key={note.numEn}>
                <span className="ifo-note-num">
                  {pickLang(note.numEn, note.numAr, lang)}
                </span>
                <RichText
                  as="p"
                  html={pickLang(note.bodyEn, note.bodyAr, lang)}
                />
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
