"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "../i18n/LanguageContext";
import { useLocalePath } from "../i18n/useLocalePath";
import { PageHero } from "../components/PageHero";
import {
  PillarCarousel,
  type PillarCarouselItem,
} from "../components/PillarCarousel";
import { PrimaryCardClickableGrid } from "../components/PrimaryCardClickable";
import { RegisterInterestSection } from "../components/RegisterInterestSection";
import { SectionHead } from "../components/SectionHead";
import { Steps } from "../components/Steps";
import { ASSET_MANAGEMENT } from "../data/assetmanagement";
import {
  CONTENT_IMAGES,
  DETAILS_PG_IMAGE,
} from "../site/contentImages";
import { pickLang } from "../site/types";
import { RichText } from "../components/RichText";

export function AssetManagement() {
  const router = useRouter();
  const { lang } = useLanguage();
  const withLocale = useLocalePath();
  const data = ASSET_MANAGEMENT;
  const processFront =
    CONTENT_IMAGES.service_asset_management || CONTENT_IMAGES.app_bg;
  const processBack = DETAILS_PG_IMAGE || processFront;

  const pillars: PillarCarouselItem[] = data.platform.pillars.map((p) => ({
    num: p.num,
    title: pickLang(p.titleEn, p.titleAr, lang),
    body: pickLang(p.bodyEn, p.bodyAr, lang),
    href: p.href,
  }));

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
                <h2 className="sec-title">
                  <RichText
                    html={pickLang(
                      data.platform.headingEn,
                      data.platform.headingAr,
                      lang,
                    )}
                  />
                </h2>
                <RichText
                  as="p"
                  className="sec-sub"
                  html={pickLang(
                    data.platform.bodyEn,
                    data.platform.bodyAr,
                    lang,
                  )}
                />
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
      case "objectives": {
        const title = pickLang(data.process.tagEn, data.process.tagAr, lang);
        const subtitle = pickLang(
          data.process.headingEn,
          data.process.headingAr,
          lang,
        );
        return (
          <section key={id} className="blk blk--cream am-process">
            <div className="wrap">
              <div className="am-process-layout">
                <aside className="am-process-aside">
                  <SectionHead title={title} subtitle={subtitle} />
                  <figure className="arr-services-media am-process-media">
                    <img
                      className="arr-services-media-back"
                      src={processBack}
                      alt=""
                      aria-hidden="true"
                    />
                    <div className="arr-services-media-frame">
                      <img
                        src={processFront}
                        alt={pickLang(
                          "Asset management investment process",
                          "عملية الاستثمار في إدارة الأصول",
                          lang,
                        )}
                      />
                    </div>
                  </figure>
                </aside>
                <div className="am-process-cards">
                  <Steps
                    className="am-process-steps"
                    items={data.process.steps.map((step) => ({
                      title: pickLang(step.titleEn, step.titleAr, lang),
                      body: pickLang(step.bodyEn, step.bodyAr, lang),
                    }))}
                  />
                </div>
              </div>
            </div>
          </section>
        );
      }
      case "client-solutions":
        return (
          <section key={id} className="blk am-client-solutions">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.clientSolutions.tagEn,
                  data.clientSolutions.tagAr,
                  lang,
                )}
                subtitle={pickLang(
                  data.clientSolutions.headingEn,
                  data.clientSolutions.headingAr,
                  lang,
                )}
              />
              <PrimaryCardClickableGrid
                items={data.clientSolutions.items.map((item) => ({
                  id: item.id,
                  badge: item.num,
                  title: pickLang(item.titleEn, item.titleAr, lang),
                  body: pickLang(item.bodyEn, item.bodyAr, lang),
                  href: item.href,
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
      {data.sectionOrder.map((id) => renderSection(id))}
      <RegisterInterestSection
        sourcePage="/asset-management"
        pageTitleEn="Asset Management"
        pageTitleAr="إدارة الأصول"
      />
    </div>
  );
}
