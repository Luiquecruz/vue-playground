export default {
  head: {
    title: 'nuxt-fundamentals',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['~/assets/global.css'],
  components: true,
  buildModules: ['@nuxtjs/eslint-module'],
}
