import { useEffect } from "react";
import { PageHero } from "../components/PageHero";
import { TEAM_MEMBERS } from "../data/people";

export function OurTeam() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll(".tm-reveal");
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("tm-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("tm-in"); io.unobserve(e.target); }
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
        title="Executive Team"
        crumbs={[
          { label: "About", href: "/who-we-are" },
          { label: "Our Team" },
        ]}
        badge="ABOUT MIYAR CAPITAL"
        description="Seasoned leaders in finance, governance, and Islamic investment — guiding Miyar Capital's strategy and day-to-day operations."
      />

      {/* ── Executive grid ──────────────────────────────────────────────── */}
      <section className="tm-section">
        <div className="wrap">
          <div className="tm-grid">
            {TEAM_MEMBERS.map((person, i) => (
              <div
                key={person.name}
                className="tm-card tm-reveal"
                style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
              >
                {/* Portrait */}
                <div className="tm-portrait">
                  <div className="tm-frame">
                    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" className="tm-oct">
                      <path d="M48 4 L76 15 L92 48 L76 81 L48 92 L20 81 L4 48 L20 15 Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span className="tm-initials" aria-label={person.name}>
                      {person.initials ?? person.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <span className="tm-ph-tag" aria-hidden="true">Photo</span>
                </div>

                {/* Body */}
                <div className="tm-body">
                  <h3>{person.name}</h3>
                  <div className="tm-role">{person.role}</div>
                  {person.bio && <p>{person.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
