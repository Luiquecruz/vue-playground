import type { FastifyInstance } from 'fastify'
import { cityIdParamsSchema } from '../cities/city.schema.js'
import type { WeatherService } from './weather.service.js'

export interface WeatherRoutesOptions {
  weatherService: WeatherService
}

/**
 * Registers the weather endpoints.
 */
export async function weatherRoutes(app: FastifyInstance, { weatherService }: WeatherRoutesOptions): Promise<void> {
  app.get('/cities/:id/weather', async (request) => {
    const { id } = cityIdParamsSchema.parse(request.params)
    return weatherService.getForCity(id)
  })
}
