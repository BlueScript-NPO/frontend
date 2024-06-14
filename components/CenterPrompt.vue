<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  prompt: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="text-main">{{ props.prompt }}</div>
</template>
