/**
 * Direct Murabaha — client-directed liquidity service under Liquidity & Fixed Income.
 *
 * Used by:
 * - app/asset-management/liquidity-fixed-income/direct-murabaha/page.tsx
 */

"use client";

import { PageHero } from "../components/PageHero";
import { PrimaryCard, PrimaryCardGrid } from "../components/PrimaryCard";
import { RegisterInterestSection } from "../components/RegisterInterestSection";
import { RichText } from "../components/RichText";
import { SectionHead } from "../components/SectionHead";
import {
  DIRECT_MURABAHA,
  DIRECT_MURABAHA_PATH,
  type DirectMurabahaSectionId,
} from "../data/directmurabaha";
import { LFI_PAGE_PATH } from "../data/liquidityandfixedincome";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";

export function DirectMurabaha() {
  const { lang } = useLanguage();
  const data = DIRECT_MURABAHA;

  const renderSection = (id: DirectMurabahaSectionId) => {
    switch (id) {
      case "hero":
        return (
          <PageHero
            key={id}
            animate
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
                  data.hero.crumbParentEn,
                  data.hero.crumbParentAr,
                  lang,
                ),
                href: LFI_PAGE_PATH,
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

      case "overview":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.overview.titleEn,
                  data.overview.titleAr,
                  lang,
                )}
              />
              <RichText
                as="p"
                className="sec-sub"
                html={pickLang(data.overview.bodyEn, data.overview.bodyAr, lang)}
              />
            </div>
          </section>
        );

      case "how":
        return (
          <section key={id} className="blk dm-how">
            <div className="wrap">
              <SectionHead
                title={pickLang(data.how.titleEn, data.how.titleAr, lang)}
              />
              <PrimaryCardGrid columns={4} className="dm-how-grid">
                {data.how.steps.map((step) => (
                  <PrimaryCard
                    key={step.titleEn}
                    title={pickLang(step.titleEn, step.titleAr, lang)}
                  >
                    <RichText
                      as="p"
                      html={pickLang(step.bodyEn, step.bodyAr, lang)}
                    />
                  </PrimaryCard>
                ))}
              </PrimaryCardGrid>
            </div>
          </section>
        );

      case "audience":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.audience.titleEn,
                  data.audience.titleAr,
                  lang,
                )}
              />
              <RichText
                as="p"
                className="sec-sub"
                html={pickLang(data.audience.bodyEn, data.audience.bodyAr, lang)}
              />
            </div>
          </section>
        );

      case "pricing":
        return (
          <section key={id} className="dm-pricing-note" aria-label={pickLang(
            data.pricing.titleEn,
            data.pricing.titleAr,
            lang,
          )}>
            <div className="wrap">
              <b>
                <RichText
                  as="span"
                  html={pickLang(
                    data.pricing.titleEn,
                    data.pricing.titleAr,
                    lang,
                  )}
                />
              </b>
              {" "}
              <RichText
                as="span"
                html={pickLang(data.pricing.bodyEn, data.pricing.bodyAr, lang)}
              />
            </div>
          </section>
        );

      case "cta":
        return (
          <RegisterInterestSection
            key={id}
            sourcePage={DIRECT_MURABAHA_PATH}
            pageTitleEn={data.hero.titleEn}
            pageTitleAr={data.hero.titleAr}
            titleEn={data.cta.titleEn}
            titleAr={data.cta.titleAr}
            bodyEn=""
            bodyAr=""
            buttonLabelEn={data.cta.buttonEn}
            buttonLabelAr={data.cta.buttonAr}
            modalTitleEn={data.cta.titleEn}
            modalTitleAr={data.cta.titleAr}
            serviceEnquiry
          />
        );

      case "disclaimer":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.disclaimer.titleEn,
                  data.disclaimer.titleAr,
                  lang,
                )}
              />
              <RichText
                as="p"
                className="sec-sub"
                html={pickLang(
                  data.disclaimer.bodyEn,
                  data.disclaimer.bodyAr,
                  lang,
                )}
              />
            </div>
          </section>
        );

      case "disclosure":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.disclosure.titleEn,
                  data.disclosure.titleAr,
                  lang,
                )}
              />
              <RichText
                as="p"
                className="sec-sub"
                html={pickLang(
                  data.disclosure.bodyEn,
                  data.disclosure.bodyAr,
                  lang,
                )}
              />
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page page--direct-murabaha">
      {data.sectionOrder.map(renderSection)}
    </div>
  );
}
