import { PageHero } from "../components/PageHero";
import { PersonCard } from "../components/PersonCard";
import { EXECUTIVE_TEAM } from "../data/people";
import { usePeopleGridReveal } from "../hooks/usePeopleGridReveal";

const CEO =
  EXECUTIVE_TEAM.find((m) => m.role.includes("Chief Executive Officer")) ??
  EXECUTIVE_TEAM[0];

export function ExecutiveTeam() {
  const gridRef = usePeopleGridReveal(EXECUTIVE_TEAM.length);

  return (
    <div className="page">
      <PageHero
        className="page-hero--fold"
        title="Executive Team"
        crumbs={[
          { label: "About", href: "/who-we-are" },
          { label: "Executive Team" },
        ]}
        description="Seasoned leaders in finance, governance, and Islamic investment — guiding Miyar Capital's strategy and day-to-day operations."
      >
        <div className="bod-chair">
          <aside className="bod-chair-person">
            <div className={`bod-chair-photo${!CEO.photo ? " bod-chair-photo--placeholder" : ""}`}>
              {CEO.photo ? (
                <img src={CEO.photo} alt={CEO.name} />
              ) : (
                <span className="bod-chair-initials" aria-hidden="true">
                  {CEO.initials ?? "MZ"}
                </span>
              )}
            </div>
            <div className="bod-chair-name">{CEO.name}</div>
            <div className="bod-chair-role">{CEO.role}</div>
          </aside>
          <blockquote className="bod-chair-message">
            <p>
              <span className="bod-chair-mark" aria-hidden="true">
                “
              </span>
              {CEO.bio}
            </p>
          </blockquote>
        </div>
      </PageHero>
      <section className="blk">
        <div className="wrap">
          <div ref={gridRef} className="people-grid people-grid--board">
            {EXECUTIVE_TEAM.map((person, i) => (
              <PersonCard
                key={`${person.name}-${i}`}
                {...person}
                variant="board"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
