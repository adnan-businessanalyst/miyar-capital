"use client";

import { usePathname } from "next/navigation";
import { LanguageProvider } from "../i18n/LanguageContext";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Disclaimer } from "./Disclaimer";
import { WhatsAppWidget } from "./WhatsAppWidget";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const hideDisclaimer = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");

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
