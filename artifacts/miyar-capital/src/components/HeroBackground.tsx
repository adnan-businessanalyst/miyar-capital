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

/** Optional second desktop clip — rotates with hero-desktop on large screens. */
const HERO_DESKTOP_ALT = mediaVideoUrl("hero", "hero-desktop-alt") || undefined;
const HERO_DESKTOP_ALT_POSTER =
  mediaUrl("hero", "hero-desktop-alt") || undefined;

const DESKTOP_PLAYLIST = [
  HERO_VIDEOS.desktop,
  HERO_DESKTOP_ALT,
].filter((src): src is string => Boolean(src));

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
 * Desktop rotates through hero-desktop (+ hero-desktop-alt when present).
 */
export function HeroBackground() {
  const [size, setSize] = useState<HeroSize>("desktop");
  const [hydrated, setHydrated] = useState(false);
  const [desktopIndex, setDesktopIndex] = useState(0);
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

  const isDesktop = size === "desktop";
  const rotating = isDesktop && DESKTOP_PLAYLIST.length > 1;

  const videoSrc = hydrated
    ? isDesktop
      ? DESKTOP_PLAYLIST[desktopIndex % Math.max(DESKTOP_PLAYLIST.length, 1)]
      : HERO_VIDEOS[size]
    : undefined;

  const mobileImg = HERO_IMAGES.mobile || HERO_IMAGES.desktop;
  const tabletImg = HERO_IMAGES.tablet || HERO_IMAGES.desktop;
  const desktopImg = HERO_IMAGES.desktop;
  const imgSrc =
    isDesktop &&
    rotating &&
    DESKTOP_PLAYLIST[desktopIndex % DESKTOP_PLAYLIST.length] === HERO_DESKTOP_ALT &&
    HERO_DESKTOP_ALT_POSTER
      ? HERO_DESKTOP_ALT_POSTER
      : resolveImage(size);

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

  useEffect(() => {
    if (!rotating) return;
    const el = videoRef.current;
    if (!el) return;
    const onEnded = () => {
      setDesktopIndex((i) => (i + 1) % DESKTOP_PLAYLIST.length);
    };
    el.addEventListener("ended", onEnded);
    return () => el.removeEventListener("ended", onEnded);
  }, [rotating, videoSrc]);

  return (
    <div className="fp-hero-bg" aria-hidden="true">
      {videoSrc ? (
        <video
          key={videoSrc}
          ref={videoRef}
          className="fp-hero-bg-media"
          autoPlay
          muted
          loop={!rotating}
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
