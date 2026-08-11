import { Fragment } from "react";

/** Official Saudi Riyal sign (Unicode 17 / U+20C1). */
const SAR = "\u20C1";

/**
 * Renders copy that may include U+20C1, swapping the glyph for the
 * saudi-riyal webfont (Montserrat/Inter do not ship this character yet).
 */
export function SarText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const parts = text.split(SAR);
  if (parts.length === 1) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 ? (
            <span
              className="icon-saudi_riyal_new sar-symbol"
              aria-label="SAR"
              role="img"
            />
          ) : null}
        </Fragment>
      ))}
    </span>
  );
}
