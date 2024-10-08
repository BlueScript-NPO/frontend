<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";
import LangSwitcher from "~/components/LangSwitcher.vue";
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
    icon: "i-ph-book",
  },
  {
    label: t("nav.train"),
    to: "/train",
    icon: "i-ph-yin-yang",
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
      <Logo class="h-8 hover:opacity-90" />
    </template>

    <template #center>
      <UHeaderLinks :links="links" class="hidden sm:flex" />
    </template>

    <template #right>
      <UButton
        variant="ghost"
        color="gray"
        square
        icon="i-ph-magnifying-glass"
        @click="toggleContentSearch"
      ></UButton>
    </template>

    <template #panel>
      <UButtonGroup orientation="horizontal" class="w-full">
        <UColorModeSelect class="w-full" />
        <LangSwitcher class="w-full" />
      </UButtonGroup>
      <UDivider class="my-3" />
      <UNavigationLinks :links="links" />
      <UDivider class="my-3" />
      <UNavigationAccordion
        v-if="navigation"
        :links="mapContentNavigation(navigation)"
      />
    </template>
  </UHeader>

  <UMain>
    <slot />
  </UMain>

  <AppFooter />

  <ClientOnly>
    <LazyUContentSearch
      :files="files"
      :navigation="navigation ?? undefined"
      :links="links"
    />
  </ClientOnly>
</template>
