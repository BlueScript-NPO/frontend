<template>
  <!-- Google Font -->
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <NuxtLoadingIndicator :color="isDark ? '#C2C8EC' : '#2F45C7'" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </Html>
</template>

<script setup lang="ts">
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
