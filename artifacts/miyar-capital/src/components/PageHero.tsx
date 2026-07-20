import { useLocation } from "wouter";
import buildingImg from "@assets/generated_images/miyar_building.png";

export interface PageHeroCrumb {
  label: string;
  href?: string;
}

export type PageHeroChip = string | { lead: string; text: string };

export interface PageHeroMeta {
  label: string;
  value: string;
}

export interface PageHeroProps {
  /** Main heading (required). */
  title: string;
  /**
   * Simple trail after Home, e.g. `"About Us"` → Home / About Us.
   * Ignored when `crumbs` is provided. Defaults to `title`.
   */
  crumb?: string;
  /** Full crumb trail after Home (use for linked middle segments). */
  crumbs?: PageHeroCrumb[];
  /** Small uppercase badge above the title. */
  badge?: string;
  /** Supporting line under the title. */
  description?: string;
  /** Pill chips under the description. */
  chips?: PageHeroChip[];
  /** Label/value meta row (funds, product facts). */
  meta?: PageHeroMeta[];
  /** Optional hero background image (defaults to miyar building). */
  backgroundImage?: string;
}

function normalizeCrumbs(
  title: string,
  crumb: string | undefined,
  crumbs: PageHeroCrumb[] | undefined,
): PageHeroCrumb[] {
  if (crumbs && crumbs.length > 0) return crumbs;
  return [{ label: crumb ?? title }];
}

export function PageHero({
  title,
  crumb,
  crumbs,
  badge,
  description,
  chips,
  meta,
  backgroundImage = buildingImg,
}: PageHeroProps) {
  const [, navigate] = useLocation();
  const trail = normalizeCrumbs(title, crumb, crumbs);

  return (
    <section className="page-hero">
      <div className="ph-bg" style={{ backgroundImage: `url(${backgroundImage})` }} />
      <div className="wrap">
        <div className="crumb">
          <a onClick={() => navigate("/")}>Home</a>
          {trail.map((item) => (
            <span key={`${item.label}-${item.href ?? ""}`}>
              {" / "}
              {item.href ? (
                <a onClick={() => navigate(item.href!)}>{item.label}</a>
              ) : (
                item.label
              )}
            </span>
          ))}
        </div>

        {badge ? <div className="ph-badge">{badge}</div> : null}

        <h1>{title}</h1>

        {description ? <p className="ph-desc">{description}</p> : null}

        {chips && chips.length > 0 ? (
          <div className="ph-chips">
            {chips.map((chip, i) =>
              typeof chip === "string" ? (
                <div className="ph-chip" key={`${chip}-${i}`}>
                  {chip}
                </div>
              ) : (
                <div className="ph-chip" key={`${chip.lead}-${i}`}>
                  <strong>{chip.lead}</strong> {chip.text}
                </div>
              ),
            )}
          </div>
        ) : null}

        {meta && meta.length > 0 ? (
          <div className="ph-meta">
            {meta.map((m) => (
              <div className="ph-meta-item" key={m.label}>
                <div className="ph-meta-label">{m.label}</div>
                <div className="ph-meta-value">{m.value}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
