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
  ],

  icon: {
    provider: "server",
    clientBundle: {
      icons: [
        "ph:moon",
        "ph:sun",
        "ph:caret-down",
        "ph:check",
        "ph:list",
        "ph:x",
        "ph:arrow-right",
        "ph:check-square",
        "ph:code-block",
        "ph:money",
        "ph:person-simple-circle",
        "ph:shield-check",
        "ph:user-check",
        "ph:lightbulb",
        "ph:wrench",
      ],
    },
    serverBundle: {
      collections: ["ph"],
    },
  },

  hooks: {
    "prerender:routes"({ routes }) {
      routes.clear(); // Do not generate any routes (except the defaults)
    },
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
    "/api/search.json": { prerender: true },
    "/docs": { redirect: "/docs/getting-started" },
  },
  compatibilityDate: "2024-07-25",
});
