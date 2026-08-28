# Only used if Railway Root Directory is empty (prefer artifacts/miyar-api instead).
FROM public.ecr.aws/docker/library/node:22-bookworm-slim AS build
WORKDIR /app
ARG CACHEBUST=2026-07-30-jobs-news
RUN echo "cachebust=$CACHEBUST"
COPY artifacts/miyar-api/package.json artifacts/miyar-api/tsconfig.json ./
COPY artifacts/miyar-api/src ./src
RUN npm install
RUN npm run build
RUN npm prune --omit=dev \
  && test -f dist/jobs/routes.js \
  && test -f dist/news/routes.js \
  && grep -q registerJobRoutes dist/app.js

FROM public.ecr.aws/docker/library/node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
ARG CACHEBUST=2026-07-30-jobs-news
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
RUN test -f dist/jobs/routes.js && test -f dist/news/routes.js
EXPOSE 8080
CMD ["node", "dist/index.js"]
