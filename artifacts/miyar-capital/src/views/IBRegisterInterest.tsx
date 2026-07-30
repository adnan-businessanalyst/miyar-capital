"use client";

import { PageHero } from "../components/PageHero";
import { RegisterInterest } from "../components/RegisterInterest";

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
        <div className="wrap contact-cta">
          <RegisterInterest sourcePage="/investment-banking/register-interest" />
        </div>
      </section>
    </div>
  );
}
