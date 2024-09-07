<script setup lang="ts">
const { t } = useI18n();

const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation()
);
const { data: files } = useLazyFetch<ParsedContent[]>("/api/search.json", {
  default: () => [],
  server: false,
});

const links = computed(() => [
  {
    label: t("nav.docs"),
    to: "/docs",
    icon: "i-ph-book-light",
  },
  {
    label: t("nav.train"),
    to: "/train",
    icon: "i-ph-brain-light",
  },

  {
    label: t("nav.result"),
    to: "/result",
    icon: "i-ph-chart-bar",
  },
]);

provide("navigation", navigation);
provide("files", files);

const colorMode = useColorMode();
</script>

<template>
  <UHeader>
    <template #logo>
      <NuxtImg
        src="/logo.svg"
        alt="BlueScript darkmode logo"
        class="h-8 hover:opacity-90 dark:hidden"
      />
      <NuxtImg
        src="/logo-dark.svg"
        alt="BlueScript logo"
        class="h-8 hover:opacity-90 hidden dark:block"
      />
    </template>

    <template #center>
      <UHeaderLinks :links="links" class="hidden sm:flex" />
    </template>

    <template #right>
      <LangSwitcher />

      <UColorModeButton />
    </template>

    <template #panel>
      <UAsideLinks :links="links" class="px-2" />
    </template>
  </UHeader>

  <UMain>
    <slot />
  </UMain>

  <ClientOnly>
    <LazyUContentSearch
      :files="files"
      :navigation="navigation"
      :links="links"
    />
  </ClientOnly>
</template>
