"use client";

import { ContactForm } from "./ContactForm";

interface RegisterInterestProps {
  image?: string;
  sourcePage?: string;
}

export function RegisterInterest({ image, sourcePage = "/register-interest" }: RegisterInterestProps) {
  const body = (
    <ContactForm
      sourcePage={sourcePage}
      variant="register"
      className="reg-form"
      submitLabel="Send Message"
    />
  );

  if (image) {
    return (
      <section className="blk ri" id="register">
        <div className="wrap">
          <div className="ri-split">
            <div className="ri-img">
              <img src={image} alt="Get in touch with Miyar Capital" />
            </div>
            <div className="ri-col">
              <h2>Register Interest</h2>
              {body}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="blk ri" id="register">
      <div className="wrap">
        <div className="ri-center">
          <h2>Register Interest</h2>
          {body}
        </div>
      </div>
    </section>
  );
}
