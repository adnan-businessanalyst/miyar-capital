import { useLocation } from "wouter";
import { PageHero } from "../components/PageHero";

export function RealEstatePrivateArrangements() {
  const [, navigate] = useLocation();

  return (
    <div className="page">

      <PageHero
        title="Real Estate & Private Arrangements"
        crumbs={[
          { label: "Investment Banking", href: "/investment-banking" },
          { label: "Real Estate & Private Arrangements" },
        ]}
        badge="INVESTMENT BANKING"
        description="Structuring and arranging real-estate and private-market investment opportunities."
        chips={["Arranging", "Real Estate & Private Markets", "Shariah-Compliant Structures"]}
      />

      {/* ── What We Do ─────────────────────────────────────────────────── */}
      <section className="blk">
        <div className="wrap">
          <div className="ib-split">
            <div>
              <div className="sec-tag">OVERVIEW</div>
              <h2 className="ib-h2">What We Do</h2>
              <div className="ib-lead">
                <p>
                  We structure and arrange investment opportunities in real estate and
                  private markets, connecting opportunities with suitable investors. Our
                  work covers the design of the investment structure, preparation of
                  investment materials and management of the arrangement process.
                </p>
                <p>
                  Each arrangement is structured around the characteristics of the
                  underlying asset or opportunity — its cash flows, holding period and
                  risk profile — and the requirements of the investors participating
                  in it.
                </p>
              </div>
            </div>
            <aside className="ib-facts">
              <h3>Service Overview</h3>
              <ul>
                <li><strong>Focus</strong>Real-estate and private-market arrangements</li>
                <li><strong>Asset Types</strong>Income-generating and development real estate, private-market opportunities</li>
                <li><strong>Clients</strong>Asset owners, developers, sponsors and investors</li>
                <li><strong>Scope</strong>Structuring, documentation coordination, investor arrangement</li>
                <li><strong>Structuring</strong>Shariah-compliant structures available</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Core Capabilities ──────────────────────────────────────────── */}
      <section className="blk blk--cream">
        <div className="wrap">
          <div className="sec-tag">CORE CAPABILITIES</div>
          <h2 className="ib-h2">How We Support Clients</h2>
          <div className="ib-num-grid">
            <div className="ib-num-card">
              <span className="ib-num">01</span>
              <h3>Real-Estate Structuring</h3>
              <p>
                Designing investment structures for income-generating and development
                real estate, including ownership vehicles, cash-flow waterfalls and
                exit mechanics.
              </p>
            </div>
            <div className="ib-num-card">
              <span className="ib-num">02</span>
              <h3>Private-Market Opportunities</h3>
              <p>
                Structuring and arranging participation in private-market opportunities,
                including private equity and asset-backed transactions.
              </p>
            </div>
            <div className="ib-num-card">
              <span className="ib-num">03</span>
              <h3>Investment Materials</h3>
              <p>
                Preparing the analysis and documentation investors require — investment
                memoranda, financial projections and structure summaries.
              </p>
            </div>
            <div className="ib-num-card">
              <span className="ib-num">04</span>
              <h3>Arrangement &amp; Placement</h3>
              <p>
                Managing the arrangement process with qualified and institutional
                investors, from initial engagement through subscription and closing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="blk blk--cream">
        <div className="wrap ib-cta">
          <div className="sec-tag">GET IN TOUCH</div>
          <h2 className="ib-h2">
            Explore a real-estate or private-market arrangement
          </h2>
          <p className="ib-cta-sub">
            From structure design to investor placement, we manage the arrangement
            end to end.
          </p>
          <a
            className="btn btn-gold"
            onClick={() => navigate("/investment-banking/register-interest")}
            style={{ cursor: "pointer" }}
          >
            START A CONVERSATION
          </a>
        </div>
      </section>

      {/* ── Notes & Disclosures ────────────────────────────────────────── */}
      <section className="ib-notes">
        <div className="wrap">
          <h3>Notes &amp; Disclosures</h3>
          <ol>
            <li>This page is for information purposes only and does not constitute an offer, solicitation or investment advice.</li>
            <li>Investment banking services are provided subject to applicable regulatory licensing.</li>
            <li>Transactions involving securities are subject to the regulations of the Capital Market Authority and the Saudi Exchange, where applicable.</li>
            <li>The value of investments may fall as well as rise. Past performance is not indicative of future results.</li>
          </ol>
          <p className="ib-ref">
            Miyar Capital — Investment Banking. This page is for information purposes
            only and does not constitute an offer or solicitation.
          </p>
        </div>
      </section>

    </div>
  );
}
