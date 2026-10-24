import type { Redis } from 'ioredis'

export interface CacheStore {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T, ttlSeconds: number): Promise<void>
  delete(key: string): Promise<void>
}

export interface CachedResult<T> {
  value: T
  hit: boolean
}

/**
 * Redis backed implementation of the cache store using JSON serialization.
 */
export class RedisCacheStore implements CacheStore {
  constructor(private readonly client: Redis) {}

  async get<T>(key: string): Promise<T | null> {
    const payload = await this.client.get(key)
    return payload === null ? null : (JSON.parse(payload) as T)
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    await this.client.set(key, JSON.stringify(value), 'EX', ttlSeconds)
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key)
  }
}

/**
 * Returns the cached value for the key or resolves and stores a fresh one.
 */
export async function remember<T>(
  cache: CacheStore,
  key: string,
  ttlSeconds: number,
  resolver: () => Promise<T>,
): Promise<CachedResult<T>> {
  const cached = await cache.get<T>(key)
  if (cached !== null) {
    return { value: cached, hit: true }
  }

  const value = await resolver()
  await cache.set(key, value, ttlSeconds)
  return { value, hit: false }
}
