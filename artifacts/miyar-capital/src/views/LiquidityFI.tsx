"use client";

import { Factsheet } from "../components/Factsheet";
import { PageHero } from "../components/PageHero";
import { RegisterInterest } from "../components/RegisterInterest";
import { RichText } from "../components/RichText";
import { LIQUIDITY_FI } from "../data/liquidityfi";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";

const SOURCE_PAGE = "/asset-management/liquidity-fi";

export function LiquidityFI() {
  const { lang } = useLanguage();
  const data = LIQUIDITY_FI;

  return (
    <div className="page">
      <PageHero
        title={pickLang(data.hero.titleEn, data.hero.titleAr, lang)}
        crumbs={[
          {
            label: pickLang(data.hero.crumbAmEn, data.hero.crumbAmAr, lang),
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

      <div className="wrap">
        <div className="prod-body">
          <div>
            {data.body.map((block) => (
              <div key={block.headingEn}>
                <h3>
                  {pickLang(block.headingEn, block.headingAr, lang)}
                </h3>
                <RichText
                  as="p"
                  html={pickLang(block.bodyEn, block.bodyAr, lang)}
                />
              </div>
            ))}
          </div>
          <Factsheet
            title={pickLang(data.facts.headingEn, data.facts.headingAr, lang)}
            rows={data.facts.rows.map((row) => ({
              label: pickLang(row.labelEn, row.labelAr, lang),
              value: pickLang(row.valueEn, row.valueAr, lang),
            }))}
            primaryCta={pickLang(
              data.facts.primaryCtaEn,
              data.facts.primaryCtaAr,
              lang,
            )}
            secondaryCta={
              <RegisterInterest
                sourcePage={SOURCE_PAGE}
                buttonLabel={pickLang(
                  data.facts.secondaryCtaEn,
                  data.facts.secondaryCtaAr,
                  lang,
                )}
                variant="secondary"
                fullWidth
              />
            }
          />
        </div>
      </div>

      <div className="disclaimer">
        <div className="wrap">
          <b>
            {pickLang(data.disclaimer.leadEn, data.disclaimer.leadAr, lang)}
          </b>{" "}
          <RichText
            as="span"
            html={pickLang(
              data.disclaimer.bodyEn,
              data.disclaimer.bodyAr,
              lang,
            )}
          />
        </div>
      </div>
    </div>
  );
}
