import { PageHero } from "../components/PageHero";
import { IntroCard } from "../components/IntroCard";
import { RegisterInterest } from "../components/RegisterInterest";
import { DMP_FEATURES, IM_SERVICES, PORTFOLIO_TYPES } from "../data/investmentManagement";
import manOnPhone from "@assets/generated_images/man_on_phone.png";
import signingImg from "@assets/generated_images/signing_document.png";

const DEFAULT_ORDER = ["hero", "intro", "services", "portfolios", "table", "interest"];

export function InvestmentManagement() {
  const sectionOrder = DEFAULT_ORDER;

  const renderSection = (id: string) => {
    switch (id) {
      case "hero":
        return (
          <PageHero
            key={id}
            title="Asset Management"
            crumb="Asset Management / Investment Management"
          />
        );
      case "intro":
        return <IntroCard key={id} image={signingImg} />;
      case "services":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="sec-head sec-head--center">
                <h2>Our Services</h2>
              </div>
              <div className="im-services">
                {IM_SERVICES.map((service) => (
                  <div className="im-service" key={service.title}>
                    <img src={service.img} alt={service.title} />
                    <div className="im-service-overlay">
                      <h3>{service.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case "portfolios":
        return (
          <section key={id} className="dmp">
            <div className="wrap">
              <div className="dmp-head">
                <h2>Managed Portfolios (DMPs)</h2>
                <p>
                  Our dedicated managed portfolios are custom-built around your risk
                  tolerance, financial objectives, and investment horizon. We provide
                  flexible asset-allocation options — from equity and real estate to
                  money-market instruments — with strategies classified as low-risk,
                  high-growth, or diversified for balanced performance.
                </p>
              </div>
              <div className="dmp-features">
                {DMP_FEATURES.map((feature) => (
                  <div className="dmp-feature" key={feature.title}>
                    <div className="dmp-feature-icon" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18M9 21V9" />
                      </svg>
                    </div>
                    <h4>{feature.title}</h4>
                    <p>{feature.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case "table":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="sec-head sec-head--center">
                <h2>Private Investment Portfolio Types</h2>
              </div>
              <div className="ptable-wrap">
                <table className="ptable">
                  <thead>
                    <tr>
                      <th scope="col">Portfolio</th>
                      <th scope="col">Characteristics</th>
                      <th scope="col">Risks</th>
                      <th scope="col">Invested Assets</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PORTFOLIO_TYPES.map((row) => (
                      <tr key={row.portfolio}>
                        <th scope="row">{row.portfolio}</th>
                        <td>{row.characteristics}</td>
                        <td>
                          <span className={`risk risk--${row.risk.toLowerCase()}`}>{row.risk}</span>
                        </td>
                        <td>{row.assets}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        );
      case "interest":
        return <RegisterInterest key={id} image={manOnPhone} />;
      default:
        return null;
    }
  };

  return <div className="page">{sectionOrder.map((id) => renderSection(id))}</div>;
}
