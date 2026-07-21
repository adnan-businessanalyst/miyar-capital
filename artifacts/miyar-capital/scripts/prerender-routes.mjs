/**
 * Routes prerendered after Vite build (see scripts/prerender.mjs).
 *
 * When you add a public marketing Route in src/App.tsx, add the same path here
 * so crawlers get real HTML. Skip redirects (e.g. /front-page) and catch-alls.
 *
 * Language is client-only (defaults to EN). Prerendered HTML is English; Arabic
 * is applied after hydration when the user toggles language.
 */
export const PRERENDER_ROUTES = [
  "/",
  "/who-we-are",
  "/board-of-directors",
  "/executive-team",
  "/governance-independence",
  "/shariah-principles",
  "/asset-management",
  "/investment-banking",
  "/product",
  "/dpm",
  "/private-markets",
  "/rakiza",
  "/financial-reports",
  "/annual-reports",
  "/investment-advisory",
  "/arrangement-management",
  "/investment-management",
  "/murabaha-fund",
  "/saudi-equity-fund",
  "/asset-management/liquidity-fi",
  "/equity-management",
  "/real-assets",
  "/asset-management/equity-management",
  "/asset-management/real-assets",
  "/asset-management/institutional-family-office",
  "/investment-banking/capital-markets-advisory",
  "/investment-banking/mergers-acquisitions",
  "/investment-banking/debt-financing-arrangement",
  "/investment-banking/valuation-financial-advisory",
  "/investment-banking/real-estate-private-arrangements",
  "/investment-banking/register-interest",
  "/insights",
  "/disclosures",
  "/fatca",
  "/privacy-policy",
];
