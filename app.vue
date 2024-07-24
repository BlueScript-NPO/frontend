<template>
  <!-- Google Font -->
  <client-only>
    <head>
      <link
        href="https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&display=swap"
        rel="stylesheet"
      />
      <seo-head />
    </head>
  </client-only>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";
import { useHead } from "@vueuse/head";

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

onMounted(() => {
  const links = availableLocales.map((l) => ({
    rel: "alternate",
    hreflang: l,
    href: `http://bluescript.app:3000${route.fullPath.split("?")[0]}?lang=${l}`,
  }));

  useHead({
    link: links,
  });
});
</script>
