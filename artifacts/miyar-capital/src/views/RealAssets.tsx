"use client";

import { PageHero } from "../components/PageHero";
import { RegisterInterestSection } from "../components/RegisterInterestSection";
import { RichText } from "../components/RichText";
import { ScrollExamples } from "../components/ScrollExamples";
import { SectionHead } from "../components/SectionHead";
import {
  REAL_ASSETS,
  type RealAssetsListCard,
} from "../data/realassets";
import { useResolvedMedia } from "../hooks/useResolvedMedia";
import { useLanguage } from "../i18n/LanguageContext";
import { CONTENT_IMAGES } from "../site/contentImages";
import { pickLang } from "../site/types";

/** Basename under public/media/content/ — any image extension. */
const INTRO_MEDIA_BASENAME = "ra-intro";

const PROJECT_CARD_IMAGES = [
  CONTENT_IMAGES.ra_1,
  CONTENT_IMAGES.ra_2,
  CONTENT_IMAGES.ra_3,
  CONTENT_IMAGES.ra_4,
] as const;

const LIST_CARD_BASENAME: Record<RealAssetsListCard["media"], string> = {
  architecture: "ra-diversity",
  geo: "ra-geo-network",
};

function RealAssetsListCardView({ card }: { card: RealAssetsListCard }) {
  const { lang } = useLanguage();
  const media = useResolvedMedia("content", LIST_CARD_BASENAME[card.media]);

  return (
    <article className="ra-premium-card">
      <div
        className={`ra-premium-card-media ra-premium-card-media--${card.media}`}
        style={media ? { backgroundImage: `url(${media})` } : undefined}
      >
        <div className="ra-premium-card-media-overlay" aria-hidden="true" />
        <h3 className="ra-premium-card-title">
          {pickLang(card.titleEn, card.titleAr, lang)}
        </h3>
      </div>
      <ul className="ra-premium-card-list">
        {card.items.map((item) => (
          <li key={item.labelEn}>
            <span className="ra-premium-card-marker" aria-hidden="true" />
            <span className="ra-premium-card-label">
              {pickLang(item.labelEn, item.labelAr, lang)}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function RealAssets() {
  const { lang } = useLanguage();
  const data = REAL_ASSETS;
  const introImg = useResolvedMedia("content", INTRO_MEDIA_BASENAME);

  const renderListCard = (card: RealAssetsListCard) => (
    <RealAssetsListCardView key={card.titleEn} card={card} />
  );

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
            meta={data.hero.meta.map((m) => ({
              label: pickLang(m.labelEn, m.labelAr, lang),
              value: pickLang(m.valueEn, m.valueAr, lang),
            }))}
          />
        );
      case "offer":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="pi-intro">
                <div className="pi-intro-text">
                  <SectionHead
                    title={pickLang(
                      data.intro.eyebrowEn,
                      data.intro.eyebrowAr,
                      lang,
                    )}
                    subtitle={pickLang(
                      data.intro.headingEn,
                      data.intro.headingAr,
                      lang,
                    )}
                  />
                  <RichText
                    as="div"
                    className="eq-rich"
                    html={pickLang(data.intro.bodyEn, data.intro.bodyAr, lang)}
                  />
                </div>
                <div
                  className="pi-intro-img"
                  style={
                    introImg
                      ? { backgroundImage: `url(${introImg})` }
                      : undefined
                  }
                />
              </div>
            </div>
          </section>
        );
      case "diversification":
        return (
          <section key={id} className="blk ra-premium-section">
            <div className="wrap ra-premium-cards">
              {renderListCard(data.geography)}
              {renderListCard(data.diversification)}
            </div>
          </section>
        );
      case "projects": {
        const labels = data.projects.labels;
        const scrollItems = data.projects.items.map((item, index) => ({
          title: pickLang(item.titleEn, item.titleAr, lang),
          body: pickLang(item.bodyEn, item.bodyAr, lang),
          href: `/funds-reports/${item.slug}/reports`,
          image: PROJECT_CARD_IMAGES[index],
          meta: [
            {
              label: pickLang(labels.fundCurrencyEn, labels.fundCurrencyAr, lang),
              value: pickLang(item.fundCurrencyEn, item.fundCurrencyAr, lang),
            },
            {
              label: pickLang(labels.assetTypeEn, labels.assetTypeAr, lang),
              value: pickLang(item.assetTypeEn, item.assetTypeAr, lang),
            },
            {
              label: pickLang(labels.fundSizeEn, labels.fundSizeAr, lang),
              value: pickLang(item.fundSizeEn, item.fundSizeAr, lang),
              wrapLabel: lang === "ar",
            },
            {
              label: pickLang(labels.fundStartDateEn, labels.fundStartDateAr, lang),
              value: pickLang(item.fundStartDateEn, item.fundStartDateAr, lang),
              wrapLabel: lang === "ar",
            },
            {
              label: pickLang(labels.fundLifeEn, labels.fundLifeAr, lang),
              value: pickLang(item.fundLifeEn, item.fundLifeAr, lang),
            },
            {
              label: pickLang(
                labels.investmentStrategyEn,
                labels.investmentStrategyAr,
                lang,
              ),
              value: pickLang(
                item.investmentStrategyEn,
                item.investmentStrategyAr,
                lang,
              ),
              wrapLabel: lang === "ar",
            },
            {
              label: pickLang(labels.fundManagerEn, labels.fundManagerAr, lang),
              value: pickLang(item.fundManagerEn, item.fundManagerAr, lang),
            },
            {
              label: pickLang(labels.developerEn, labels.developerAr, lang),
              value: pickLang(item.developerEn, item.developerAr, lang),
            },
            {
              label: pickLang(labels.auditorEn, labels.auditorAr, lang),
              value: pickLang(item.auditorEn, item.auditorAr, lang),
            },
            {
              label: pickLang(labels.fundStatusEn, labels.fundStatusAr, lang),
              value: pickLang(item.fundStatusEn, item.fundStatusAr, lang),
            },
            {
              label: pickLang(
                labels.fundGeographyEn,
                labels.fundGeographyAr,
                lang,
              ),
              value: pickLang(item.fundGeographyEn, item.fundGeographyAr, lang),
            },
            {
              label: pickLang(
                labels.investmentGoalEn,
                labels.investmentGoalAr,
                lang,
              ),
              value: pickLang(
                item.investmentGoalEn,
                item.investmentGoalAr,
                lang,
              ),
              stacked: true,
            },
          ],
        }));
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <SectionHead
                center
                title={pickLang(
                  data.projects.headingEn,
                  data.projects.headingAr,
                  lang,
                )}
                subtitle={pickLang(
                  data.projects.introEn,
                  data.projects.introAr,
                  lang,
                )}
              />
              <ScrollExamples
                items={scrollItems}
                ariaLabel={pickLang(
                  data.projects.headingEn,
                  data.projects.headingAr,
                  lang,
                )}
              />
            </div>
          </section>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="page">
      {data.sectionOrder.map((id) => renderSection(id))}
      <RegisterInterestSection
        sourcePage="/asset-management/real-assets"
        pageTitleEn="Real Assets"
        pageTitleAr="الأصول العقارية"
      />
    </div>
  );
}
