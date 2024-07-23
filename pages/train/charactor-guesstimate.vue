<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { KeyboardUtil } from "~/utils/util";
import {
  jsonToProcedure,
  CharactorGuesstimateProcedure,
} from "~/types/procedure";
import { CharactorGuesstimateResult } from "~/types/result";
import { stimuliCharactorSets } from "~/utils/util";
import { playSound } from "~/utils/playSound";

// Vue Router
const route = useRoute();
const router = useRouter();

const keyboard = new KeyboardUtil();

const waitForMilliseconds = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Ref Variables
const trainingParameter = ref<CharactorGuesstimateProcedure>(
  new CharactorGuesstimateProcedure()
);

// Training Base Variables
const totalTrainingTime = ref<number>(0);
const userInstruction = ref<string>("");
const pauseTimer = ref<boolean>(true);
const totalElapsedTime = ref<number>(0);

// Training Parameter Variables
const stimulusType = ref<string>("");
const isUsingKoreanChars = ref<boolean>(false);
const charactorPool = ref<string>("");
const chunkSize = ref<number>(20);
const chunkSizeMap: Record<string, number> = {
  Small: 20,
  Medium: 15,
  Large: 10,
}; // number is the number of columns/rows
const revealSpeed = ref<number>(100); // in milliseconds

// Training Execution Variables
const currentTrainingStep = ref<number>(0);
const currentCharactor = ref<string>("");
const currentTrialCount = ref<number>(0);
const chunkMask = ref<boolean[]>([]);
const chunkIndices = ref<number[]>([]);
const shownChunks = ref<number>(0);
const answerCorrect = ref<boolean>(false);

const trialStartTime = ref<number>(0);
const trialEndTime = ref<number>(0);

const mainText = ref<string>("");
const subText = ref<string>("");

// result variables
const revealed = ref<number[]>([]);
const timeTaken = ref<number[]>([]);
const answerCorrectness = ref<boolean[]>([]);
const incorrectCount = ref<number>(0);

const handleKeydown = (event: KeyboardEvent) => {
  if (currentTrainingStep.value == 2) {
    if (/^[a-zA-Z0-9]$/.test(event.key)) {
      pauseTimer.value = true;
      if (isUsingKoreanChars.value) {
        evaluateAnswer(keyboard.strokeToKorean(event.key.toUpperCase()));
      } else {
        evaluateAnswer(event.key.toUpperCase());
      }
      currentTrainingStep.value = 3;
    }
  } else if (currentTrainingStep.value == 3) {
    if (event.key === "Enter" || event.key === " ") {
      startTraining();
    }
  }
};

