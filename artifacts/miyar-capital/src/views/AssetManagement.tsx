"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "../i18n/LanguageContext";
import { useLocalePath } from "../i18n/useLocalePath";
import { PageHero } from "../components/PageHero";
import {
  PillarCarousel,
  type PillarCarouselItem,
} from "../components/PillarCarousel";
import { LazyVideo } from "../components/LazyVideo";
import {
  ASSET_MANAGEMENT,
  type AssetManagementMediaId,
  type AssetManagementPillarMediaId,
} from "../data/assetmanagement";
import { CONTENT_IMAGES, CONTENT_VIDEOS } from "../site/contentImages";
import { pickLang } from "../site/types";

const VERT_MEDIA: Record<
  AssetManagementMediaId,
  { image: string; video: string }
> = {
  dpm: {
    image: CONTENT_IMAGES.client_dpm,
    video: CONTENT_VIDEOS.client_dpm,
  },
  ifo: {
    image: CONTENT_IMAGES.client_ifo,
    video: CONTENT_VIDEOS.client_ifo,
  },
};

const PILLAR_MEDIA: Record<
  AssetManagementPillarMediaId,
  { image: string; video: string }
> = {
  liquidity: {
    image: CONTENT_IMAGES.pillar_liquidity,
    video: CONTENT_VIDEOS.pillar_liquidity,
  },
  equity: {
    image: CONTENT_IMAGES.pillar_equity,
    video: CONTENT_VIDEOS.pillar_equity,
  },
  real_assets: {
    image: CONTENT_IMAGES.pillar_real_assets,
    video: CONTENT_VIDEOS.pillar_real_assets,
  },
  private_markets: {
    image: CONTENT_IMAGES.pillar_private_markets,
    video: CONTENT_VIDEOS.pillar_private_markets,
  },
};

function VertMedia({
  image,
  video,
  label,
}: {
  image: string;
  video: string;
  label: string;
}) {
  return (
    <div
      className={`vert-media${video || image ? " has-media" : ""}`}
      style={
        !video && image ? { backgroundImage: `url(${image})` } : undefined
      }
    >
      {video ? (
        <LazyVideo
          className="vert-media-video"
          src={video}
          poster={image || undefined}
          aria-label={label}
        />
      ) : null}
      <span className="vert-media-arrow" aria-hidden="true">
        →
      </span>
    </div>
  );
}

export function AssetManagement() {
  const router = useRouter();
  const { lang } = useLanguage();
  const withLocale = useLocalePath();
  const data = ASSET_MANAGEMENT;

  const pillars: PillarCarouselItem[] = data.platform.pillars.map((p) => {
    const media = PILLAR_MEDIA[p.media];
    return {
      num: p.num,
      title: pickLang(p.titleEn, p.titleAr, lang),
      body: pickLang(p.bodyEn, p.bodyAr, lang),
      href: p.href,
      image: media.image,
      video: media.video,
    };
  });

  const renderSection = (id: (typeof data.sectionOrder)[number]) => {
    switch (id) {
      case "intro":
        return (
          <PageHero
            key={id}
            animate
            title={pickLang(data.hero.titleEn, data.hero.titleAr, lang)}
            crumb={pickLang(data.hero.crumbEn, data.hero.crumbAr, lang)}
            description={pickLang(
              data.hero.descriptionEn,
              data.hero.descriptionAr,
              lang,
            )}
            meta={data.hero.meta.map((m) => ({
              label: pickLang(m.labelEn, m.labelAr, lang),
              value: pickLang(m.valueEn, m.valueAr, lang),
            }))}
          />
        );
      case "platform":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="plat-split">
                <h2>
                  {pickLang(
                    data.platform.headingEn,
                    data.platform.headingAr,
                    lang,
                  )}
                </h2>
                <p>
                  {pickLang(data.platform.bodyEn, data.platform.bodyAr, lang)}
                </p>
              </div>
              <PillarCarousel
                pillars={pillars}
                onNavigate={(href) => router.push(withLocale(href))}
                prevAriaLabel={pickLang(
                  data.platform.prevAriaEn,
                  data.platform.prevAriaAr,
                  lang,
                )}
                nextAriaLabel={pickLang(
                  data.platform.nextAriaEn,
                  data.platform.nextAriaAr,
                  lang,
                )}
                showPillarAriaLabel={pickLang(
                  data.platform.showPillarAriaEn,
                  data.platform.showPillarAriaAr,
                  lang,
                )}
                goToPillarAriaLabel={pickLang(
                  data.platform.goToPillarAriaEn,
                  data.platform.goToPillarAriaAr,
                  lang,
                )}
              />
            </div>
          </section>
        );
      case "objectives":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="sec-head">
                <div className="sec-tag">
                  {pickLang(data.process.tagEn, data.process.tagAr, lang)}
                </div>
                <h2>
                  {pickLang(
                    data.process.headingEn,
                    data.process.headingAr,
                    lang,
                  )}
                </h2>
              </div>
              <div className="steps">
                {data.process.steps.map((step) => {
                  const title = pickLang(step.titleEn, step.titleAr, lang);
                  return (
                    <div className="step" key={step.titleEn}>
                      <h5>{title}</h5>
                      <p>{pickLang(step.bodyEn, step.bodyAr, lang)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      case "client-solutions":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="sec-head">
                <div className="sec-tag">
                  {pickLang(
                    data.clientSolutions.tagEn,
                    data.clientSolutions.tagAr,
                    lang,
                  )}
                </div>
                <h2>
                  {pickLang(
                    data.clientSolutions.headingEn,
                    data.clientSolutions.headingAr,
                    lang,
                  )}
                </h2>
              </div>
              <div className="verticals">
                {data.clientSolutions.items.map((item, index) => {
                  const title = pickLang(item.titleEn, item.titleAr, lang);
                  const mediaLabel = pickLang(
                    item.mediaLabelEn,
                    item.mediaLabelAr,
                    lang,
                  );
                  const media = VERT_MEDIA[item.id];
                  const imgLeft = index % 2 === 0;
                  const mediaEl = (
                    <VertMedia
                      image={media.image}
                      video={media.video}
                      label={mediaLabel}
                    />
                  );
                  const contentEl = (
                    <div className="vert-content">
                      <div className="vnum">{item.num}</div>
                      <h3 className="vert-h3-hover-ul">{title}</h3>
                      <p>{pickLang(item.bodyEn, item.bodyAr, lang)}</p>
                    </div>
                  );
                  return (
                    <div
                      key={item.id}
                      className={`vert ${imgLeft ? "vert--img-left" : "vert--img-right"}`}
                      onClick={() => window.open(item.href, "_blank")}
                    >
                      {imgLeft ? (
                        <>
                          {mediaEl}
                          {contentEl}
                        </>
                      ) : (
                        <>
                          {contentEl}
                          {mediaEl}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
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
    </div>
  );
}
