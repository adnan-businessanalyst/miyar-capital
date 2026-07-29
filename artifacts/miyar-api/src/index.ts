import { serve } from "@hono/node-server";
import { createApp } from "./app.js";

const port = Number(process.env.PORT || 4000);
const app = createApp();

serve({ fetch: app.fetch, port, hostname: "0.0.0.0" }, (info) => {
  console.log(`[miyar-api] listening on http://0.0.0.0:${info.port}`);
});
