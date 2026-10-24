FROM node:24-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./

FROM base AS dependencies
RUN npm ci

FROM dependencies AS test
COPY . .
CMD ["npm", "test"]

FROM dependencies AS build
COPY . .
RUN npm run build

FROM base AS production
ENV NODE_ENV=production
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3001
HEALTHCHECK --interval=10s --timeout=3s --retries=5 CMD node -e "fetch('http://127.0.0.1:3001/health').then(response => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))"
CMD ["node", "dist/server.js"]
