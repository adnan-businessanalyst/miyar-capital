interface IntroCardProps {
  image: string;
}

export function IntroCard({ image }: IntroCardProps) {
  const scrollToRegister = () => {
    document
      .getElementById("register")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="blk">
      <div className="wrap">
        <div className="arr-intro">
          <div className="arr-intro-text">
            <div className="sec-tag">Investment Management</div>
            <h2>Guided by Expertise. Built on Trust.</h2>
            <p>
              We focus on delivering sustainable returns through disciplined
              analysis, professional management, and continuous market
              monitoring. Our approach treats every client as a partner —
              ensuring decisions are aligned with long-term value and responsible
              investing.
            </p>
            <button
              className="btn btn-outline-navy"
              onClick={scrollToRegister}
            >
              Register Interest
            </button>
          </div>
          <div className="arr-intro-img">
            <img src={image} alt="Miyar Capital investment management" />
          </div>
        </div>
      </div>
    </section>
  );
}
