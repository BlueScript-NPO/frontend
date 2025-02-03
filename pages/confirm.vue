<script setup lang="ts">
const user = useSupabaseUser();
const localePath = useLocalePath();

watch(
  user,
  () => {
    if (user.value) {
      // Redirect to path
      return navigateTo(localePath("/dashboard"));
    }
  },
  { immediate: true }
);
</script>
<template>
  <div>Waiting for login...</div>
</template>
