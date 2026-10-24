import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { CITIES_CACHE_KEY } from '../src/modules/cities/city.service.js'
import { createTestContext, type TestContext } from './helpers/testContext.js'

const lisbon = { name: 'Lisbon', country: 'Portugal', latitude: 38.71667, longitude: -9.13333 }
const porto = { name: 'Porto', country: 'Portugal', latitude: 41.14961, longitude: -8.61099 }

describe('cities API', () => {
  let context: TestContext

  beforeAll(async () => {
    context = await createTestContext()
  })

  beforeEach(async () => {
    await context.reset()
  })

  afterAll(async () => {
    await context.close()
  })

  it('returns an empty list when no city is stored', async () => {
    const response = await context.app.inject({ method: 'GET', url: '/api/cities' })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual([])
  })

  it('creates a city and persists it in MySQL', async () => {
    const response = await context.app.inject({ method: 'POST', url: '/api/cities', payload: lisbon })

    expect(response.statusCode).toBe(201)
    expect(response.json()).toMatchObject({ id: expect.any(Number), ...lisbon, createdAt: expect.any(String) })

    const [rows] = await context.pool.query('SELECT name FROM cities')
    expect(rows).toEqual([{ name: 'Lisbon' }])
  })

  it('serves the list from Redis until a write invalidates it', async () => {
    await context.app.inject({ method: 'POST', url: '/api/cities', payload: lisbon })
    await context.app.inject({ method: 'GET', url: '/api/cities' })

    expect(await context.redis.exists(CITIES_CACHE_KEY)).toBe(1)

    await context.pool.query('INSERT INTO cities (name, country, latitude, longitude) VALUES (?, ?, ?, ?)', [
      porto.name,
      porto.country,
      porto.latitude,
      porto.longitude,
    ])
    const cached = await context.app.inject({ method: 'GET', url: '/api/cities' })
    expect(cached.json().map((city: { name: string }) => city.name)).toEqual(['Lisbon'])

    await context.app.inject({
      method: 'POST',
      url: '/api/cities',
      payload: { name: 'Faro', country: 'Portugal', latitude: 37.01869, longitude: -7.93518 },
    })
    expect(await context.redis.exists(CITIES_CACHE_KEY)).toBe(0)

    const fresh = await context.app.inject({ method: 'GET', url: '/api/cities' })
    expect(fresh.json().map((city: { name: string }) => city.name)).toEqual(['Faro', 'Lisbon', 'Porto'])
  })

  it('rejects a duplicated city with 409', async () => {
    await context.app.inject({ method: 'POST', url: '/api/cities', payload: lisbon })
    const response = await context.app.inject({ method: 'POST', url: '/api/cities', payload: lisbon })

    expect(response.statusCode).toBe(409)
    expect(response.json()).toEqual({ message: 'Lisbon is already on the watchlist' })
  })

  it('rejects an invalid payload with 400', async () => {
    const response = await context.app.inject({
      method: 'POST',
      url: '/api/cities',
      payload: { name: '', country: 'Nowhere', latitude: 120, longitude: 0 },
    })

    expect(response.statusCode).toBe(400)
    expect(response.json().message).toBe('Validation failed')
  })

  it('deletes a city and invalidates the cached list', async () => {
    const created = await context.app.inject({ method: 'POST', url: '/api/cities', payload: lisbon })
    await context.app.inject({ method: 'GET', url: '/api/cities' })

    const response = await context.app.inject({ method: 'DELETE', url: `/api/cities/${created.json().id}` })

    expect(response.statusCode).toBe(204)
    expect(await context.redis.exists(CITIES_CACHE_KEY)).toBe(0)
    expect((await context.app.inject({ method: 'GET', url: '/api/cities' })).json()).toEqual([])
  })

  it('returns 404 when deleting an unknown city', async () => {
    const response = await context.app.inject({ method: 'DELETE', url: '/api/cities/999' })

    expect(response.statusCode).toBe(404)
  })
})
