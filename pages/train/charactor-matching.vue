<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { stimuliCharactorSets } from "~/utils/util";
import { playSound } from "~/utils/playSound";
import { jsonToProcedure, CharactorMatchingProcedure } from "~/types/procedure";

// Vue Router
const route = useRoute();
const router = useRouter();

// training parameters
const trainingParameter = ref<CharactorMatchingProcedure>(
  new CharactorMatchingProcedure()
);
const totalTrainingTime = ref<number>(0);
const stimulusType = ref<string>("");
const targetLength = ref<number>(0);
const targetCount = ref<number>(0);

// Ref Variables
const pauseTimer = ref<boolean>(true);
const characterPool = ref<string>("");
const totalElapsedTime = ref<number>(0);
const mainText = ref<string>("");
const subText = ref<string>("");
const userInstruction = ref<string>("");
const currentTrainingStep = ref<number>(0);
const currentTrialCount = ref<number>(0);

// training variables
const currentPrompt = ref<string>("");
const currentTargets = ref<string[]>([]);
const isTargetCorrect = ref<boolean[]>([]);
const targetClicked = ref<boolean[]>([]);
const answerRemaining = ref<number>(0);
const trialStartTime = ref<number>(0);
const trialEndTime = ref<number>(0);

// Function: Parse Data from Route Query
const parseRouteData = () => {
  try {
    const data = route.query.data
      ? JSON.parse(decodeURIComponent(route.query.data as string))
      : null;
    if (data) {
      trainingParameter.value = jsonToProcedure(
        data
      ) as CharactorMatchingProcedure;

      totalTrainingTime.value =
        trainingParameter.value.duration.getValue() * 60;
      stimulusType.value = trainingParameter.value.stimuliType.getValue();
      characterPool.value = stimuliCharactorSets[stimulusType.value];
      targetLength.value = trainingParameter.value.targetLength.getValue();
      targetCount.value = trainingParameter.value.targetCount.getValue();
    } else {
      router.push("/train");
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    router.push("/train");
  }
};

const generatePrompt = () => {
  const temp: string[] = [];
  for (let i = 0; i < targetLength.value; i++) {
    temp.push(
      characterPool.value.charAt(
        Math.floor(Math.random() * characterPool.value.length)
      )
    );
  }
  return temp.join("");
};

const generateTargets = (correctCount: number) => {
  // raise an error if the correct count is greater than the target count
  if (correctCount > targetCount.value) {
    throw new Error("Correct count cannot be greater than target count");
  }

  const temp: boolean[] = [];
  for (let i = 0; i < targetCount.value; i++) {
    temp.push(i < correctCount);
  }

  for (let i = temp.length; i < targetCount.value; i++) {
    temp.push(false);
  }

  // shuffle the array using the Fisher-Yates algorithm
  for (let i = temp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }

  isTargetCorrect.value = temp;

  const targets: string[] = [];

  // generate the targets
  for (let i = 0; i < targetCount.value; i++) {
    if (temp[i]) {
      targets.push(currentPrompt.value);
    } else {
      // "Fake" target is only one character (any character) different from the prompt.
      const temp = currentPrompt.value.split("");
      const randomIndex = Math.floor(Math.random() * temp.length);
      temp[randomIndex] = characterPool.value.charAt(
        Math.floor(Math.random() * characterPool.value.length)
      );
      targets.push(temp.join(""));
    }
  }

  currentTargets.value = targets;
  answerRemaining.value = correctCount;
};

const resetTrial = () => {
  currentPrompt.value = "";
  answerRemaining.value = 0;
  currentTargets.value = [];
  isTargetCorrect.value = [];
  targetClicked.value = [];
};

// Function: Display Ready Message
const displayReadyMessage = () => {
  playSound("ready");
  currentTrialCount.value++;

  mainText.value = "Get Ready!";
  subText.value = `Trial #${currentTrialCount.value} | Elapsed Time: ${totalElapsedTime.value}`;
  currentTrainingStep.value = 1;
};

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

const handleTargetClick = (index: number) => {
  targetClicked.value[index] = true;
  if (isTargetCorrect.value[index]) {
    answerRemaining.value--;
    playSound("correct");

    if (answerRemaining.value === 0) {
      endTrial();
    }
  } else {
    playSound("incorrect");
  }
};

const endTrial = () => {
  trialEndTime.value = Date.now();
  const trialDuration = (trialEndTime.value - trialStartTime.value) / 1000;

  pauseTimer.value = true;
  playSound("finish");

  mainText.value = "Finish!";
  subText.value = `Time: ${trialDuration.toFixed(2)}s`;
  userInstruction.value = "Press spacebar or enter to continue";

  currentTrainingStep.value = 3;
};

// Utility Function: Wait for specified milliseconds
const waitForMilliseconds = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const startTraining = async () => {
  currentTrainingStep.value = 0;
  resetTrial();

  displayReadyMessage();
  await waitForMilliseconds(1500);

  await countDown();

  currentPrompt.value = generatePrompt();
  userInstruction.value = "Find all the matching characters";
  generateTargets(5); // WILL BE CHANGED SOON (JUST FOR TSSTING)

  console.log(currentTargets.value);

  currentTrainingStep.value = 2;
  pauseTimer.value = false;
};

// Function: Handle Keydown Event
const handleKeydown = (event: KeyboardEvent) => {
  if (
    currentTrainingStep.value === 3 &&
    (event.key === "Enter" || event.key === " ")
  ) {
    startTraining();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  parseRouteData();
  startTraining();
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <Head>
    <Title>Training - Charactor matching</Title>
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
          v-for="(char, index) in currentPrompt"
          :key="index"
        >
          <span class="block text-center text-4xl">
            {{ char }}
          </span>
        </div>
      </div>
      <UDivider class="pt-4 pb-10" />

      <div class="flex justify-center">
        <div class="grid grid-cols-4">
          <div
            v-for="(char, index) in currentTargets"
            :key="index"
            class="w-52 h-10"
          >
            <div
              v-if="!targetClicked[index]"
              @click="handleTargetClick(index)"
              class="flex justify-center hover:bg-zinc-900 dark:hover:bg-zinc-100 hover:text-zinc-100 dark:hover:text-zinc-900 rounded-md cursor-pointer"
            >
              <div
                v-for="(c, i) in char"
                :key="i"
                class="flex justify-center w-8"
              >
                <span class="block text center text-4xl">{{ c }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-6 flex justify-center">
        <p class="text-xl">{{ answerRemaining }} remaining</p>
      </div>
    </div>
  </TrainingBase>
</template>

<style>
/*  */
</style>
