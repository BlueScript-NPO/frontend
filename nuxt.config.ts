// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  css: ["@/assets/globals.css"],
  devtools: { enabled: false },
  extends: ["@nuxt/ui-pro"],
  modules: ["@nuxtjs/i18n", "@nuxt/ui", "@nuxtjs/i18n"],
  ui: {
    icons: ["simple-icons", "heroicons"],
  },
  hooks: {
    "prerender:routes"({ routes }) {
      routes.clear(); // Do not generate any routes (except the defaults)
    },
  },
  i18n: {
    baseUrl: "https://bluescript.app",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
    defaultLocale: "en",
    locales: [
      {
        code: "ko",
        iso: "ko-KR",
        name: "한국어",
      },
      {
        code: "en",
        iso: "en-US",
        name: "English",
      },
      {
        code: "fr",
        iso: "fr-FR",
        name: "Français",
      },
      {
        code: "es",
        iso: "es-ES",
        name: "Español",
      },
      {
        code: "ru",
        iso: "ru-RU",
        name: "Русский",
      },
      {
        code: "ja",
        iso: "ja-JP",
        name: "日本語",
      },
      {
        code: "zh",
        iso: "zh-CN",
        name: "中文",
      },
      {
        code: "ar",
        iso: "ar-SA",
        name: "العربية",
      },
      {
        code: "hi",
        iso: "hi-IN",
        name: "हिन्दी",
      },
    ],
  },
});
