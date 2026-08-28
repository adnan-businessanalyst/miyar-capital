import type { ReactNode } from "react";
import type { CmsDesign } from "@/lib/cmsPages";

export function CmsBand({
  design,
  children,
  className = "",
}: {
  design?: CmsDesign;
  children: ReactNode;
  className?: string;
}) {
  const bg = design?.bg ?? "none";
  const solid = design?.solid ?? "navy";
  const gradient = design?.gradient ?? "navy-mid";
  const overlay = design?.overlay ?? bg === "image";
  const position = design?.imagePosition ?? "center";
  const image = design?.image?.trim() ?? "";

  const classes = [
    "cms-band",
    bg === "solid" ? `cms-band--${solid}` : "",
    bg === "gradient" ? `cms-band--gradient cms-band--gradient-${gradient}` : "",
    bg === "image" ? "cms-band--image" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={classes}
      style={
        bg === "image" && image
          ? {
              backgroundImage: `url(${image})`,
              backgroundPosition: position,
            }
          : undefined
      }
    >
      {overlay && (bg === "image" || bg === "gradient") ? (
        <div className="cms-overlay" aria-hidden="true" />
      ) : null}
      <div className="cms-band-inner wrap">{children}</div>
    </section>
  );
}
