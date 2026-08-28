import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";
import { Readable } from "node:stream";
import { isHostedApiConfigured, resolveApiInternalUrl } from "./appEnv";

const REQ_SKIP = new Set([
  "accept-encoding",
  "connection",
  "content-length",
  "host",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
]);

const PROXY_CLAIM_HEADERS = new Set(["x-miyar-client-ip", "x-miyar-proxy"]);

function firstHop(raw: string | null): string {
  return raw?.split(",")[0]?.trim() ?? "";
}

/** Visitor IP as Vercel set it — not a client-supplied X-Forwarded-For chain. */
function visitorIp(request: Request): string {
  return (
    firstHop(request.headers.get("x-vercel-forwarded-for")) ||
    request.headers.get("x-real-ip")?.trim() ||
    firstHop(request.headers.get("x-forwarded-for"))
  );
}

const RES_SKIP = new Set([
  "connection",
  "content-encoding",
  "transfer-encoding",
]);

function requestHeaders(request: Request, bodyLength: number): Record<string, string | number> {
  const headers: Record<string, string | number> = {};
  request.headers.forEach((value, key) => {
    const name = key.toLowerCase();
    if (REQ_SKIP.has(name) || PROXY_CLAIM_HEADERS.has(name)) return;
    headers[name] = value;
  });
  if (bodyLength > 0) headers["content-length"] = bodyLength;

  const secret = process.env.API_PROXY_SECRET?.trim();
  const ip = visitorIp(request);
  if (secret && ip) {
    headers["x-miyar-client-ip"] = ip;
    headers["x-miyar-proxy"] = secret;
  }
  return headers;
}

function responseHeaders(raw: httpIncomingHeaders): Headers {
  const headers = new Headers();
  for (const [key, value] of Object.entries(raw)) {
    if (!value) continue;
    if (RES_SKIP.has(key.toLowerCase())) continue;
    if (key.toLowerCase() === "set-cookie") {
      for (const cookie of Array.isArray(value) ? value : [value]) {
        headers.append("set-cookie", cookie);
      }
      continue;
    }
    headers.set(key, Array.isArray(value) ? value.join(", ") : value);
  }
  return headers;
}

type httpIncomingHeaders = NodeJS.Dict<string | string[]>;

function proxyViaNode(dest: string, request: Request, body: Buffer): Promise<Response> {
  const url = new URL(dest);
  const send = url.protocol === "https:" ? httpsRequest : httpRequest;

  return new Promise((resolve, reject) => {
    const req = send(
      dest,
      {
        method: request.method,
        headers: requestHeaders(request, body.length),
        timeout: 55_000,
      },
      (res) => {
        const web = Readable.toWeb(res) as ReadableStream<Uint8Array>;
        resolve(
          new Response(web, {
            status: res.statusCode ?? 502,
            statusText: res.statusMessage,
            headers: responseHeaders(res.headers),
          }),
        );
      },
    );
    req.on("timeout", () => {
      req.destroy(new Error("API request timed out"));
    });
    req.on("error", reject);
    if (body.length) req.write(body);
    req.end();
  });
}

/** Forward same-origin `/api/*` to miyar-api. Used by `app/api/[...path]`. */
export async function proxyApiRequest(request: Request, pathParts: string[]): Promise<Response> {
  if (!isHostedApiConfigured()) {
    return Response.json(
      {
        error:
          "API URL is not set on Vercel. Add RAILWAY_URL_PRODUCTION (production) or RAILWAY_URL_STAGING, set APP_ENV, and redeploy.",
      },
      { status: 503 },
    );
  }

  const origin = resolveApiInternalUrl();
  const incoming = new URL(request.url);
  const dest = `${origin}/api/${pathParts.join("/")}${incoming.search}`;
  const method = request.method.toUpperCase();
  const hasBody = method !== "GET" && method !== "HEAD";
  const body = hasBody ? Buffer.from(await request.arrayBuffer()) : Buffer.alloc(0);

  try {
    return await proxyViaNode(dest, request, body);
  } catch (err) {
    const detail = err instanceof Error ? err.message : "network error";
    console.error("[api-proxy]", dest, detail);
    return Response.json(
      {
        error:
          "Cannot reach the API. Confirm Railway is healthy and RAILWAY_URL_PRODUCTION on Vercel is the Railway origin (no /api suffix).",
      },
      { status: 502 },
    );
  }
}
