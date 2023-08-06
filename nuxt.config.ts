// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@element-plus/nuxt'],
  elementPlus: {themes:['dark'] },
  ssr: false,
  build: {
    loading: false,
  },
})
