<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";
import type { NavItem } from "@nuxt/content";
import AppHeader from "~/components/AppHeader.vue";

const files = inject<ParsedContent[]>("files");
const links = inject<{ label: string; icon: string; to?: string }[]>("links");
const navigation = inject<NavItem[]>("navigation");
</script>

<template>
  <AppHeader />
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
