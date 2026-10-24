import { remember, type CacheStore } from '../../infrastructure/cache.js'
import type { CityService } from '../cities/city.service.js'
import type { OpenMeteoClient } from './open-meteo.client.js'
import type { WeatherReport } from './weather.types.js'

/**
 * Resolves the current weather of a stored city, cached per coordinate.
 */
export class WeatherService {
  constructor(
    private readonly cityService: CityService,
    private readonly client: OpenMeteoClient,
    private readonly cache: CacheStore,
    private readonly ttlSeconds: number,
  ) {}

  async getForCity(cityId: number): Promise<WeatherReport> {
    const city = await this.cityService.findOrFail(cityId)
    const { value, hit } = await remember(
      this.cache,
      `weather:${city.latitude}:${city.longitude}`,
      this.ttlSeconds,
      () => this.client.getCurrentWeather(city.latitude, city.longitude),
    )

    return { city, weather: value, cached: hit }
  }
}
