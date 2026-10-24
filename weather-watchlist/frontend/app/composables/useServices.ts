import { createCitiesService } from '~/services/citiesService'
import { createGeocodingService } from '~/services/geocodingService'
import { createWeatherService } from '~/services/weatherService'

export function useCitiesService() {
  return createCitiesService(useNuxtApp().$api)
}

export function useWeatherService() {
  return createWeatherService(useNuxtApp().$api)
}

export function useGeocodingService() {
  return createGeocodingService(useNuxtApp().$geocoding)
}
