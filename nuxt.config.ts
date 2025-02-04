// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  css: ["@/assets/globals.css"],
  devtools: { enabled: true },
  extends: ["@nuxt/ui-pro"],
  modules: [
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@nuxtjs/seo",
    "nuxt-og-image",
    "@nuxt/fonts",
    "@nuxtjs/supabase",
  ],

  supabase: {
    url: "https://oyzivnolzjqehavvntqz.supabase.co",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95eml2bm9sempxZWhhdnZudHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1NjI0NzMsImV4cCI6MjA1NDEzODQ3M30.5h75afajh_8mdCQdGTFf_zaObOVgTkipqDaiC78COtI",
    redirectOptions: {
      login: "/auth",
      callback: "/confirm",
      include: ["/dashboard(/*)?"],
      exclude: [],
      cookieRedirect: false,
    },
  },

  nitro: {
    prerender: {
      routes: ["/sitemap.xml"],
    },
  },

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
    lazy: false,
    strategy: "prefix_except_default",
    defaultLocale: "en",

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },

    locales: [
      {
        code: "en",
        language: "en-US",
        name: "English",
        file: "en/main.json",
      },
      {
        code: "ko",
        language: "ko-KR",
        name: "한국어",
        file: "ko/main.json",
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
        code: "es",
        language: "es-ES",
        name: "Español",
        file: "es/main.json",
      },
      {
        code: "ar",
        language: "ar-SA",
        name: "العربية",
        file: "ar/main.json",
      },
      {
        code: "fr",
        language: "fr-FR",
        name: "Français",
        file: "fr/main.json",
      },
      {
        code: "ru",
        language: "ru-RU",
        name: "Русский",
        file: "ru/main.json",
      },
      {
        code: "de",
        language: "de-DE",
        name: "Deutsch",
        file: "de/main.json",
      },
    ],
  },

  routeRules: generateRouteRules(),

  compatibilityDate: "2024-07-25",
});

function generateRouteRules() {
  const locales = ["ko", "fr", "es", "ru", "ja", "zh", "ar", "de"];
  const rules: Record<string, any> = {
    // Default locale (en) routes
    "/docs": { redirect: "/docs/getting-started" },
    "/docs/training/": {
      redirect: "/docs/training/visual/rapid-visual-perception",
    },
    "/docs/training/visual/": {
      redirect: "/docs/training/visual/rapid-visual-perception",
    },
    "/": { prerender: true },
  };

  // Add routes for each non-default locale
  locales.forEach((locale) => {
    rules[`/${locale}/docs`] = { redirect: `/${locale}/docs/getting-started` };
    rules[`/${locale}/docs/training/`] = {
      redirect: `/${locale}/docs/training/visual/rapid-visual-perception`,
    };
    rules[`/${locale}/docs/training/visual/`] = {
      redirect: `/${locale}/docs/training/visual/rapid-visual-perception`,
    };
    rules[`/${locale}/`] = { prerender: true };
  });

  return rules;
}
