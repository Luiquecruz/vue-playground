import { Redis } from 'ioredis'
import { buildApp } from './app.js'
import { loadEnvironment } from './config/environment.js'
import { RedisCacheStore } from './infrastructure/cache.js'
import { createDatabasePool, migrate } from './infrastructure/database.js'

const environment = loadEnvironment()
const pool = createDatabasePool(environment)
const redis = new Redis(environment.REDIS_URL)

await migrate(pool)

const app = buildApp({
  environment,
  pool,
  cache: new RedisCacheStore(redis),
  logger: environment.NODE_ENV !== 'test',
})

app.addHook('onClose', async () => {
  await pool.end()
  await redis.quit()
})

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => {
    void app.close().then(() => process.exit(0))
  })
}

await app.listen({ host: environment.HOST, port: environment.PORT })
