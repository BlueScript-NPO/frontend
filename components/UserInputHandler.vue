<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { playSound } from "~/utils/playSound";
import { KeyboardUtil } from "~/types/util";

interface Props {
  numberOfStimuli: number;
  inputEnabled: boolean;
  hidePromptText: boolean;
  usingKoreanCharacters: boolean;
  stimulusPrompt: string;
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (event: "evaluateInput", userResponse: string): void;
}>();
const keyboard = new KeyboardUtil();
const userResponse = ref<string>("");

const handleKeydown = (event: KeyboardEvent) => {
  if (!props.inputEnabled) return;

  if (event.key === "Backspace") {
    userResponse.value = userResponse.value.slice(0, -1);
    playSound("backspace", 30);
  } else if (event.key === "Enter" || event.key === " ") {
    emits("evaluateInput", userResponse.value);
  } else if (
    /^[a-zA-Z0-9]$/.test(event.key) &&
    userResponse.value.length < props.numberOfStimuli
  ) {
    playSound("click", 30);
    userResponse.value += props.usingKoreanCharacters
      ? keyboard.strokeToKorean(event.key.toUpperCase())
      : event.key.toUpperCase();
  }
};

const paddedUserResponse = computed<string[]>(() => {
  const spacesNeeded = props.numberOfStimuli - userResponse.value.length;
  const responseArray = userResponse.value.split("");
  for (let i = 0; i < spacesNeeded; i++) {
    responseArray.push(props.usingKoreanCharacters ? "　" : " ");
  }
  return responseArray;
});

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});

const textColor = computed<string>(() => {
  if (props.inputEnabled) {
    return "training-text";
  }
  if (userResponse.value === props.stimulusPrompt) {
    return "text-green-500";
  } else {
    return "text-red-500";
  }
});
</script>

<template class="flex flex-col items-center space-y-16">
  <div class="w-full flex justify-center">
    <div class="flex">
      <span
        v-for="(char, index) in paddedUserResponse"
        :key="index"
        class="block w-28 text-center text-8xl"
        :class="textColor"
      >
        {{ char }}
      </span>
    </div>
  </div>

  <div class="w-full flex justify-center">
    <div class="flex" :class="{ invisible: props.hidePromptText }">
      <CenterPrompt :prompt="props.stimulusPrompt" />
    </div>
  </div>
</template>

<style scoped>
/* Additional styles if needed */
</style>
