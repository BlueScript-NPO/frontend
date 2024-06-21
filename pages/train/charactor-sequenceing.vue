<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { stimuliCharactorSets } from "~/types/util";
import { playSound } from "~/utils/playSound";
import {
  jsonToProcedure,
  CharactorSequenceingProcedure,
} from "~/types/procedure";

// Vue Router
const route = useRoute();
const router = useRouter();

// Ref Variables
const trainingParameter = ref<CharactorSequenceingProcedure>(
  new CharactorSequenceingProcedure()
);
const totalTrainingTime = ref(0);
const pauseTimer = ref(true);
const stimulusType = ref("");
const characterPool = ref("");
const userInstruction = ref("");
const totalElapsedTime = ref(0);
const promptLength = ref(0);
const isPromptsequential = ref(false);
const currentTrialCount = ref(0);
const answerChoiceCount = ref(0);

const mainText = ref("");
const subText = ref("");
const prompt = ref("");
const currentTrainingStep = ref(0);

const cursorIndex = ref(0);
const answerChoices = ref<string[]>([]);
const correctIndices = ref<number[]>([]);
const selectedIndices = ref<Set<number>>(new Set());
const missedIndices = ref<Set<number>>(new Set());
const trialStartTime = ref<number>(0);
const trialEndTime = ref<number>(0);

const missedCount = ref(0);
const correctCount = ref(0);

