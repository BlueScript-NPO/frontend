<template>
  <NuxtImg
    src="/logo.svg"
    alt="BlueScript darkmode logo"
    class="dark:hidden"
    v-bind="$attrs"
  />
  <NuxtImg
    src="/logo-dark.svg"
    alt="BlueScript logo"
    class="hidden dark:block"
    v-bind="$attrs"
  />
</template>
