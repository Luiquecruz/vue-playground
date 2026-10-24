import { z } from 'zod'

export const createCitySchema = z.object({
  name: z.string().trim().min(1).max(120),
  country: z.string().trim().min(1).max(120),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
})

export const cityIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
})
