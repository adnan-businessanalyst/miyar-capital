"use client";

import { PageHero } from "../components/PageHero";
import { ContactForm } from "../components/ContactForm";
import { MAN_ON_PHONE_IMG as contactImg } from "../site/manOnPhone";

export function IBRegisterInterest() {
  return (
    <div className="page">
      <PageHero
        title="Get in touch with our team."
        crumbs={[
          { label: "Investment Banking", href: "/investment-banking" },
          { label: "Register Interest" },
        ]}
      />

      <section className="blk blk--cream">
        <div className="wrap">
          <div className="pi-intro">
            <div
              className="pi-intro-img"
              style={{ backgroundImage: `url(${contactImg})` }}
            />
            <div className="ib-contact-form">
              <h2>Register Interest</h2>
              <p className="ib-contact-intro">
                Interested in our Investment Banking services? Share a few details and a
                member of our team will be in touch.
              </p>
              <ContactForm
                sourcePage="/investment-banking/register-interest"
                variant="ib"
                className="ib-form"
                submitLabel="Send Message"
                thanksClassName="ib-contact-success"
                thanksMessage="Thank you — we'll be in touch shortly."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
