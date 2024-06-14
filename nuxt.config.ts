// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/globals.css"],
  devtools: { enabled: true },
  extends: ["@nuxt/ui-pro"],
  modules: ["@nuxt/ui"],
});
