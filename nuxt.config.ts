// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  css: ["@/assets/globals.css"],
  devtools: { enabled: false },
  extends: ["@nuxt/ui-pro"],
  modules: ["@nuxtjs/i18n", "@nuxt/ui", "@nuxtjs/i18n"],

  ui: {
    icons: ["simple-icons", "heroicons", "ph"],
  },

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
        iso: "ko-KR",
        name: "한국어",
        file: "ko/main.json",
      },
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en/main.json",
      },
      {
        code: "fr",
        iso: "fr-FR",
        name: "Français",
        file: "fr/main.json",
      },
      {
        code: "es",
        iso: "es-ES",
        name: "Español",
        file: "es/main.json",
      },
      {
        code: "ru",
        iso: "ru-RU",
        name: "Русский",
        file: "ru/main.json",
      },
      {
        code: "ja",
        iso: "ja-JP",
        name: "日本語",
        file: "ja/main.json",
      },
      {
        code: "zh",
        iso: "zh-CN",
        name: "中文",
        file: "zh/main.json",
      },
      {
        code: "ar",
        iso: "ar-SA",
        name: "العربية",
        file: "ar/main.json",
      },
      {
        code: "hi",
        iso: "hi-IN",
        name: "हिन्दी",
        file: "hi/main.json",
      },
    ],
  },

  compatibilityDate: "2024-07-25",
});
