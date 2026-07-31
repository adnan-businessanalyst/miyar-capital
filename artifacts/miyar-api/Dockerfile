# Context: artifacts/miyar-api (set Railway Root Directory to this folder).
FROM node:22-bookworm-slim AS build
WORKDIR /app
# Bust Railway/Metal layer cache when this value changes.
ARG CACHEBUST=2026-07-31-careers-detail
RUN echo "cachebust=$CACHEBUST"
COPY package.json tsconfig.json ./
COPY src ./src
RUN npm install
RUN npm run build
RUN npm prune --omit=dev \
  && test -f dist/jobs/routes.js \
  && test -f dist/news/routes.js \
  && test -f dist/funds/routes.js \
  && grep -q registerFundRoutes dist/app.js

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
ARG CACHEBUST=2026-07-31-careers-detail
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
RUN test -f dist/jobs/routes.js && test -f dist/news/routes.js && test -f dist/funds/routes.js
EXPOSE 8080
CMD ["node", "dist/index.js"]
