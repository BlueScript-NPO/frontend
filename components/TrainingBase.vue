<!-- TimerComponent.vue -->
<template>
  <div class="fixed inset-0 bg-black h-screen w-screen overflow-hidden">
    <slot></slot>
    <div
      class="absolute bottom-0 right-0 text-lg p-4 px-8"
      :style="{ color: elapsedTime > trainingTime ? 'yellow' : 'white' }"
    >
      {{ formattedTime }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";

interface Props {
  trainingTime: number;
}

const props = defineProps<Props>();

const startTime = ref<number | null>(null);
const elapsedTime = ref(0);
let timerInterval: number | null = null;

const formattedTime = computed(() => {
  const minutes = Math.floor(elapsedTime.value / 60);
  const seconds = (elapsedTime.value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
});

onMounted(() => {
  startTime.value = Date.now();
  timerInterval = window.setInterval(() => {
    if (startTime.value !== null) {
      elapsedTime.value = Math.floor((Date.now() - startTime.value) / 1000);
    }
  }, 1000);
});

onUnmounted(() => {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
  }
});

watch(
  () => props.trainingTime,
  (newVal) => {
    if (elapsedTime.value > newVal) {
      elapsedTime.value = newVal;
    }
  }
);
</script>

<style scoped>
/* Disable text selection */
* {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

/* Disable dragging */
* {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}
</style>
