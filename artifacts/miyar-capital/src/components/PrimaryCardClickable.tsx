"use client";

import { useRouter } from "next/navigation";
import { RichText } from "./RichText";
import { useLocalePath } from "../i18n/useLocalePath";

export interface PrimaryCardClickableItem {
  id: string;
  badge: string;
  title: string;
  body: string;
  href: string;
}

export function PrimaryCardClickable({
  badge,
  title,
  body,
  href,
  className = "",
}: Omit<PrimaryCardClickableItem, "id"> & { className?: string }) {
  const router = useRouter();
  const withLocale = useLocalePath();
  const resolvedHref = href.startsWith("/") ? withLocale(href) : href;
  const internal = href.startsWith("/");

  const rootClass = [
    "svc",
    "svc--dark",
    "primary-card-clickable",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      className={rootClass}
      href={resolvedHref}
      target={internal ? undefined : "_blank"}
      rel={internal ? undefined : "noopener noreferrer"}
      onClick={
        internal
          ? (e) => {
              e.preventDefault();
              router.push(resolvedHref);
            }
          : undefined
      }
    >
      <div className="primary-card-clickable-badge" aria-hidden="true">
        {badge}
      </div>
      <h4>{title}</h4>
      <RichText as="p" html={body} />
      <span className="primary-card-clickable-arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}

/** Two-up (or multi) grid for primary clickable cards. */
export function PrimaryCardClickableGrid({
  items,
  className = "",
}: {
  items: PrimaryCardClickableItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div
      className={["primary-card-clickable-grid", className]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item) => (
        <PrimaryCardClickable
          key={item.id}
          badge={item.badge}
          title={item.title}
          body={item.body}
          href={item.href}
        />
      ))}
    </div>
  );
}
