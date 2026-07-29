# Build context = monorepo root (Railway Root Directory empty).
FROM node:22-bookworm-slim AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.14.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml preinstall.mjs ./
COPY artifacts/miyar-api ./artifacts/miyar-api
COPY artifacts/miyar-capital/package.json ./artifacts/miyar-capital/package.json
RUN pnpm install --frozen-lockfile --filter @workspace/miyar-api...
RUN pnpm --filter @workspace/miyar-api run build
RUN pnpm --filter @workspace/miyar-api deploy --prod --legacy /out

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /out ./
EXPOSE 8080
CMD ["node", "dist/index.js"]
