import { Building2, Construction, Network, PieChart } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { CONTENT_IMAGES } from "../site/contentImages";

const heroImg = CONTENT_IMAGES.pillar_real_assets;

const DEFAULT_ORDER = ["intro", "offer", "what-we-offer"];

export function RealAssets() {
  const sectionOrder = DEFAULT_ORDER;

  const renderSection = (id: string) => {
    switch (id) {
      case "intro":
        return (
          <PageHero
            key={id}
            title="Tangible assets. Durable returns. Inflation resilience."
            crumbs={[
              { label: "Asset Management", href: "/asset-management" },
              { label: "Real Assets" },
            ]}
          />
        );
      case "offer":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="pi-intro">
                <div className="pi-intro-text">
                  <span className="pi-intro-eyebrow">The Four Pillars</span>
                  <h2>Real Assets</h2>
                  <p>
                    Real assets offer clients access to tangible, income-generating investments
                    that diversify portfolios and provide a hedge against inflation. We source,
                    structure, and manage real estate and other real asset opportunities with a
                    long-term, value-driven approach.
                  </p>
                  <a className="btn btn-outline-navy">Register Interest</a>
                </div>
                <div
                  className="pi-intro-img"
                  style={{ backgroundImage: `url(${heroImg})` }}
                />
              </div>
            </div>
          </section>
        );
      case "what-we-offer":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="sec-head sec-head--center">
                <h2 className="sec-head-navy">What We Offer</h2>
              </div>
              <div className="svc-grid svc-grid--4">
                <div className="svc svc--dark">
                  <div className="si" aria-hidden="true">
                    <Building2 strokeWidth={1.5} />
                  </div>
                  <h4>Income-Generating Real Estate</h4>
                  <p>Access to stabilized properties offering steady, recurring income.</p>
                </div>
                <div className="svc svc--dark">
                  <div className="si" aria-hidden="true">
                    <Construction strokeWidth={1.5} />
                  </div>
                  <h4>Development Opportunities</h4>
                  <p>Selective participation in value-add and development-stage real estate.</p>
                </div>
                <div className="svc svc--dark">
                  <div className="si" aria-hidden="true">
                    <Network strokeWidth={1.5} />
                  </div>
                  <h4>Infrastructure</h4>
                  <p>Exposure to essential infrastructure assets with long-term stability.</p>
                </div>
                <div className="svc svc--dark">
                  <div className="si" aria-hidden="true">
                    <PieChart strokeWidth={1.5} />
                  </div>
                  <h4>Portfolio Diversification</h4>
                  <p>Real assets that reduce correlation with traditional financial markets.</p>
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
