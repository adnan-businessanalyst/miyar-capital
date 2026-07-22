"use client";

import { useEffect, useRef, useState } from "react";
import { mediaUrl, mediaVideoUrl } from "../site/resolveAssetUrl";

type HeroSize = "mobile" | "tablet" | "desktop";

/** Hero background playback speed (1 = normal). */
const HERO_VIDEO_RATE = 0.5;

const HERO_IMAGES: Partial<Record<HeroSize, string>> = {
  mobile: mediaUrl("hero", "hero-mobile") || undefined,
  tablet: mediaUrl("hero", "hero-tablet") || undefined,
  desktop: mediaUrl("hero", "hero-desktop") || undefined,
};

const HERO_VIDEOS: Partial<Record<HeroSize, string>> = {
  mobile: mediaVideoUrl("hero", "hero-mobile") || undefined,
  tablet: mediaVideoUrl("hero", "hero-tablet") || undefined,
  desktop: mediaVideoUrl("hero", "hero-desktop") || undefined,
};

function getViewportSize(): HeroSize {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia("(max-width: 560px)").matches) return "mobile";
  if (window.matchMedia("(min-width: 561px) and (max-width: 900px)").matches) {
    return "tablet";
  }
  return "desktop";
}

/**
 * Prefer an image for the active size, falling back desktop → tablet → mobile.
 * Videos do NOT fall across sizes (avoids downloading desktop hero video on phones).
 */
function resolveImage(preferred: HeroSize): string | undefined {
  if (HERO_IMAGES[preferred]) return HERO_IMAGES[preferred];
  for (const size of ["desktop", "tablet", "mobile"] as HeroSize[]) {
    if (HERO_IMAGES[size]) return HERO_IMAGES[size];
  }
  return undefined;
}

/**
 * Hardcoded responsive hero media from `public/media/hero/`.
 * Video only when a file exists for the active viewport size; otherwise stills.
 */
export function HeroBackground() {
  const [size, setSize] = useState<HeroSize>("desktop");
  const [hydrated, setHydrated] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const update = () => setSize(getViewportSize());
    update();
    setHydrated(true);
    const mqMobile = window.matchMedia("(max-width: 560px)");
    const mqTablet = window.matchMedia("(min-width: 561px) and (max-width: 900px)");
    mqMobile.addEventListener("change", update);
    mqTablet.addEventListener("change", update);
    return () => {
      mqMobile.removeEventListener("change", update);
      mqTablet.removeEventListener("change", update);
    };
  }, []);

  // Exact-size video only (no desktop fallback on mobile/tablet).
  const videoSrc = hydrated ? HERO_VIDEOS[size] : undefined;
  const mobileImg = HERO_IMAGES.mobile || HERO_IMAGES.desktop;
  const tabletImg = HERO_IMAGES.tablet || HERO_IMAGES.desktop;
  const desktopImg = HERO_IMAGES.desktop;
  const imgSrc = resolveImage(size);

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
          preload="metadata"
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
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      ) : null}
      <div className="fp-hero-bg-scrim" />
    </div>
  );
}
