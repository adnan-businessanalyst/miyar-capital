import { PageHero } from "../components/PageHero";
import { RegisterInterest } from "../components/RegisterInterest";
import { ARRANGEMENT_SERVICES } from "../data/arrangement";
import { CONTENT_IMAGES } from "../site/contentImages";

const buildingImg = CONTENT_IMAGES.app_bg;

const DEFAULT_ORDER = ["hero", "intro", "services", "detail", "interest"];

export function ArrangementManagement() {
  const sectionOrder = DEFAULT_ORDER;

  const scrollToRegister = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  const renderSection = (id: string) => {
    switch (id) {
      case "hero":
        return (
          <PageHero
            key={id}
            title="Arrangement Management"
            crumb="Investment Banking / Arrangement Management"
          />
        );
      case "intro":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="arr-intro">
                <div className="arr-intro-text">
                  <div className="sec-tag">Arrangement &amp; Management</div>
                  <h2>Comprehensive Investment Management</h2>
                  <p>
                    At Miyar Capital, we provide professional arrangement and
                    management services designed to meet the diverse needs of
                    investors and partners. Our approach is grounded in market
                    expertise, disciplined strategy, and full compliance with the
                    Capital Market Authority (CMA) regulations. We focus on
                    structuring investment opportunities that create long-term value
                    while maintaining transparency and integrity at every step.
                  </p>
                  <button className="btn btn-outline-navy" onClick={scrollToRegister}>
                    Register Interest
                  </button>
                </div>
                <div className="arr-intro-img">
                  <img src={buildingImg} alt="mobile app section background image" />
                </div>
              </div>
            </div>
          </section>
        );
      case "services":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="sec-head sec-head--center">
                <h2>Arrangement Management Services</h2>
              </div>
              <div className="arr-services">
                {ARRANGEMENT_SERVICES.map((service) => (
                  <div className="arr-service" key={service.title}>
                    <div className="arr-service-icon" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18M9 21V9" />
                      </svg>
                    </div>
                    <h4>{service.title}</h4>
                    <ul>
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case "detail":
        return (
          <section key={id} className="detail">
            <div className="detail-bg" style={{ backgroundImage: `url(${buildingImg})` }} />
            <div className="wrap">
              <div className="detail-inner">
                <h2>More Detailed Information</h2>
                <div className="detail-cards">
                  <div className="detail-index">
                    <span className="on">01</span>
                    <span>02</span>
                  </div>
                  <div className="detail-card">
                    <h4>Capital Increase through a Rights Offering</h4>
                    <p>
                      Miyar Capital supports companies in increasing capital through
                      a Rights Offering to their existing shareholders, while
                      adhering to the Shariah controls related to such operations.
                    </p>
                  </div>
                  <div className="detail-card detail-card--muted">
                    <h4>Debt Restructuring Solutions</h4>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case "interest":
        return <RegisterInterest key={id} />;
      default:
        return null;
    }
  };

  return <div className="page">{sectionOrder.map((id) => renderSection(id))}</div>;
}
