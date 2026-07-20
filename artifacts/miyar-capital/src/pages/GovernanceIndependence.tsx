import { useEffect } from "react";
import { PageHero } from "../components/PageHero";

export function GovernanceIndependence() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll(".gov-reveal");
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("gov-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("gov-in"); io.unobserve(e.target); }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="page">

      <PageHero
        title="Governance & Independence"
        crumbs={[
          { label: "About", href: "/who-we-are" },
          { label: "Governance & Independence" },
        ]}
        badge="ABOUT MIYAR CAPITAL"
        description="Strong governance is not a compliance exercise — it is the foundation of trust. Our framework separates ownership, management, and oversight, so that every decision can withstand scrutiny."
      />

      {/* ── Six pillars ─────────────────────────────────────────────────── */}
      <section className="blk">
        <div className="wrap">
          <div className="sec-tag">OUR FRAMEWORK</div>
          <h2 className="ib-h2" style={{ marginBottom: 40 }}>Six pillars of governance</h2>
          <div className="gov-grid">

            <div className="gov-item gov-reveal">
              <div className="gov-medal">
                <svg className="gov-oct" viewBox="0 0 46 46" fill="none" aria-hidden="true">
                  <path d="M23 2 L37 7.5 L44 23 L37 38.5 L23 44 L9 38.5 L2 23 L9 7.5 Z" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
                <svg className="gov-ic" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M5 20 C5 15.5 8 13.5 12 13.5 C16 13.5 19 15.5 19 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Independent oversight</h3>
              <p>A majority-independent Board and fully independent Audit, Risk, and Nomination &amp; Remuneration Committees ensure decisions are made free from conflicts of interest.</p>
            </div>

            <div className="gov-item gov-reveal" style={{ transitionDelay: ".1s" }}>
              <div className="gov-medal">
                <svg className="gov-oct" viewBox="0 0 46 46" fill="none" aria-hidden="true">
                  <path d="M23 2 L37 7.5 L44 23 L37 38.5 L23 44 L9 38.5 L2 23 L9 7.5 Z" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
                <svg className="gov-ic" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12 L10 12 M14 12 L20 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
              </div>
              <h3>Separation of roles</h3>
              <p>The roles of Chairman and Managing Director are held by different individuals, preserving a clear boundary between strategic oversight and day-to-day management.</p>
            </div>

            <div className="gov-item gov-reveal">
              <div className="gov-medal">
                <svg className="gov-oct" viewBox="0 0 46 46" fill="none" aria-hidden="true">
                  <path d="M23 2 L37 7.5 L44 23 L37 38.5 L23 44 L9 38.5 L2 23 L9 7.5 Z" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
                <svg className="gov-ic" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 12 C6 6.5 9 4.5 12 4.5 C15 4.5 18 6.5 21 12 C18 17.5 15 19.5 12 19.5 C9 19.5 6 17.5 3 12 Z" stroke="currentColor" strokeWidth="1.8"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
              </div>
              <h3>Transparency and disclosure</h3>
              <p>We publish audited financial statements, governance reports, and Shariah compliance certifications annually, and maintain open channels with regulators and shareholders.</p>
            </div>

            <div className="gov-item gov-reveal" style={{ transitionDelay: ".1s" }}>
              <div className="gov-medal">
                <svg className="gov-oct" viewBox="0 0 46 46" fill="none" aria-hidden="true">
                  <path d="M23 2 L37 7.5 L44 23 L37 38.5 L23 44 L9 38.5 L2 23 L9 7.5 Z" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
                <svg className="gov-ic" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2.5 L20 6 L20 11 C20 16.5 16.5 20.5 12 22 C7.5 20.5 4 16.5 4 11 L4 6 Z" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M8.5 12 L11 14.5 L15.5 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Risk and internal control</h3>
              <p>A three-lines-of-defence model — business units, independent risk and compliance functions, and internal audit — safeguards the institution and its clients.</p>
            </div>

            <div className="gov-item gov-reveal">
              <div className="gov-medal">
                <svg className="gov-oct" viewBox="0 0 46 46" fill="none" aria-hidden="true">
                  <path d="M23 2 L37 7.5 L44 23 L37 38.5 L23 44 L9 38.5 L2 23 L9 7.5 Z" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
                <svg className="gov-ic" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3 L12 21 M6 7 L18 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M6 7 L3.8 12.5 A3 3 0 0 0 8.2 12.5 Z M18 7 L15.8 12.5 A3 3 0 0 0 20.2 12.5 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                  <path d="M8 21 L16 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Ethics and conduct</h3>
              <p>A Board-approved Code of Conduct governs all employees and directors, covering conflicts of interest, confidentiality, fair dealing, and whistleblower protection.</p>
            </div>

            <div className="gov-item gov-reveal" style={{ transitionDelay: ".1s" }}>
              <div className="gov-medal">
                <svg className="gov-oct" viewBox="0 0 46 46" fill="none" aria-hidden="true">
                  <path d="M23 2 L37 7.5 L44 23 L37 38.5 L23 44 L9 38.5 L2 23 L9 7.5 Z" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
                <svg className="gov-ic" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 20 L4 10 M9.5 20 L9.5 6 M15 20 L15 12 M20.5 20 L20.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M2 20 L22 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Accountability to stakeholders</h3>
              <p>Board performance is evaluated annually, and directors are elected by shareholders through transparent nomination processes aligned with regulatory requirements.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Independence commitment callout ─────────────────────────────── */}
      <section className="blk blk--cream">
        <div className="wrap">
          <div className="gov-note gov-reveal">
            <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="gov-note-icon">
              <path d="M16 2 L27 7 L27 15 C27 23 22 28 16 30 C10 28 5 23 5 15 L5 7 Z" stroke="rgba(255,255,255,.7)" strokeWidth="2"/>
              <path d="M11 16 L14.5 19.5 L21 12.5" stroke="rgba(255,255,255,.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="gov-note-body">
              <h3>Our independence commitment</h3>
              <p>No member of executive management sits on the Audit or Risk Committees, and our Shariah Supervisory Board operates entirely independently of management — its rulings are binding on the institution. We believe that genuine independence, not merely structural independence, is what protects our clients and our integrity over the long term.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Notes ──────────────────────────────────────────────────────── */}
      <section className="ib-notes">
        <div className="wrap">
          <h3>Notes &amp; Disclosures</h3>
          <ol>
            <li>This page is for information purposes only and does not constitute an offer, solicitation or investment advice.</li>
            <li>Governance structures are subject to regulatory requirements of the Capital Market Authority of Saudi Arabia.</li>
          </ol>
          <p className="ib-ref">Miyar Capital — Governance &amp; Independence.</p>
        </div>
      </section>

    </div>
  );
}
