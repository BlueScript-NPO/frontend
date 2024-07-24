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
  i18n: {
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        name: "English",
      },
      {
        code: "ko",
        name: "한국어",
      },
      {
        code: "ja",
        name: "日本語",
      },
      {
        code: "zh",
        name: "中文",
      },
      {
        code: "fr",
        name: "Français",
      },
      {
        code: "es",
        name: "Español",
      },
    ],
  },
});
