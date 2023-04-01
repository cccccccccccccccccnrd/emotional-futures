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
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { property: 'og:title', content: 'Emotional Futures' },
        { property: 'og:description', content: 'How does the message of an emotion change over time?' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://x.emotionalfutures.com/imgs/app/share.png' },
        { property: 'og:image:width', content: '932' },
        { property: 'og:image:height', content: '431' },
        { property: 'og:site_name', content: 'Emotional Futures' },
        { property: 'twitter:site', content: '@emotionalfutures' },
        { property: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [{ rel: 'icon', type: 'image/png', href: 'imgs/app/app-192.png' }]
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      display: 'standalone',
      name: 'Emotional Futures',
      short_name: 'Emotional Futures',
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
    },
    workbox: {
      navigateFallback: '/emoxy',
      navigateFallbackDenylist: [/\/api\/.*/],
    }
  }
})
