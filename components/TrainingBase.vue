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
        class="text-center font-normal tracking-wide leading-relaxed"
      >
        {{ instructionText }}
      </div>
    </div>

    <!-- Bottom right timer -->
    <div
      class="absolute bottom-0 right-0 text-lg p-4 px-8"
      :class="
        elapsedSeconds >= totalTrainingTime
          ? 'text-yellow-600 dark:text-yellow-400'
          : 'training-text'
      "
    >
      {{ formattedElapsedTime }}
    </div>
  </div>

  <!-- Top right toggle theme button -->
  <div class="fixed top-0 right-0 p-4 cursor-pointer">
    <UButton
      icon="i-ph-gear"
      color="white"
      variant="outline"
      @click="isSettingOpen = true"
    />
  </div>

  <UModal v-model="isSettingOpen" :ui="{ width: 'w-full sm:max-w-sm' }">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">{{ $t("setting.title") }}</h2>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-ph-x"
            class="-my-1"
            @click="isSettingOpen = false"
          />
        </div>
      </template>

      <div class="space-y-4">
        <UFormGroup :label="$t('setting.colorMode')">
          <UColorModeSelect />
        </UFormGroup>
        <UFormGroup label="Language">
          <LangSwitcher />
        </UFormGroup>
      </div>

      <template #footer>
        <div class="flex space-x-4 justify-end">
          <UButton color="red" icon="i-ph-door-open" :to="localePath('/train')">
            {{ $t("train.quit") }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
const localePath = useLocalePath();

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

const isSettingOpen = ref(false);

const formattedElapsedTime = computed(() => {
  const minutes = Math.floor(elapsedSeconds.value / 60);
  const seconds = String(elapsedSeconds.value % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
});

watch(elapsedSeconds, (val) => {
  model.value = val;
});

watch(
  () => props.totalTrainingTime,
  (val) => {
    if (elapsedSeconds.value > val) elapsedSeconds.value = val;
  }
);

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
  const now = Date.now();
  startTime.value =
    startTime.value === null ? now : now - elapsedSeconds.value * 1000;

  intervalId = window.setInterval(() => {
    if (startTime.value !== null) {
      elapsedSeconds.value = Math.floor((Date.now() - startTime.value) / 1000);
    }
  }, 1000);
};

onMounted(() => {
  if (!props.pauseTimer) startTimer();
});

onUnmounted(() => {
  if (intervalId !== null) clearInterval(intervalId);
});
</script>

<style scoped>
* {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}
</style>
