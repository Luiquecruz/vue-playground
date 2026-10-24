# Weather Watchlist

Full-stack sample application: save cities to a watchlist and check their current weather.

| Layer    | Stack                                                                                   |
| -------- | --------------------------------------------------------------------------------------- |
| Frontend | Nuxt 4, Vue 3 Composition API, TypeScript, Pinia setup stores, `$fetch` (ofetch)         |
| Backend  | Node 24, Fastify 5, TypeScript, Zod, mysql2, ioredis, native `fetch`                     |
| Data     | MySQL 8.4 (watchlist), Redis 8 (cache)                                                  |
| Tests    | Vitest, `@nuxt/test-utils`, `@vue/test-utils`, happy-dom, Fastify `inject` + real MySQL/Redis |
| Runtime  | Docker Compose                                                                          |

## Architecture

```
Browser ──► Nuxt (SSR + BFF proxy /api/**) ──► Fastify API ──► MySQL
   │                                               │
   │                                               ├──► Redis (cities list + weather cache)
   │                                               └──► Open-Meteo Forecast API
   └──► Open-Meteo Geocoding API (city search)
```

The frontend consumes two different API services:

1. **Watchlist API** (own backend, via the Nuxt server proxy `server/api/[...path].ts`) — list, create and delete cities, read weather reports.
2. **Open-Meteo Geocoding API** (public, called from the browser) — search cities by name.

The backend consumes the **Open-Meteo Forecast API** and caches each report in Redis per coordinate
(`WEATHER_CACHE_TTL_SECONDS`, default 10 min). The city list is cached under `cities:all` and invalidated on every write.
Responses carry `cached: true|false`, displayed as a badge in the UI.

## Pages

| Route    | Description                                                                                  |
| -------- | -------------------------------------------------------------------------------------------- |
| `/`      | Weather watchlist: search, add, remove cities and read their current weather                  |
| `/tasks` | Backlog of tasks to evolve the app, filterable by area, complexity and status; progress kept in a cookie |

The backlog lives in `frontend/app/data/backlog.ts`. Each task has an id, area, complexity, touched layers,
description and acceptance criteria.

## Running

```bash
make up          # docker compose up --build -d
open http://localhost:3000
make down
```

| Service  | URL / port              |
| -------- | ----------------------- |
| Frontend | http://localhost:3000   |
| Backend  | http://localhost:3001   |
| MySQL    | localhost:3307 (app/app) |
| Redis    | localhost:6380          |

## Tests

```bash
make test            # both suites inside Docker
make test-backend    # integration tests against real MySQL (weather_test) and Redis (db 1)
make test-frontend   # unit + Nuxt runtime tests
```

Backend (`backend/test`): endpoints exercised through `app.inject` against real MySQL and Redis containers, Open-Meteo stubbed
through an injected `fetch`. Covers CRUD, validation, conflicts, cache hits and invalidation, upstream failures.

Frontend (`frontend/test`):

- `unit/` — services and utils in a plain Node environment.
- `nuxt/stores` — Pinia stores with `registerEndpoint` mocking the backend and `mockNuxtImport` mocking the geocoding service.
- `nuxt/components` — components mounted with `mountSuspended`, asserting rendering and emitted events.
- `nuxt/pages` — index page integration flow: load watchlist, search, add a city and render its weather.

## Local development without Docker for the apps

```bash
docker compose up -d mysql redis
cd backend && cp .env.example .env && npm install && npm run dev
cd frontend && npm install && npm run dev
```

## API

| Method | Path                     | Description                              |
| ------ | ------------------------ | ---------------------------------------- |
| GET    | `/health`                | Health check                             |
| GET    | `/api/cities`            | List cities (cached)                     |
| POST   | `/api/cities`            | Create city `{ name, country, latitude, longitude }` |
| DELETE | `/api/cities/:id`        | Delete city                              |
| GET    | `/api/cities/:id/weather` | Current weather of the city (cached)    |

## Project layout

```
backend/
  src/config            environment parsing (Zod)
  src/infrastructure    MySQL pool + migration, Redis cache store
  src/modules/cities    repository, service, routes, schema
  src/modules/weather   Open-Meteo client, service, routes
  test/                 integration tests
frontend/
  app/components        base/, city/, weather/ presentational components
  app/composables       service composables bound to the Nuxt app
  app/services          API clients (backend + geocoding)
  app/stores            Pinia setup stores (cities, weather, citySearch, backlog)
  app/data              static backlog for the /tasks page
  app/layouts           default layout with the main navigation
  app/pages             index and tasks pages wiring stores and components
  server/api            BFF proxy to the backend
  test/                 unit and Nuxt runtime tests
docker/mysql/init       test database bootstrap
compose.yaml
```
