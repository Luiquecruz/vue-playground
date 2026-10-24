export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    backendUrl: 'http://localhost:3001',
    public: {
      geocodingBaseUrl: 'https://geocoding-api.open-meteo.com/v1',
    },
  },
  app: {
    head: {
      title: 'Weather Watchlist',
      htmlAttrs: { lang: 'en' },
      meta: [{ name: 'description', content: 'Track the current weather of your favorite cities.' }],
    },
  },
  typescript: {
    strict: true,
  },
})
