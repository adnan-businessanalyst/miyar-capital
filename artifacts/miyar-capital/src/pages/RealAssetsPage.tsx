import { useLocation } from "wouter";
import { PageHero } from "../components/PageHero";

export function RealAssetsPage() {
  const [, navigate] = useLocation();

  return (
    <div className="page">

      <PageHero title="Real Assets" crumb="Real Assets" />

      {/* ── 2. Intro + Product Overview ───────────────────────────── */}
      <section className="blk blk--cream">
        <div className="wrap">
          <div className="eq-approach">
            <div className="eq-col">
              <h2>How We Manage Real Assets</h2>
              <p>
                Real assets offer clients access to tangible, income-generating investments
                that diversify portfolios and provide a hedge against inflation. We source,
                structure, and manage real estate and other real asset opportunities with a
                long-term, value-driven approach.
              </p>
            </div>
            <div className="eq-col">
              <h2>Product Overview</h2>
              <dl className="eq-fact-list">
                <dt>Asset Class</dt>
                <dd>Real Assets (Real Estate &amp; Infrastructure)</dd>

                <dt>Risk Level</dt>
                <dd>Moderate to High</dd>

                <dt>Liquidity</dt>
                <dd>Low — long-term holding periods</dd>

                <dt>Investor Type</dt>
                <dd>Qualified / Institutional Investors</dd>

                <dt>Structure</dt>
                <dd>Private funds and direct investment vehicles</dd>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Core Capabilities ─────────────────────────────────── */}
      <section className="blk">
        <div className="wrap">
          <div className="eq-cap-head">
            <h2>Core Capabilities</h2>
          </div>
        </div>

        <div className="cap-rows">

          {/* Row 1 — image left */}
          <div className="cap-row cap-row--img-left">
            <div
              className="cap-img"
              role="img"
              aria-label="Stabilized commercial property generating rental income"
            />
            <div className="cap-text">
              <h3>Income-Generating Real Estate</h3>
              <p>
                Investments in stabilized, income-producing properties across established
                sectors. These assets are selected to deliver steady, recurring cash flow
                supported by existing tenancy and operating history.
              </p>
            </div>
          </div>

          {/* Row 2 — image right */}
          <div className="cap-row cap-row--img-right">
            <div
              className="cap-img"
              role="img"
              aria-label="Real estate development project under construction"
            />
            <div className="cap-text">
              <h3>Development Opportunities</h3>
              <p>
                Selective participation in value-add and development-stage real estate
                projects. Opportunities are assessed on location, project fundamentals, and
                alignment with long-term demand trends.
              </p>
            </div>
          </div>

          {/* Row 3 — image left */}
          <div className="cap-row cap-row--img-left">
            <div
              className="cap-img"
              role="img"
              aria-label="Essential infrastructure assets supporting economic activity"
            />
            <div className="cap-text">
              <h3>Infrastructure</h3>
              <p>
                Exposure to essential infrastructure assets that support core economic
                activity. These investments are characterized by long asset lives, contracted
                or regulated revenue, and long-term stability.
              </p>
            </div>
          </div>

          {/* Row 4 — image right */}
          <div className="cap-row cap-row--img-right">
            <div
              className="cap-img"
              role="img"
              aria-label="Diversified portfolio of real asset holdings"
            />
            <div className="cap-text">
              <h3>Portfolio Diversification</h3>
              <p>
                Allocation to real assets with low correlation to traditional financial
                markets. This positioning helps reduce overall portfolio volatility across
                market cycles.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. Contact CTA ───────────────────────────────────────── */}
      <section className="blk eq-cta">
        <div className="wrap eq-cta-inner">
          <h2>Speak with Our Team</h2>
          <p>To learn more about our real assets offering, contact our team.</p>
          <a
            className="btn btn-gold"
            onClick={() => navigate("/contact")}
            style={{ cursor: "pointer" }}
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* ── 5. Compliance Disclaimer ─────────────────────────────── */}
      <div className="disclaimer">
        <div className="wrap">
          This page is for informational purposes only and does not constitute an offer,
          solicitation, or recommendation to buy or sell any security or investment product.
          Investments in real assets involve risk, including possible loss of capital, and are
          subject to eligibility requirements. Past performance is not indicative of future
          results.
        </div>
      </div>

    </div>
  );
}
