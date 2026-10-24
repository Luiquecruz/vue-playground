import { remember, type CacheStore } from '../../infrastructure/cache.js'
import { NotFoundError } from '../../shared/errors.js'
import type { CityRepository } from './city.repository.js'
import type { City, NewCity } from './city.types.js'

export const CITIES_CACHE_KEY = 'cities:all'

/**
 * Coordinates city persistence and the cached city list.
 */
export class CityService {
  constructor(
    private readonly repository: CityRepository,
    private readonly cache: CacheStore,
    private readonly ttlSeconds: number,
  ) {}

  async list(): Promise<City[]> {
    const { value } = await remember(this.cache, CITIES_CACHE_KEY, this.ttlSeconds, () => this.repository.findAll())
    return value
  }

  async findOrFail(id: number): Promise<City> {
    const city = await this.repository.findById(id)
    if (!city) {
      throw new NotFoundError(`City ${id} not found`)
    }
    return city
  }

  async create(city: NewCity): Promise<City> {
    const created = await this.repository.create(city)
    await this.cache.delete(CITIES_CACHE_KEY)
    return created
  }

  async remove(id: number): Promise<void> {
    const deleted = await this.repository.delete(id)
    if (!deleted) {
      throw new NotFoundError(`City ${id} not found`)
    }
    await this.cache.delete(CITIES_CACHE_KEY)
  }
}
