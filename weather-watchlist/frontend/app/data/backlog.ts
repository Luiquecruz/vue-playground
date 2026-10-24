import type { BacklogArea, BacklogComplexity, BacklogLayer, BacklogTask } from '~/types/backlog'

export const BACKLOG_AREA_LABELS: Record<BacklogArea, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  cache: 'Cache',
  infrastructure: 'Infrastructure',
  testing: 'Testing',
  fullstack: 'Full stack',
}

export const BACKLOG_COMPLEXITY_LABELS: Record<BacklogComplexity, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export const BACKLOG_LAYER_LABELS: Record<BacklogLayer, string> = {
  ui: 'Vue UI',
  state: 'Pinia',
  bff: 'Nuxt server',
  api: 'Fastify API',
  database: 'MySQL',
  cache: 'Redis',
  docker: 'Docker',
  ci: 'CI',
  tests: 'Tests',
}

export const BACKLOG_TASKS: readonly BacklogTask[] = [
  {
    id: 'FE-01',
    title: 'Remember the selected city',
    area: 'frontend',
    complexity: 'low',
    layers: ['ui', 'state'],
    description:
      'The selected city is lost on every reload. Persist `selectedCityId` with `useCookie` inside the cities store so the server render already highlights the same city and its weather loads right away.',
    acceptanceCriteria: [
      'Reloading the page keeps the selected city highlighted',
      'The weather of the persisted city is fetched without a click',
      'Removing the selected city clears the cookie',
    ],
  },
  {
    id: 'FE-02',
    title: 'Empty and error states for the city search',
    area: 'frontend',
    complexity: 'low',
    layers: ['ui', 'tests'],
    description:
      'The search shows nothing when Open-Meteo finds no match and its errors appear far from the input. Render a "No cities found" message, show the error below the field and clear the term on Escape inside `CitySearch.vue`.',
    acceptanceCriteria: [
      'An empty result for a finished search with 2+ characters shows a message',
      'Search errors render below the input',
      'Escape clears the term and the results',
      'Component tests cover the three states',
    ],
  },
  {
    id: 'FE-03',
    title: 'Accessible combobox for the search results',
    area: 'frontend',
    complexity: 'medium',
    layers: ['ui', 'tests'],
    description:
      'Turn `CitySearch` into an ARIA combobox: arrow keys move the active option, Enter adds it, `aria-activedescendant` points to the highlighted result.',
    acceptanceCriteria: [
      'A city can be added using only the keyboard',
      'Input, list and items expose combobox, listbox and option roles',
      'Tests simulate keydown events for navigation and selection',
    ],
  },
  {
    id: 'FE-04',
    title: 'Optimistic city removal',
    area: 'frontend',
    complexity: 'medium',
    layers: ['ui', 'state', 'tests'],
    description:
      'Removing a city waits for the API before updating the list. Remove it immediately in the store and roll back to the original position when the DELETE request fails.',
    acceptanceCriteria: [
      'The card disappears before the request resolves',
      'On failure the city returns to the same position and an error is shown',
      'Store test uses a failing `registerEndpoint` handler',
    ],
  },
  {
    id: 'FE-05',
    title: 'City detail page',
    area: 'frontend',
    complexity: 'medium',
    layers: ['ui', 'state', 'bff'],
    description:
      'Create `pages/cities/[id].vue` with a dynamic route that loads the city weather through `useAsyncData`. Unknown ids throw `createError({ statusCode: 404 })` rendered by a custom `error.vue`.',
    acceptanceCriteria: [
      'Each city card links to its detail page',
      'The detail page is server rendered with the weather data',
      'A missing city shows the custom 404 page',
    ],
  },
  {
    id: 'FE-06',
    title: 'Toast notifications',
    area: 'frontend',
    complexity: 'medium',
    layers: ['ui', 'state'],
    description:
      'Build a `useToast` composable and a `ToastContainer` component using `Teleport` and `TransitionGroup`. Replace the page level alerts for add and remove feedback with toasts.',
    acceptanceCriteria: [
      'Adding or removing a city shows a success toast',
      'Toasts dismiss automatically after 4 seconds and on click',
      'The container is announced through `aria-live`',
    ],
  },
  {
    id: 'FE-07',
    title: 'Theme toggle',
    area: 'frontend',
    complexity: 'low',
    layers: ['ui'],
    description:
      'Add a light, dark and system theme switch. Store the preference in a cookie and set `data-theme` on `<html>` through `useHead` so the CSS tokens in `main.css` switch without a flash.',
    acceptanceCriteria: [
      'The chosen theme survives reloads',
      'No flash of the wrong theme on server render',
      'System mode follows `prefers-color-scheme`',
    ],
  },
  {
    id: 'BE-01',
    title: 'Hourly forecast endpoint',
    area: 'backend',
    complexity: 'medium',
    layers: ['api', 'cache', 'tests'],
    description:
      'Expose `GET /api/cities/:id/forecast?hours=24` using the Open-Meteo `hourly` parameters. Validate the query with Zod and cache the response for 30 minutes.',
    acceptanceCriteria: [
      '`hours` accepts 1 to 48 and defaults to 24',
      'The cache key includes the coordinates and the number of hours',
      'Integration tests stub `fetch` and assert cache hits',
    ],
  },
  {
    id: 'BE-02',
    title: 'Rename a city',
    area: 'backend',
    complexity: 'low',
    layers: ['api', 'database', 'cache', 'tests'],
    description:
      'Add `PATCH /api/cities/:id` accepting `name` and `country`. Reuse the Zod schema with `.partial()` and invalidate the cached city list.',
    acceptanceCriteria: [
      'Returns 200 with the updated city',
      'Returns 404 for an unknown id and 400 for an empty payload',
      'The `cities:all` cache key is removed after the update',
    ],
  },
  {
    id: 'BE-03',
    title: 'Paginate and filter the city list',
    area: 'backend',
    complexity: 'medium',
    layers: ['api', 'database', 'cache', 'ui'],
    description:
      'Support `?page`, `?limit` and `?q` on `GET /api/cities`, returning `{ data, meta: { page, limit, total } }`. Cache each query and invalidate all of them on writes using a version key.',
    acceptanceCriteria: [
      '`limit` is capped at 50',
      '`q` filters by name with a LIKE query',
      'A write invalidates every cached page',
      'The frontend renders pagination controls',
    ],
  },
  {
    id: 'BE-04',
    title: 'Rate limiting with Redis',
    area: 'backend',
    complexity: 'medium',
    layers: ['api', 'cache', 'tests'],
    description:
      'Implement a fixed window rate limiter per IP using `INCR` and `EXPIRE` in a Fastify `onRequest` hook. Return 429 with `Retry-After` when the limit is exceeded.',
    acceptanceCriteria: [
      'Limit and window are configurable through environment variables',
      'Responses include `X-RateLimit-Remaining`',
      'An integration test exceeds the limit and receives 429',
    ],
  },
  {
    id: 'BE-05',
    title: 'OpenAPI documentation',
    area: 'backend',
    complexity: 'medium',
    layers: ['api'],
    description:
      'Move validation to route schemas with a Zod type provider and expose Swagger UI at `/docs` through `@fastify/swagger`.',
    acceptanceCriteria: [
      'Every endpoint documents params, body and responses',
      'Validation errors keep the current 400 response shape',
      'Handlers receive typed `request.body` and `request.params`',
    ],
  },
  {
    id: 'BE-06',
    title: 'Request ids and structured logs',
    area: 'backend',
    complexity: 'low',
    layers: ['api', 'bff'],
    description:
      'Generate an `x-request-id` in the Nuxt proxy, forward it to Fastify and use it as the request id. Redact sensitive headers from the logs.',
    acceptanceCriteria: [
      'Every backend log line carries the request id',
      'Responses echo the `x-request-id` header',
      'Authorization and cookie headers are redacted',
    ],
  },
  {
    id: 'DB-01',
    title: 'Versioned migrations',
    area: 'database',
    complexity: 'medium',
    layers: ['database', 'docker', 'tests'],
    description:
      'Replace `CREATE TABLE IF NOT EXISTS` in `database.ts` with numbered SQL files tracked in a `schema_migrations` table and an `npm run migrate` script.',
    acceptanceCriteria: [
      'Running the migrations twice changes nothing',
      'The backend container runs pending migrations on start',
      'The test context uses the same runner',
    ],
  },
  {
    id: 'DB-02',
    title: 'Weather history',
    area: 'database',
    complexity: 'high',
    layers: ['database', 'api', 'ui', 'tests'],
    description:
      'Persist each upstream weather fetch in a `weather_snapshots` table with a foreign key to `cities` (`ON DELETE CASCADE`). Expose `GET /api/cities/:id/history` and draw a temperature sparkline in the weather panel with plain SVG.',
    acceptanceCriteria: [
      'Only cache misses insert snapshots',
      'History returns the last 7 days ordered by observation time',
      'An index covers `city_id` and `observed_at`',
      'The sparkline renders without chart libraries',
    ],
  },
  {
    id: 'DB-03',
    title: 'Users and private watchlists',
    area: 'database',
    complexity: 'high',
    layers: ['database', 'api', 'bff', 'ui', 'state', 'cache'],
    description:
      'Add a `users` table, register and login endpoints with hashed passwords and an httpOnly session cookie handled by the Nuxt server. Scope cities by `user_id`.',
    acceptanceCriteria: [
      'Unauthenticated requests to `/api/cities` return 401',
      'Each user only sees and edits their own cities',
      'Uniqueness of coordinates is enforced per user',
      'Cache keys include the user id',
    ],
  },
  {
    id: 'CA-01',
    title: 'Cache hit ratio metrics',
    area: 'cache',
    complexity: 'low',
    layers: ['cache', 'api'],
    description:
      'Count hits and misses per namespace in `remember` using `HINCRBY` and expose them at `GET /api/metrics/cache`.',
    acceptanceCriteria: [
      'Metrics are split by namespace such as `cities` and `weather`',
      'The endpoint returns hits, misses and hit ratio',
      'Counting never fails the original request',
    ],
  },
  {
    id: 'CA-02',
    title: 'Stale while revalidate for weather',
    area: 'cache',
    complexity: 'high',
    layers: ['cache', 'api', 'ui', 'tests'],
    description:
      'Store weather with a soft and a hard TTL. After the soft TTL serve the stale value and refresh it in the background; when Open-Meteo fails, serve stale data instead of 502.',
    acceptanceCriteria: [
      'Responses expose `stale: true` when applicable',
      'An upstream failure with stale data returns 200',
      'The UI shows a stale indicator',
    ],
  },
  {
    id: 'CA-03',
    title: 'Cache stampede protection',
    area: 'cache',
    complexity: 'high',
    layers: ['cache', 'api', 'tests'],
    description:
      'Concurrent misses for the same key must call the upstream only once. Use a Redis lock with `SET NX PX` and make waiting requests read the fresh value.',
    acceptanceCriteria: [
      '10 parallel requests for the same city trigger a single fetch',
      'The lock is released when the upstream fails',
      'The lock expires if the process crashes',
    ],
  },
  {
    id: 'INF-01',
    title: 'Development compose with hot reload',
    area: 'infrastructure',
    complexity: 'medium',
    layers: ['docker'],
    description:
      'Create a `compose.dev.yaml` override running `nuxt dev` and `tsx watch` with bind mounts and named `node_modules` volumes, plus a `make dev` target.',
    acceptanceCriteria: [
      'Editing a Vue file hot reloads the browser',
      'Editing a backend file restarts the API',
      'Host `node_modules` never leaks into the containers',
    ],
  },
  {
    id: 'INF-02',
    title: 'Continuous integration',
    area: 'infrastructure',
    complexity: 'medium',
    layers: ['ci', 'tests', 'docker'],
    description:
      'Add a GitHub Actions workflow running typecheck and both test suites, with MySQL and Redis as service containers for the backend job.',
    acceptanceCriteria: [
      'The workflow runs on pull requests and on main',
      'npm dependencies are cached',
      'A type error or failing test blocks the merge',
    ],
  },
  {
    id: 'INF-03',
    title: 'Harden the container setup',
    area: 'infrastructure',
    complexity: 'medium',
    layers: ['docker'],
    description:
      'Move credentials out of `compose.yaml` into an `.env` file, add a frontend healthcheck, resource limits and read-only filesystems where possible.',
    acceptanceCriteria: [
      'No password is hardcoded in `compose.yaml`',
      'Every service has a healthcheck',
      '`docker compose config` validates with the example env file',
    ],
  },
  {
    id: 'QA-01',
    title: 'End-to-end tests with Playwright',
    area: 'testing',
    complexity: 'high',
    layers: ['tests', 'ui', 'docker'],
    description:
      'Cover the add, select and remove flow in a real browser against the compose stack. Intercept the geocoding request to keep the tests deterministic.',
    acceptanceCriteria: [
      'Tests run through a compose profile `e2e`',
      'Geocoding responses are stubbed with route interception',
      'Traces are kept for failed runs',
    ],
  },
  {
    id: 'QA-02',
    title: 'Coverage thresholds',
    area: 'testing',
    complexity: 'low',
    layers: ['tests', 'ci'],
    description: 'Add `@vitest/coverage-v8` to both packages with a `test:coverage` script and an 80% lines threshold.',
    acceptanceCriteria: [
      'Coverage reports are generated for frontend and backend',
      'The run fails below the threshold',
      'Generated files are ignored by git',
    ],
  },
  {
    id: 'QA-03',
    title: 'Backend unit tests with fakes',
    area: 'testing',
    complexity: 'low',
    layers: ['tests', 'api'],
    description:
      'Create an in-memory `CacheStore` and a fake repository to unit test `CityService` and `WeatherService` without containers, in a separate Vitest project.',
    acceptanceCriteria: [
      'Unit tests run without Docker',
      'Cache hit and miss paths are covered',
      'Integration tests stay in their own project',
    ],
  },
  {
    id: 'FS-01',
    title: 'Temperature unit preference',
    area: 'fullstack',
    complexity: 'medium',
    layers: ['ui', 'state', 'bff', 'api', 'cache', 'tests'],
    description:
      'Add a °C / °F toggle. The backend accepts `?unit=fahrenheit`, forwards `temperature_unit` to Open-Meteo and caches each unit separately.',
    acceptanceCriteria: [
      'The preference persists across reloads',
      'Each unit has its own cache entry',
      'Frontend and backend tests cover both units',
    ],
  },
  {
    id: 'FS-02',
    title: 'Live weather updates with SSE',
    area: 'fullstack',
    complexity: 'high',
    layers: ['api', 'bff', 'ui', 'state'],
    description:
      'Expose `GET /api/cities/:id/weather/stream` as Server-Sent Events, stream it through the Nuxt proxy and update the weather store from an `EventSource`.',
    acceptanceCriteria: [
      'The panel updates without reloading the page',
      'The connection closes when the panel unmounts',
      'The client reconnects after a network drop',
    ],
  },
  {
    id: 'FS-03',
    title: 'Internationalization',
    area: 'fullstack',
    complexity: 'medium',
    layers: ['ui', 'bff'],
    description:
      'Add `@nuxtjs/i18n` with English and Brazilian Portuguese, translate weather conditions and pass the locale to the geocoding `language` parameter.',
    acceptanceCriteria: [
      'A locale switcher changes every visible text',
      'The server render respects the locale cookie',
      'Geocoding results use the active language',
    ],
  },
  {
    id: 'FS-04',
    title: 'Serve this backlog from the API',
    area: 'fullstack',
    complexity: 'high',
    layers: ['database', 'api', 'cache', 'bff', 'ui', 'state', 'tests'],
    description:
      'Move this backlog from `app/data/backlog.ts` to a MySQL `backlog_tasks` table with a seed. Expose `GET /api/tasks` and `PATCH /api/tasks/:id` and replace the cookie progress with persisted status.',
    acceptanceCriteria: [
      'Tasks are seeded on the first start',
      'Marking a task as done persists in MySQL',
      'The list is cached and invalidated on updates',
      'The `/tasks` page keeps its filters working',
    ],
  },
]
