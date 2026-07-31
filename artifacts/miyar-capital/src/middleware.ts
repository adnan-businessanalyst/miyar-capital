import { NextResponse, type NextRequest } from "next/server";
import {
  DEFAULT_LANG,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  getLocaleFromPathname,
  isLocaleExemptPath,
  localePath,
  stripLocalePrefix,
} from "./i18n/locale";

function isStaticAsset(pathname: string): boolean {
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

function withLocaleCookie(res: NextResponse, lang: "en" | "ar"): NextResponse {
  res.cookies.set(LOCALE_COOKIE, lang, {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax",
  });
  return res;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    isLocaleExemptPath(pathname) ||
    isStaticAsset(pathname) ||
    pathname.startsWith("/en/api") ||
    pathname.startsWith("/en/my-access-nimda") ||
    pathname.startsWith("/en/admin")
  ) {
    return NextResponse.next();
  }

  const pathLocale = getLocaleFromPathname(pathname);
  const pref = request.cookies.get(LOCALE_COOKIE)?.value;
  const preferred: "en" | "ar" | null =
    pref === "en" || pref === "ar" ? pref : null;

  // English URL → rewrite to unprefixed page, keep /en in the browser.
  if (pathLocale === "en") {
    const bare = stripLocalePrefix(pathname);
    const url = request.nextUrl.clone();
    url.pathname = bare;
    return withLocaleCookie(NextResponse.rewrite(url), "en");
  }

  // Returning English users: send unprefixed pages to /en…
  // (URL is otherwise Arabic-default.)
  if (preferred === "en") {
    const url = request.nextUrl.clone();
    url.pathname = localePath(pathname, "en");
    return withLocaleCookie(NextResponse.redirect(url), "en");
  }

  return withLocaleCookie(NextResponse.next(), preferred ?? DEFAULT_LANG);
}

export const config = {
  matcher: [
    "/",
    "/en",
    "/en/:path*",
    "/((?!_next/static|_next/image|api|my-access-nimda|admin|.*\\..*).*)",
  ],
};