// Function: Parse Data from Route Query
const parseRouteData = () => {
  try {
    const data = route.query.data
      ? JSON.parse(decodeURIComponent(route.query.data as string))
      : null;
    if (data) {
      trainingParameter.value = jsonToProcedure(
        data
      ) as CharactorSequenceingProcedure;

      totalTrainingTime.value = data.parameters.duration * 60;
      stimulusType.value = data.parameters.stimuliType;
      characterPool.value = stimuliCharactorSets[stimulusType.value] || "";
      isPromptsequential.value = data.parameters.promptType === "Sequential";
      promptLength.value = data.parameters.promptLength;
      answerChoiceCount.value = 16 * Math.ceil(promptLength.value / 3);
    } else {
      router.push("/train");
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    router.push("/train");
  }
};

// Utility Function: Wait for specified milliseconds
const waitForMilliseconds = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Function: generate a prompt
const generatePrompt = () => {
  const temp = [];

  if (isPromptsequential.value) {
    const startIndex = Math.floor(Math.random() * (26 - promptLength.value));
    const endIndex = startIndex + promptLength.value;

    for (let i = startIndex; i < endIndex; i++) {
      temp.push(characterPool.value[i]);
    }
  } else {
    // random
    for (let i = 0; i < promptLength.value; i++) {
      const randomIndex = Math.floor(
        Math.random() * characterPool.value.length
      );
      temp.push(characterPool.value[randomIndex]);
    }
  }
  return temp.join("");
};

onMounted(() => {
  parseRouteData();

  prompt.value = generatePrompt();

  console.log("Prompt:", prompt.value);
});

// Function: Handle Keydown Event
const handleKeydown = (event: KeyboardEvent) => {
  if (currentTrainingStep.value == 2) {
    if (event.key === "ArrowRight") {
      checkForMissed();
      playSound("click", 30);
      moveCursor();
    } else if (event.key === "Enter" || event.key === " ") {
      handleSelection(cursorIndex.value);
    }
  } else if (currentTrainingStep.value == 3) {
    if (event.key === "Enter" || event.key === " ") {
      startTraining();
    }
  }
};

const moveCursor = () => {
  cursorIndex.value = (cursorIndex.value + 1) % answerChoiceCount.value;
  if (cursorIndex.value === 0) {
    endTrial();
  }
};

// Function to check for missed correct characters
const checkForMissed = () => {
  if (
    correctIndices.value.includes(cursorIndex.value) &&
    !selectedIndices.value.has(cursorIndex.value)
  ) {
    playSound("incorrect");
    missedIndices.value.add(cursorIndex.value);
    document
      .getElementById(`choice-${cursorIndex.value}`)
      ?.classList.add("text-blue-500");
  }
};

// Function: Display Ready Message
const displayReadyMessage = () => {
  playSound("ready");
  currentTrialCount.value++;

  mainText.value = "Get Ready!";
  subText.value = `Trial #${currentTrialCount.value} | Elapsed Time: ${totalElapsedTime.value}`;
  currentTrainingStep.value = 1;
};

// Function: Reset the training trial
const resetTrial = () => {
  userInstruction.value = "";
  prompt.value = generatePrompt();
  cursorIndex.value = 0;
  missedCount.value = 0;
  correctCount.value = 0;
  selectedIndices.value.clear();
  missedIndices.value.clear();

  const promptLen = prompt.value.length;
  const indices: number[] = [];
  const usedIndices = new Set<number>();

  // Generate unique indices for prompt characters
  while (indices.length < promptLen) {
    const index = Math.floor(Math.random() * answerChoiceCount.value);
    if (!usedIndices.has(index)) {
      usedIndices.add(index);
      indices.push(index);
    }
  }

  indices.sort((a, b) => a - b);
  answerChoices.value = Array(answerChoiceCount.value).fill(" ");

  indices.forEach((index, i) => {
    answerChoices.value[index] = prompt.value[i];
  });

  // Fill in the empty spaces with random characters
  for (let i = 0; i < answerChoices.value.length; i++) {
    if (answerChoices.value[i] === " ") {
      const nextPromptChar =
        indices.find((idx) => idx > i) !== undefined
          ? prompt.value[indices.findIndex((idx) => idx > i)]
          : null;
      answerChoices.value[i] = getRandomCharacter(nextPromptChar);
    }
  }

  correctIndices.value = indices;

  console.log("Answer Choices:", answerChoices.value);
  console.log("Correct Indices:", correctIndices.value);
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

// Function to handle user selection
const handleSelection = (index: number) => {
  if (correctIndices.value.includes(index)) {
    playSound("correct");
    selectedIndices.value.add(index);
    document.getElementById(`choice-${index}`)?.classList.add("text-green-500");
    correctCount.value++;
    moveCursor();
  } else {
    playSound("incorrect");
    selectedIndices.value.add(index);
    document.getElementById(`choice-${index}`)?.classList.add("text-red-500");
    missedCount.value++;
    moveCursor();
  }
};

// Function to end the trial
const endTrial = () => {
  trialEndTime.value = Date.now();
  const trialDuration = (trialEndTime.value - trialStartTime.value) / 1000;
  const totalInteractions = prompt.value.length + missedCount.value;

  pauseTimer.value = true;
  playSound("finish");

  const accuracy = (correctCount.value / totalInteractions) * 100;

  mainText.value = "Finish!";
  subText.value = `Time: ${trialDuration.toFixed(
    2
  )}s | Accuracy: ${accuracy.toFixed(2)}%`;
  userInstruction.value = "Press spacebar or enter to continue";

  currentTrainingStep.value = 3;
};

const countDown = async () => {
  subText.value = "초 후에 시작합니다!";
  for (let i = 3; i > 0; i--) {
    mainText.value = i.toString();
    playSound("countdown");
    await waitForMilliseconds(1000);
  }

  playSound("start");
  trialStartTime.value = Date.now();
};

// Function: Training Process
const startTraining = async () => {
  currentTrainingStep.value = 0;
  resetTrial();

  displayReadyMessage();
  await waitForMilliseconds(1500);

  await countDown();
  userInstruction.value =
    "Press the right arrow to move the cursor\n(press Enter or spacebar to select)";
  currentTrainingStep.value = 2;
  pauseTimer.value = false;
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  startTraining();
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <Head>
    <Title>Training - Charactor Sequenceing</Title>
  </Head>
  <TrainingBase
    :totalTrainingTime="totalTrainingTime"
    :pause-timer="pauseTimer"
    :instruction-text="userInstruction"
    v-model="totalElapsedTime"
  >
    <div
      class="flex flex-col justify-center items-center h-full space-y-10"
      v-if="currentTrainingStep === 1"
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
            v-for="(char, i) in answerChoiceCount"
            :id="'choice-' + i"
            :class="[
              'w-14 h-16 rounded-md flex justify-center items-center',
              {
                'outline-blueScriptBlue-500 dark:outline-blueScriptBlue-400 outline outline-2':
                  i === cursorIndex,
                'text-green-500 dark:text-green-400':
                  selectedIndices.has(i) && correctIndices.includes(i),
                'text-red-500 dark:text-red-400':
                  selectedIndices.has(i) && !correctIndices.includes(i),
                ' text-yellow-500 dark:text-yellow-400': missedIndices.has(i),
              },
            ]"
          >
            <span class="block text-center text-5xl w-full">
              {{ answerChoices[i] }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col justify-center items-center h-full space-y-10"
      v-if="currentTrainingStep === 3"
    >
      <TitleHud :title="mainText" :subtitle="subText" />
    </div>
  </TrainingBase>
</template>
