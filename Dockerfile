# Only used if Railway Root Directory is empty (prefer artifacts/miyar-api instead).
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY artifacts/miyar-api/package.json artifacts/miyar-api/tsconfig.json ./
COPY artifacts/miyar-api/src ./src
RUN npm install
RUN npm run build
RUN npm prune --omit=dev

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 8080
CMD ["node", "dist/index.js"]
