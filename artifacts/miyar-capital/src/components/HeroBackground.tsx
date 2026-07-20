import { useEffect, useMemo, useRef, useState } from "react";
import { resolveAssetUrl } from "../site/resolveAssetUrl";

type HeroSize = "mobile" | "tablet" | "desktop";

/** Hero background playback speed (1 = normal). */
const HERO_VIDEO_RATE = 0.5;

/** When a size is missing, try desktop → tablet → mobile. */
const FALLBACK_ORDER: HeroSize[] = ["desktop", "tablet", "mobile"];

const imageModules = import.meta.glob(
  "../assets/hero/hero-*.{svg,SVG,avif,AVIF,webp,WEBP,jpg,JPG,jpeg,JPEG,png,PNG}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const videoModules = import.meta.glob("../assets/hero/hero-*.mp4", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function buildSizeMap(modules: Record<string, string>): Partial<Record<HeroSize, string>> {
  const map: Partial<Record<HeroSize, string>> = {};
  for (const size of FALLBACK_ORDER) {
    const sizeModules: Record<string, string> = {};
    for (const [path, url] of Object.entries(modules)) {
      const base = path.split(/[/\\]/).pop() ?? path;
      if (base.startsWith(`hero-${size}.`)) sizeModules[path] = url;
    }
    const resolved = resolveAssetUrl(sizeModules);
    if (resolved) map[size] = resolved;
  }
  return map;
}

function resolveAsset(
  map: Partial<Record<HeroSize, string>>,
  preferred: HeroSize,
): string | undefined {
  if (map[preferred]) return map[preferred];
  for (const size of FALLBACK_ORDER) {
    if (map[size]) return map[size];
  }
  return undefined;
}

function getViewportSize(): HeroSize {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia("(max-width: 560px)").matches) return "mobile";
  if (window.matchMedia("(min-width: 561px) and (max-width: 900px)").matches) {
    return "tablet";
  }
  return "desktop";
}

/**
 * Hardcoded responsive hero media from `src/assets/hero/`.
 * Prefer video when a file exists for the active size (with fallback);
 * otherwise render a `<picture>` of the matching stills.
 */
export function HeroBackground() {
  const images = useMemo(() => buildSizeMap(imageModules), []);
  const videos = useMemo(() => buildSizeMap(videoModules), []);
  const [size, setSize] = useState<HeroSize>(getViewportSize);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 560px)");
    const mqTablet = window.matchMedia("(min-width: 561px) and (max-width: 900px)");
    const update = () => setSize(getViewportSize());
    update();
    mqMobile.addEventListener("change", update);
    mqTablet.addEventListener("change", update);
    return () => {
      mqMobile.removeEventListener("change", update);
      mqTablet.removeEventListener("change", update);
    };
  }, []);

  const videoSrc = resolveAsset(videos, size);
  const mobileImg = resolveAsset(images, "mobile");
  const tabletImg = resolveAsset(images, "tablet");
  const desktopImg = resolveAsset(images, "desktop");
  const imgSrc = resolveAsset(images, size);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !videoSrc) return;
    const applyRate = () => {
      el.playbackRate = HERO_VIDEO_RATE;
      el.defaultPlaybackRate = HERO_VIDEO_RATE;
    };
    applyRate();
    el.addEventListener("loadedmetadata", applyRate);
    el.addEventListener("play", applyRate);
    return () => {
      el.removeEventListener("loadedmetadata", applyRate);
      el.removeEventListener("play", applyRate);
    };
  }, [videoSrc]);

  return (
    <div className="fp-hero-bg" aria-hidden="true">
      {videoSrc ? (
        <video
          key={videoSrc}
          ref={videoRef}
          className="fp-hero-bg-media"
          autoPlay
          muted
          loop
          playsInline
          poster={imgSrc}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : imgSrc ? (
        <picture>
          {mobileImg && (
            <source media="(max-width: 560px)" srcSet={mobileImg} />
          )}
          {tabletImg && (
            <source
              media="(min-width: 561px) and (max-width: 900px)"
              srcSet={tabletImg}
            />
          )}
          <img
            className="fp-hero-bg-media"
            src={desktopImg ?? imgSrc}
            alt=""
          />
        </picture>
      ) : null}
      <div className="fp-hero-bg-scrim" />
    </div>
  );
}
