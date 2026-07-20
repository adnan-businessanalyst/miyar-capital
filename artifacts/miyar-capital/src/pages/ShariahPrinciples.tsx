import { useEffect } from "react";
import { PageHero } from "../components/PageHero";

const PRINCIPLES = [
  {
    num: "01",
    arabic: "الربا",
    term: "Prohibition of Riba",
    sub: "interest",
    body: "We neither charge nor pay interest. Returns are generated through trade, leasing, and genuine partnership — never through lending money at a predetermined charge.",
  },
  {
    num: "02",
    arabic: "الغرر",
    term: "Avoidance of Gharar",
    sub: "excessive uncertainty",
    body: "All contracts are clear, complete, and transparent. Speculative arrangements with hidden risk or ambiguous terms are excluded from our offerings.",
  },
  {
    num: "03",
    arabic: "الميسر",
    term: "Exclusion of Maysir",
    sub: "gambling",
    body: "We do not engage in games of chance or purely speculative transactions where gain depends on another party's loss.",
  },
  {
    num: "04",
    arabic: "حلال",
    term: "Ethical screening",
    sub: "halal sectors only",
    body: "We do not invest in or finance activities involving alcohol, tobacco, gambling, conventional financial services, or other sectors inconsistent with Islamic values.",
  },
  {
    num: "05",
    arabic: "مشاركة",
    term: "Risk and profit sharing",
    sub: "musharakah & mudarabah",
    body: "Financing is built on genuine partnership: profits and risks are shared fairly between the institution and its clients, aligning our interests with theirs.",
  },
  {
    num: "06",
    arabic: "أصول",
    term: "Asset-backed finance",
    sub: "real economic activity",
    body: "Every transaction is linked to a tangible asset or productive enterprise, connecting finance to the real economy rather than abstract speculation.",
  },
];

export function ShariahPrinciples() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll(".shr-reveal");
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("shr-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("shr-in"); io.unobserve(e.target); }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="page">

      <PageHero
        title="Shariah Principles"
        crumbs={[
          { label: "About", href: "/who-we-are" },
          { label: "Shariah Principles" },
        ]}
        badge="ABOUT MIYAR CAPITAL"
        description="Every product, contract, and investment we offer is structured according to the principles of Islamic law and certified by our independent Shariah Supervisory Board."
        chips={["AAOIFI-compliant", "Independent Shariah Board", "Annually certified"]}
      />

      {/* ── Principles section ───────────────────────────────────────────── */}
      <section className="shr-section">
        {/* Decorative large Arabic backdrop */}
        <div className="shr-backdrop" aria-hidden="true">مبادئ شرعية</div>

        <div className="wrap">
          {/* Section heading */}
          <div className="shr-head shr-reveal">
            <div className="sec-tag">SIX CORE PRINCIPLES</div>
            <h2 className="shr-h2">The framework behind every decision</h2>
            <div className="shr-rule">
              <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 1 L15.2 4.8 L20 4 L19.2 8.8 L23 12 L19.2 15.2 L20 20 L15.2 19.2 L12 23 L8.8 19.2 L4 20 L4.8 15.2 L1 12 L4.8 8.8 L4 4 L8.8 4.8 Z" fill="var(--gold)"/>
              </svg>
            </div>
          </div>

          {/* Principles grid */}
          <div className="shr-grid">
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.num}
                className="shr-card shr-reveal"
                style={{ transitionDelay: `${(i % 2) * 0.1}s` }}
              >
                <span className="shr-num" aria-hidden="true">{p.num}</span>
                <span className="shr-arabic" aria-hidden="true">{p.arabic}</span>
                <div className="shr-term">
                  {p.term}
                  <span>{p.sub}</span>
                </div>
                <p>{p.body}</p>
                <div className="shr-bar" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quranic quote strip ──────────────────────────────────────────── */}
      <section className="shr-verse shr-reveal">
        <div className="wrap">
          <div className="shr-verse-inner">
            <div className="shr-verse-line" />
            <div className="shr-verse-body">
              <p className="shr-verse-ar" lang="ar" dir="rtl">
                وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا
              </p>
              <p className="shr-verse-en">
                "And Allah has permitted trade and forbidden interest."
              </p>
              <p className="shr-verse-ref">— Quran 2:275</p>
            </div>
            <div className="shr-verse-line" />
          </div>
        </div>
      </section>

      {/* ── Shariah Supervisory Board callout ───────────────────────────── */}
      <section className="blk blk--cream">
        <div className="wrap">
          <div className="shr-ssb shr-reveal">
            <div className="shr-ssb-pattern" aria-hidden="true" />
            <div className="shr-ssb-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M24 4 L44 14 L44 28 C44 38 34 44 24 47 C14 44 4 38 4 28 L4 14 Z" stroke="rgba(255,255,255,.3)" strokeWidth="1.5"/>
                <path d="M24 12 L38 19 L38 27 C38 34 31 39 24 41 C17 39 10 34 10 27 L10 19 Z" stroke="rgba(255,255,255,.5)" strokeWidth="1"/>
                <path d="M17 24 L21.5 28.5 L31 19" stroke="rgba(255,255,255,.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="shr-ssb-body">
              <h3>Shariah Supervisory Board</h3>
              <p>
                An independent panel of qualified scholars reviews, approves, and audits all our
                products and operations in accordance with AAOIFI standards. Its annual
                certification is published alongside our financial statements, and any income
                found to be non-compliant is purified through donation to charitable causes.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
