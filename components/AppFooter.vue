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
  {
    label: t("footer.community.title"),
    children: [
      {
        label: t("footer.community.items.github"),
        to: "https://github.com/BlueScript-NPO",
        target: "_blank",
      },
      {
        label: t("footer.community.items.suhjae"),
        to: "https://suhjae.dev/",
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
      <UButtonGroup orientation="horizontal">
        <LangSwitcher />
        <UColorModeSelect />
      </UButtonGroup>
    </template>
  </UFooter>
</template>
