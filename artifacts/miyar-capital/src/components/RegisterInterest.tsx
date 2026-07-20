import { type FormEvent, useState } from "react";

interface RegisterInterestProps {
  image?: string;
}

export function RegisterInterest({ image }: RegisterInterestProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const body = submitted ? (
    <p className="ri-thanks">
      Thank you — your message has been received. Our team will be in touch
      shortly.
    </p>
  ) : (
    <form className="reg-form" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="tel" name="phone" placeholder="Phone" />
      <textarea name="message" placeholder="Write your message" required />
      <button type="submit">Send Message</button>
    </form>
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
