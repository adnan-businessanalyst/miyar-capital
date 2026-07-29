# Monorepo-root build context (Railway Root Directory empty).
# Prefer setting Root Directory to `artifacts/miyar-api` and using that folder's Dockerfile instead.
FROM node:22-bookworm-slim AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.14.0 --activate
COPY artifacts/miyar-api/package.json artifacts/miyar-api/tsconfig.json ./
COPY artifacts/miyar-api/src ./src
RUN pnpm install
RUN pnpm run build
RUN pnpm prune --prod

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 8080
CMD ["node", "dist/index.js"]
