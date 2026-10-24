import { z } from 'zod'
import { UpstreamError } from '../../shared/errors.js'
import type { CurrentWeather } from './weather.types.js'

const CURRENT_FIELDS = [
  'temperature_2m',
  'apparent_temperature',
  'relative_humidity_2m',
  'wind_speed_10m',
  'weather_code',
  'is_day',
].join(',')

const forecastResponseSchema = z.object({
  timezone: z.string(),
  current: z.object({
    time: z.string(),
    temperature_2m: z.number(),
    apparent_temperature: z.number(),
    relative_humidity_2m: z.number(),
    wind_speed_10m: z.number(),
    weather_code: z.number(),
    is_day: z.number(),
  }),
})

/**
 * Open-Meteo forecast API client built on the native fetch.
 */
export class OpenMeteoClient {
  constructor(
    private readonly baseUrl: string,
    private readonly fetcher: typeof fetch = fetch,
  ) {}

  async getCurrentWeather(latitude: number, longitude: number): Promise<CurrentWeather> {
    const url = new URL(`${this.baseUrl}/forecast`)
    url.search = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      current: CURRENT_FIELDS,
      timezone: 'auto',
    }).toString()

    const response = await this.fetcher(url, { signal: AbortSignal.timeout(5_000) }).catch((error: unknown) => {
      throw new UpstreamError(`Open-Meteo request failed: ${error instanceof Error ? error.message : String(error)}`)
    })

    if (!response.ok) {
      throw new UpstreamError(`Open-Meteo responded with status ${response.status}`)
    }

    const { current, timezone } = forecastResponseSchema.parse(await response.json())

    return {
      temperature: current.temperature_2m,
      apparentTemperature: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      weatherCode: current.weather_code,
      isDay: current.is_day === 1,
      observedAt: current.time,
      timezone,
    }
  }
}
