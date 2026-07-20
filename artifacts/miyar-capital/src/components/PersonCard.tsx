import type { Person } from "../data/people";

export function PersonCard({ name, role, photo }: Person) {
  return (
    <div className="person-card">
      <div className="photo">
        <img src={photo} alt={name} loading="lazy" />
      </div>
      <div className="info">
        <div className="pname">{name}</div>
        <div className="prole">{role}</div>
      </div>
    </div>
  );
}
