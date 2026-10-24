import Fastify, { type FastifyInstance, type FastifyServerOptions } from 'fastify'
import type { Pool } from 'mysql2/promise'
import { ZodError } from 'zod'
import type { Environment } from './config/environment.js'
import type { CacheStore } from './infrastructure/cache.js'
import { CityRepository } from './modules/cities/city.repository.js'
import { cityRoutes } from './modules/cities/city.routes.js'
import { CityService } from './modules/cities/city.service.js'
import { OpenMeteoClient } from './modules/weather/open-meteo.client.js'
import { weatherRoutes } from './modules/weather/weather.routes.js'
import { WeatherService } from './modules/weather/weather.service.js'
import { HttpError } from './shared/errors.js'

export interface AppDependencies {
  environment: Environment
  pool: Pool
  cache: CacheStore
  fetcher?: typeof fetch
  logger?: FastifyServerOptions['logger']
}

/**
 * Builds the Fastify application wiring every module.
 */
export function buildApp({ environment, pool, cache, fetcher, logger = false }: AppDependencies): FastifyInstance {
  const app = Fastify({ logger })

  const cityService = new CityService(new CityRepository(pool), cache, environment.CITIES_CACHE_TTL_SECONDS)
  const weatherService = new WeatherService(
    cityService,
    new OpenMeteoClient(environment.OPEN_METEO_BASE_URL, fetcher),
    cache,
    environment.WEATHER_CACHE_TTL_SECONDS,
  )

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: 'Validation failed', issues: error.issues })
    }

    if (error instanceof HttpError) {
      return reply.status(error.statusCode).send({ message: error.message })
    }

    request.log.error(error)
    return reply.status(500).send({ message: 'Internal server error' })
  })

  app.get('/health', async () => ({ status: 'ok' }))

  app.register(cityRoutes, { prefix: '/api', cityService })
  app.register(weatherRoutes, { prefix: '/api', weatherService })

  return app
}
