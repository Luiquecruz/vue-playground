FROM node:24-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

FROM dependencies AS source
COPY . .
RUN npx nuxt prepare

FROM source AS test
CMD ["npm", "test"]

FROM source AS build
RUN npm run build

FROM node:24-alpine AS production
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000
COPY --from=build /app/.output ./.output
USER node
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
