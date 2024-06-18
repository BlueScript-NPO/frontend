<template>
  <div
    class="fixed inset-0 h-screen w-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950"
    @click.right.stop.prevent
  >
    <slot></slot>

    <!-- Top center instruction -->
    <div
      class="absolute top-0 left-0 right-0 p-10 flex justify-center text-2xl training-text"
    >
      <div
        :style="{ whiteSpace: 'pre-line' }"
        class="text-center font-light tracking-wide leading-relaxed"
      >
        {{ props.instructionText }}
      </div>
    </div>

    <!-- Bottom right timer -->
    <div
      class="absolute bottom-0 right-0 text-lg p-4 px-8"
      :class="
        elapsedSeconds >= props.totalTrainingTime
          ? 'text-yellow-600 dark:text-yellow-400'
          : 'training-text'
      "
    >
      {{ formattedElapsedTime }}
    </div>
  </div>

  <!-- Top right toggle theme button -->
  <div class="fixed top-0 right-0 p-4 cursor-pointer">
    <UColorModeButton />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";

interface Props {
  totalTrainingTime: number;
  instructionText: string;
  pauseTimer: boolean;
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

// Watch for changes in pauseTimer to pause/resume the timer
watch(
  () => props.pauseTimer,
  (pause) => {
    if (pause) {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    } else {
      startTimer();
    }
  },
  { immediate: true }
);

const startTimer = () => {
  if (startTime.value === null) {
    startTime.value = Date.now();
  } else {
    startTime.value = Date.now() - elapsedSeconds.value * 1000;
  }

  intervalId = window.setInterval(() => {
    if (startTime.value !== null) {
      elapsedSeconds.value = Math.floor((Date.now() - startTime.value) / 1000);
    }
  }, 1000);
};

onMounted(() => {
  if (!props.pauseTimer) {
    startTimer();
  }
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
