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
    <template #left>
      <NuxtLink to="/">
        <Logo class="h-6 hover:opacity-90" />
      </NuxtLink>
      <UHeaderLinks :links="links" class="hidden sm:flex" />
    </template>

    <template #right>
      <UButton
        class="block md:hidden"
        variant="ghost"
        color="gray"
        square
        icon="i-ph-magnifying-glass"
        label="Search documentation"
        @click="toggleContentSearch"
      ></UButton>
      <UContentSearchButton
        class="hidden w-full md:flex md:max-w-48 lg:max-w-56"
        size="sm"
        :label="t('search.placeholder')"
      />
    </template>

    <template #panel>
      <span class="sm:hidden">
        <ClientOnly>
          <UButtonGroup orientation="horizontal" class="w-full">
            <UColorModeSelect class="w-full" />
            <LangSwitcher class="w-full" />
          </UButtonGroup>
        </ClientOnly>
        <UDivider class="my-3" />

        <UNavigationLinks :links="links" />
        <UDivider class="my-3" />
      </span>
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
