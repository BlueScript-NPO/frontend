<script setup lang="ts">
const { t } = useI18n();

const links = computed(() => [
  {
    label: t("footer.resources.items.docs"),
    to: "/docs",
  },
  {
    label: t("footer.resources.items.license"),
    to: "https://github.com/BlueScript-NPO/frontend/blob/main/LICENSE",
    target: "_blank",
  },

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
]);
</script>

<template>
  <UDivider />
  <UFooter :links="links">
    <template #left>
      <span class="text-gray-500 dark:text-gray-400 text-sm">
        <p class="break-words text-center lg:text-left">
          © {{ new Date().getFullYear() }} BlueScript.<br />{{
            t("footer.license")
          }}
        </p>
      </span>
    </template>
    <template #right>
      <ClientOnly>
        <UButtonGroup orientation="horizontal" clsss="my-2">
          <LangSwitcher />
          <UColorModeSelect />
        </UButtonGroup>
      </ClientOnly>
    </template>
  </UFooter>
</template>
