import type { Metadata } from "next";
import Script from "next/script";
import { SiteChrome } from "@/components/SiteChrome";
import { SITE_META } from "@/site/defaults";
import { SITE_ORIGIN, socialMetadata } from "@/site/social";
import "@emran-alhaddad/saudi-riyal-font/index.css";
import "@/index.css";

const social = socialMetadata();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: SITE_META.metaTitle || "Miyar Capital",
    template: "%s | Miyar Capital",
  },
  description: SITE_META.metaDescription || undefined,
  keywords: SITE_META.metaKeywords || undefined,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: social.openGraph,
  twitter: social.twitter,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteKey =
    process.env.RECAPTCHA_SITE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();
  const appEnv = (process.env.APP_ENV ?? "").trim().toLowerCase();
  const requireCaptcha =
    Boolean(siteKey) ||
    appEnv === "production" ||
    appEnv === "prod" ||
    process.env.VERCEL_ENV === "production";

  const bootScript = [
    `window.__MIYAR_REQUIRE_RECAPTCHA__=${requireCaptcha ? "true" : "false"};`,
    siteKey
      ? `window.__MIYAR_RECAPTCHA_SITE_KEY__=${JSON.stringify(siteKey)};`
      : "",
  ]
    .filter(Boolean)
    .join("");

  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body dir="rtl">
        <SiteChrome>{children}</SiteChrome>
        {bootScript ? (
          <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        ) : null}
        {siteKey ? (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
