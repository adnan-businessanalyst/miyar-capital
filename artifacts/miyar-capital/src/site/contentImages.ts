/**
 * Page/content media under src/assets/content/.
 * Images: .svg | .avif | .webp | .jpg | .jpeg | .png (same basename).
 * Videos: .mp4 (same basename).
 * Image preference: svg → avif → webp → jpg → jpeg → png.
 */

import { resolveAssetUrl } from "./resolveAssetUrl";

const contentModules = import.meta.glob(
  "../assets/content/*.{svg,SVG,avif,AVIF,webp,WEBP,jpg,JPG,jpeg,JPEG,png,PNG}",
  { eager: true, import: "default" },
) as Record<string, string>;

const contentVideoModules = import.meta.glob(
  "../assets/content/*.{mp4,MP4}",
  { eager: true, import: "default" },
) as Record<string, string>;

function content(basename: string): string {
  return resolveAssetUrl(contentModules, basename);
}

function contentVideo(basename: string): string {
  return resolveAssetUrl(contentVideoModules, basename);
}

export const CONTENT_IMAGES = {
  advisory_step3: content("advisory_step3"),
  advisory_step4: content("advisory_step4"),
  man_on_phone: content("man_on_phone"),
  app_bg: content("app-bg"),
  app_phone_screen: content("app-phone-screen"),
  client_dpm: content("client-dpm"),
  client_ifo: content("client-ifo"),
  pillar_equity: content("pillar_equity"),
  pillar_liquidity: content("pillar_liquidity"),
  pillar_private_markets: content("pillar_private_markets"),
  pillar_real_assets: content("pillar_real_assets"),
  private_offers: content("private_offers"),
  service_asset_management: content("service-asset-management"),
  service_investment_banking: content("service-investment-banking"),
  wm_independent_thinking: content("wm-independent-thinking"),
  wm_long_term_partnership: content("wm-long-term-partnership"),
  wm_tailored_strategies: content("wm-tailored-strategies"),
  wm_transparent_reporting: content("wm-transparent-reporting"),
  wm_understanding_goals: content("wm-understanding-goals"),
} as const;

/** Optional short looping videos (preferred over still when both exist). */
export const CONTENT_VIDEOS = {
  app_phone_screen: contentVideo("app-phone-screen"),
  client_dpm: contentVideo("client-dpm"),
  client_ifo: contentVideo("client-ifo"),
  pillar_equity: contentVideo("pillar_equity"),
  pillar_liquidity: contentVideo("pillar_liquidity"),
  pillar_private_markets: contentVideo("pillar_private_markets"),
  pillar_real_assets: contentVideo("pillar_real_assets"),
} as const;
