<script setup lang="ts">
import type { NavItem } from "@nuxt/content";
const { t } = useI18n();

const navigation = inject<Ref<NavItem[]>>("navigation", ref([]));
const links = computed(
  () => navigation.value.find((item) => item._path === "/docs")?.children ?? []
);
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside>
          <UNavigationTree :links="mapContentNavigation(links)" />
        </UAside>
      </template>
      <NuxtPage />
    </UPage>
  </UContainer>
</template>
