"use client";

import { PageHero } from "../components/PageHero";
import { RegisterInterestSection } from "../components/RegisterInterestSection";
import { RichText } from "../components/RichText";
import { SectionHead } from "../components/SectionHead";
import {
  REAL_ASSETS,
  type RealAssetsListCard,
} from "../data/realassets";
import { useResolvedMedia } from "../hooks/useResolvedMedia";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";

/** Basename under public/media/content/ — any image extension. */
const INTRO_MEDIA_BASENAME = "ra-intro";

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
        pageTitleAr="الأصول الحقيقية"
      />
    </div>
  );
}
