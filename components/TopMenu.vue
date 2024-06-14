<script setup lang="ts">
const links = [
  {
    label: "Training",
    to: "/train",
  },
];

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
    <template #logo> Logo </template>

    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
</template>
