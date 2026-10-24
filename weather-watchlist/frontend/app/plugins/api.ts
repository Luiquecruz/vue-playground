export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  return {
    provide: {
      api: $fetch.create({ baseURL: '/api' }),
      geocoding: $fetch.create({ baseURL: config.public.geocodingBaseUrl }),
    },
  }
})
