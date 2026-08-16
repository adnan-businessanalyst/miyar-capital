"use client";

import { type ComponentType } from "react";
import {
  Award,
  Compass,
  Eye,
  Flag,
  Handshake,
  ShieldCheck,
  Target,
  type LucideProps,
} from "lucide-react";
import { PageHero } from "../components/PageHero";
import { PrimaryCard, PrimaryCardGrid } from "../components/PrimaryCard";
import { SectionHead } from "../components/SectionHead";
import { useLanguage } from "../i18n/LanguageContext";
import { CONTENT_IMAGES } from "../site/contentImages";
import { pickLang } from "../site/types";
import {
  WHO_WE_ARE,
  type WhoWeAreIconId,
} from "../data/whoweare";

const storyImg = CONTENT_IMAGES.private_offers;

const ICONS: Record<WhoWeAreIconId, ComponentType<LucideProps>> = {
  compass: Compass,
  flag: Flag,
  target: Target,
  award: Award,
  shield: ShieldCheck,
  handshake: Handshake,
  eye: Eye,
};

export function WhoWeAre() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const data = WHO_WE_ARE;

  const renderSection = (id: string) => {
    switch (id) {
      case "hero":
        return (
          <PageHero
            key={id}
            title={pickLang(data.hero.titleEn, data.hero.titleAr, lang)}
            crumb={pickLang(data.hero.crumbEn, data.hero.crumbAr, lang)}
            description={pickLang(
              data.hero.descriptionEn,
              data.hero.descriptionAr,
              lang,
            )}
            animate
          />
        );
      case "story": {
        const paras = isAr ? data.story.parasAr : data.story.parasEn;
        const ledeAr = "معيار";
        const ledeRestAr = paras[0].startsWith(ledeAr)
          ? paras[0].slice(ledeAr.length)
          : paras[0];
        return (
          <section key={id} className="blk">
            <div className="wrap">
              {/* DOM order: copy → facts → image (facts sit under intro). */}
              <div className="ab-two-col wwa-story">
                <div
                  className="wwa-story-copy"
                  lang={isAr ? "ar" : "en"}
                  dir={isAr ? "rtl" : "ltr"}
                >
                  <p className="ab-lede">
                    {isAr ? (
                      <>
                        <span className="ab-lede-em">{ledeAr}</span>
                        {ledeRestAr}
                      </>
                    ) : (
                      <>
                        <span className="ab-drop" aria-hidden="true">
                          <svg
                            className="ab-drop-m"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="120 230 960 740"
                            focusable="false"
                          >
                            {/* Miyar striped M: 9 rounded vertical bars */}
                            <g fill="currentColor">
                              <rect x="120" y="230" width="70" height="740" rx="35" />
                              <rect x="235" y="320" width="70" height="650" rx="35" />
                              <rect x="350" y="400" width="70" height="570" rx="35" />
                              <rect x="465" y="485" width="70" height="485" rx="35" />
                              <rect x="565" y="610" width="70" height="360" rx="35" />
                              <rect x="665" y="485" width="70" height="485" rx="35" />
                              <rect x="780" y="400" width="70" height="570" rx="35" />
                              <rect x="895" y="320" width="70" height="650" rx="35" />
                              <rect x="1010" y="230" width="70" height="740" rx="35" />
                            </g>
                          </svg>
                        </span>
                        {paras[0]}
                      </>
                    )}
                  </p>
                  {paras.slice(1).map((para) => (
                    <p key={para.slice(0, 32)}>{para}</p>
                  ))}
                </div>
                <aside
                  className="wwa-story-facts"
                  lang={isAr ? "ar" : "en"}
                  dir={isAr ? "rtl" : "ltr"}
                >
                  <dl className="ab-facts">
                    {data.story.facts.map((f) => {
                      const label = pickLang(f.labelEn, f.labelAr, lang);
                      return (
                        <div className="ab-fact" key={f.labelEn}>
                          <dt>{label}</dt>
                          <dd>{pickLang(f.valueEn, f.valueAr, lang)}</dd>
                        </div>
                      );
                    })}
                  </dl>
                </aside>
                <div className="wwa-story-img">
                  <img
                    src={storyImg}
                    alt={pickLang(
                      data.story.imageAltEn,
                      data.story.imageAltAr,
                      lang,
                    )}
                  />
                </div>
              </div>
            </div>
          </section>
        );
      }
      case "methodology":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <SectionHead
                center
                title={pickLang(
                  data.methodology.headingEn,
                  data.methodology.headingAr,
                  lang,
                )}
              />
              <div className="method-grid">
                {data.methodology.items.map((item) => {
                  const Icon = ICONS[item.icon];
                  const title = pickLang(item.titleEn, item.titleAr, lang);
                  return (
                    <div className="method" key={item.titleEn}>
                      <div className="mi" aria-hidden="true">
                        <Icon className="mi-icon" strokeWidth={1.6} />
                      </div>
                      <h4>{title}</h4>
                      <p>{pickLang(item.bodyEn, item.bodyAr, lang)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      case "principles":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <SectionHead
                center
                title={pickLang(
                  data.principles.headingEn,
                  data.principles.headingAr,
                  lang,
                )}
                subtitle={pickLang(
                  data.principles.subEn,
                  data.principles.subAr,
                  lang,
                )}
              />
              <PrimaryCardGrid columns={4}>
                {data.principles.items.map((item) => {
                  const Icon = ICONS[item.icon];
                  return (
                    <PrimaryCard
                      key={item.titleEn}
                      icon={<Icon strokeWidth={1.5} />}
                      title={pickLang(item.titleEn, item.titleAr, lang)}
                    >
                      <p>{pickLang(item.bodyEn, item.bodyAr, lang)}</p>
                    </PrimaryCard>
                  );
                })}
              </PrimaryCardGrid>
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
