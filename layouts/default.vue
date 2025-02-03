<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";

const files = inject<ParsedContent[]>("files");
const links = inject<{ label: string; icon: string; to?: string }[]>("links");
const navigation =
  inject<{ label: string; icon: string; to?: string }[]>("navigation");
</script>

<template>
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
