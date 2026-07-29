/**
 * EN → AR text via MyMemory (no API key). Optional override:
 * TRANSLATE_ENDPOINT=https://api.mymemory.translated.net/get
 */
const DEFAULT_ENDPOINT = "https://api.mymemory.translated.net/get";
const CHUNK = 450;

function endpoint(): string {
  return (process.env.TRANSLATE_ENDPOINT || DEFAULT_ENDPOINT).replace(/\/$/, "");
}

async function translateChunk(text: string): Promise<string> {
  const url = `${endpoint()}?q=${encodeURIComponent(text)}&langpair=en|ar`;
  const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  if (!res.ok) {
    throw new Error(`Translate request failed (${res.status})`);
  }
  const json = (await res.json()) as {
    responseData?: { translatedText?: string };
    responseStatus?: number | string;
  };
  const out = json.responseData?.translatedText?.trim();
  if (!out) {
    throw new Error("Translate response was empty");
  }
  // MyMemory sometimes returns the English QUERY when quota is hit
  if (out.toUpperCase().startsWith("MYMEMORY WARNING")) {
    throw new Error(out);
  }
  return out;
}

/** Translate English text to Arabic. Returns original text if translation fails. */
export async function translateEnToAr(text: string): Promise<string> {
  const input = text.trim();
  if (!input) return "";

  // Numbers / years / short codes often stay the same
  if (/^[\d\s./\-–—]+$/.test(input)) return input;

  try {
    if (input.length <= CHUNK) {
      return await translateChunk(input);
    }

    const parts: string[] = [];
    let rest = input;
    while (rest.length > 0) {
      let slice = rest.slice(0, CHUNK);
      if (rest.length > CHUNK) {
        const breakAt = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf("\n"), slice.lastIndexOf(" "));
        if (breakAt > CHUNK * 0.4) slice = rest.slice(0, breakAt + 1);
      }
      parts.push(await translateChunk(slice.trim()));
      rest = rest.slice(slice.length).trimStart();
    }
    return parts.join(" ").trim();
  } catch (e) {
    console.warn("[translate] EN→AR failed, keeping English", e);
    return input;
  }
}

/** Fill empty Arabic fields from English counterparts. */
export async function ensureArabicFields<T extends Record<string, string>>(
  fields: T,
  pairs: Array<[enKey: keyof T & string, arKey: keyof T & string]>,
): Promise<T> {
  const next = { ...fields };
  for (const [enKey, arKey] of pairs) {
    const en = (next[enKey] ?? "").trim();
    const ar = (next[arKey] ?? "").trim();
    if (en && !ar) {
      next[arKey] = (await translateEnToAr(en)) as T[keyof T & string];
    }
  }
  return next;
}
