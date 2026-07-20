import { useLocation } from "wouter";
import { PageHero } from "../components/PageHero";

export function DebtFinancingArrangement() {
  const [, navigate] = useLocation();

  return (
    <div className="page">

      <PageHero
        title="Debt & Financing Arrangement"
        crumbs={[
          { label: "Investment Banking", href: "/investment-banking" },
          { label: "Debt & Financing Arrangement" },
        ]}
        badge="INVESTMENT BANKING"
        description="Arranging and structuring financing across bank debt, Sukuk and private credit."
        chips={["Advisory & Arranging", "Debt Capital", "Shariah-Compliant Structures"]}
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
                  We advise companies on how to finance growth, projects and
                  acquisitions, and we arrange the financing itself. Our work spans
                  defining the financing strategy, structuring Sukuk and private credit
                  instruments, and managing refinancing and restructuring processes.
                </p>
                <p>
                  We act on the client's side of the table — analysing the capital
                  structure, preparing lender or investor materials, running the financing
                  process and negotiating terms with financiers.
                </p>
              </div>
            </div>
            <aside className="ib-facts">
              <h3>Service Overview</h3>
              <ul>
                <li><strong>Focus</strong>Debt advisory and financing arrangement</li>
                <li><strong>Instruments</strong>Bank facilities, Sukuk, private credit</li>
                <li><strong>Situations</strong>New financing, refinancing, restructuring</li>
                <li><strong>Clients</strong>Corporates and project sponsors</li>
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
              <h3>Financing Strategy</h3>
              <p>
                Analysis of the capital structure and funding requirements, with
                recommendations on the mix, tenor and sources of financing suited to
                the company's cash flows and plans.
              </p>
            </div>
            <div className="ib-num-card">
              <span className="ib-num">02</span>
              <h3>Sukuk Structuring &amp; Arrangement</h3>
              <p>
                Structuring Sukuk issuances and coordinating the issuance process,
                including documentation workstreams, Shariah-structure considerations
                and investor engagement.
              </p>
            </div>
            <div className="ib-num-card">
              <span className="ib-num">03</span>
              <h3>Private Credit Arrangement</h3>
              <p>
                Arranging financing from private credit providers and non-bank lenders,
                covering term-sheet negotiation, lender selection and process
                management.
              </p>
            </div>
            <div className="ib-num-card">
              <span className="ib-num">04</span>
              <h3>Refinancing &amp; Restructuring</h3>
              <p>
                Advising on the refinancing of existing facilities and the restructuring
                of debt obligations, including negotiation with existing lenders and
                arrangement of replacement financing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="blk blk--cream">
        <div className="wrap ib-cta">
          <div className="sec-tag">GET IN TOUCH</div>
          <h2 className="ib-h2">Talk to us about your financing requirements</h2>
          <p className="ib-cta-sub">
            We help you define the right financing strategy and arrange it through
            to closing.
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
