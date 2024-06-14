<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from "vue";

const props = defineProps({
  stimuliLength: {
    type: Number,
    required: true,
  },
  allowInput: {
    type: Boolean,
    required: true,
  },
  hidePrompt: {
    type: Boolean,
    required: true,
  },
  isKorean: {
    type: Boolean,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["evaluate"]);
const userInput = ref<string>("");

const englishCodes = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const koreanCodes =
  "ㅁㅠㅊㅇㄷㄹㅎㅗㅑㅓㅏㅣㅡㅜㅐㅔㅂㄱㄴㅅㅕㅍㅈㅋㅛㅋ0123456789";

const convertToKorean = (char: string): string => {
  const index = englishCodes.indexOf(char.toUpperCase());
  return index !== -1 ? koreanCodes[index] : char;
};

const handleKeydown = (event: KeyboardEvent) => {
  if (!props.allowInput) return;

  if (event.key === "Backspace") {
    userInput.value = userInput.value.slice(0, -1);
  } else if (event.key === "Enter" || event.key === " ") {
    emits("evaluate", userInput.value);
  } else if (
    /^[a-zA-Z0-9]$/.test(event.key) &&
    userInput.value.length < props.stimuliLength
  ) {
    userInput.value += props.isKorean
      ? convertToKorean(event.key.toUpperCase())
      : event.key.toUpperCase();
  }
};

const getPaddedInput = computed((): string => {
  const spacesNeeded = props.stimuliLength - userInput.value.length;
  const spaces = props.isKorean
    ? "　".repeat(spacesNeeded)
    : " ".repeat(spacesNeeded);
  return userInput.value + spaces;
});

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template class="flex flex-col items-center space-y-16">
  <div class="w-full">
    <div class="text-main">
      <span class="block w-full whitespace-pre">{{ getPaddedInput }}</span>
    </div>
  </div>

  <div class="w-full">
    <div class="text-main" :class="{ invisible: props.hidePrompt }">
      {{ props.prompt }}
    </div>
  </div>
</template>

<style scoped>
/* Additional styles if needed */
</style>
