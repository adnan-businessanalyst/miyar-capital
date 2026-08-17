"use client";

import { PageHero } from "../components/PageHero";
import { PrimaryCard, PrimaryCardGrid } from "../components/PrimaryCard";
import { RegisterInterestSection } from "../components/RegisterInterestSection";
import { RichText } from "../components/RichText";
import { SectionHead } from "../components/SectionHead";
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
              <SectionHead
                title={pickLang(
                  data.mandates.tagEn,
                  data.mandates.tagAr,
                  lang,
                )}
                subtitle={pickLang(
                  data.mandates.headingEn,
                  data.mandates.headingAr,
                  lang,
                )}
              />
              <RichText
                as="p"
                className="dpm-lead"
                html={pickLang(
                  data.mandates.leadEn,
                  data.mandates.leadAr,
                  lang,
                )}
              />
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
              <SectionHead
                title={pickLang(data.cycle.tagEn, data.cycle.tagAr, lang)}
                subtitle={pickLang(
                  data.cycle.headingEn,
                  data.cycle.headingAr,
                  lang,
                )}
              />
              <Steps
                items={data.cycle.steps.map((step) => ({
                  title: pickLang(step.titleEn, step.titleAr, lang),
                  body: pickLang(step.bodyEn, step.bodyAr, lang),
                }))}
              />
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page">
      {data.sectionOrder.map(renderSection)}
      <RegisterInterestSection
        sourcePage={SOURCE_PAGE}
        pageTitleEn="Discretionary Portfolio Management"
        pageTitleAr="إدارة المحافظ التقديرية"
      />
    </div>
  );
}
