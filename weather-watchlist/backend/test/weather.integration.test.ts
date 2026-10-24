import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { createTestContext, forecastPayload, type TestContext } from './helpers/testContext.js'

describe('weather API', () => {
  let context: TestContext
  let cityId: number

  beforeAll(async () => {
    context = await createTestContext()
  })

  beforeEach(async () => {
    await context.reset()
    const created = await context.app.inject({
      method: 'POST',
      url: '/api/cities',
      payload: { name: 'Lisbon', country: 'Portugal', latitude: 38.71667, longitude: -9.13333 },
    })
    cityId = created.json().id
  })

  afterAll(async () => {
    await context.close()
  })

  it('fetches Open-Meteo once and serves the next request from Redis', async () => {
    context.fetcher.mockResolvedValue(Response.json(forecastPayload(21.5)))

    const first = await context.app.inject({ method: 'GET', url: `/api/cities/${cityId}/weather` })
    const second = await context.app.inject({ method: 'GET', url: `/api/cities/${cityId}/weather` })

    expect(first.statusCode).toBe(200)
    expect(first.json()).toMatchObject({
      city: { id: cityId, name: 'Lisbon' },
      weather: { temperature: 21.5, apparentTemperature: 20.5, humidity: 65, weatherCode: 2, isDay: true },
      cached: false,
    })
    expect(second.json().cached).toBe(true)
    expect(context.fetcher).toHaveBeenCalledTimes(1)

    const [requestedUrl] = context.fetcher.mock.calls[0] ?? []
    expect(String(requestedUrl)).toContain('latitude=38.71667')
    expect(String(requestedUrl)).toContain('longitude=-9.13333')
  })

  it('returns 502 when Open-Meteo fails', async () => {
    context.fetcher.mockResolvedValue(new Response('unavailable', { status: 503 }))

    const response = await context.app.inject({ method: 'GET', url: `/api/cities/${cityId}/weather` })

    expect(response.statusCode).toBe(502)
    expect(response.json()).toEqual({ message: 'Open-Meteo responded with status 503' })
  })

  it('returns 404 for an unknown city without calling Open-Meteo', async () => {
    const response = await context.app.inject({ method: 'GET', url: '/api/cities/999/weather' })

    expect(response.statusCode).toBe(404)
    expect(context.fetcher).not.toHaveBeenCalled()
  })
})
