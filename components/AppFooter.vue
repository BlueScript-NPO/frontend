<script setup lang="ts">
const { t } = useI18n();

const links = computed(() => [
  {
    label: t("footer.resources.title"),
    children: [
      {
        label: t("footer.resources.items.docs"),
        to: "/docs",
      },
      {
        label: t("footer.resources.items.license"),
        to: "https://github.com/BlueScript-NPO/frontend/blob/main/LICENSE",
        target: "_blank",
      },
    ],
  },
]);
</script>

<template>
  <UFooter>
    <template #top>
      <UFooterColumns :links="links"> </UFooterColumns>
    </template>

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        © {{ new Date().getFullYear() }} BlueScript. {{ t("footer.license") }}
      </p>
    </template>

    <template #right>
      <UColorModeSelect class="w-30" />
      <UButton
        to="https://github.com/BlueScript-NPO/"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="gray"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
