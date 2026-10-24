import type { FastifyInstance } from 'fastify'
import { cityIdParamsSchema, createCitySchema } from './city.schema.js'
import type { CityService } from './city.service.js'

export interface CityRoutesOptions {
  cityService: CityService
}

/**
 * Registers the city CRUD endpoints.
 */
export async function cityRoutes(app: FastifyInstance, { cityService }: CityRoutesOptions): Promise<void> {
  app.get('/cities', async () => cityService.list())

  app.post('/cities', async (request, reply) => {
    const city = await cityService.create(createCitySchema.parse(request.body))
    return reply.status(201).send(city)
  })

  app.delete('/cities/:id', async (request, reply) => {
    const { id } = cityIdParamsSchema.parse(request.params)
    await cityService.remove(id)
    return reply.status(204).send()
  })
}
