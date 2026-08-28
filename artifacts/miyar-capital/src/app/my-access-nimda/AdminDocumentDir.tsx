"use client";

import { useEffect } from "react";

/** Keep the English admin chrome LTR even though the public site defaults to RTL. */
export function AdminDocumentDir() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlDir: html.getAttribute("dir"),
      htmlLang: html.getAttribute("lang"),
      bodyDir: body.getAttribute("dir"),
      bodyLang: body.getAttribute("lang"),
    };

    html.setAttribute("dir", "ltr");
    html.setAttribute("lang", "en");
    body.setAttribute("dir", "ltr");
    body.setAttribute("lang", "en");

    return () => {
      if (prev.htmlDir) html.setAttribute("dir", prev.htmlDir);
      else html.removeAttribute("dir");
      if (prev.htmlLang) html.setAttribute("lang", prev.htmlLang);
      else html.removeAttribute("lang");
      if (prev.bodyDir) body.setAttribute("dir", prev.bodyDir);
      else body.removeAttribute("dir");
      if (prev.bodyLang) body.setAttribute("lang", prev.bodyLang);
      else body.removeAttribute("lang");
    };
  }, []);

  return null;
}
