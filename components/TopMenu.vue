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

const langItems = computed(() => {
  const items = [];

  for (let i in locales.value) {
    items.push([
      {
        label: locales.value[i].name,
        icon: locales.value[i].code,
        click: () => {
          setLocale(locales.value[i].code);
        },
      },
    ]);
  }

  return items;
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
      <UDropdown :items="langItems" :popper="{ placement: 'bottom-start' }">
        <UButton variant="ghost" icon="i-heroicons-language" />

        <template #item="{ item }">
          <img
            class="h-4 w-auto"
            :src="'/flags/' + item.icon + '.svg'"
            loading="lazy"
            :alt="item.icon"
          />
          <span class="truncate">{{ item.label }}</span>
        </template>
      </UDropdown>

      <UColorModeButton />
      <!-- <UButton variant="ghost" to="/auth"
        >Sign in
        <template #trailing>
          <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
        </template>
      </UButton> -->
    </template>

    <template #panel>
      <UAsideLinks :links="links" class="px-2" />
    </template>
  </UHeader>
</template>
