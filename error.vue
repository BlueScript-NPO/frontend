<template>
  <NuxtLayout>
    <div class="w-full h-[80dvh] flex items-center justify-center">
      <UPageError :error="error" />
    </div>
  </NuxtLayout>
</template>

<script setup>
const error = useError();
</script>
