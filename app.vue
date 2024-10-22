<template>
  <!-- Google Font -->
  <Html>
    <NuxtLoadingIndicator :color="isDark ? '#C2C8EC' : '#2F45C7'" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </Html>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const route = useRoute();
const router = useRouter();
const { locale, availableLocales } = useI18n();

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
</script>
