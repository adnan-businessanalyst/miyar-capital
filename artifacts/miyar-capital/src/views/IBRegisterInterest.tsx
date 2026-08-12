"use client";

import { PageHero } from "../components/PageHero";
import { RegisterInterestSection } from "../components/RegisterInterestSection";

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
      <RegisterInterestSection
        sourcePage="/investment-banking/register-interest"
        pageTitleEn="Investment Banking"
        pageTitleAr="الخدمات المصرفية الاستثمارية"
      />
    </div>
  );
}