// Function: Save Training Result
const saveTrainingResults = (): void => {
  const sumValues = (acc: number, val: number): number => acc + val;

  const averageRevealed: number = parseFloat(
    (revealed.value.reduce(sumValues, 0) / revealed.value.length).toFixed(2)
  );
  const avrgTrialTime: number = parseFloat(
    (timeTaken.value.reduce(sumValues, 0) / timeTaken.value.length).toFixed(2)
  );

  const avrageAccuracy: number = parseFloat(
    (
      ((currentTrialCount.value - incorrectCount.value) /
        currentTrialCount.value) *
      100
    ).toFixed(2)
  );

  const trialData: {
    Trial: number;
    Correct: string;
    Reveald: number;
    Time: number;
  }[] = revealed.value.map((reveal, index) => ({
    Trial: index + 1,
    Correct: answerCorrectness.value[index] ? "✅" : "❌",
    Reveald: parseFloat(reveal.toFixed(2)),
    Time: parseFloat(timeTaken.value[index].toFixed(2)),
  }));

  const result = new CharactorGuesstimateResult(
    avrageAccuracy,
    averageRevealed,
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

// function: evaluate user input
const evaluateAnswer = (userResponse: string) => {
  trialEndTime.value = Date.now();
  if (userResponse === currentCharactor.value) {
    answerCorrect.value = true;
    playSound("correct");
    userInstruction.value = "Correct!\nPress spacebar or enter to continue";
  } else {
    answerCorrect.value = false;
    playSound("incorrect");
    userInstruction.value = "Incorrect!\nPress spacebar or enter to continue";
    incorrectCount.value++;
  }

  const trialDuration = (trialEndTime.value - trialStartTime.value) / 1000;

  revealed.value.push(
    (shownChunks.value / (chunkSize.value * chunkSize.value)) * 100
  );
  timeTaken.value.push(trialDuration);
  answerCorrectness.value.push(answerCorrect.value);
};

// Function: Initialize the chunk mask (fill with true)
const initializeChunkMask = () => {
  const totalChunks = chunkSize.value * chunkSize.value;
  chunkMask.value = Array(totalChunks).fill(true);
  chunkIndices.value = Array.from({ length: totalChunks }, (_, i) => i);
  shownChunks.value = 0;
};

// Function: Parse Data from Route Query
const parseRouteData = () => {
  try {
    const data = route.query.data
      ? JSON.parse(decodeURIComponent(route.query.data as string))
      : null;
    if (data) {
      trainingParameter.value = jsonToProcedure(
        data
      ) as CharactorGuesstimateProcedure;

      totalTrainingTime.value =
        trainingParameter.value.duration.getValue() * 60;
      chunkSize.value =
        chunkSizeMap[trainingParameter.value.chunkSize.getValue()];

      stimulusType.value = trainingParameter.value.stimuliType.getValue();
      charactorPool.value = stimuliCharactorSets[stimulusType.value] || "";

      isUsingKoreanChars.value = ["Korean"].includes(stimulusType.value);
      initializeChunkMask();
    } else {
      router.push("/train");
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    router.push("/train");
  }
};

// Function: Select one charactor and assign to current charactor
const selectCharactor = () => {
  currentCharactor.value =
    charactorPool.value[Math.floor(Math.random() * charactorPool.value.length)];
};

// Function: Display Ready Message
const displayReadyMessage = () => {
  playSound("ready");
  mainText.value = "Get Ready!";
  subText.value = `Trial #${currentTrialCount.value} | Elapsed Time: ${totalElapsedTime.value}`;
  currentTrainingStep.value = 1;
};

// Function: Training Process
const startTraining = async () => {
  if (totalElapsedTime.value >= totalTrainingTime.value) {
    saveTrainingResults();
    return;
  }

  currentTrialCount.value++;
  userInstruction.value = "";
  pauseTimer.value = false;

  displayReadyMessage();
  await waitForMilliseconds(1500);

  initializeChunkMask();
  selectCharactor();
  currentTrainingStep.value = 0;
  await waitForMilliseconds(1000); // Blank screen duration

  trialStartTime.value = Date.now();

  userInstruction.value =
    "Press the key that matches the character getting revealed";
  currentTrainingStep.value = 2;
  revealCharacterGradually();
};

// Function: Shuffle array
const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Function: Gradually Reveal Character
const revealCharacterGradually = async () => {
  shuffleArray(chunkIndices.value);
  for (const index of chunkIndices.value) {
    if (currentTrainingStep.value !== 2) {
      return;
    }
    await waitForMilliseconds(revealSpeed.value);
    chunkMask.value[index] = false;
    shownChunks.value++;
  }
};

// Lifecycle Hook: On Component Mounted
onMounted(() => {
  parseRouteData();
  startTraining();
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <Head>
    <Title>Training - Character Guesstimate</Title>
  </Head>

  <TrainingBase
    :totalTrainingTime="totalTrainingTime"
    :instructionText="userInstruction"
    :pauseTimer="pauseTimer"
    v-model="totalElapsedTime"
  >
    <div class="flex flex-col justify-center items-center h-full space-y-10">
      <TitleHud
        :title="mainText"
        :subtitle="subText"
        v-if="currentTrainingStep === 1"
      />

      <!-- Container for the training -->
      <div
        class="w-[60vh] h-[60vh] bg-zinc-100 dark:bg-zinc-800 rounded-lg relative overflow-hidden"
        v-if="currentTrainingStep >= 2"
      >
        <!-- Masked character -->
        <div class="absolute inset-0 flex justify-center items-center z-0">
          <div
            class="text-[60vh]"
            :class="{
              'text-green-500': currentTrainingStep === 3 && answerCorrect,
              'text-red-500': currentTrainingStep === 3 && !answerCorrect,
            }"
          >
            {{ currentCharactor }}
          </div>
        </div>
        <!-- Chunked mask -->
        <div
          v-if="currentTrainingStep === 2"
          class="w-full h-full grid absolute inset-0 z-10"
          :style="{
            display: 'grid',
            gridTemplateColumns: `repeat(${chunkSize}, minmax(0, 1fr))`,
          }"
        >
          <div
            v-for="(masked, index) in chunkMask"
            :key="index"
            :class="{
              'bg-zinc-100 dark:bg-zinc-800': masked,
              'bg-transparent': !masked,
            }"
          ></div>
        </div>
        <!-- Percentage of character revealed -->
        <div
          v-if="currentTrainingStep === 2"
          class="absolute bottom-0 left-0 right-0 z-20 bg-zinc-100 dark:bg-zinc-800"
        >
          <div
            class="h-1 bg-primary"
            :style="{
              width: `${(shownChunks / (chunkSize * chunkSize)) * 100}%`,
              transition: 'width 100ms',
            }"
          ></div>
        </div>
      </div>
    </div>
  </TrainingBase>
</template>
