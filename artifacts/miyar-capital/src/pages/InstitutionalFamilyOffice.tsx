import {
  Briefcase,
  Building2,
  KeyRound,
  Landmark,
  Layers,
  MessageSquareText,
  Sprout,
} from "lucide-react";
import { PageHero } from "../components/PageHero";

export function InstitutionalFamilyOffice() {
  return (
    <div className="page">

      <PageHero
        title="Institutional & Family Office"
        crumbs={[
          { label: "Asset Management", href: "/asset-management" },
          { label: "Institutional & Family Office" },
        ]}
        badge="CLIENT SOLUTIONS"
        description="Bespoke mandates built around your governance, objectives, and time horizon."
        chips={[
          { lead: "Client Type:", text: "Institutions · Family Offices · Endowments" },
          { lead: "Mandate:", text: "Segregated / Advisory" },
        ]}
      />

      {/* ── 2. Overview ──────────────────────────────────────────────── */}
      <section className="blk">
        <div className="wrap">
          <div className="sec-tag">CLIENT SOLUTIONS</div>
          <div className="sec-head">
            <h2>Overview</h2>
          </div>
          <p className="ifo-gold-sub">
            Institutional discipline, delivered around your mandate.
          </p>
          <p className="ifo-body">
            Institutions and family offices face a distinct set of demands: fiduciary
            accountability, multi-generational horizons, complex liquidity needs, and
            governance frameworks that leave no room for a one-size-fits-all product.
            Miyar Capital serves these clients through dedicated mandates — portfolios
            designed, managed, and reported against each client's own investment policy,
            not a generic model.
          </p>
          <p className="ifo-body">
            Our institutional platform draws on the full breadth of the firm's four
            pillars — liquidity and fixed income, equities, real assets, and private
            markets — allowing us to construct portfolios that balance capital
            preservation, income, and long-term growth within a Shariah-compliant
            framework.
          </p>

          {/* Who We Serve */}
          <h3 className="ifo-h3">Who We Serve</h3>
          <p className="ifo-h3-sub">
            Dedicated coverage across the institutional spectrum, each with its own
            governance realities and investment objectives.
          </p>

          <div className="svc-grid svc-grid--4">
            <div className="svc">
              <div className="si" aria-hidden="true">
                <Landmark strokeWidth={1.5} />
              </div>
              <h4>Government &amp; Quasi-Government Entities</h4>
              <p>
                Investment programs for public institutions and their affiliates, built
                around statutory requirements, liquidity policies, and conservative risk
                parameters.
              </p>
            </div>
            <div className="svc">
              <div className="si" aria-hidden="true">
                <Briefcase strokeWidth={1.5} />
              </div>
              <h4>Corporates &amp; Treasuries</h4>
              <p>
                Treasury and surplus-cash mandates that prioritize capital preservation
                and predictable returns while keeping funds accessible for operational
                needs.
              </p>
            </div>
            <div className="svc">
              <div className="si" aria-hidden="true">
                <Building2 strokeWidth={1.5} />
              </div>
              <h4>Family Offices &amp; Private Wealth</h4>
              <p>
                Multi-generational portfolios aligned with family governance, succession
                objectives, and values — with the discretion and continuity families
                expect.
              </p>
            </div>
            <div className="svc">
              <div className="si" aria-hidden="true">
                <Sprout strokeWidth={1.5} />
              </div>
              <h4>Endowments, Awqaf &amp; Foundations</h4>
              <p>
                Perpetual-horizon portfolios structured to generate sustainable
                distributions while preserving the real value of the underlying corpus.
              </p>
            </div>
          </div>

          {/* Our Approach */}
          <h3 className="ifo-h3" style={{ marginTop: "64px" }}>Our Approach</h3>
          <p className="ifo-body">
            Every mandate begins with an Investment Policy Statement developed jointly
            with the client — defining objectives, risk tolerance, eligible asset classes,
            liquidity requirements, and benchmarks. From there, our investment committee
            oversees portfolio construction and ongoing management, with clear
            accountability at each step. Clients retain full transparency: segregated
            accounts, independent custody, and reporting tailored to their internal
            governance framework.
          </p>
        </div>
      </section>

      {/* ── 3. How We Work Together ─────────────────────────────────── */}
      <section className="blk blk--cream">
        <div className="wrap">
          <div className="sec-tag">ENGAGEMENT</div>
          <div className="sec-head">
            <h2>How We Work Together</h2>
          </div>
          <p className="ifo-gold-sub">
            Three ways to engage the firm, from full discretion to advisory support.
          </p>

          <div className="svc-grid">
            <div className="svc">
              <div className="si" aria-hidden="true">
                <Layers strokeWidth={1.5} />
              </div>
              <h4>Segregated Mandates</h4>
              <p>
                Fully discretionary portfolios held in the client's own name, managed
                against a bespoke investment policy with institutional-grade oversight.
              </p>
            </div>
            <div className="svc">
              <div className="si" aria-hidden="true">
                <MessageSquareText strokeWidth={1.5} />
              </div>
              <h4>Advisory Services</h4>
              <p>
                Non-discretionary support for clients who retain decision-making
                internally: asset allocation advice, manager selection, and portfolio
                reviews.
              </p>
            </div>
            <div className="svc">
              <div className="si" aria-hidden="true">
                <KeyRound strokeWidth={1.5} />
              </div>
              <h4>Access to Firm Strategies</h4>
              <p>
                Preferential institutional access to Miyar Capital's fund range and
                private-market opportunities, including co-investment alongside the
                firm's own capital.
              </p>
            </div>
          </div>

          {/* Governance & Reporting */}
          <div className="ifo-gov-block">
            <h4>Governance &amp; Reporting</h4>
            <p>
              Institutional clients receive dedicated relationship coverage, quarterly
              investment reviews, and reporting packages built to their specification —
              performance attribution, holdings transparency, and compliance confirmation
              against the agreed policy.
            </p>
          </div>

          <div style={{ marginTop: "40px" }}>
            <a className="btn btn-gold" href="#">
              START A CONVERSATION
            </a>
          </div>
        </div>
      </section>

      {/* ── 4. Notes & Disclosures ──────────────────────────────────── */}
      <section className="blk ifo-notes">
        <div className="wrap">
          <p className="ifo-notes-title">NOTES &amp; DISCLOSURES</p>
          <ol className="ifo-note-list">
            <li>
              <span className="ifo-note-num">01.</span>
              <p>
                Services are available to qualified and institutional investors as defined
                under applicable Capital Market Authority regulations.
              </p>
            </li>
            <li>
              <span className="ifo-note-num">02.</span>
              <p>
                Mandate terms, minimum portfolio sizes, and fee structures are agreed
                individually and documented in the investment management agreement.
              </p>
            </li>
            <li>
              <span className="ifo-note-num">03.</span>
              <p>
                All portfolios are managed in accordance with Shariah guidelines as
                approved by the firm's Shariah advisor.
              </p>
            </li>
            <li>
              <span className="ifo-note-num">04.</span>
              <p>
                Past performance is not a reliable indicator of future results. The value
                of investments may fall as well as rise.
              </p>
            </li>
          </ol>
          <p className="ifo-closing">
            Miyar Capital — Institutional &amp; Family Office. This page is for
            information purposes only and does not constitute an offer or solicitation.
          </p>
        </div>
      </section>

    </div>
  );
}
