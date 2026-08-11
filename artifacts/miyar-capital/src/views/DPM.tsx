"use client";

import { PageHero } from "../components/PageHero";
import { PrimaryCard, PrimaryCardGrid } from "../components/PrimaryCard";
import { RegisterInterest } from "../components/RegisterInterest";
import { RichText } from "../components/RichText";
import { Steps } from "../components/Steps";
import { DPM_PAGE } from "../data/dpm";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";

const SOURCE_PAGE = "/asset-management/dpm";

export function DPM() {
  const { lang } = useLanguage();
  const data = DPM_PAGE;

  const renderSection = (id: (typeof data.sectionOrder)[number]) => {
    switch (id) {
      case "intro":
        return (
          <PageHero
            key={id}
            title={pickLang(data.hero.titleEn, data.hero.titleAr, lang)}
            crumbs={[
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
          />
        );

      case "mandates":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="sec-head">
                <div className="sec-tag">
                  {pickLang(
                    data.mandates.tagEn,
                    data.mandates.tagAr,
                    lang,
                  )}
                </div>
                <h2>
                  {pickLang(
                    data.mandates.headingEn,
                    data.mandates.headingAr,
                    lang,
                  )}
                </h2>
                <RichText
                  as="p"
                  html={pickLang(
                    data.mandates.leadEn,
                    data.mandates.leadAr,
                    lang,
                  )}
                />
              </div>
              <PrimaryCardGrid columns={4}>
                {data.mandates.items.map((item) => (
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
          </section>
        );

      case "cycle":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="sec-head">
                <div className="sec-tag">
                  {pickLang(data.cycle.tagEn, data.cycle.tagAr, lang)}
                </div>
                <h2>
                  {pickLang(
                    data.cycle.headingEn,
                    data.cycle.headingAr,
                    lang,
                  )}
                </h2>
              </div>
              <Steps
                items={data.cycle.steps.map((step) => ({
                  title: pickLang(step.titleEn, step.titleAr, lang),
                  body: pickLang(step.bodyEn, step.bodyAr, lang),
                }))}
              />
              <div className="section-cta">
                <RegisterInterest
                  sourcePage={SOURCE_PAGE}
                  buttonLabel={pickLang(
                    data.cycle.ctaEn,
                    data.cycle.ctaAr,
                    lang,
                  )}
                  className="btn btn-navy"
                />
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page">{data.sectionOrder.map(renderSection)}</div>
  );
}
