"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "../i18n/LanguageContext";
import { PageHero } from "../components/PageHero";
import { PillarCarousel } from "../components/PillarCarousel";
import { LazyVideo } from "../components/LazyVideo";
import { CONTENT_IMAGES, CONTENT_VIDEOS } from "../site/contentImages";

const dpmImg = CONTENT_IMAGES.client_dpm;
const dpmVideo = CONTENT_VIDEOS.client_dpm;
const institutionalImg = CONTENT_IMAGES.client_ifo;
const institutionalVideo = CONTENT_VIDEOS.client_ifo;

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
        !video && image
          ? { backgroundImage: `url(${image})` }
          : undefined
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

const DEFAULT_ORDER = ["intro", "platform", "client-solutions"];

export function AssetManagement() {
  const router = useRouter();
  const { t } = useLanguage();

  const sectionOrder = DEFAULT_ORDER;

  const renderSection = (id: string) => {
    switch (id) {
      case "intro":
        return (
          <PageHero
            key={id}
            animate
            title={t("am_h")}
            crumb="Asset Management"
            meta={[
              { label: "Clients", value: "Individuals · Family Offices · Institutions" },
              { label: "Vehicles", value: "Public Funds · Private Funds · DPM" },
              { label: "Regulation", value: "CMA — Managing & Operating Funds" },
            ]}
          />
        );
      case "platform":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="plat-split">
                <h2>One integrated platform, not a product shelf.</h2>
                <p>
                  Each pillar carries its own page, documents and process. Allocation
                  is coordinated centrally so that mandates draw on the full platform
                  rather than a single fund.
                </p>
              </div>
              <PillarCarousel onNavigate={(href) => router.push(href)} />
            </div>
          </section>
        );
      case "client-solutions":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="sec-head">
                <div className="sec-tag">Client Solutions</div>
                <h2>Beyond funds.</h2>
              </div>
              <div className="verticals">
                <div className="vert vert--img-left" onClick={() => window.open("https://www.google.com", "_blank")}>
                  <VertMedia
                    image={dpmImg}
                    video={dpmVideo}
                    label="Discretionary Portfolio Management"
                  />
                  <div className="vert-content">
                    <div className="vnum">A</div>
                    <h3 className="vert-h3-hover-ul">Discretionary Portfolio Management</h3>
                    <p>
                      Bespoke mandates built around a written investment policy,
                      liquidity needs and horizon — the firm's primary engine for AUM growth.
                    </p>
                  </div>
                </div>
                <div className="vert vert--img-right" onClick={() => window.open("https://www.google.com", "_blank")}>
                  <div className="vert-content">
                    <div className="vnum">B</div>
                    <h3 className="vert-h3-hover-ul">Institutional &amp; Family Office</h3>
                    <p>
                      Multi-asset solutions, advisory mandates and endowment / waqf
                      structures for sophisticated pools of capital.
                    </p>
                  </div>
                  <VertMedia
                    image={institutionalImg}
                    video={institutionalVideo}
                    label="Institutional and Family Office"
                  />
                </div>
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return <div className="page">{sectionOrder.map((id) => renderSection(id))}</div>;
}
