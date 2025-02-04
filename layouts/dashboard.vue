<script setup lang="ts">
const localePath = useLocalePath();
const { t } = useI18n();

const links = [
  {
    label: t("dashboard.nav.home"),
    icon: "i-ph-house-line",
    to: localePath("/dashboard"),
  },
  {
    label: t("dashboard.nav.settings"),
    icon: "i-ph-gear",
    to: localePath("/dashboard/settings"),
  },
];
</script>

<template>
  <AppHeader />
  <div class="w-full flex justify-center">
    <div class="max-w-7xl w-full">
      <UDashboardToolbar class="py-0 px-4 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>
      <slot />
    </div>
  </div>
</template>
