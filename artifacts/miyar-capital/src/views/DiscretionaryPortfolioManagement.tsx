/**
 * Discretionary Portfolio Management — written IPS mandates, portfolio types, clients, cycle.
 *
 * Used by:
 * - app/asset-management/discretionary-portfolio-management/page.tsx
 */

"use client";

import { PageHero } from "../components/PageHero";
import { PrimaryCard, PrimaryCardGrid } from "../components/PrimaryCard";
import { RegisterInterestSection } from "../components/RegisterInterestSection";
import { RichText } from "../components/RichText";
import { SectionHead } from "../components/SectionHead";
import { Steps } from "../components/Steps";
import {
  DPM_EST,
  DPM_EST_PATH,
  type DpmEstSectionId,
} from "../data/discretionaryportfoliomanagement";
import { useLanguage } from "../i18n/LanguageContext";
import { CONTENT_IMAGES } from "../site/contentImages";
import { pickLang } from "../site/types";

function NoteStrip({
  titleEn,
  titleAr,
  bodyEn,
  bodyAr,
  lang,
}: {
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
  lang: "en" | "ar";
}) {
  return (
    <section
      className="dpm-est-note"
      aria-label={pickLang(titleEn, titleAr, lang)}
    >
      <div className="wrap">
        <b>
          <RichText as="span" html={pickLang(titleEn, titleAr, lang)} />
        </b>{" "}
        <RichText as="span" html={pickLang(bodyEn, bodyAr, lang)} />
      </div>
    </section>
  );
}

export function DiscretionaryPortfolioManagement() {
  const { lang } = useLanguage();
  const data = DPM_EST;

  const renderSection = (id: DpmEstSectionId) => {
    switch (id) {
      case "hero":
        return (
          <PageHero
            key={id}
            animate
            title={pickLang(data.hero.titleEn, data.hero.titleAr, lang)}
            description={pickLang(
              data.hero.subtitleEn,
              data.hero.subtitleAr,
              lang,
            )}
            crumbs={[
              {
                label: pickLang(
                  data.hero.crumbHomeEn,
                  data.hero.crumbHomeAr,
                  lang,
                ),
                href: "/",
              },
              {
                label: pickLang(
                  data.hero.crumbAmEn,
                  data.hero.crumbAmAr,
                  lang,
                ),
                href: "/asset-management",
              },
              {
                label: pickLang(
                  data.hero.crumbPageEn,
                  data.hero.crumbPageAr,
                  lang,
                ),
              },
            ]}
            meta={data.hero.meta.map((item) => ({
              label: pickLang(item.labelEn, item.labelAr, lang),
              value: pickLang(item.valueEn, item.valueAr, lang),
            }))}
          />
        );

      case "overview": {
        const photo = CONTENT_IMAGES.family_office_intro;
        return (
          <section key={id} className="blk dpm-est-intro">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.overview.titleEn,
                  data.overview.titleAr,
                  lang,
                )}
              />
              <div className="dpm-est-intro-row">
                <RichText
                  as="p"
                  className="sec-sub"
                  html={pickLang(
                    data.overview.bodyEn,
                    data.overview.bodyAr,
                    lang,
                  )}
                />
                {photo ? (
                  <figure className="dpm-est-intro-media">
                    <img
                      src={photo}
                      alt=""
                      decoding="async"
                    />
                  </figure>
                ) : null}
              </div>
            </div>
          </section>
        );
      }

      case "portfolios":
        return (
          <section key={id} className="blk dpm-est-band dpm-est-band--primary">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.portfolios.titleEn,
                  data.portfolios.titleAr,
                  lang,
                )}
              />
              <PrimaryCardGrid columns={4} className="dpm-est-cards">
                {data.portfolios.items.map((item) => (
                  <PrimaryCard
                    key={item.titleEn}
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
          </section>
        );

      case "serve":
        return (
          <section key={id} className="blk dpm-est-band dpm-est-band--secondary">
            <div className="wrap">
              <SectionHead
                title={pickLang(data.serve.titleEn, data.serve.titleAr, lang)}
              />
              <PrimaryCardGrid columns={4} className="dpm-est-cards">
                {data.serve.items.map((item) => (
                  <PrimaryCard
                    key={item.titleEn}
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
          </section>
        );

      case "cycle":
        return (
          <section key={id} className="blk dpm-est-band dpm-est-band--primary">
            <div className="wrap">
              <SectionHead
                title={pickLang(data.cycle.titleEn, data.cycle.titleAr, lang)}
              />
              <Steps
                className="dpm-est-steps"
                items={data.cycle.steps.map((step) => ({
                  title: pickLang(step.titleEn, step.titleAr, lang),
                  body: pickLang(step.bodyEn, step.bodyAr, lang),
                }))}
              />
            </div>
          </section>
        );

      case "governance":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.governance.titleEn,
                  data.governance.titleAr,
                  lang,
                )}
              />
              <RichText
                as="p"
                className="sec-sub"
                html={pickLang(
                  data.governance.bodyEn,
                  data.governance.bodyAr,
                  lang,
                )}
              />
            </div>
          </section>
        );

      case "risk":
        return (
          <NoteStrip
            key={id}
            lang={lang}
            titleEn={data.risk.titleEn}
            titleAr={data.risk.titleAr}
            bodyEn={data.risk.bodyEn}
            bodyAr={data.risk.bodyAr}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="page page--dpm-est">
      {data.sectionOrder.map(renderSection)}
      <RegisterInterestSection
        sourcePage={DPM_EST_PATH}
        pageTitleEn={data.hero.titleEn}
        pageTitleAr={data.hero.titleAr}
      />
    </div>
  );
}
