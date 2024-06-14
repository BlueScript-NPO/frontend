<script setup lang="ts">
import { defineProps } from "vue";

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
  <div class="text-6xl font-light text-center text-white font-mono">
    {{ props.title }}
  </div>
  <div class="text-xl font-light text-center text-white font-mono">
    {{ props.subtitle }}
  </div>
</template>
