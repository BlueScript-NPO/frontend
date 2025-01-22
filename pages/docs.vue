<script setup lang="ts">
import type { NavItem } from "@nuxt/content";
const localePath = useLocalePath();

const navigation = inject<Ref<NavItem[]>>("navigation", ref([]));
const links = computed(
  () =>
    navigation.value.find(
      (item) =>
        item._path === (localePath("/") === "/" ? "/docs" : localePath("/"))
    )?.children ?? []
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
