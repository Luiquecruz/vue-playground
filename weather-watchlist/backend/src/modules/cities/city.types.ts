export interface City {
  id: number
  name: string
  country: string
  latitude: number
  longitude: number
  createdAt: string
}

export type NewCity = Omit<City, 'id' | 'createdAt'>
