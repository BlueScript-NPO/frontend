<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <UDashboardSection
    icon="i-ph-hand-waving"
    :title="t('dashboard.home.welcome')"
    :description="t('dashboard.home.description')"
    orientation="vertical"
    class="px-4 mt-6"
  />
</template>
