<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
});
</script>

<template class="flex flex-col items-center space-y-8">
  <div class="text-6xl text-center training-text">
    {{ props.title }}
  </div>
  <div class="text-xl font-light text-center training-text">
    {{ props.subtitle }}
  </div>
</template>
