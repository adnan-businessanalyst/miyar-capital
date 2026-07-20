import { PageHero } from "../components/PageHero";
import { Accordion, type AccordionItem } from "../components/Accordion";
import { CONTENT_IMAGES } from "../site/contentImages";

const agreementImg = CONTENT_IMAGES.service_asset_management;

const OBLIGATIONS = [
  { label: "30-Day Response", text: "You must provide requested documents within 30 days. Please respond to every request separately, even if you hold multiple accounts." },
  { label: "Consequences", text: "If you fail to respond, the company is legally required to classify you based on existing records. This may result in you being reported to the U.S. tax authorities (IRS)." },
  { label: "Updates", text: "You must notify the company of any changes to your personal circumstances within 30 days." },
  { label: "Security", text: "Always verify that communications are official to avoid fraud." },
];

const FAQ: AccordionItem[] = [
  { title: "What is the Common Reporting Standard (CRS)?", body: "CRS is an OECD standard for the automatic exchange of financial account information between participating jurisdictions. The Kingdom of Saudi Arabia is a member." },
  { title: "When did CRS apply in Saudi Arabia?", body: "CRS came into effect in the Kingdom of Saudi Arabia on January 1, 2017, with the first automatic exchange of information taking place in 2018." },
  { title: "What is FATCA?", body: "FATCA is a U.S. law requiring financial institutions worldwide to identify and report accounts held by U.S. persons to the U.S. tax authorities (IRS)." },
  { title: "How does FATCA affect investors?", body: "Investors may be asked to provide documentation confirming their tax residency. Accounts identified as reportable are shared with the relevant tax authorities under the applicable agreements." },
];

const DEFAULT_ORDER = ["hero", "intro", "obligations", "faq"];

export function FATCA() {
  const sectionOrder = DEFAULT_ORDER;

  const renderSection = (id: string) => {
    switch (id) {
      case "hero":
        return <PageHero key={id} title="FATCA" crumb="FATCA" />;
      case "intro":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="arr-intro">
                <div className="arr-intro-text">
                  <div className="sec-tag">FATCA</div>
                  <h2>The Foreign Account Tax Compliance Act</h2>
                  <p>
                    FATCA, which came into effect on July 1, 2014, is a legislative
                    law enacted by the United States. It was established to combat
                    tax evasion by U.S. persons and to provide a high degree of
                    transparency in tax matters. FATCA also addresses
                    information-reporting and withholding requirements that must be
                    applied by financial institutions worldwide — including Saudi
                    banks and other financial institutions identified under the
                    Foreign Account Tax Compliance Act. The Kingdom of Saudi Arabia
                    has entered into an international agreement with the United
                    States to facilitate compliance with this law.
                  </p>
                </div>
                <div className="arr-intro-img">
                  <img src={agreementImg} alt="Asset Management" />
                </div>
              </div>
            </div>
          </section>
        );
      case "obligations":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="obl">
                <h2>Your Obligations &amp; Impact</h2>
                <ul className="obl-list">
                  {OBLIGATIONS.map((o) => (
                    <li className="obl-item" key={o.label}>
                      <span className="obl-dot" aria-hidden="true" />
                      <div><strong>{o.label}:</strong> {o.text}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      case "faq":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="sec-head sec-head--center">
                <h2>CRS and FATCA: What You Need to Know</h2>
              </div>
              <Accordion items={FAQ} numbered />
              <p className="fatca-note">
                For more information about the FATCA law and how it affects you,
                please refer to the website of the U.S. Internal Revenue Service
                (IRS):{" "}
                <a href="https://www.irs.gov" target="_blank" rel="noreferrer">www.irs.gov</a>.
              </p>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return <div className="page">{sectionOrder.map((id) => renderSection(id))}</div>;
}
