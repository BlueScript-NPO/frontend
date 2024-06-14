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
        {{ props.instructionText }}
      </div>
    </div>

    <!-- Bottom right timer -->
    <div
      class="absolute bottom-0 right-0 text-lg p-4 px-8"
      :style="{
        color: elapsedSeconds > props.totalTrainingTime ? 'yellow' : 'white',
      }"
    >
      {{ formattedElapsedTime }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";

interface Props {
  totalTrainingTime: number;
  instructionText: string;
}

const props = defineProps<Props>();
const model = defineModel<number>();

const startTime = ref<number | null>(null);
const elapsedSeconds = ref(0);
let intervalId: number | null = null;

const formattedElapsedTime = computed(() => {
  const minutes = Math.floor(elapsedSeconds.value / 60);
  const seconds = (elapsedSeconds.value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
});

// Watch for changes in the elapsed time to update the model
watch(elapsedSeconds, (newVal) => {
  model.value = newVal;
});

// Watch for changes in total training time to adjust the elapsed time if needed
watch(
  () => props.totalTrainingTime,
  (newVal) => {
    if (elapsedSeconds.value > newVal) {
      elapsedSeconds.value = newVal;
    }
  }
);

onMounted(() => {
  startTime.value = Date.now();
  intervalId = window.setInterval(() => {
    if (startTime.value !== null) {
      elapsedSeconds.value = Math.floor((Date.now() - startTime.value) / 1000);
    }
  }, 1000);
});

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId);
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
