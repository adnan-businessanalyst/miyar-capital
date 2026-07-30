"use client";

import { useRouter } from "next/navigation";
import { PageHero } from "../components/PageHero";
import { RegisterInterest } from "../components/RegisterInterest";

export function InvestmentBanking() {
  const router = useRouter();

  return (
    <div className="page">

      <PageHero
        animate
        title="Investment Banking"
        crumb="Investment Banking"
        badge="INVESTMENT BANKING"
        description="Advisory and arrangement services across capital markets, transactions and financing."
        chips={["Advising", "Arranging", "Saudi Arabia"]}
      />

      {/* ── 2. What We Do ─────────────────────────────────────────────── */}
      <section className="blk">
        <div className="wrap">
          <div className="sec-tag">OVERVIEW</div>
          <h2 className="ib-h2">What We Do</h2>
          <div className="ib-lead">
            <p>
              Our Investment Banking division advises companies, founders and shareholders
              on the decisions that shape their capital structure and ownership — raising
              equity, accessing the debt markets, buying or selling businesses, and
              structuring investment opportunities.
            </p>
            <p>
              We operate under two regulated activities: <strong>advising</strong>, where
              we provide analysis and recommendations on securities and transactions, and{" "}
              <strong>arranging</strong>, where we manage and execute the process of
              bringing a transaction to completion. Every engagement is built around a
              defined objective, a structured process and clear deliverables.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. How We Advise ─────────────────────────────────────────── */}
      <section className="blk blk--cream">
        <div className="wrap">
          <div className="sec-tag">INVESTMENT ADVISORY</div>
          <h2 className="ib-h2">How We Advise</h2>
          <div className="ib-lead">
            <p>
              We advise clients on transactions involving securities and corporate
              ownership: capital raises, listings, mergers and acquisitions, financings
              and valuations. Advisory work includes analysis of the company's position,
              evaluation of the available options, and a recommendation on structure,
              timing and terms — supported by documented financial analysis.
            </p>
            <p>Advisory mandates take two forms:</p>
          </div>
          <div className="ib-adv-grid">
            <div className="ib-adv-card">
              <h3>Standalone Advisory</h3>
              <p>
                A defined deliverable in its own right — an independent valuation, a
                feasibility study, a listing-readiness assessment or a
                capital-structure review.
              </p>
            </div>
            <div className="ib-adv-card">
              <h3>Transaction Advisory</h3>
              <p>
                The first phase of a transaction we go on to arrange — the analysis
                and recommendation that shape the structure before execution begins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. A Consistent Method ───────────────────────────────────── */}
      <section className="blk">
        <div className="wrap">
          <div className="sec-tag">INVESTMENT ADVISORY APPROACH</div>
          <h2 className="ib-h2">A Consistent Method</h2>
          <div className="ib-num-grid">
            <div className="ib-num-card">
              <span className="ib-num">01</span>
              <h3>Understand the Objective</h3>
              <p>
                Every engagement begins with the client's goal — a sale, a raise, a listing,
                a financing — and the constraints around it: timeline, ownership
                preferences, regulatory position.
              </p>
            </div>
            <div className="ib-num-card">
              <span className="ib-num">02</span>
              <h3>Analyse the Position</h3>
              <p>
                We build the financial picture: valuation, capital structure, cash flows
                and readiness, using documented assumptions and recognised methodologies.
              </p>
            </div>
            <div className="ib-num-card">
              <span className="ib-num">03</span>
              <h3>Evaluate the Options</h3>
              <p>
                We set out the realistic paths available, with the trade-offs of each —
                structure, pricing, timing, execution risk — so the decision is made on a
                complete picture.
              </p>
            </div>
            <div className="ib-num-card">
              <span className="ib-num">04</span>
              <h3>Recommend and Plan</h3>
              <p>
                We deliver a clear recommendation and an execution roadmap: workstreams,
                advisors required, regulatory steps and timeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Executing the Transaction ─────────────────────────────── */}
      <section className="blk blk--cream">
        <div className="wrap">
          <div className="sec-tag">ARRANGEMENT &amp; MANAGEMENT</div>
          <h2 className="ib-h2">Executing the Transaction</h2>
          <div className="ib-lead">
            <p>
              When a client proceeds to a transaction, we arrange and manage it through
              to completion. This covers preparing transaction materials, identifying and
              engaging counterparties or investors, coordinating legal, audit and
              due-diligence workstreams, managing regulatory filings and negotiating terms
              — acting throughout on the client's side of the transaction.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. Five Service Lines ────────────────────────────────────── */}
      <section className="blk">
        <div className="wrap">
          <div className="sec-tag">OUR PRODUCTS</div>
          <h2 className="ib-h2">Five Service Lines</h2>
          <div className="ib-products-grid">
            <div
              className="ib-product-card"
              onClick={() => router.push("/investment-banking/capital-markets-advisory")}
            >
              <h3>Capital Markets Advisory</h3>
              <p>
                IPO and Nomu readiness, rights issues, capital increases and private
                placements.
              </p>
              <span className="ib-more">View service →</span>
            </div>
            <div
              className="ib-product-card"
              onClick={() => router.push("/investment-banking/mergers-acquisitions")}
            >
              <h3>Mergers &amp; Acquisitions</h3>
              <p>Buy-side, sell-side, mergers, divestments and shareholder exits.</p>
              <span className="ib-more">View service →</span>
            </div>
            <div
              className="ib-product-card"
              onClick={() => router.push("/investment-banking/debt-financing-arrangement")}
            >
              <h3>Debt &amp; Financing Arrangement</h3>
              <p>
                Financing strategy, Sukuk and private credit structuring, refinancing and
                restructuring.
              </p>
              <span className="ib-more">View service →</span>
            </div>
            <div
              className="ib-product-card"
              onClick={() => router.push("/investment-banking/valuation-financial-advisory")}
            >
              <h3>Valuation &amp; Financial Advisory</h3>
              <p>Valuation, feasibility, modelling and due-diligence support.</p>
              <span className="ib-more">View service →</span>
            </div>
            <div
              className="ib-product-card"
              onClick={() => router.push("/investment-banking/real-estate-private-arrangements")}
            >
              <h3>Real Estate &amp; Private Arrangements</h3>
              <p>
                Structuring and arranging real-estate and private-market opportunities.
              </p>
              <span className="ib-more">View service →</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Transaction Lifecycle ─────────────────────────────────── */}
      <section className="blk blk--cream">
        <div className="wrap">
          <div className="sec-tag">TRANSACTION LIFECYCLE</div>
          <h2 className="ib-h2">From First Discussion to Completion</h2>
          <div className="ib-timeline">
            <div className="ib-step">
              <div className="ib-step-dot">01</div>
              <h3>Engage</h3>
              <p>Initial discussion, objective definition and engagement scope.</p>
            </div>
            <div className="ib-step">
              <div className="ib-step-dot">02</div>
              <h3>Assess</h3>
              <p>Financial analysis, valuation and readiness review.</p>
            </div>
            <div className="ib-step">
              <div className="ib-step-dot">03</div>
              <h3>Structure</h3>
              <p>Transaction design: instrument, terms, participants and regulatory pathway.</p>
            </div>
            <div className="ib-step">
              <div className="ib-step-dot">04</div>
              <h3>Prepare</h3>
              <p>Transaction materials, due-diligence coordination and regulatory filings.</p>
            </div>
            <div className="ib-step">
              <div className="ib-step-dot">05</div>
              <h3>Execute</h3>
              <p>Counterparty or investor engagement, negotiation and subscription or signing.</p>
            </div>
            <div className="ib-step">
              <div className="ib-step-dot">06</div>
              <h3>Complete</h3>
              <p>Closing, settlement and post-completion support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. CTA ───────────────────────────────────────────────────── */}
      <section className="blk">
        <div className="wrap ib-cta">
          <div className="sec-tag">GET IN TOUCH</div>
          <h2 className="ib-h2">Start a conversation with our Investment Banking team</h2>
          <p className="ib-cta-sub">
            Tell us your objective — a raise, a sale, a listing or a financing — and we
            will help you define the path.
          </p>
          <RegisterInterest
            sourcePage="/investment-banking"
            buttonLabel="START A CONVERSATION"
            className="btn btn-gold"
          />
        </div>
      </section>

      {/* ── 9. Notes & Disclosures ───────────────────────────────────── */}
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
