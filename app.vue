<template>
  <!-- Google Font -->
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <template v-for="link in head.link" :key="link.hid">
        <Link
          :id="link.hid"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
    </Head>

    <ClientOnly>
      <NuxtLoadingIndicator :color="isDark ? '#C2C8EC' : '#2F45C7'" />
    </ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </Html>
</template>

<script setup lang="ts">
import { ParsedContent } from "@nuxt/content";

const { t } = useI18n();
const colorMode = useColorMode();
const supabase = useSupabaseClient();
const localePath = useLocalePath();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
  console.log("Signed out");
  navigateTo(localePath("/auth"));
};

const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation()
);
const { data: files } = useLazyFetch<ParsedContent[]>("/api/search.json", {
  default: () => [],
  server: true,
});

const links = computed(() => [
  {
    label: t("nav.docs"),
    to: localePath("/docs"),
    icon: "i-ph-book",
  },
  {
    label: t("nav.train"),
    to: localePath("/train"),
    icon: "i-ph-yin-yang",
  },

  {
    label: t("nav.result"),
    to: localePath("/result"),
    icon: "i-ph-chart-bar",
  },
]);

provide("signOut", signOut);
provide("navigation", navigation);
provide("files", files);
provide("links", links);
</script>
