import type { City } from '../cities/city.types.js'

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
