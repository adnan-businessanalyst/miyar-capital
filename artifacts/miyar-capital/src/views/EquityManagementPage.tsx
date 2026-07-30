"use client";

import { PageHero } from "../components/PageHero";
import { RegisterInterest } from "../components/RegisterInterest";
import { Disclaimer } from "../components/Disclaimer";

export function EquityManagementPage() {
  return (
    <div className="page">

      <PageHero
        title="Equity Management"
        crumb="Equity Management"
        badge="Investment Solutions"
      />

      {/* ── 2. Approach + Product Overview ───────────────────────── */}
      <section className="blk blk--cream">
        <div className="wrap">
          <div className="eq-approach">
            <div className="eq-col">
              <h2>How We Manage Equities</h2>
              <p>
                Our equity management strategies combine rigorous research with disciplined
                portfolio construction to pursue long-term capital growth. We invest across
                local, regional, and global markets, selecting opportunities that align with
                our clients&rsquo; risk appetite and investment horizon.
              </p>
            </div>
            <div className="eq-col">
              <h2>Product Overview</h2>
              <dl className="eq-fact-list">
                <dt>Asset Class</dt>
                <dd>Public Equities</dd>

                <dt>Risk Level</dt>
                <dd>High — subject to market volatility and potential capital loss</dd>

                <dt>Liquidity</dt>
                <dd>High — underlying securities traded on public exchanges</dd>

                <dt>Investor Type</dt>
                <dd>Investors seeking long-term capital growth with higher risk tolerance</dd>

                <dt>Structure</dt>
                <dd>Discretionary managed portfolio / segregated account</dd>
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

          {/* Row 01 — image left */}
          <div className="cap-row cap-row--img-left">
            <div className="cap-img" aria-label="Local Equities" />
            <div className="cap-text">
              <h3>Local Equities</h3>
              <p>
                Dedicated coverage of the Saudi equity market, guided by fundamental company
                research and close monitoring of local market dynamics.
              </p>
            </div>
          </div>

          {/* Row 02 — image right */}
          <div className="cap-row cap-row--img-right">
            <div className="cap-img" aria-label="Regional and Global Equities" />
            <div className="cap-text">
              <h3>Regional &amp; Global Equities</h3>
              <p>
                Diversified exposure to broader regional and international markets, providing
                access to global growth opportunities while enhancing portfolio balance and
                resilience.
              </p>
            </div>
          </div>

          {/* Row 03 — image left */}
          <div className="cap-row cap-row--img-left">
            <div className="cap-img" aria-label="Thematic Strategies" />
            <div className="cap-text">
              <h3>Thematic Strategies</h3>
              <p>
                Focused strategies that invest in long-term structural growth themes — such as
                technology, sustainability, and economic transformation — capturing opportunities
                that transcend individual sectors and geographies.
              </p>
            </div>
          </div>

          {/* Row 04 — image right */}
          <div className="cap-row cap-row--img-right">
            <div className="cap-img" aria-label="Active Portfolio Management" />
            <div className="cap-text">
              <h3>Active Portfolio Management</h3>
              <p>
                Continuous research, monitoring, and disciplined rebalancing to manage risk,
                adapt to changing market conditions, and capture emerging opportunities.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. Call to Action ────────────────────────────────────── */}
      <section className="blk eq-cta">
        <div className="wrap eq-cta-inner">
          <h2>Invest with Discipline and Insight</h2>
          <p>Speak with our team to explore how our equity strategies can support your long-term objectives.</p>
          <RegisterInterest
            sourcePage="/equity-management"
            buttonLabel="Contact Us"
            className="btn btn-gold"
          />
        </div>
      </section>

      {/* ── Disclaimer ───────────────────────────────────────────── */}
      <Disclaimer />

    </div>
  );
}
