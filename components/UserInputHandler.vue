<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from "vue";

const props = defineProps({
  stimuliLength: {
    type: Number,
    required: true,
  },
  charUpper: {
    type: Boolean,
    default: false,
  },
  allowInput: {
    type: Boolean,
    default: true,
  },
  hidePrompt: {
    type: Boolean,
    default: false,
  },
  prompt: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["evaluate"]);

const userInput = ref("");
const handleKeydown = (event: KeyboardEvent) => {
  if (!props.allowInput) return;

  const isAlphaNumeric = /^[a-zA-Z0-9]$/.test(event.key);

  if (event.key === "Backspace") {
    userInput.value = userInput.value.slice(0, -1);
  } else if (event.key === "Enter" || event.key === " ") {
    emits("evaluate", userInput.value);
  } else if (isAlphaNumeric && userInput.value.length < props.stimuliLength) {
    if (props.charUpper) {
      userInput.value += event.key.toUpperCase();
    } else {
      userInput.value += event.key.toLowerCase();
    }
  }
};

const getPaddedInput = (): string => {
  const totalLength = props.stimuliLength;
  const inputLength = userInput.value.length;
  const spacesNeeded = totalLength - inputLength;
  const spaces = " ".repeat(spacesNeeded);
  return userInput.value + spaces;
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});
</script>

<template class="flex flex-col items-center space-y-16">
  <div class="w-full">
    <div class="text-main">
      <span class="block w-full whitespace-pre">{{ getPaddedInput() }}</span>
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
