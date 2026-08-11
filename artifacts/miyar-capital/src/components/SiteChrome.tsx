"use client";

import { usePathname } from "next/navigation";
import { LanguageProvider } from "../i18n/LanguageContext";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppWidget } from "./WhatsAppWidget";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
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
      <Footer />
      <WhatsAppWidget />
    </LanguageProvider>
  );
}
