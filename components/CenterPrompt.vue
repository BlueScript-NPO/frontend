<script setup lang="ts">
const props = defineProps({
  prompt: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex">
    <span
      v-for="(char, index) in props.prompt.split('')"
      :key="index"
      class="block w-28 text-center text-8xl training-text"
    >
      {{ char }}
    </span>
  </div>
</template>
