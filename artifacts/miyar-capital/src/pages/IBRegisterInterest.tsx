import { useState } from "react";
import { PageHero } from "../components/PageHero";
import { MAN_ON_PHONE_IMG as contactImg } from "../site/manOnPhone";

export function IBRegisterInterest() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              {submitted ? (
                <div className="ib-contact-success">
                  <p>Thank you — we'll be in touch shortly.</p>
                </div>
              ) : (
                <form className="ib-form" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                  />
                  <button type="submit" className="btn btn-navy ib-submit">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
