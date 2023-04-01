// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt'
  ],
  build: {
    transpile: ['troisjs', 'threejs']
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL
    }
  },
  ssr: false,
  app: {
    head: {
      title: 'Emotional Futures',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Emotional Futures',
      short_name: 'EF',
      theme_color: 'black',
      icons: [
        {
          src: 'imgs/app/app-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'imgs/app/app-512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'imgs/app/app-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    client: {
      installPrompt: true
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  }
})
