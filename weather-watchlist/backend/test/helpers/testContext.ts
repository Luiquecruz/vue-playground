import type { FastifyInstance } from 'fastify'
import { Redis } from 'ioredis'
import type { Pool } from 'mysql2/promise'
import { vi, type Mock } from 'vitest'
import { buildApp } from '../../src/app.js'
import { loadEnvironment } from '../../src/config/environment.js'
import { RedisCacheStore } from '../../src/infrastructure/cache.js'
import { createDatabasePool, migrate } from '../../src/infrastructure/database.js'

export interface TestContext {
  app: FastifyInstance
  pool: Pool
  redis: Redis
  fetcher: Mock<typeof fetch>
  reset(): Promise<void>
  close(): Promise<void>
}

/**
 * Boots the application against the real MySQL and Redis services with a stubbed upstream fetch.
 */
export async function createTestContext(): Promise<TestContext> {
  const environment = loadEnvironment({ ...process.env, NODE_ENV: 'test' })
  const pool = createDatabasePool(environment)
  const redis = new Redis(environment.REDIS_URL)
  const fetcher = vi.fn<typeof fetch>()

  await migrate(pool)

  const app = buildApp({ environment, pool, cache: new RedisCacheStore(redis), fetcher })
  await app.ready()

  return {
    app,
    pool,
    redis,
    fetcher,
    async reset() {
      fetcher.mockReset()
      await pool.query('TRUNCATE TABLE cities')
      await redis.flushdb()
    },
    async close() {
      await app.close()
      await pool.end()
      await redis.quit()
    },
  }
}

/**
 * Builds an Open-Meteo forecast payload.
 */
export function forecastPayload(temperature: number): Record<string, unknown> {
  return {
    timezone: 'Europe/Lisbon',
    current: {
      time: '2026-10-20T12:00',
      temperature_2m: temperature,
      apparent_temperature: temperature - 1,
      relative_humidity_2m: 65,
      wind_speed_10m: 12.4,
      weather_code: 2,
      is_day: 1,
    },
  }
}
