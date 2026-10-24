import { z } from 'zod'

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  HOST: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().int().positive().default(3001),
  MYSQL_HOST: z.string().default('localhost'),
  MYSQL_PORT: z.coerce.number().int().positive().default(3306),
  MYSQL_USER: z.string().default('app'),
  MYSQL_PASSWORD: z.string().default('app'),
  MYSQL_DATABASE: z.string().default('weather'),
  REDIS_URL: z.string().default('redis://localhost:6379/0'),
  CITIES_CACHE_TTL_SECONDS: z.coerce.number().int().positive().default(60),
  WEATHER_CACHE_TTL_SECONDS: z.coerce.number().int().positive().default(600),
  OPEN_METEO_BASE_URL: z.url().default('https://api.open-meteo.com/v1'),
})

export type Environment = z.infer<typeof environmentSchema>

/**
 * Parses and validates the process environment.
 */
export function loadEnvironment(source: NodeJS.ProcessEnv = process.env): Environment {
  return environmentSchema.parse(source)
}
