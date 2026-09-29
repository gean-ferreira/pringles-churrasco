// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { url, title, gtm } from './app/utils/constants/seo.constant'

// TODO: URLs reais do Adobe Launch para a campanha Pringles Churrasco (hoje são as do kellanova).
const adobeLaunchScripts = {
  development: 'REPLACE_ADOBE_LAUNCH_DEVELOPMENT_URL',
  staging: 'REPLACE_ADOBE_LAUNCH_STAGING_URL',
  production: 'REPLACE_ADOBE_LAUNCH_PRODUCTION_URL'
} as const

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@saslavik/nuxt-gtm'
  ],
  css: ['~/assets/css/main.css'],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      ErrorMessage: 'VeeErrorMessage'
    }
  },
  fonts: {
    families: [
      {
        name: 'Pinup',
        src: '/fonts/Pinup-Regular.otf',
        weight: 400,
        style: 'normal',
        global: true
      }
    ]
  },
  routeRules: {
    '/': { prerender: true },
    '/faq': { prerender: true },
    '/ganhadores': { prerender: true },
    '/novos-sabores': { prerender: true },
    '/login': { prerender: true },
    '/cadastro': { prerender: true },
    '/verificacao': { ssr: false },
    '/fale-conosco': { prerender: true },
    '/extrato': { ssr: false },
    '/editar-cadastro': { ssr: false },
    '/cadastro-nota': { ssr: false }
  },
  sitemap: {
    exclude: ['/verificacao', '/extrato', '/editar-cadastro', '/cadastro-nota']
  },
  site: {
    url: url,
    name: title
  },
  gtm: {
    id: import.meta.env.VITE_SITE_ENV === 'development' ? 'GTM-XXXXXXX' : gtm,
    enabled: import.meta.env.VITE_SITE_ENV !== 'development'
  },
  image: {
    dir: 'assets/images'
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR'
      },
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      meta: [
        { property: 'og:site_name', content: title },
        { property: 'og:locale', content: 'pt_BR' },
        {
          name: 'author',
          content: 'FullBar Serviços Digitais Ltda'
        },
        {
          name: 'developer',
          content: 'Gean Ferreira'
        },
        ...(process.env.VITE_SITE_ENV !== 'production'
          ? [{ name: 'robots', content: 'noindex, nofollow' }]
          : [])
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-96x96.png'
        }
      ],
      script: [
        // cookies — mantido via OneTrust (decisão da campanha: sem CookieModal nativo, ver SKILL.md 3.1)
        {
          src: 'https://cdn.cookielaw.org/consent/REPLACE_ONETRUST_ID/OtAutoBlock.js',
          type: 'text/javascript',
          tagPriority: 'critical'
        },
        {
          src: 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
          type: 'text/javascript',
          'data-domain-script': 'REPLACE_ONETRUST_ID',
          tagPriority: 'critical'
        },
        {
          innerHTML: 'function OptanonWrapper() { }',
          type: 'text/javascript',
          tagPriority: 'critical'
        },
        // fim cookies
        // Adobe Launch
        {
          src: adobeLaunchScripts[
            process.env.VITE_SITE_ENV as keyof typeof adobeLaunchScripts
          ],
          tagPriority: 'critical'
        },
        // fim Adobe Launch
        {
          src: '/scripts/datalayer.js',
          defer: true
        }
      ]
    }
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['maska/vue']
    }
  }
})
