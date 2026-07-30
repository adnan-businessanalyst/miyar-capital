"use client";

import { PageHero } from "../components/PageHero";
import { RegisterInterest } from "../components/RegisterInterest";

export function MergersAcquisitions() {

  return (
    <div className="page">

      <PageHero
        title="Mergers & Acquisitions"
        crumbs={[
          { label: "Investment Banking", href: "/investment-banking" },
          { label: "Mergers & Acquisitions" },
        ]}
        badge="INVESTMENT BANKING"
        description="Advising buyers, sellers and shareholders through acquisitions, mergers, divestments and exits."
        chips={["Advisory", "M&A", "Buy-Side & Sell-Side"]}
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
                  We advise clients across the full transaction cycle — from identifying
                  and evaluating opportunities to negotiating terms and completing the
                  transaction. Our work covers buy-side and sell-side mandates, mergers,
                  divestments of business units and shareholder exits.
                </p>
                <p>
                  Each mandate is structured around the client's strategic objective:
                  acquiring capability or market position, realising value from a sale,
                  or restructuring ownership. We manage the process, the analysis and the
                  coordination with counterparties and advisors.
                </p>
              </div>
            </div>
            <aside className="ib-facts">
              <h3>Service Overview</h3>
              <ul>
                <li><strong>Focus</strong>Mergers, acquisitions and ownership transactions</li>
                <li><strong>Mandate Types</strong>Buy-side, sell-side, mergers, divestments, shareholder exits</li>
                <li><strong>Clients</strong>Corporates, founders, family businesses and shareholders</li>
                <li><strong>Scope</strong>Origination through to completion</li>
                <li><strong>Approach</strong>Structured, confidential process management</li>
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
              <h3>Sell-Side Advisory</h3>
              <p>
                Managing the sale of a company or business unit: preparation of
                transaction materials, buyer identification and outreach, offer
                evaluation, and negotiation through to signing and completion.
              </p>
            </div>
            <div className="ib-num-card">
              <span className="ib-num">02</span>
              <h3>Buy-Side Advisory</h3>
              <p>
                Supporting acquirers with target identification, valuation and financial
                analysis, offer structuring, due-diligence coordination and negotiation
                support.
              </p>
            </div>
            <div className="ib-num-card">
              <span className="ib-num">03</span>
              <h3>Mergers &amp; Divestments</h3>
              <p>
                Advising on business combinations and carve-outs, including
                exchange-ratio analysis, transaction structuring and coordination of
                legal and regulatory workstreams.
              </p>
            </div>
            <div className="ib-num-card">
              <span className="ib-num">04</span>
              <h3>Shareholder Exits</h3>
              <p>
                Structuring full or partial exits for founders and shareholders,
                including secondary sales, staged transactions and
                succession-driven ownership transitions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="blk blk--cream">
        <div className="wrap ib-cta">
          <div className="sec-tag">GET IN TOUCH</div>
          <h2 className="ib-h2">Discuss a transaction with our team</h2>
          <p className="ib-cta-sub">
            From first evaluation to completion, we manage the process on your side
            of the table.
          </p>
          <RegisterInterest
            sourcePage="/investment-banking/mergers-acquisitions"
            buttonLabel="START A CONVERSATION"
            className="btn btn-gold"
          />
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
