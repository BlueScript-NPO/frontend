<script setup lang="ts">
const { t } = useI18n();
const { locales, setLocale } = useI18n();

const links = computed(() => [
  {
    label: t("nav.home"),
    to: "/",
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
      <UHeaderLinks :links="links" class="hidden sm:flex" />
    </template>

    <template #right>
      <LangSwitcher />

      <UColorModeButton :icon="isDark ? 'ph:moon' : 'ph:sun'" />
    </template>

    <template #panel>
      <UAsideLinks :links="links" class="px-2" />
    </template>
  </UHeader>
</template>
