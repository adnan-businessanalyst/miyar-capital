"use client";

import { type ComponentType } from "react";
import {
  Award,
  Compass,
  Eye,
  Flag,
  Handshake,
  ShieldCheck,
  Target,
  type LucideProps,
} from "lucide-react";
import { PageHero } from "../components/PageHero";
import { ContactForm } from "../components/ContactForm";
import { CONTENT_IMAGES } from "../site/contentImages";

const buildingImg = CONTENT_IMAGES.app_bg;
const storyImg = CONTENT_IMAGES.private_offers;

const STORY_PARAS = [
  "iyar — the Arabic word for standard — is more than our name. It is the measure we hold ourselves to in every decision, every contract, and every relationship.",
  "Founded to bridge modern financial services and timeless Islamic values, Miyar Capital provides investment, financing, and wealth-management solutions that are fully compliant with the principles of Shariah. We serve individuals, families, and institutions who believe that how wealth is earned matters as much as how it grows.",
  "Our approach combines rigorous financial discipline with an unwavering ethical framework. Every product we offer is screened, structured, and certified before it reaches our clients — and monitored continuously thereafter. We measure success not only in returns, but in the integrity of every transaction and the confidence of every stakeholder.",
  "From our headquarters in Riyadh, we work with a network of partners, scholars, and regulators to advance a financial system that is fair, transparent, and rooted in real economic activity.",
];

const STORY_FACTS = [
  { label: "Founded", value: "2021" },
  { label: "Headquarters", value: "Riyadh, Saudi Arabia" },
  { label: "License No.", value: "21216-32" },
  { label: "Licensed by", value: "Capital Market Authority (CMA)" },
  // { label: "Clients served", value: "120,000+" },
  // { label: "Assets under management", value: "SAR 4.1 billion" },
];

const STATS = [
  { n: "2%", l: "Average annual investment return for our users." },
  { n: "60k+", l: "Accurate financial recommendations delivered in the past 12 months." },
  { n: "90%", l: "Of investors achieved their financial goals within their first 6 months with us." },
];

const METHODOLOGY: {
  Icon: ComponentType<LucideProps>;
  h: string;
  p: string;
}[] = [
  {
    Icon: Compass,
    h: "Our Purpose",
    p: "To be the preferred investment partner in Saudi Arabia, known for innovation and excellence in customer service and sustainable returns.",
  },
  {
    Icon: Flag,
    h: "Our Mission",
    p: "We strive to deliver outstanding performance and continuously exceed our clients' expectations, using a long-term value-based approach that aligns individual objectives.",
  },
  {
    Icon: Target,
    h: "Our Goals",
    p: "Achieve sustainable financial returns for our clients, build long-term relationships based on trust, and contribute to the development of the Saudi economy in line with Vision 2030.",
  },
];

const PRINCIPLES: {
  Icon: ComponentType<LucideProps>;
  h: string;
  p: string;
}[] = [
  {
    Icon: Award,
    h: "Priority",
    p: "Our unit-holders' profits and benefits always come first.",
  },
  {
    Icon: ShieldCheck,
    h: "Integrity",
    p: "We do not create any investment product except what we would be satisfied investing in ourselves.",
  },
  {
    Icon: Handshake,
    h: "Partnership",
    p: "We act like your partners, not like the traditional fund managers.",
  },
  {
    Icon: Eye,
    h: "Transparency",
    p: "We uphold honesty and openness, ensuring clarity in every step of the investment journey.",
  },
];

const DEFAULT_ORDER = ["hero", "story", "profile", "methodology", "principles", "interest"];

export function WhoWeAre() {
  const sectionOrder = DEFAULT_ORDER;

  const renderSection = (id: string) => {
    switch (id) {
      case "hero":
        return (
          <PageHero
            key={id}
            title="Who We Are"
            crumb="Who We Are"
            description="Miyar Capital is a Shariah-compliant financial institution committed to ethical investment, transparent governance, and long-term value for the communities we serve."
            animate
          />
        );
      case "story":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="ab-two-col wwa-story">
                <div>
                  <p className="ab-lede">
                    <span className="ab-drop" aria-hidden="true">
                      M
                    </span>
                    {STORY_PARAS[0]}
                  </p>
                  {STORY_PARAS.slice(1).map((para) => (
                    <p key={para.slice(0, 32)}>{para}</p>
                  ))}
                </div>
                <aside>
                  <div className="wwa-story-img">
                    <img src={storyImg} alt="Miyar Capital" />
                  </div>
                  <dl className="ab-facts">
                    {STORY_FACTS.map((f) => (
                      <div className="ab-fact" key={f.label}>
                        <dt>{f.label}</dt>
                        <dd>{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </aside>
              </div>
            </div>
          </section>
        );
      // case "profile":
      //   return (
      //     <section key={id} className="blk blk--cream">
      //       <div className="wrap">
      //         <div className="wwa">
      //           <div>
      //             <div className="sec-tag">Who We Are</div>
      //             <h2>Miyar Capital</h2>
      //             <p>
      //               Founded in 2021, Miyar Capital is a Saudi-based investment bank
      //               and asset management company headquartered in Riyadh, Kingdom of
      //               Saudi Arabia. With a share capital of 20 million SAR and a
      //               licence issued by the Capital Market Authority (License No.
      //               21216-32), Miyar operates in accordance with the highest
      //               standards of regulatory compliance and financial integrity. We
      //               specialise in securities business — including arranging,
      //               advising, and managing investments and funds — with a mission to
      //               deliver long-term value for our clients and partners.
      //             </p>
      //             <div className="wwa-stats">
      //               {STATS.map((stat) => (
      //                 <div className="wwa-stat" key={stat.n}>
      //                   <div className="n">{stat.n}</div>
      //                   <div className="l">{stat.l}</div>
      //                 </div>
      //               ))}
      //             </div>
      //           </div>
      //           <div className="img">
      //             <img src={buildingImg} alt="mobile app section background image" />
      //           </div>
      //         </div>
      //       </div>
      //     </section>
      //   );
      case "methodology":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="sec-head sec-head--center">
                <h2>Our Strategic Framework</h2>
              </div>
              <div className="method-grid">
                {METHODOLOGY.map(({ Icon, h, p }) => (
                  <div className="method" key={h}>
                    <div className="mi" aria-hidden="true">
                      <Icon className="mi-icon" strokeWidth={1.6} />
                    </div>
                    <h4>{h}</h4>
                    <p>{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case "principles":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="sec-head sec-head--center">
                <h2>Our Values</h2>
                <p>What guides every decision</p>
              </div>
              <div className="principles">
                {PRINCIPLES.map(({ Icon, h, p }) => (
                  <div className="principle" key={h}>
                    <div className="pi" aria-hidden="true">
                      <Icon className="pi-icon" strokeWidth={1.6} />
                    </div>
                    <h4>{h}</h4>
                    <p>{p}</p>
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
                <ContactForm sourcePage="/who-we-are" variant="who-we-are" className="reg-form" />
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
