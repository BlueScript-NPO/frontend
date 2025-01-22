<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";
import LangSwitcher from "~/components/LangSwitcher.vue";
const { toggleContentSearch } = useUIState();
const { t } = useI18n();
const localePath = useLocalePath();

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

provide("navigation", navigation);
provide("files", files);
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink :to="localePath('/')">
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
        aria-label="Search documentation"
        @click="toggleContentSearch"
      ></UButton>
      <UContentSearchButton
        class="hidden w-full md:flex md:max-w-48 lg:max-w-56 text-zinc-600 dark:text-zinc-300"
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
      <DocsNav />
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
