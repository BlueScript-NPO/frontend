<template>
  <TopMenu />
  <ULandingHero
    title="BlueScript"
    description="BlueScript is a non-profit organization that develops free and open-source tools to help dyslexic individuals."
    :links="actionLinks"
  >
  </ULandingHero>

  <div class="sm:px-8 px-2 flex w-screen justify-center">
    <div class="max-w-4xl w-full">
      <ImagePlaceholder />
    </div>
  </div>
</template>

<script setup>
const actionLinks = ref([
  {
    label: "Get started",
    icon: "i-heroicons-arrow-right-20-solid",
    trailing: true,
    to: "/train",
    size: "xl",
  },
  {
    label: "Source Code",
    icon: "i-heroicons-cube-transparent",
    to: "https://github.com/BlueScript-NPO",
    size: "xl",
  },
]);
</script>
