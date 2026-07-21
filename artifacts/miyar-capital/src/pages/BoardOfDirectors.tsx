import { PageHero } from "../components/PageHero";
import { PersonCard } from "../components/PersonCard";
import { BOARD_MEMBERS } from "../data/people";
import { usePeopleGridReveal } from "../hooks/usePeopleGridReveal";

const CHAIRMAN =
  BOARD_MEMBERS.find(
    (m) => m.role.includes("Chairman") && !m.role.includes("Vice"),
  ) ?? BOARD_MEMBERS[0];

export function BoardOfDirectors() {
  const gridRef = usePeopleGridReveal(BOARD_MEMBERS.length);

  return (
    <div className="page">
      <PageHero
        className="page-hero--fold"
        title="Board of Directors"
        crumbs={[
          { label: "About", href: "/who-we-are" },
          { label: "Board of Directors" },
        ]}
        description="An independent board that sets strategy, upholds Shariah-aligned governance, and stewards Miyar Capital for long-term client trust."
      >
        <div className="bod-chair">
          <aside className="bod-chair-person">
            <div className={`bod-chair-photo${!CHAIRMAN.photo ? " bod-chair-photo--placeholder" : ""}`}>
              {CHAIRMAN.photo ? (
                <img src={CHAIRMAN.photo} alt={CHAIRMAN.name} />
              ) : (
                <span className="bod-chair-initials" aria-hidden="true">
                  {CHAIRMAN.initials ?? "MZ"}
                </span>
              )}
            </div>
            <div className="bod-chair-name">{CHAIRMAN.name}</div>
            <div className="bod-chair-role">{CHAIRMAN.role}</div>
          </aside>
          <blockquote className="bod-chair-message">
            <p>
              <span className="bod-chair-mark" aria-hidden="true">
                “
              </span>
              {CHAIRMAN.bio}
            </p>
          </blockquote>
        </div>
      </PageHero>
      <section className="blk">
        <div className="wrap">
          <div ref={gridRef} className="people-grid people-grid--board">
            {BOARD_MEMBERS.map((person, i) => (
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
