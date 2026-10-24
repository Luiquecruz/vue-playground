export interface City {
  id: number
  name: string
  country: string
  latitude: number
  longitude: number
  createdAt: string
}

export type NewCity = Omit<City, 'id' | 'createdAt'>

export interface CurrentWeather {
  temperature: number
  apparentTemperature: number
  humidity: number
  windSpeed: number
  weatherCode: number
  isDay: boolean
  observedAt: string
  timezone: string
}

export interface WeatherReport {
  city: City
  weather: CurrentWeather
  cached: boolean
}

export interface GeocodingResult {
  id: number
  name: string
  country: string
  region?: string
  latitude: number
  longitude: number
}

export interface WeatherCondition {
  label: string
  icon: string
}
