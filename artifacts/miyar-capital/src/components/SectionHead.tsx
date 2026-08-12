import type { ReactNode } from "react";

type Props = {
  /** Primary section title (h2). Omit or pass empty to leave blank. */
  title?: ReactNode;
  /** Lighter subtitle under the title (p). Omit or pass empty to leave blank. */
  subtitle?: ReactNode;
  center?: boolean;
  className?: string;
};

function hasContent(node: ReactNode): boolean {
  if (node == null || node === false) return false;
  if (typeof node === "string") return node.trim().length > 0;
  return true;
}

/**
 * Standard section chrome: prominent underlined h2 + optional lighter subtitle.
 * Does not invent copy — omit title/subtitle when none exists.
 */
export function SectionHead({
  title,
  subtitle,
  center = false,
  className = "",
}: Props) {
  const showTitle = hasContent(title);
  const showSubtitle = hasContent(subtitle);
  if (!showTitle && !showSubtitle) return null;

  return (
    <div
      className={[
        "sec-head",
        center ? "sec-head--center" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showTitle ? <h2 className="sec-title">{title}</h2> : null}
      {showSubtitle ? <p className="sec-sub">{subtitle}</p> : null}
    </div>
  );
}
