"use client";

import { PageHero } from "../components/PageHero";
import { RegisterInterestSection } from "../components/RegisterInterestSection";
import { SectionHead } from "../components/SectionHead";

export function ValuationFinancialAdvisory() {

  return (
    <div className="page">

      <PageHero
        title="Valuation & Financial Advisory"
        crumbs={[
          { label: "Investment Banking", href: "/investment-banking" },
          { label: "Valuation & Financial Advisory" },
        ]}
        badge="INVESTMENT BANKING"
        description="Independent valuation, feasibility, modelling and due-diligence support."
        chips={["Advisory", "Valuation & Analysis", "Decision-Ready Output"]}
      />

      {/* ── What We Do ─────────────────────────────────────────────────── */}
      <section className="blk">
        <div className="wrap">
          <div className="ib-split">
            <div>
              <SectionHead title="OVERVIEW" subtitle="What We Do" />
              <div className="ib-lead">
                <p>
                  We provide valuation and financial analysis for transactions, regulatory
                  requirements and internal decision-making. Our work covers business and
                  asset valuations, feasibility studies, financial modelling and support
                  through due-diligence processes.
                </p>
                <p>
                  Deliverables are built to a defined purpose — a transaction, a capital
                  raise, a board decision or a regulatory submission — with methodology
                  and assumptions documented clearly.
                </p>
              </div>
            </div>
            <aside className="ib-facts">
              <h3>Service Overview</h3>
              <ul>
                <li><strong>Focus</strong>Valuation and financial analysis</li>
                <li><strong>Deliverables</strong>Valuation reports, feasibility studies, financial models, due-diligence support</li>
                <li><strong>Use Cases</strong>Transactions, financing, regulatory and reporting requirements, internal decisions</li>
                <li><strong>Methodologies</strong>Income, market and asset-based approaches</li>
                <li><strong>Output</strong>Documented, decision-ready analysis</li>
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
              <h3>Business &amp; Asset Valuation</h3>
              <p>
                Valuation of companies, business units and assets using income, market
                and asset-based approaches, for transactions, financial reporting and
                regulatory purposes.
              </p>
            </div>
            <div className="ib-num-card">
              <span className="ib-num">02</span>
              <h3>Feasibility Studies</h3>
              <p>
                Assessment of the commercial and financial viability of new projects
                and expansions, including market analysis, cost and revenue assumptions
                and sensitivity testing.
              </p>
            </div>
            <div className="ib-num-card">
              <span className="ib-num">03</span>
              <h3>Financial Modelling</h3>
              <p>
                Building and reviewing financial models for transactions, financing
                processes and business planning, structured for scenario analysis and
                ongoing use.
              </p>
            </div>
            <div className="ib-num-card">
              <span className="ib-num">04</span>
              <h3>Due-Diligence Support</h3>
              <p>
                Financial analysis in support of due-diligence processes on the buy-side
                or sell-side, including data-room preparation, findings analysis and
                reporting.
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
            subtitle="Request a valuation or advisory engagement"
          />
          <p className="ib-cta-sub">
            Independent, documented analysis built for the decision in front of you.
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
        sourcePage="/investment-banking/valuation-financial-advisory"
        pageTitleEn="Valuation & Financial Advisory"
        pageTitleAr="التقييم والاستشارات المالية"
      />
    </div>
  );
}
