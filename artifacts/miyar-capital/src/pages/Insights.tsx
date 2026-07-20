import { useEffect, useRef, useState } from "react";

export function Insights() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [subEmail, setSubEmail] = useState("");
  const [subNote, setSubNote] = useState(
    "For professional and institutional investors. Unsubscribe any time."
  );

  useEffect(() => {
    const track = tickerRef.current;
    if (track) track.innerHTML += track.innerHTML;
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll(".ins-reveal");
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("ins-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ins-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  function handleSubscribe() {
    if (!subEmail || !subEmail.includes("@")) {
      setSubNote("Enter a valid work email address to subscribe.");
    } else {
      setSubNote("Subscribed — the next edition arrives in your inbox this fortnight.");
      setSubEmail("");
    }
  }

  return (
    <div className="ins-page">

      {/* ── CIO View Hero ──────────────────────────────────────────────── */}
      <section className="ins-hero" id="cio">
        <div className="wrap ins-hero-grid">
          <div>
            <span
              className="ins-eyebrow ins-load ins-d1"
              style={{ "--ins-mark": "var(--navy)" } as React.CSSProperties}
            >
              CIO View · Q3 2026 Letter
            </span>
            <h1 className="ins-h1 ins-load ins-d2">
              The cost of <em>certainty</em> has never been higher
            </h1>
            <p className="ins-lede ins-load ins-d3">
              Markets have spent the first half of the year paying a premium
              for predictability — crowding into the handful of stories everyone
              agrees on. Our discipline this quarter is the opposite: owning
              durable cash flows where the consensus hasn't yet arrived.
            </p>
            <div className="ins-byline ins-load ins-d4">
              <div className="ins-avatar" role="img" aria-label="Chief Investment Officer portrait placeholder" />
              <div>
                <div className="ins-who">Chief Investment Officer, Miyar Capital</div>
                <div className="ins-meta">14 JUL 2026 · 12 MIN READ</div>
              </div>
            </div>
            <div className="ins-btns ins-load ins-d5">
              <a className="ins-btn" href="#">Read the full letter</a>
              <a className="ins-btn ins-btn--ghost" href="#">Past letters</a>
            </div>
            <nav className="ins-jump ins-load ins-d5" aria-label="Jump to section">
              <a href="#fund" style={{ "--pc": "var(--gold)" } as React.CSSProperties}>
                Fund Commentary
              </a>
              <a href="#market" style={{ "--pc": "#3d5a80" } as React.CSSProperties}>
                Market Commentary
              </a>
              <a href="#research" style={{ "--pc": "#7a3b3b" } as React.CSSProperties}>
                Research Notes
              </a>
            </nav>
          </div>

          <div className="ins-hero-visual ins-load ins-d6">
            <div
              className="ins-ph"
              data-label="IMAGE · CIO PORTRAIT 4:5"
              role="img"
              aria-label="Image placeholder: CIO portrait"
              style={{ aspectRatio: "4/5" }}
            />
            <figure className="ins-quote-chip">
              "Patience is a position. We are paid to hold it when others can't."
              <small>— FROM THE Q3 LETTER</small>
            </figure>
          </div>
        </div>
      </section>

      {/* ── Market Ticker ──────────────────────────────────────────────── */}
      <div className="ins-ticker" aria-label="Market pulse">
        <div className="ins-ticker-inner">
          <div className="ins-ticker-label">
            <span className="ins-dot" aria-hidden="true" />
            Market pulse · 16 Jul
          </div>
          <div className="ins-ticker-viewport">
            <div className="ins-ticker-track" ref={tickerRef}>
              <span className="ins-tk"><b>S&amp;P 500</b><span className="ins-v">6,412</span><span className="ins-pos">+0.4%</span></span>
              <span className="ins-tk"><b>MSCI World</b><span className="ins-v">4,188</span><span className="ins-pos">+0.3%</span></span>
              <span className="ins-tk"><b>US 10Y</b><span className="ins-v">4.21%</span><span className="ins-neg">−6bp</span></span>
              <span className="ins-tk"><b>Brent</b><span className="ins-v">$78.40</span><span className="ins-neg">−1.1%</span></span>
              <span className="ins-tk"><b>Gold</b><span className="ins-v">$2,655</span><span className="ins-pos">+0.6%</span></span>
              <span className="ins-tk"><b>EUR/USD</b><span className="ins-v">1.094</span><span className="ins-pos">+0.2%</span></span>
              <span className="ins-tk"><b>Nikkei 225</b><span className="ins-v">42,310</span><span className="ins-pos">+0.8%</span></span>
              <span className="ins-tk"><b>Copper</b><span className="ins-v">$4.61</span><span className="ins-neg">−0.4%</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Featured Article ───────────────────────────────────────────── */}
      <section className="ins-block wrap" id="featured">
        <article className="ins-featured ins-reveal">
          <div
            className="ins-ph ins-ph--research"
            data-label="IMAGE · FEATURED 4:3"
            role="img"
            aria-label="Image placeholder: featured article"
            style={{ aspectRatio: "4/3", minHeight: 280 }}
          />
          <div className="ins-feat-body">
            <span className="ins-tag ins-tag--research">Featured · Research Note</span>
            <h3 className="ins-feat-h">
              <a href="#">Grid bottlenecks: the quiet constraint on the AI buildout</a>
            </h3>
            <p className="ins-feat-p">
              Data-centre power demand is colliding with decade-long transmission
              queues. We map where the constraint bites hardest — and which
              equipment suppliers, utilities, and developers stand on the right
              side of it. Includes our proprietary interconnection-queue tracker
              across six major markets.
            </p>
            <div className="ins-meta-row">
              <span className="ins-author">S. Lindqvist · T. Rahman</span>
              <span>8 JUL 2026 · 14 MIN READ</span>
            </div>
          </div>
        </article>
      </section>

      {/* ── Fund Commentary ───────────────────────────────────────────── */}
      <section className="ins-block wrap" id="fund">
        <div className="ins-sec-head ins-reveal">
          <div>
            <span className="ins-eyebrow" style={{ "--ins-mark": "var(--gold)" } as React.CSSProperties}>
              Series 01 · Quarterly
            </span>
            <h2 className="ins-sec-h">Fund Commentary</h2>
            <p className="ins-desc">
              Performance reviews and positioning updates from the managers of each strategy.
            </p>
          </div>
          <a className="ins-view-all" href="#" style={{ "--ins-mark": "var(--gold)" } as React.CSSProperties}>
            All fund commentary <span className="ins-arrow">→</span>
          </a>
        </div>

        <div className="ins-grid ins-stagger">
          <article className="ins-card ins-reveal">
            <div className="ins-ph ins-ph--fund" data-label="IMAGE 16:9" role="img" aria-label="Image placeholder" style={{ aspectRatio: "16/9" }} />
            <div className="ins-card-body">
              <div className="ins-tagline">
                <span className="ins-tag ins-tag--fund">Global Equity Fund</span>
                <time dateTime="2026-07-10">10 Jul 2026</time>
              </div>
              <h3 className="ins-card-h"><a href="#">Q2 review: quality held its ground</a></h3>
              <p>Selection in industrials and healthcare drove outperformance; our mega-cap tech underweight remains a deliberate valuation call.</p>
              <div className="ins-perf">
                <span>Fund Q2: <span className="ins-up">+4.8%</span></span>
                <span>Benchmark: +3.9%</span>
              </div>
              <div className="ins-foot"><span className="ins-author">M. Okafor</span><span>8 min read</span></div>
            </div>
          </article>

          <article className="ins-card ins-reveal">
            <div className="ins-ph ins-ph--fund" data-label="IMAGE 16:9" role="img" aria-label="Image placeholder" style={{ aspectRatio: "16/9" }} />
            <div className="ins-card-body">
              <div className="ins-tagline">
                <span className="ins-tag ins-tag--fund">Strategic Income Fund</span>
                <time dateTime="2026-07-09">9 Jul 2026</time>
              </div>
              <h3 className="ins-card-h"><a href="#">Positioning for a steeper curve</a></h3>
              <p>We extended duration at the long end and rotated part of our high-yield sleeve into investment-grade credit, where spreads compensate more fairly.</p>
              <div className="ins-perf">
                <span>Fund Q2: <span className="ins-up">+2.1%</span></span>
                <span>Benchmark: +1.7%</span>
              </div>
              <div className="ins-foot"><span className="ins-author">D. Haruki</span><span>7 min read</span></div>
            </div>
          </article>

          <article className="ins-card ins-reveal">
            <div className="ins-ph ins-ph--fund" data-label="IMAGE 16:9" role="img" aria-label="Image placeholder" style={{ aspectRatio: "16/9" }} />
            <div className="ins-card-body">
              <div className="ins-tagline">
                <span className="ins-tag ins-tag--fund">Sustainable Growth Fund</span>
                <time dateTime="2026-07-07">7 Jul 2026</time>
              </div>
              <h3 className="ins-card-h"><a href="#">Transition winners, priced like utilities</a></h3>
              <p>Grid equipment and efficiency names re-rated sharply; we trimmed into strength and recycled proceeds into overlooked water infrastructure.</p>
              <div className="ins-perf">
                <span>Fund Q2: <span className="ins-up">+5.6%</span></span>
                <span>Benchmark: +4.4%</span>
              </div>
              <div className="ins-foot"><span className="ins-author">A. Beaumont</span><span>9 min read</span></div>
            </div>
          </article>
        </div>
      </section>

      {/* ── Market Commentary ─────────────────────────────────────────── */}
      <section className="ins-block wrap" id="market">
        <div className="ins-sec-head ins-reveal">
          <div>
            <span className="ins-eyebrow" style={{ "--ins-mark": "#3d5a80" } as React.CSSProperties}>
              Series 02 · Weekly
            </span>
            <h2 className="ins-sec-h">Market Commentary</h2>
            <p className="ins-desc">
              Our strategy team's read on what's moving markets — and what's priced in.
            </p>
          </div>
          <a className="ins-view-all" href="#" style={{ "--ins-mark": "#3d5a80" } as React.CSSProperties}>
            All market commentary <span className="ins-arrow">→</span>
          </a>
        </div>

        <div className="ins-grid ins-stagger">
          <article className="ins-card ins-reveal">
            <div className="ins-ph ins-ph--market" data-label="IMAGE 16:9" role="img" aria-label="Image placeholder" style={{ aspectRatio: "16/9" }} />
            <div className="ins-card-body">
              <div className="ins-tagline">
                <span className="ins-tag ins-tag--market">Week Ahead</span>
                <time dateTime="2026-07-15">15 Jul 2026</time>
              </div>
              <h3 className="ins-card-h"><a href="#">Earnings season meets a quieter Fed</a></h3>
              <p>With a third of the S&amp;P 500 reporting this fortnight, guidance — not headline beats — will set the tone. Three sectors look stretched.</p>
              <div className="ins-foot"><span className="ins-author">Macro Strategy Team</span><span>5 min read</span></div>
            </div>
          </article>

          <article className="ins-card ins-reveal">
            <div className="ins-ph ins-ph--market" data-label="IMAGE 16:9" role="img" aria-label="Image placeholder" style={{ aspectRatio: "16/9" }} />
            <div className="ins-card-body">
              <div className="ins-tagline">
                <span className="ins-tag ins-tag--market">Mid-Year Outlook</span>
                <time dateTime="2026-07-03">3 Jul 2026</time>
              </div>
              <h3 className="ins-card-h"><a href="#">Three consensus views we're leaning against</a></h3>
              <p>A soft landing fully priced, a one-way dollar, and small caps left for dead. We take the other side of each — sized with respect for crowded trades.</p>
              <div className="ins-foot"><span className="ins-author">Macro Strategy Team</span><span>10 min read</span></div>
            </div>
          </article>

          <article className="ins-card ins-reveal">
            <div className="ins-ph ins-ph--market" data-label="IMAGE 16:9" role="img" aria-label="Image placeholder" style={{ aspectRatio: "16/9" }} />
            <div className="ins-card-body">
              <div className="ins-tagline">
                <span className="ins-tag ins-tag--market">Emerging Markets</span>
                <time dateTime="2026-06-20">20 Jun 2026</time>
              </div>
              <h3 className="ins-card-h"><a href="#">The carry is back, selectively</a></h3>
              <p>Real yields in select EM local markets sit at decade highs while inflation trends lower. Where currency risk is being paid for — and where it isn't.</p>
              <div className="ins-foot"><span className="ins-author">J. Mensah</span><span>6 min read</span></div>
            </div>
          </article>
        </div>
      </section>

      {/* ── Research Notes ─────────────────────────────────────────────── */}
      <section className="ins-block wrap" id="research">
        <div className="ins-sec-head ins-reveal">
          <div>
            <span className="ins-eyebrow" style={{ "--ins-mark": "#7a3b3b" } as React.CSSProperties}>
              Series 03 · In Depth
            </span>
            <h2 className="ins-sec-h">Research Notes</h2>
            <p className="ins-desc">
              Long-form work from our analysts: original data, frameworks, and the theses behind our positions.
            </p>
          </div>
          <a className="ins-view-all" href="#" style={{ "--ins-mark": "#7a3b3b" } as React.CSSProperties}>
            All research <span className="ins-arrow">→</span>
          </a>
        </div>

        <div className="ins-rlist">
          <a className="ins-rrow ins-reveal" href="#">
            <div className="ins-ph ins-ph--research" data-label="IMG 16:10" role="img" aria-label="Image placeholder" style={{ aspectRatio: "16/10" }} />
            <div className="ins-rrow-body">
              <span className="ins-tag ins-tag--research">Healthcare</span>
              <h3>GLP-1s, five years on: separating the durable from the discounted</h3>
              <p>The obesity-drug trade has matured from thematic frenzy to fundamentals. Our framework scores the value chain on pricing power, manufacturing moats, and payer dynamics.</p>
            </div>
            <div className="ins-rrow-side">
              <span>26 JUN 2026</span>
              <span>16 MIN READ</span>
              <span className="ins-go" aria-hidden="true">→</span>
            </div>
          </a>

          <a className="ins-rrow ins-reveal" href="#">
            <div className="ins-ph ins-ph--research" data-label="IMG 16:10" role="img" aria-label="Image placeholder" style={{ aspectRatio: "16/10" }} />
            <div className="ins-rrow-body">
              <span className="ins-tag ins-tag--research">Credit</span>
              <h3>Private credit's second act: covenant quality in a maturing market</h3>
              <p>As direct lending scales past $2 trillion, documentation is where risk hides. We review covenant trends across 140 recent deals and what they imply for recovery rates.</p>
            </div>
            <div className="ins-rrow-side">
              <span>12 JUN 2026</span>
              <span>13 MIN READ</span>
              <span className="ins-go" aria-hidden="true">→</span>
            </div>
          </a>

          <a className="ins-rrow ins-reveal" href="#">
            <div className="ins-ph ins-ph--research" data-label="IMG 16:10" role="img" aria-label="Image placeholder" style={{ aspectRatio: "16/10" }} />
            <div className="ins-rrow-body">
              <span className="ins-tag ins-tag--research">Currencies</span>
              <h3>Reserve diversification: measuring the slow shift beneath the dollar</h3>
              <p>Central-bank gold buying and bilateral settlement schemes get headlines; the data tells a quieter story. What the pace of change means for long-horizon portfolios.</p>
            </div>
            <div className="ins-rrow-side">
              <span>29 MAY 2026</span>
              <span>11 MIN READ</span>
              <span className="ins-go" aria-hidden="true">→</span>
            </div>
          </a>
        </div>
      </section>

      {/* ── Subscribe ──────────────────────────────────────────────────── */}
      <section className="wrap ins-sub-section">
        <div className="ins-subscribe ins-reveal">
          <div className="ins-sub-inner">
            <div>
              <h2 className="ins-sub-h">Insights, delivered</h2>
              <p className="ins-sub-lede">
                One email each fortnight: the CIO's latest thinking, fund updates,
                and our best research — nothing else.
              </p>
            </div>
            <div className="ins-sub-right">
              <div className="ins-sub-form">
                <input
                  type="email"
                  placeholder="Work email address"
                  aria-label="Email address"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                />
                <button onClick={handleSubscribe}>Subscribe</button>
              </div>
              <div className="ins-sub-note">{subNote}</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
