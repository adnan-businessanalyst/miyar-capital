"use client";

import { usePathname } from "next/navigation";
import { LanguageProvider } from "../i18n/LanguageContext";
import { stripLocalePrefix } from "../i18n/locale";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Disclaimer } from "./Disclaimer";
import { WhatsAppWidget } from "./WhatsAppWidget";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const barePath = stripLocalePrefix(pathname);
  const hideDisclaimer = barePath === "/";
  const isAdmin =
    pathname.startsWith("/my-access-nimda") ||
    pathname.startsWith("/en/my-access-nimda");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <LanguageProvider>
      <Header />
      {children}
      {!hideDisclaimer ? <Disclaimer /> : null}
      <Footer />
      <WhatsAppWidget />
    </LanguageProvider>
  );
}
