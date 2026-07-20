import { useLocation } from "wouter";
import { useLanguage } from "../i18n/LanguageContext";
import { PageHero } from "../components/PageHero";
import { PillarCarousel } from "../components/PillarCarousel";
import dpmImg from "@assets/generated_images/signing_document.png";
import institutionalImg from "@assets/generated_images/miyar_building.png";

const DEFAULT_ORDER = ["intro", "platform", "client-solutions"];

export function AssetManagement() {
  const [, navigate] = useLocation();
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
              <PillarCarousel onNavigate={navigate} />
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
                  <div
                    className="vert-media"
                    style={{ backgroundImage: `url(${dpmImg})` }}
                  >
                    <span className="vert-media-arrow" aria-hidden="true">
                      →
                    </span>
                  </div>
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
                  <div
                    className="vert-media"
                    style={{ backgroundImage: `url(${institutionalImg})` }}
                  >
                    <span className="vert-media-arrow" aria-hidden="true">
                      →
                    </span>
                  </div>
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
