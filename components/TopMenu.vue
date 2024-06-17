<script setup lang="ts">
const links = [
  {
    label: "Training",
    to: "/train",
  },
];

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const items = [
  [
    {
      label: "ben@example.com",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
    },
  ],
  [
    {
      label: "Documentation",
      icon: "i-heroicons-book-open",
    },
    {
      label: "Changelog",
      icon: "i-heroicons-megaphone",
    },
    {
      label: "Status",
      icon: "i-heroicons-signal",
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
    },
  ],
];
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <img
        src="~/assets/logo-dark.png"
        alt="BlueScript darkmode logo"
        class="h-8 hover:opacity-90"
        v-if="isDark"
      />
      <img
        src="~/assets/logo.png"
        alt="BlueScript logo"
        class="h-8 hover:opacity-90"
        v-else
      />
    </template>

    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
</template>
