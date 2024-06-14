<template>
  <div
    class="fixed inset-0 bg-black h-screen w-screen overflow-hidden"
    @click.right.stop.prevent
  >
    <slot></slot>

    <!-- Top center instruction -->
    <div
      class="absolute top-0 left-0 right-0 text-lg p-10 flex justify-center text-white text-3xl"
    >
      <div :style="{ whiteSpace: 'pre-line' }" class="text-center">
        {{ props.top }}
      </div>
    </div>

    <!-- Bottom right timer -->
    <div
      class="absolute bottom-0 right-0 text-lg p-4 px-8"
      :style="{ color: timer > props.trainingTime ? 'yellow' : 'white' }"
    >
      {{ formattedTime }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";

interface Props {
  trainingTime: number;
  top: string;
}

const props = defineProps<Props>();
const model = defineModel<number>();

const startTime = ref<number | null>(null);
const timer = ref(0);
let timerInterval: number | null = null;

const formattedTime = computed(() => {
  const minutes = Math.floor(timer.value / 60);
  const seconds = (timer.value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
});

// Watch for changes in the timer to update the model
watch(timer, (newVal) => {
  model.value = newVal;
});

// Watch for changes in trainingTime to adjust the timer if needed
watch(
  () => props.trainingTime,
  (newVal) => {
    if (timer.value > newVal) {
      timer.value = newVal;
    }
  }
);

onMounted(() => {
  startTime.value = Date.now();
  timerInterval = window.setInterval(() => {
    if (startTime.value !== null) {
      timer.value = Math.floor((Date.now() - startTime.value) / 1000);
    }
  }, 1000);
});

onUnmounted(() => {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
  }
});
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
