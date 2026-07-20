import { PageHero } from "../components/PageHero";
import { PersonCard } from "../components/PersonCard";
import { BOARD_MEMBERS } from "../data/people";

export function BoardOfDirectors() {
  return (
    <div className="page">
      <PageHero title="Board of Directors" crumb="Board of Directors" />
      <section className="blk">
        <div className="wrap">
          <div className="people-grid">
            {BOARD_MEMBERS.map((person, i) => (
              <PersonCard key={`${person.name}-${i}`} {...person} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
