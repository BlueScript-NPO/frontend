<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";

const { t } = useI18n();

// Extracted parameters
const characterPool = ref("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
const promptLength = ref(14);
const answerChoiceCount = ref(16 * Math.ceil(promptLength.value / 3));

// State variables
const mainText = ref("");
const subText = ref("");
const prompt = ref("");
const currentTrainingStep = ref(0);
const cursorIndex = ref(0);
const answerChoices = ref<string[]>([]);
const correctIndices = ref<number[]>([]);
const selectedIndices = ref<Set<number>>(new Set());
const missedCount = ref<number>(0);
const correctCount = ref<number>(0);
const lastCorrectIndex = ref(-1);
const currentTrialCount = ref(1);

// Computed properties
const accuracy = computed(() => {
  const totalInteractions = correctCount.value + missedCount.value;
  return totalInteractions === 0
    ? 0
    : (correctCount.value / totalInteractions) * 100;
});

// Utility function: Wait for specified milliseconds
const waitForMilliseconds = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Function: Generate a prompt
const generatePrompt = () => {
  const temp = [];

  for (let i = 0; i < promptLength.value; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.value.length);
    temp.push(characterPool.value[randomIndex]);
  }

  return temp.join("");
};

// Function: Simulate a trial
const simulateTrial = async () => {
  // Reset variables
  prompt.value = generatePrompt();
  cursorIndex.value = 0;
  missedCount.value = 0;
  correctCount.value = 0;
  lastCorrectIndex.value = -1;
  selectedIndices.value.clear();

  const promptLen = prompt.value.length;
  const indices: number[] = [];
  const usedIndices = new Set<number>();

  // Randomly assign correct answer positions
  while (indices.length < promptLen) {
    const index = Math.floor(Math.random() * answerChoiceCount.value);
    if (!usedIndices.has(index)) {
      usedIndices.add(index);
      indices.push(index);
    }
  }

  indices.sort((a, b) => a - b);
  answerChoices.value = Array(answerChoiceCount.value).fill(" ");

  // Assign correct characters to their positions
  indices.forEach((index, i) => {
    answerChoices.value[index] = prompt.value[i];
  });

  // Fill remaining answer choices with random characters, ensuring they don't match adjacent correct characters
  for (let i = 0; i < answerChoices.value.length; i++) {
    if (answerChoices.value[i] === " ") {
      const nextCorrectIdx = indices.find((idx) => idx > i);
      const nextPromptChar =
        nextCorrectIdx !== undefined
          ? prompt.value[indices.indexOf(nextCorrectIdx)]
          : null;
      answerChoices.value[i] = getRandomCharacter(nextPromptChar);
    }
  }

  correctIndices.value = indices;

  // Start trial
  mainText.value = "";
  subText.value = "";
  currentTrainingStep.value = 2;

  // Simulate selecting answer choices
  await simulateSelections();

  // Repeat the trial
  simulateTrial();
};

const getRandomCharacter = (excludeChar: string | null) => {
  let char;
  do {
    char = characterPool.value.charAt(
      Math.floor(Math.random() * characterPool.value.length)
    );
  } while (char === excludeChar);
  return char;
};

// Function: Simulate selections based on actual logic
const simulateSelections = async () => {
  while (cursorIndex.value < answerChoiceCount.value) {
    await waitForMilliseconds(Math.random() * 100 + 150);

    // Check for missed correct characters before moving
    if (correctIndices.value.includes(cursorIndex.value)) {
      const isSelected = Math.random() < 0.95; // 95% chance to select correctly
      if (isSelected) {
        // Simulate selection
        selectedIndices.value.add(cursorIndex.value);
        correctCount.value++;
        lastCorrectIndex.value = cursorIndex.value;
        cursorIndex.value++;
      } else {
        // Simulate missing the correct selection
        missedCount.value++;
        cursorIndex.value = lastCorrectIndex.value + 1;
        await waitForMilliseconds(Math.random() * 1200 + 600);
      }
    } else {
      const isMistakenSelection = Math.random() < 0.05; // 5% chance to mistakenly select incorrect answer
      if (isMistakenSelection) {
        // Simulate mistaken selection
        missedCount.value++;
        // Return cursor to last correct index + 1
        cursorIndex.value = lastCorrectIndex.value + 1;

        await waitForMilliseconds(Math.random() * 1200 + 600);
      } else {
        // Move cursor to next index without selection
        cursorIndex.value++;
      }
    }
  }

  currentTrialCount.value++;

  // Trial ends when cursor has traversed all answer choices
  // Calculate and display results
  currentTrainingStep.value = 3;
  mainText.value = t("training.finish");
  subText.value = `${t("training.accuracy")} ${accuracy.value.toFixed(2)}%`;
  await waitForMilliseconds(2000);

  // Reset for next trial
  currentTrainingStep.value = 1;
  mainText.value = t("training.ready");
  subText.value = `${t("training.trial")} #${currentTrialCount.value}`;
  await waitForMilliseconds(1000);

  // Countdown before next trial
  for (let i = 3; i > 0; i--) {
    mainText.value = i.toString();
    await waitForMilliseconds(1000);
  }

  // Restart the trial
  currentTrainingStep.value = 2;
  mainText.value = "";
  subText.value = "";
};

// Optional: Initialize the first trial on component mount
onMounted(() => {
  simulateTrial();
});
</script>

<template>
  <div class="overflow-hidden bg-zinc-50 dark:bg-zinc-950 w-full h-full p-4">
    <div
      class="flex flex-col justify-center items-center h-full space-y-10"
      v-if="currentTrainingStep === 1 || currentTrainingStep === 3"
    >
      <TitleHud :title="mainText" :subtitle="subText" />
    </div>

    <div
      class="flex flex-col justify-center items-center h-full training-text"
      v-if="currentTrainingStep === 2"
    >
      <div class="flex">
        <div
          class="flex justify-center w-8"
          v-for="(char, index) in prompt"
          :key="index"
        >
          <span class="block text-center text-4xl">
            {{ char }}
          </span>
        </div>
      </div>

      <UDivider class="pt-4 pb-10" />

      <div class="flex justify-center">
        <div class="grid grid-cols-16">
          <div
            v-for="(char, i) in answerChoices"
            :key="i"
            :id="'choice-' + i"
            :class="[
              'w-14 h-16 rounded-md flex justify-center items-center',
              {
                'outline-blueScriptBlue-500 dark:outline-blueScriptBlue-400 outline outline-2':
                  i === cursorIndex,
                'text-green-500 dark:text-green-400': selectedIndices.has(i),
              },
            ]"
          >
            <span class="block text-center text-5xl w-full">
              {{ char }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
