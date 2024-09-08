<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";
const { toggleContentSearch } = useUIState();
const { t } = useI18n();

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
      <LangSwitcher class="hidden sm:flex" />
      <UButton
        variant="ghost"
        color="gray"
        square
        icon="i-ph-magnifying-glass"
        @click="toggleContentSearch"
      ></UButton>
      <UColorModeButton />
    </template>

    <template #panel>
      <UContentSearchButton
        size="sm"
        :label="t('search.placeholder')"
        class="w-full mb-3"
      />

      <UNavigationLinks :links="links" />
      <UDivider class="my-3" />
      <UNavigationAccordion
        v-if="navigation"
        :links="mapContentNavigation(navigation)"
      />
      <UDivider class="my-3" />
      <LangSwitcher class="w-full" />
    </template>
  </UHeader>

  <UMain>
    <slot />
  </UMain>

  <ClientOnly>
    <LazyUContentSearch
      :files="files"
      :navigation="navigation ?? undefined"
      :links="links"
    />
  </ClientOnly>
</template>
