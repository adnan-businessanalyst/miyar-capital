/**
 * PageSpinner — Full-screen navy loading overlay with the animated Miyar logo mark.
 *
 * Used by:
 * - (none yet)
 */

import { mediaUrl } from "../site/resolveAssetUrl";

const logoSpinner = mediaUrl("brand", "logo-spinner");

interface PageSpinnerProps {
  /** When false, overlay is hidden (keeps DOM for smooth fade). */
  visible?: boolean;
  className?: string;
}

/** Full-screen navy overlay with the animated Miyar logo mark. */
export function PageSpinner({ visible = true, className = "" }: PageSpinnerProps) {
  return (
    <div
      className={["page-spinner", visible ? "is-visible" : "", className]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
      aria-busy={visible}
      aria-label="Loading"
    >
      <img
        className="page-spinner-logo"
        src={logoSpinner}
        alt=""
        width={120}
        height={120}
        decoding="async"
      />
    </div>
  );
}
