/**
 * PersonCard — Person profile card with photo/initials, role, and optional board-layout bio overlay.
 *
 * Used by:
 * - (none yet)
 */

import type { CSSProperties } from "react";
import { resolvePersonPhoto, type Person } from "../data/people";

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
  gender = "male",
  bio,
  variant = "default",
  className = "",
  style,
}: PersonCardProps) {
  const isBoard = variant === "board";
  const showMessage = Boolean(bio);
  const resolvedPhoto = resolvePersonPhoto(photo, gender);

  return (
    <article
      className={`person-card${isBoard ? " person-card--board" : ""}${className ? ` ${className}` : ""}`}
      style={style}
      tabIndex={isBoard && showMessage ? 0 : undefined}
    >
      <div className="photo">
        <img src={resolvedPhoto} alt={name} loading="lazy" />
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
