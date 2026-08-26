/**
 * Liquidity and Fixed Income Solutions — pillar overview: hero, strategy, audience, products, notices.
 *
 * Used by:
 * - app/asset-management/liquidity-fixed-income/page.tsx
 */

"use client";

import { PageHero } from "../components/PageHero";
import { PrimaryCardClickableGrid } from "../components/PrimaryCardClickable";
import { RegisterInterestSection } from "../components/RegisterInterestSection";
import { RichText } from "../components/RichText";
import { SectionHead } from "../components/SectionHead";
import {
  LFI_PAGE_PATH,
  LIQUIDITY_AND_FIXED_INCOME,
  type LiquidityFixedIncomeSectionId,
} from "../data/liquidityandfixedincome";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";

function hasCopy(en: string, ar: string, lang: "en" | "ar") {
  return pickLang(en, ar, lang).trim().length > 0;
}

export function LiquidityAndFixedIncome() {
  const { lang } = useLanguage();
  const data = LIQUIDITY_AND_FIXED_INCOME;

  const renderSection = (id: LiquidityFixedIncomeSectionId) => {
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
                  data.hero.crumbPageEn,
                  data.hero.crumbPageAr,
                  lang,
                ),
              },
            ]}
            description={pickLang(
              data.hero.descriptionEn,
              data.hero.descriptionAr,
              lang,
            )}
            meta={data.hero.meta.map((item) => ({
              label: pickLang(item.labelEn, item.labelAr, lang),
              value: pickLang(item.valueEn, item.valueAr, lang),
            }))}
          />
        );

      case "strategy":
        if (!hasCopy(data.strategy.titleEn, data.strategy.titleAr, lang)) {
          return null;
        }
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.strategy.titleEn,
                  data.strategy.titleAr,
                  lang,
                )}
              />
              <RichText
                as="p"
                className="sec-sub"
                html={pickLang(data.strategy.bodyEn, data.strategy.bodyAr, lang)}
              />
            </div>
          </section>
        );

      case "audience":
        if (!hasCopy(data.audience.titleEn, data.audience.titleAr, lang)) {
          return null;
        }
        return (
          <section key={id} className="blk blk--cream">
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

      case "products": {
        if (!hasCopy(data.products.titleEn, data.products.titleAr, lang)) {
          return null;
        }
        const items = data.products.items
          .map((item) => ({
            id: item.id,
            title: pickLang(item.titleEn, item.titleAr, lang),
            body: pickLang(item.bodyEn, item.bodyAr, lang),
            href: item.href,
            ctaLabel: pickLang(item.ctaEn, item.ctaAr, lang),
          }))
          .filter((item) => item.title.trim() || item.body.trim());
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.products.titleEn,
                  data.products.titleAr,
                  lang,
                )}
              />
              <PrimaryCardClickableGrid
                columns={3}
                className="lfi-products-grid"
                items={items}
              />
            </div>
          </section>
        );
      }

      case "disclaimer":
        if (!hasCopy(data.disclaimer.titleEn, data.disclaimer.titleAr, lang)) {
          return null;
        }
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

      case "regulatory":
        if (!hasCopy(data.regulatory.titleEn, data.regulatory.titleAr, lang)) {
          return null;
        }
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.regulatory.titleEn,
                  data.regulatory.titleAr,
                  lang,
                )}
              />
              <RichText
                as="p"
                className="sec-sub"
                html={pickLang(
                  data.regulatory.bodyEn,
                  data.regulatory.bodyAr,
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
    <div className="page page--lfi">
      {data.sectionOrder.map(renderSection)}
      <RegisterInterestSection
        sourcePage={LFI_PAGE_PATH}
        pageTitleEn={data.hero.titleEn}
        pageTitleAr={data.hero.titleAr}
      />
    </div>
  );
}
