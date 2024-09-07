// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  css: ["@/assets/globals.css"],
  devtools: { enabled: false },
  extends: ["@nuxt/ui-pro"],
  modules: [
    "@nuxtjs/i18n",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@nuxt/content",
    "@nuxtjs/seo",
    "@nuxt/image",
  ],

  icon: {
    provider: "server",
    serverBundle: {
      collections: ["ph"],
    },
  },

  image: {
    quality: 80,
    format: ["webp", "jpeg"],
  },

  i18n: {
    baseUrl: "https://bluescript.app",
    langDir: "locales",
    lazy: true,
    strategy: "no_prefix",
    defaultLocale: "en",

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },

    locales: [
      {
        code: "ko",
        language: "ko-KR",
        name: "한국어",
        file: "ko/main.json",
      },
      {
        code: "en",
        language: "en-US",
        name: "English",
        file: "en/main.json",
      },
      {
        code: "fr",
        language: "fr-FR",
        name: "Français",
        file: "fr/main.json",
      },
      {
        code: "es",
        language: "es-ES",
        name: "Español",
        file: "es/main.json",
      },
      {
        code: "ru",
        language: "ru-RU",
        name: "Русский",
        file: "ru/main.json",
      },
      {
        code: "ja",
        language: "ja-JP",
        name: "日本語",
        file: "ja/main.json",
      },
      {
        code: "zh",
        language: "zh-CN",
        name: "中文",
        file: "zh/main.json",
      },
      {
        code: "ar",
        language: "ar-SA",
        name: "العربية",
        file: "ar/main.json",
      },
      {
        code: "hi",
        language: "hi-IN",
        name: "हिन्दी",
        file: "hi/main.json",
      },
    ],
  },

  routeRules: {
    "/docs": { redirect: "/docs/getting-started" },
  },
  compatibilityDate: "2024-07-25",
});
