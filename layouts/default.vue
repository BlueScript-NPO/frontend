<script setup lang="ts">
const {t} = useI18n();

const {data: navigation} = await useAsyncData('navigation', () => fetchContentNavigation())
const {data: files} = useLazyFetch<ParsedContent[]>('/api/search.json', {default: () => [], server: false})

const links = computed(() => [
  {
    label: t("nav.docs"),
    to: "/docs",
  },
  {
    label: t("nav.train"),
    to: "/train",
  },

  {
    label: t("nav.result"),
    to: "/result",
  },
]);

provide('navigation', navigation)
provide('files', files)

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <UHeader>
    <template #logo>
      <ClientOnly>
        <img
            src="~/assets/logo-dark.svg"
            alt="BlueScript darkmode logo"
            class="h-8 hover:opacity-90"
            v-if="isDark"
        />
        <img
            src="~/assets/logo.svg"
            alt="BlueScript logo"
            class="h-8 hover:opacity-90"
            v-else
        />
      </ClientOnly>
    </template>

    <template #center>
      <UHeaderLinks :links="links" class="hidden sm:flex"/>
    </template>

    <template #right>
      <LangSwitcher/>

      <UColorModeButton :icon="isDark ? 'i-ph-moon' : 'i-ph-sun'"/>
    </template>

    <template #panel>
      <UAsideLinks :links="links" class="px-2"/>
    </template>
  </UHeader>

  <UMain>
    <slot/>
  </UMain>


  <ClientOnly>
    <LazyUContentSearch :files="files" :navigation="navigation" :links="links"/>
  </ClientOnly>
</template>
