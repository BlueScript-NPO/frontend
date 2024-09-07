<template>
  <!-- Google Font -->
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <client-only>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&display=swap"
          rel="stylesheet"
        />
      </head>
    </client-only>

    <NuxtLoadingIndicator :color="isDark ? 'white' : '#2F45C7'" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Html>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const route = useRoute();
const router = useRouter();
const { locale, availableLocales } = useI18n();
const lang = ref(route.query.lang as string);

// check if lang query param is valid
if (lang.value && availableLocales.includes(lang.value)) {
  locale.value = lang.value;

  // remove lang query param from url
  const newQuery = { ...route.query };
  delete newQuery.lang;
  router.replace({ query: newQuery });
}

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});

onMounted(() => {
  const links = availableLocales.map((l) => ({
    rel: "alternate",
    hreflang: l,
    href: `http://bluescript.app${route.fullPath.split("?")[0]}?lang=${l}`,
  }));

  useHead({
    link: links,
  });
});
</script>
