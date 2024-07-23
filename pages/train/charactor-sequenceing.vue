<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { stimuliCharactorSets } from "~/utils/util";
import { playSound } from "~/utils/playSound";
import {
  jsonToProcedure,
  CharactorSequenceingProcedure,
} from "~/types/procedure";
import { CharactorSequenceingResult } from "~/types/result";

const { t } = useI18n();

// Vue Router
const route = useRoute();
const router = useRouter();

// Ref Variables
const trainingParameter = ref<CharactorSequenceingProcedure>(
  new CharactorSequenceingProcedure()
);
const totalTrainingTime = ref<number>(0);
const pauseTimer = ref<boolean>(true);
const stimulusType = ref<string>("");
const characterPool = ref<string>("");
const userInstruction = ref<string>("");
const totalElapsedTime = ref<number>(0);
const promptLength = ref<number>(0);
const isPromptSequential = ref<boolean>(false);
const currentTrialCount = ref<number>(0);
const answerChoiceCount = ref<number>(0);

const mainText = ref<string>("");
const subText = ref<string>("");
const prompt = ref<string>("");
const currentTrainingStep = ref<number>(0);

const cursorIndex = ref<number>(0);
const answerChoices = ref<string[]>([]);
const correctIndices = ref<number[]>([]);
const selectedIndices = ref<Set<number>>(new Set());
const trialStartTime = ref<number>(0);
const trialEndTime = ref<number>(0);

const missedCount = ref<number>(0);
const correctCount = ref<number>(0);

// result variables
const accuracies = ref<number[]>([]);
const timeTaken = ref<number[]>([]);

// Computed properties
const accuracy = computed(() => {
  const totalInteractions = prompt.value.length + missedCount.value;
  return (correctCount.value / totalInteractions) * 100;
});

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
      isPromptSequential.value = data.parameters.promptType === "Sequential";
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
  if (isPromptSequential.value) {
    const startIndex = Math.floor(Math.random() * (26 - promptLength.value));
    for (let i = startIndex; i < startIndex + promptLength.value; i++) {
      temp.push(characterPool.value[i]);
    }
  } else {
    for (let i = 0; i < promptLength.value; i++) {
      const randomIndex = Math.floor(
        Math.random() * characterPool.value.length
      );
      temp.push(characterPool.value[randomIndex]);
    }
  }
  return temp.join("");
};

// Function: Handle Keydown Event
const handleKeydown = (event: KeyboardEvent) => {
  if (currentTrainingStep.value === 2) {
    if (event.key === "ArrowRight") {
      checkForMissed();
    } else if (event.key === "Enter" || event.key === " ") {
      handleSelection(cursorIndex.value);
    }
  } else if (
    currentTrainingStep.value === 3 &&
    (event.key === "Enter" || event.key === " ")
  ) {
    startTraining();
  }
};

const moveCursor = () => {
  if (cursorIndex.value === answerChoiceCount.value - 1) {
    endTrial();
    return;
  }
  cursorIndex.value++;
};

// Function to return the cursor to the last correct character (back to start if no correct character)
const returnCursor = () => {
  if (correctCount.value === 0) {
    cursorIndex.value = 0;
  } else {
    cursorIndex.value = correctIndices.value[correctCount.value - 1] + 1;
  }
};

// Function to check for missed correct characters
const checkForMissed = () => {
  if (
    correctIndices.value.includes(cursorIndex.value) &&
    !selectedIndices.value.has(cursorIndex.value)
  ) {
    playSound("incorrect");
    missedCount.value++;
    returnCursor();
  } else {
    playSound("click", 30);
    moveCursor();
  }
};

// Function: Display Ready Message
const displayReadyMessage = () => {
  playSound("ready");
  currentTrialCount.value++;
  mainText.value = t("training.ready");
  subText.value = `${t("training.trial")} #${currentTrialCount.value} | ${t(
    "training.elapsed"
  )} ${totalElapsedTime.value}${t("unit.sec")}`;
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

  const promptLen = prompt.value.length;
  const indices: number[] = [];
  const usedIndices = new Set<number>();

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
    correctCount.value++;
    moveCursor();
  } else {
    playSound("incorrect");
    missedCount.value++;
    returnCursor();
  }
};

// Function to end the trial
const endTrial = () => {
  trialEndTime.value = Date.now();
  const trialDuration = (trialEndTime.value - trialStartTime.value) / 1000;
  pauseTimer.value = true;
  playSound("finish");

  mainText.value = t("training.finish");
  subText.value = `Time: ${trialDuration.toFixed(
    2
  )}s | Accuracy: ${accuracy.value.toFixed(2)}%`;

  subText.value = `${t("training.timeSpent")} ${trialDuration.toFixed(2)} ${t(
    "unit.sec"
  )} | ${t("training.accuracy")} ${accuracy.value.toFixed(2)}%`;
  userInstruction.value = t("training.continue");
  currentTrainingStep.value = 3;

  // record result
  accuracies.value.push(accuracy.value);
  timeTaken.value.push(trialDuration);
};

// Function to handle countdown before trial starts
const countDown = async () => {
  subText.value = "";
  for (let i = 3; i > 0; i--) {
    mainText.value = i.toString();
    playSound("countdown");
    await waitForMilliseconds(1000);
  }
  playSound("start");
  trialStartTime.value = Date.now();
};

// Function: Save Training Result
const saveTrainingResults = (): void => {
  const sumValues = (acc: number, val: number): number => acc + val;

  const averageAccuracy: number = parseFloat(
    (accuracies.value.reduce(sumValues, 0) / accuracies.value.length).toFixed(2)
  );
  const avrgTrialTime: number = parseFloat(
    (timeTaken.value.reduce(sumValues, 0) / timeTaken.value.length).toFixed(2)
  );

  const trialData: { Trial: number; Accuracy: number; Time: number }[] =
    accuracies.value.map((accuracy, index) => ({
      Trial: index + 1,
      Accuracy: parseFloat(accuracy.toFixed(2)),
      Time: parseFloat(timeTaken.value[index].toFixed(2)),
    }));

  const result = new CharactorSequenceingResult(
    averageAccuracy,
    avrgTrialTime,
    currentTrialCount.value,
    trialData,
    totalElapsedTime.value,
    "DOCTOR",
    "PATIENT",
    "", // This is for notes (intentionally left blank)
    undefined,
    trainingParameter.value
  );

  const jsonString: string = JSON.stringify(result.toJson());
  console.log("Training Result:", jsonString);
  router.push({
    name: "result",
    query: { data: encodeURIComponent(jsonString) },
  });
};

// Function: Training Process
const startTraining = async () => {
  if (totalElapsedTime.value >= totalTrainingTime.value) {
    saveTrainingResults();
    return;
  }

  currentTrainingStep.value = 0;
  resetTrial();
  displayReadyMessage();
  await waitForMilliseconds(1500);
  await countDown();

  userInstruction.value = t("training.sequencingInstruction");
  currentTrainingStep.value = 2;
  pauseTimer.value = false;
};

onMounted(() => {
  parseRouteData();
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
  </TrainingBase>
</template>
