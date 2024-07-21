<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  jsonToProcedure,
  CharactorGuesstimateProcedure,
} from "~/types/procedure";
import { stimuliCharactorSets } from "~/utils/util";
import { playSound } from "~/utils/playSound";

// Vue Router
const route = useRoute();
const router = useRouter();

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

// Training Execution Variables
const currentTrainingStep = ref<number>(0);
const currentCharactor = ref<string>("");
const currentTrialCount = ref<number>(0);
// 2d array of boolean determining if the chunk is masked or not
const chunkMask = ref<boolean[][]>([]);

const mainText = ref<string>("");
const subText = ref<string>("");

// function: Initialize the chunk mask (fill with true)
const initializeChunkMask = () => {
  // create a 2d array of boolean
  const mask = Array(chunkSize.value)
    .fill(null)
    .map(() => Array(chunkSize.value).fill(true));
  chunkMask.value = mask;
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
    // saveTrainingResults();
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

  currentTrainingStep.value = 2;
  revealCharacterGradually();
};

// Function: Gradually Reveal Character
const revealCharacterGradually = async () => {
  const revealSpeed = 100; // milliseconds between reveals
  for (let i = 0; i < chunkSize.value; i++) {
    for (let j = 0; j < chunkSize.value; j++) {
      await waitForMilliseconds(revealSpeed);
      chunkMask.value[i][j] = false;
    }
  }
};

// Lifecycle Hook: On Component Mounted
onMounted(() => {
  parseRouteData();
  startTraining();
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
        class="w-[50vw] h-[50vw] bg-zinc-100 dark:bg-zinc-800 rounded-lg relative overflow-hidden"
        v-if="currentTrainingStep === 2"
      >
        <!-- Masked character -->
        <div class="absolute inset-0 flex justify-center items-center z-0">
          <div class="text-[50vw]">
            {{ currentCharactor }}
          </div>
        </div>
        <!-- Chunked mask -->
        <div
          class="w-full h-full grid absolute inset-0 z-10"
          :style="{
            gridTemplateColumns: `repeat(${chunkSize.value}, 1fr)`,
            gridTemplateRows: `repeat(${chunkSize.value}, 1fr)`,
          }"
        >
          <div
            v-for="(row, rowIndex) in chunkMask"
            :key="rowIndex"
            class="flex"
            :style="{ height: `${100 / chunkSize.value}%` }"
          >
            <div
              v-for="(masked, colIndex) in row"
              :key="colIndex"
              class="flex-1"
              :class="{
                'bg-blueScriptBlue-600 dark:bg-blueScriptBlue-500': masked,
                'bg-transparent': !masked,
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </TrainingBase>
</template>
