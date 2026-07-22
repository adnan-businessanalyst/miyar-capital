"use client";

import { PageHero } from "../components/PageHero";

export function PrivacyPolicy() {
  return (
    <div className="page">
      <PageHero title="Privacy & Policy" crumb="Privacy & Policy" />

      <section className="blk">
        <div className="wrap">
          <div className="policy-card">
            <h2>Privacy Policy</h2>
            <p>
              Miyar Capital is committed to protecting the privacy and security
              of the personal information entrusted to us. Any information you
              provide is collected and processed solely for the purposes of
              delivering our services and meeting our regulatory obligations
              under the Capital Market Authority. We do not share your personal
              information with third parties except as required by applicable
              law. For any questions regarding this policy, please contact us at
              info@miyarcapital.com.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
