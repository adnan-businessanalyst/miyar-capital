import { type FormEvent, useState } from "react";
import { PageHero } from "../components/PageHero";
import buildingImg from "@assets/generated_images/miyar_building.png";

const STATS = [
  { n: "2%", l: "Average annual investment return for our users." },
  { n: "60k+", l: "Accurate financial recommendations delivered in the past 12 months." },
  { n: "90%", l: "Of investors achieved their financial goals within their first 6 months with us." },
];

const METHODOLOGY = [
  { icon: "◈", h: "Our Purpose", p: "To be the preferred investment partner in Saudi Arabia, known for innovation and excellence in customer service and sustainable returns." },
  { icon: "◆", h: "Our Mission", p: "We strive to deliver outstanding performance and continuously exceed our clients' expectations, using a long-term value-based approach that aligns individual objectives." },
  { icon: "✦", h: "Our Goals", p: "Achieve sustainable financial returns for our clients, build long-term relationships based on trust, and contribute to the development of the Saudi economy in line with Vision 2030." },
];

const PRINCIPLES = [
  { icon: "I", h: "Priority", p: "Our unit-holders' profits and benefits always come first." },
  { icon: "II", h: "Integrity", p: "We do not create any investment product except what we would be satisfied investing in ourselves." },
  { icon: "III", h: "Partnership", p: "We act like your partners, not like the traditional fund managers." },
  { icon: "IV", h: "Transparency", p: "We uphold honesty and openness, ensuring clarity in every step of the investment journey." },
];

const DEFAULT_ORDER = ["hero", "profile", "methodology", "principles", "interest"];

export function WhoWeAre() {
  const [submitted, setSubmitted] = useState(false);

  const sectionOrder = DEFAULT_ORDER;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const renderSection = (id: string) => {
    switch (id) {
      case "hero":
        return <PageHero key={id} title="Who We Are" crumb="Who We Are" />;
      case "profile":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="wwa">
                <div>
                  <div className="sec-tag">Who We Are</div>
                  <h2>Miyar Capital</h2>
                  <p>
                    Founded in 2021, Miyar Capital is a Saudi-based investment bank
                    and asset management company headquartered in Riyadh, Kingdom of
                    Saudi Arabia. With a share capital of 20 million SAR and a
                    licence issued by the Capital Market Authority (License No.
                    21216-32), Miyar operates in accordance with the highest
                    standards of regulatory compliance and financial integrity. We
                    specialise in securities business — including arranging,
                    advising, and managing investments and funds — with a mission to
                    deliver long-term value for our clients and partners.
                  </p>
                  <div className="wwa-stats">
                    {STATS.map((stat) => (
                      <div className="wwa-stat" key={stat.n}>
                        <div className="n">{stat.n}</div>
                        <div className="l">{stat.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="img">
                  <img src={buildingImg} alt="Miyar Capital headquarters" />
                </div>
              </div>
            </div>
          </section>
        );
      case "methodology":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="sec-head sec-head--center">
                <h2>Our Methodology</h2>
              </div>
              <div className="method-grid">
                {METHODOLOGY.map((item) => (
                  <div className="method" key={item.h}>
                    <div className="mi">{item.icon}</div>
                    <h4>{item.h}</h4>
                    <p>{item.p}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case "principles":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="sec-head sec-head--center">
                <h2>Our Core Principles</h2>
              </div>
              <div className="principles">
                {PRINCIPLES.map((item) => (
                  <div className="principle" key={item.h}>
                    <div className="pi">{item.icon}</div>
                    <h4>{item.h}</h4>
                    <p>{item.p}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case "interest":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="register">
                <h2>Register Interest</h2>
                {submitted ? (
                  <p style={{ textAlign: "center", marginTop: 24, color: "var(--muted)" }}>
                    Thank you — your message has been received. Our team will be in touch shortly.
                  </p>
                ) : (
                  <form className="reg-form" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" required />
                    <input type="email" name="email" placeholder="Email" required />
                    <input type="tel" name="phone" placeholder="Phone" />
                    <textarea name="message" placeholder="Write your message" required />
                    <button type="submit">Send Message</button>
                  </form>
                )}
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return <div className="page">{sectionOrder.map((id) => renderSection(id))}</div>;
}
