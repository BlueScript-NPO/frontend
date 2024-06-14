<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted,
  computed,
  defineProps,
  defineEmits,
} from "vue";

const props = defineProps({
  numberOfStimuli: {
    type: Number,
    required: true,
  },
  inputEnabled: {
    type: Boolean,
    required: true,
  },
  hidePromptText: {
    type: Boolean,
    required: true,
  },
  usingKoreanCharacters: {
    type: Boolean,
    required: true,
  },
  stimulusPrompt: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["evaluateInput"]);
const userResponse = ref<string>("");

const englishCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const koreanCharacters =
  "ㅁㅠㅊㅇㄷㄹㅎㅗㅑㅓㅏㅣㅡㅜㅐㅔㅂㄱㄴㅅㅕㅍㅈㅋㅛㅋ0123456789";

const convertToKorean = (char: string): string => {
  const index = englishCharacters.indexOf(char.toUpperCase());
  return index !== -1 ? koreanCharacters[index] : char;
};

const handleKeydown = (event: KeyboardEvent) => {
  if (!props.inputEnabled) return;

  if (event.key === "Backspace") {
    userResponse.value = userResponse.value.slice(0, -1);
  } else if (event.key === "Enter" || event.key === " ") {
    emits("evaluateInput", userResponse.value);
  } else if (
    /^[a-zA-Z0-9]$/.test(event.key) &&
    userResponse.value.length < props.numberOfStimuli
  ) {
    userResponse.value += props.usingKoreanCharacters
      ? convertToKorean(event.key.toUpperCase())
      : event.key.toUpperCase();
  }
};

const paddedUserResponse = computed((): string => {
  const spacesNeeded = props.numberOfStimuli - userResponse.value.length;
  const spaces = props.usingKoreanCharacters
    ? "　".repeat(spacesNeeded)
    : " ".repeat(spacesNeeded);
  return userResponse.value + spaces;
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
      <span class="block w-full whitespace-pre">{{ paddedUserResponse }}</span>
    </div>
  </div>

  <div class="w-full">
    <div class="text-main" :class="{ invisible: props.hidePromptText }">
      {{ props.stimulusPrompt }}
    </div>
  </div>
</template>

<style scoped>
/* Additional styles if needed */
</style>
