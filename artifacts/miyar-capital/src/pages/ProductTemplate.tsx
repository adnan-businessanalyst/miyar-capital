import { PageHero } from "../components/PageHero";

export function ProductTemplate() {
  return (
    <div className="page">
      <div className="tplnote">
        <b>Reusable product template.</b> Every fund page (Murabaha, Saudi
        Equity, each Real Estate fund) renders from this one layout — only the
        fact-card values, objective text and document set change. This replaces
        ~10 repeated subpage specs with one template + a content matrix.
      </div>

      <PageHero
        title="Miyar Murabaha Fund"
        crumbs={[
          { label: "Asset Management", href: "/asset-management" },
          { label: "Liquidity & FI Solutions" },
        ]}
        meta={[
          { label: "Pillar", value: "Liquidity & FI Solutions" },
          { label: "Objective", value: "Liquidity & Income" },
          { label: "Risk Level", value: "Low" },
        ]}
      />

      <div className="wrap">
        <div className="prod-body">
          <div>
            <h3>Fund Objective</h3>
            <p>
              The fund seeks capital preservation and competitive short-term
              income through Shariah-compliant Murabaha and money-market
              instruments, while maintaining daily liquidity. It is positioned as
              the platform's liquidity anchor for both standalone investors and
              DPM mandates.
            </p>
            <h3>Investment Universe</h3>
            <p>
              Diversified across high-quality Murabaha placements and short-tenor
              money-market instruments with approved counterparties, managed to a
              conservative duration and concentration framework overseen by the
              independent risk function.
            </p>
            <h3>Who It Is For</h3>
            <p>
              Investors prioritising liquidity and stability — corporate
              treasuries, family offices parking capital, and clients seeking a
              lower-volatility allocation within a broader mandate.
            </p>
            <h3>Subscription &amp; Redemption</h3>
            <p>
              Subscription and redemption frequency, cut-off times and minimums
              are set out in the fund's Terms &amp; Conditions. Eligibility is
              subject to client classification and suitability assessment.
            </p>
          </div>
          <div className="fact-card">
            <h4>Fund Facts</h4>
            <div className="frow">
              <span className="fk">Asset Class</span>
              <span className="fv">Money Market</span>
            </div>
            <div className="frow">
              <span className="fk">Risk Level</span>
              <span className="fv">Low</span>
            </div>
            <div className="frow">
              <span className="fk">Liquidity</span>
              <span className="fv">Daily*</span>
            </div>
            <div className="frow">
              <span className="fk">Investor Type</span>
              <span className="fv">Eligible / Public</span>
            </div>
            <div className="frow">
              <span className="fk">Structure</span>
              <span className="fv">Shariah-compliant</span>
            </div>
            <div className="frow">
              <span className="fk">Last Updated</span>
              <span className="fv">Per T&amp;Cs</span>
            </div>
            <span className="dlbtn">Download Factsheet &amp; T&amp;Cs ↓</span>
            <span className="dlbtn dlbtn--ghost">Subscribe / Enquire</span>
          </div>
        </div>
      </div>

      <div className="disclaimer">
        <div className="wrap">
          <b>Important.</b> *Subject to fund Terms &amp; Conditions. Performance,
          NAV and target returns are shown only where approved by Compliance and
          supported by official fund documents. Past performance is not
          indicative of future results; the value of investments may go up or
          down. Nothing on this page constitutes investment advice or an offer of
          securities. Eligibility requires client classification and a
          suitability assessment.
        </div>
      </div>
    </div>
  );
}
