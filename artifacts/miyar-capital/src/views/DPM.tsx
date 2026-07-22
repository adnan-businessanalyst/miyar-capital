"use client";

import { PageHero } from "../components/PageHero";

const DEFAULT_ORDER = ["intro", "mandates", "cycle"];

export function DPM() {
  const sectionOrder = DEFAULT_ORDER;

  const renderSection = (id: string) => {
    switch (id) {
      case "intro":
        return (
          <PageHero
            key={id}
            title="Portfolios managed to your policy — not to a product shelf."
            crumbs={[
              { label: "Asset Management", href: "/asset-management" },
              { label: "Discretionary Portfolio Management" },
            ]}
          />
        );
      case "mandates":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="sec-head">
                <div className="sec-tag">DPM</div>
                <h2>Mandate types.</h2>
                <p>
                  Each mandate begins with a written Investment Policy Statement and a
                  documented suitability assessment before any capital is deployed.
                </p>
              </div>
              <div className="pillars">
                <div className="pillar">
                  <div className="pn" aria-hidden="true">A</div>
                  <h4>Liquidity Management</h4>
                  <p>Cash and money-market mandates for treasuries.</p>
                </div>
                <div className="pillar">
                  <div className="pn" aria-hidden="true">B</div>
                  <h4>Income Portfolios</h4>
                  <p>Fixed-income and yield-oriented mandates.</p>
                </div>
                <div className="pillar">
                  <div className="pn" aria-hidden="true">C</div>
                  <h4>Saudi Equity</h4>
                  <p>Active equity mandates under conviction.</p>
                </div>
                <div className="pillar">
                  <div className="pn" aria-hidden="true">D</div>
                  <h4>Multi-Asset</h4>
                  <p>Diversified across all four pillars.</p>
                </div>
              </div>
            </div>
          </section>
        );
      case "cycle":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="sec-head">
                <div className="sec-tag">The Cycle</div>
                <h2>How a mandate runs.</h2>
              </div>
              <div className="steps">
                <div className="step">
                  <h5>Classify</h5>
                  <p>Client classification &amp; KYC.</p>
                </div>
                <div className="step">
                  <h5>IPS</h5>
                  <p>Written investment policy.</p>
                </div>
                <div className="step">
                  <h5>Deploy</h5>
                  <p>Allocation across pillars.</p>
                </div>
                <div className="step">
                  <h5>Review</h5>
                  <p>Scheduled review cycle.</p>
                </div>
                <div className="step">
                  <h5>Report</h5>
                  <p>Transparent CMA-aligned reporting.</p>
                </div>
              </div>
              <div className="section-cta">
                <a className="btn btn-navy" href="#">Request a Portfolio Consultation</a>
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
