import { PageHero } from "../components/PageHero";
import { CONTENT_IMAGES } from "../site/contentImages";

const heroImg = CONTENT_IMAGES.pillar_equity;

const DEFAULT_ORDER = ["intro", "offer", "what-we-offer"];

export function EquityManagement() {
  const sectionOrder = DEFAULT_ORDER;

  const renderSection = (id: string) => {
    switch (id) {
      case "intro":
        return (
          <PageHero
            key={id}
            title="Research-led. Conviction-driven. Built for long-term growth."
            crumbs={[
              { label: "Asset Management", href: "/asset-management" },
              { label: "Equity Management" },
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
                  <h2>Equity Management</h2>
                  <p>
                    Our equity management strategies combine rigorous research with disciplined
                    portfolio construction to pursue long-term capital growth. We invest across
                    local, regional, and global markets, selecting opportunities that align with
                    our clients' risk appetite and investment horizon.
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
                  <div className="si">◈</div>
                  <h4>Local Equities</h4>
                  <p>Deep expertise in the Saudi and GCC equity markets.</p>
                </div>
                <div className="svc svc--dark">
                  <div className="si">⊕</div>
                  <h4>Regional &amp; Global Equities</h4>
                  <p>Diversified exposure to broader regional and international markets.</p>
                </div>
                <div className="svc svc--dark">
                  <div className="si">≣</div>
                  <h4>Thematic Strategies</h4>
                  <p>Focused strategies built around long-term structural growth themes.</p>
                </div>
                <div className="svc svc--dark">
                  <div className="si">◆</div>
                  <h4>Active Portfolio Management</h4>
                  <p>Ongoing research and rebalancing to manage risk and capture opportunity.</p>
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
