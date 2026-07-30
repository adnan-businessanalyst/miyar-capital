"use client";

import { PageHero } from "../components/PageHero";
import { RegisterInterest } from "../components/RegisterInterest";

export function PrivateMarketsPage() {
  return (
    <div className="page">

      <PageHero title="Private Markets" crumb="Private Markets" />

      {/* ── 2. Intro + Product Overview ───────────────────────────── */}
      <section className="blk blk--cream">
        <div className="wrap">
          <div className="eq-approach">
            <div className="eq-col">
              <h2>How We Manage Private Markets</h2>
              <p>
                Private Markets extends the platform into illiquid, longer-horizon
                opportunities — built with independent valuation and a defined
                conflicts-of-interest framework, and offered to qualified investors through
                official fund documents.
              </p>
            </div>
            <div className="eq-col">
              <h2>Product Overview</h2>
              <dl className="eq-fact-list">
                <dt>Asset Class</dt>
                <dd>Private Markets (Private Equity, Private Credit, Co-Investment)</dd>

                <dt>Risk Level</dt>
                <dd>High</dd>

                <dt>Liquidity</dt>
                <dd>Illiquid — long-term capital commitment with limited or no redemption</dd>

                <dt>Investor Type</dt>
                <dd>Qualified investors only</dd>

                <dt>Structure</dt>
                <dd>Closed-ended private funds and deal-by-deal vehicles</dd>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Core Capabilities (3 rows) ────────────────────────── */}
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
              aria-label="Illustration representing private equity investment strategy"
            />
            <div className="cap-text">
              <h3>Private Equity</h3>
              <p>
                A sponsor-aligned private equity strategy scheduled to launch in 2026.
                Positions are valued by an independent third party and managed under a
                defined conflicts-of-interest framework.
              </p>
            </div>
          </div>

          {/* Row 2 — image right */}
          <div className="cap-row cap-row--img-right">
            <div
              className="cap-img"
              role="img"
              aria-label="Illustration representing structured private credit financing"
            />
            <div className="cap-text">
              <h3>Private Credit</h3>
              <p>
                Structured private-credit opportunities designed for qualified pools of
                capital. Financing is arranged across negotiated terms, with documentation
                and risk parameters set out in official fund documents.
              </p>
            </div>
          </div>

          {/* Row 3 — image left */}
          <div className="cap-row cap-row--img-left">
            <div
              className="cap-img"
              role="img"
              aria-label="Illustration representing deal-by-deal co-investment"
            />
            <div className="cap-text">
              <h3>Co-Investment</h3>
              <p>
                Selective co-investment opportunities offered alongside the firm on a
                deal-by-deal basis. Participation is evaluated per transaction, allowing
                qualified investors to allocate to specific deals rather than a blind pool.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. Contact CTA ───────────────────────────────────────── */}
      <section className="blk eq-cta">
        <div className="wrap eq-cta-inner">
          <h2>Speak With Our Team</h2>
          <p>
            To learn more about Private Markets and request official fund documents,
            contact our team.
          </p>
          <RegisterInterest
            sourcePage="/private-markets"
            buttonLabel="Contact Us"
            className="btn btn-gold"
          />
        </div>
      </section>

      {/* ── 5. Compliance Disclaimer ─────────────────────────────── */}
      <div className="disclaimer">
        <div className="wrap">
          This page is for informational purposes only and does not constitute an offer,
          solicitation, or recommendation to invest. Private Markets products are available
          to qualified investors only, as defined by applicable regulations, and are offered
          solely through official fund documents. Investments in private markets are
          illiquid, involve a high degree of risk, and may result in loss of capital. Past
          performance is not indicative of future results.
        </div>
      </div>

    </div>
  );
}
