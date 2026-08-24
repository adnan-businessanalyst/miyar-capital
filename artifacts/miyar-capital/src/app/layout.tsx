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
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

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
        {siteKey ? (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
