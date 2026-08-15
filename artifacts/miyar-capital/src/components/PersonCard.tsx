/**
 * PersonCard — Person profile card with photo/initials, role, and optional board-layout bio overlay.
 *
 * Used by:
 * - (none yet)
 */

import type { CSSProperties } from "react";
import type { Person } from "../data/people";

export interface PersonCardProps extends Person {
  /** Board layout: padded centered photo + hover message overlay. */
  variant?: "default" | "board";
  className?: string;
  style?: CSSProperties;
}

export function PersonCard({
  name,
  role,
  photo,
  bio,
  initials,
  variant = "default",
  className = "",
  style,
}: PersonCardProps) {
  const isBoard = variant === "board";
  const showMessage = Boolean(bio);
  const label = initials ?? name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase();

  return (
    <article
      className={`person-card${isBoard ? " person-card--board" : ""}${className ? ` ${className}` : ""}`}
      style={style}
      tabIndex={isBoard && showMessage ? 0 : undefined}
    >
      <div className={`photo${!photo ? " photo--placeholder" : ""}`}>
        {photo ? (
          <img src={photo} alt={name} loading="lazy" />
        ) : (
          <span className="photo-initials" aria-hidden="true">
            {label}
          </span>
        )}
      </div>
      <div className="info">
        <div className="pname">{name}</div>
        <div className="prole">{role}</div>
      </div>
      {isBoard && showMessage ? (
        <div className="pmsg-overlay">
          <p className="pmsg">
            <span className="pmsg-mark" aria-hidden="true">
              “
            </span>
            {bio}
          </p>
        </div>
      ) : null}
    </article>
  );
}
