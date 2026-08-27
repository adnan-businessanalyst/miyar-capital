import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { resolveAppEnv } from "./env.js";

const envPath = resolve(process.cwd(), ".env");
if (existsSync(envPath) && typeof process.loadEnvFile === "function") {
  process.loadEnvFile(envPath);
}

const port = Number(process.env.PORT || 4000);
const app = createApp();

serve({ fetch: app.fetch, port, hostname: "0.0.0.0" }, (info) => {
  console.log(
    `[miyar-api] listening on http://0.0.0.0:${info.port} env=${resolveAppEnv()}`,
  );
});
