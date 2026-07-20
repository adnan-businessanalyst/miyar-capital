import { PageHero } from "../components/PageHero";
import { RegisterInterest } from "../components/RegisterInterest";
import { ADVISORY_PILLARS, ADVISORY_STEPS } from "../data/advisory";
import manOnPhone from "@assets/generated_images/man_on_phone.png";

const DEFAULT_ORDER = ["hero", "pillars", "process", "interest"];

export function InvestmentAdvisory() {
  const sectionOrder = DEFAULT_ORDER;

  const renderSection = (id: string) => {
    switch (id) {
      case "hero":
        return (
          <PageHero
            key={id}
            title="Investment Advisory"
            crumb="Investment Banking / Investment Advisory"
          />
        );
      case "pillars":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="advisory-card">
                <h2>Investment Advisory</h2>
                <p>
                  Miyar Capital believes the first step in investment advisory
                  services is to understand the client's needs, objectives, and
                  constraints.
                </p>
                <div className="adv-pillars">
                  {ADVISORY_PILLARS.map((pillar) => (
                    <div className="adv-pillar" key={pillar.title}>
                      <div className="adv-icon" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2l2.4 6.9H22l-6 4.6L18.2 22 12 17.6 5.8 22 8 13.5l-6-4.6h7.6z" />
                        </svg>
                      </div>
                      <h4>{pillar.title}</h4>
                      <p>{pillar.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      case "process":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="timeline">
                {ADVISORY_STEPS.map((step, i) => {
                  const textFirst = i % 2 === 0;
                  const media = (
                    <div className={`tl-media${textFirst ? "" : " tl-media--rev"}`} key="media">
                      <div className="tl-img"><img src={step.img} alt={`Advisory step ${step.n}`} /></div>
                      <div className="tl-num">{step.n}</div>
                    </div>
                  );
                  const text = <div className="tl-text" key="text"><p>{step.text}</p></div>;
                  return (
                    <div className="tl-row" key={step.n}>
                      {textFirst ? [text, media] : [media, text]}
                      <span className="tl-dot" aria-hidden="true" />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      case "interest":
        return <RegisterInterest key={id} image={manOnPhone} />;
      default:
        return null;
    }
  };

  return <div className="page">{sectionOrder.map((id) => renderSection(id))}</div>;
}
