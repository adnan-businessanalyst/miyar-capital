import { useEffect } from "react";
import { PageHero } from "../components/PageHero";

const FACTS = [
  { label: "Founded",                  value: "2008" },
  { label: "Headquarters",             value: "Makkah, Saudi Arabia" },
  { label: "Regulated by",             value: "Saudi Central Bank" },
  { label: "Compliance standard",      value: "AAOIFI" },
  { label: "Clients served",           value: "120,000+" },
  { label: "Assets under management",  value: "SAR 8.4 billion" },
];

const VALUES = [
  {
    title: "Integrity",
    body: "We act with honesty and consistency, holding every transaction to the same exacting standard that our name demands.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M20 3 L33 9 L33 19 C33 28 27.5 34.5 20 37 C12.5 34.5 7 28 7 19 L7 9 Z" stroke="var(--navy)" strokeWidth="2"/>
        <path d="M14 20 L18 24 L26 15" stroke="var(--gold)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Fairness",
    body: "Risk and reward are shared equitably, and every client relationship is built on clear, balanced terms.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M20 5 L20 35 M8 12 L32 12" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 12 L4 22 A5.5 5.5 0 0 0 12 22 Z M32 12 L28 22 A5.5 5.5 0 0 0 36 22 Z" stroke="var(--gold)" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M13 35 L27 35" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Stewardship",
    body: "We manage wealth as a trust, investing patiently in real economic activity that benefits generations to come.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="15" stroke="var(--navy)" strokeWidth="2"/>
        <path d="M20 11 L20 20 L27 25" stroke="var(--gold)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export function AboutUs() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll(".ab-reveal");
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("ab-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("ab-in"); io.unobserve(e.target); }
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
        animate
        title="About Us"
        crumb="About Us"
        badge="ABOUT MIYAR CAPITAL"
        description="Miyar Capital is a Shariah-compliant financial institution committed to ethical investment, transparent governance, and long-term value for the communities we serve."
      />

      {/* ── Company story + facts sidebar ───────────────────────────────── */}
      <section className="blk">
        <div className="wrap">
          <div className="ab-two-col">

            {/* Story */}
            <div className="ab-reveal">
              <p className="ab-lede">
                <span className="ab-drop" aria-hidden="true">M</span>
                iyar — the Arabic word for standard — is more than our name.
                It is the measure we hold ourselves to in every decision, every
                contract, and every relationship.
              </p>
              <p>
                Founded to bridge modern financial services and timeless Islamic
                values, Miyar Capital provides investment, financing, and
                wealth-management solutions that are fully compliant with the
                principles of Shariah. We serve individuals, families, and
                institutions who believe that how wealth is earned matters as
                much as how it grows.
              </p>
              <p>
                Our approach combines rigorous financial discipline with an
                unwavering ethical framework. Every product we offer is screened,
                structured, and certified before it reaches our clients — and
                monitored continuously thereafter. We measure success not only in
                returns, but in the integrity of every transaction and the
                confidence of every stakeholder.
              </p>
              <p>
                From our headquarters in Makkah, we work with a network of
                partners, scholars, and regulators to advance a financial system
                that is fair, transparent, and rooted in real economic activity.
              </p>
            </div>

            {/* Sidebar: image placeholder + facts */}
            <div className="ab-reveal" style={{ transitionDelay: ".15s" }}>
              <div className="ab-img-ph" role="img" aria-label="Headquarters photograph placeholder">
                <div className="ab-ph-inner">
                  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                    <rect x="6" y="6" width="36" height="36" rx="3" stroke="rgba(255,255,255,.5)" strokeWidth="2"/>
                    <circle cx="18" cy="18" r="4" stroke="rgba(255,255,255,.5)" strokeWidth="2"/>
                    <path d="M6 34 L18 24 L28 32 L34 27 L42 34" stroke="rgba(255,255,255,.5)" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                  <div className="ab-ph-label">Headquarters Image</div>
                  <div className="ab-ph-hint">Replace with photograph</div>
                </div>
              </div>

              <dl className="ab-facts">
                {FACTS.map((f) => (
                  <div className="ab-fact" key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

          </div>
        </div>
      </section>

      {/* ── Values strip ─────────────────────────────────────────────────── */}
      <section className="blk blk--cream">
        <div className="wrap">
          <div className="sec-tag">OUR VALUES</div>
          <h2 className="ab-values-head">What guides every decision</h2>
          <div className="ab-values">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="ab-value ab-reveal"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="ab-value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
