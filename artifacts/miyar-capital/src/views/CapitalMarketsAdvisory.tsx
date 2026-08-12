"use client";

import { PageHero } from "../components/PageHero";
import { RegisterInterestSection } from "../components/RegisterInterestSection";
import { SectionHead } from "../components/SectionHead";

export function CapitalMarketsAdvisory() {

  return (
    <div className="page">

      <PageHero
        title="Capital Markets Advisory"
        crumbs={[
          { label: "Investment Banking", href: "/investment-banking" },
          { label: "Capital Markets Advisory" },
        ]}
        badge="INVESTMENT BANKING"
        description="Advising issuers through public offerings, listings and capital raises on the Saudi capital market."
        chips={["Advisory", "Equity Capital Markets", "Saudi Arabia"]}
      />

      {/* ── What We Do ─────────────────────────────────────────────────── */}
      <section className="blk">
        <div className="wrap">
          <div className="ib-split">
            <div>
              <SectionHead title="OVERVIEW" subtitle="What We Do" />
              <div className="ib-lead">
                <p>
                  We advise companies preparing to access the capital markets, whether
                  through a listing on the Main Market or Nomu, a rights issue, a capital
                  increase or a private placement. Our role covers readiness assessment,
                  transaction structuring, valuation positioning and coordination with
                  advisors and regulators throughout the process.
                </p>
                <p>
                  We work alongside shareholders and management from early preparation
                  through to completion, helping align the transaction structure with the
                  company's objectives and the requirements of the Capital Market Authority
                  and the Saudi Exchange.
                </p>
              </div>
            </div>
            <aside className="ib-facts">
              <h3>Service Overview</h3>
              <ul>
                <li><strong>Focus</strong>Equity capital markets transactions</li>
                <li><strong>Transaction Types</strong>IPOs, Nomu listings, rights issues, capital increases, private placements</li>
                <li><strong>Clients</strong>Companies, founders and shareholders preparing for the capital markets</li>
                <li><strong>Scope</strong>Readiness, structuring, execution coordination</li>
                <li><strong>Market</strong>Saudi Arabia (Main Market and Nomu)</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Core Capabilities ──────────────────────────────────────────── */}
      <section className="blk blk--cream">
        <div className="wrap">
          <SectionHead title="CORE CAPABILITIES" subtitle="How We Support Clients" />
          <div className="ib-num-grid">
            <div className="ib-num-card">
              <span className="ib-num">01</span>
              <h3>IPO &amp; Nomu Readiness</h3>
              <p>
                Assessment of financial, governance and operational readiness for listing,
                with a structured roadmap covering the requirements of the CMA and the
                Saudi Exchange, and coordination of the workstreams needed to reach them.
              </p>
            </div>
            <div className="ib-num-card">
              <span className="ib-num">02</span>
              <h3>Rights Issues &amp; Capital Increases</h3>
              <p>
                Structuring and advising on capital increases for listed and unlisted
                companies, including sizing, pricing considerations, shareholder approvals
                and regulatory filings.
              </p>
            </div>
            <div className="ib-num-card">
              <span className="ib-num">03</span>
              <h3>Private Placements</h3>
              <p>
                Arranging targeted equity raises from institutional and qualified
                investors, covering investor materials, valuation positioning and
                subscription process management.
              </p>
            </div>
            <div className="ib-num-card">
              <span className="ib-num">04</span>
              <h3>Transaction Coordination</h3>
              <p>
                Managing the advisory workstream across legal counsel, auditors, financial
                due-diligence providers and regulators to keep the transaction timeline
                on track.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="blk blk--cream">
        <div className="wrap ib-cta">
          <SectionHead
            title="GET IN TOUCH"
            subtitle="Start a conversation about your capital markets plans"
          />
          <p className="ib-cta-sub">
            Whether you are assessing readiness for a listing or planning a capital raise,
            our team can help you define the path.
          </p>
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

      <RegisterInterestSection
        sourcePage="/investment-banking/capital-markets-advisory"
        pageTitleEn="Capital Markets Advisory"
        pageTitleAr="استشارات أسواق المال"
      />
    </div>
  );
}
