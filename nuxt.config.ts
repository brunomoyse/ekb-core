export default defineNuxtConfig({
    ssr: false,
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/image-edge',
        [
          '@pinia/nuxt',
          {
            autoImports: [
              // automatically imports `defineStore`
              'defineStore', // import { defineStore } from 'pinia'
              // automatically imports `defineStore` as `definePiniaStore`
              ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
            ],
          },
        ],
    ],
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        head: {
            title: 'Евразия Экибастуз',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            htmlAttrs: {
                lang: 'fr',
            },
            meta: [
              // <meta name="viewport" content="width=device-width, initial-scale=1">
              { name: 'description', content: 'Insurrance policy payment reminder. ' },
            ],
            script: [

            ],
            link: [
              {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
              }
              // <link rel="stylesheet" href="https://myawesome-lib.css">
              //{ rel: 'stylesheet', href: 'https://awesome-lib.css' }
            ],
            noscript: [
              // <noscript>Javascript is required</noscript>
              { children: 'Javascript is required' }
            ]
          }
    },
    alias: {
      //pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
  },
})
