<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  jsonToProcedure,
  SequentialVisualMemoryProcedure,
} from "~/types/procedure";
import { SequentialVisualMemoryResult } from "~/types/result";
import { stimuliCharactorSets } from "~/utils/util";
import { playSound } from "~/utils/playSound";

const { t } = useI18n();

// Vue Router
const route = useRoute();
const router = useRouter();

// Ref Variables
const trainingParameter = ref<SequentialVisualMemoryProcedure>(
  new SequentialVisualMemoryProcedure()
);
const totalTrainingTime = ref<number>(0);
const pauseTimer = ref<boolean>(true);
const characterPool = ref<string>("");
const numberOfStimuli = ref<number>(0);
const currentTrainingStep = ref<number>(0);
const generatedPrompt = ref<string>("");
const shownPromptChar = ref<string>("");
const distractionTime = ref<number>(0);
const userInstruction = ref<string>("");
const mainText = ref<string>("");
const subText = ref<string>("");
const stimulusType = ref<string>("");
const isUsingKoreanChars = ref<boolean>(false);
const totalElapsedTime = ref<number>(0);
const currentTrialCount = ref<number>(0);
const correctCount = ref<number>(0);
const trialResults = ref<Record<number, boolean>>({});

// Computed Property for Accuracy
const trainingAccuracy = computed<number>(() => {
  const correctResponses = Object.values(trialResults.value).filter(
    Boolean
  ).length;
  return Number(
    ((correctResponses / currentTrialCount.value) * 100).toFixed(2)
  );
});

// Utility Function: Wait for specified milliseconds
const waitForMilliseconds = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Function: Parse Data from Route Query
const parseRouteData = () => {
  try {
    const data = route.query.data
      ? JSON.parse(decodeURIComponent(route.query.data as string))
      : null;
    if (data) {
      trainingParameter.value = jsonToProcedure(
        data
      ) as SequentialVisualMemoryProcedure;

      totalTrainingTime.value = data.parameters.duration * 60;
      distractionTime.value = data.parameters.delayTime * 1000; // convert to milliseconds
      numberOfStimuli.value = data.parameters.stimuliLength;
      stimulusType.value = data.parameters.stimuliType;
      characterPool.value = stimuliCharactorSets[stimulusType.value] || "";

      isUsingKoreanChars.value = ["Korean"].includes(stimulusType.value);
    } else {
      router.push("/train");
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    router.push("/train");
  }
};

// Function: Generate Prompt
const generateStimulusPrompt = () => {
  generatedPrompt.value = Array.from({ length: numberOfStimuli.value }, () =>
    characterPool.value.charAt(
      Math.floor(Math.random() * characterPool.value.length)
    )
  ).join("");
  currentTrainingStep.value = 2;
};

// Function: Display Ready Message
const displayReadyMessage = () => {
  playSound("ready");
  mainText.value = t("training.ready");
  subText.value = `${t("training.trial")} #${currentTrialCount.value} | ${t(
    "training.elapsed"
  )} ${totalElapsedTime.value}${t("unit.sec")}`;
  currentTrainingStep.value = 1;
};

// Function: Training Process
const startTraining = async () => {
  if (totalElapsedTime.value >= totalTrainingTime.value) {
    saveTrainingResults();
    return;
  }

  userInstruction.value = "";
  currentTrialCount.value++;
  pauseTimer.value = false;

  displayReadyMessage();
  await waitForMilliseconds(1500);
  currentTrainingStep.value = 0;
  await waitForMilliseconds(1000);
  generateStimulusPrompt();

  for (let i = 0; i < numberOfStimuli.value; i++) {
    shownPromptChar.value = generatedPrompt.value[i];
    await waitForMilliseconds(500);
    shownPromptChar.value = "";
    await waitForMilliseconds(700);
  }

  if (distractionTime.value > 0) {
    currentTrainingStep.value = 3;
    await waitForMilliseconds(distractionTime.value);
  }

  userInstruction.value = t("training.typeAnswer");
  currentTrainingStep.value = 4;
};

// Function: Evaluate User Input
const evaluateUserInput = async (input: string) => {
  currentTrainingStep.value = 5;

  trialResults.value[currentTrialCount.value] = input === generatedPrompt.value;
  if (trialResults.value[currentTrialCount.value]) {
    playSound("correct");
    userInstruction.value = t("training.correct");
    correctCount.value++;
  } else {
    playSound("incorrect");
    userInstruction.value = t("training.incorrect");
  }

  pauseTimer.value = true;

  await waitForMilliseconds(700);

  const handleKeydown = (event: KeyboardEvent) => {
    if (["Enter", " "].includes(event.key)) {
      window.removeEventListener("keydown", handleKeydown);
      startTraining();
    }
  };

  window.addEventListener("keydown", handleKeydown);
};

// Function: Save Training Result
const saveTrainingResults = () => {
  const result = new SequentialVisualMemoryResult(
    {
      total: currentTrialCount.value,
      counted: correctCount.value,
    },
    totalElapsedTime.value,
    currentTrialCount.value,
    "DOCTOR",
    "PATIENT",
    "",
    undefined,
    trainingParameter.value
  );

  const jsonString = JSON.stringify(result.toJson());
  console.log("Training Result:", jsonString);
  router.push({
    name: "result",
    query: { data: encodeURIComponent(jsonString) },
  });
};

// Lifecycle Hook: On Component Mounted
onMounted(() => {
  parseRouteData();
  startTraining();
});
</script>

<template>
  <Head>
    <Title>Training - Rapid Visual Perception</Title>
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
      <CenterPrompt
        v-if="currentTrainingStep === 2"
        :prompt="shownPromptChar"
      />
      <BouncingChars v-if="currentTrainingStep === 3" :char-count="5" />
      <UserInputHandler
        v-if="currentTrainingStep >= 4"
        :numberOfStimuli="numberOfStimuli"
        :inputEnabled="currentTrainingStep === 4"
        :hidePromptText="currentTrainingStep !== 5"
        :usingKoreanCharacters="isUsingKoreanChars"
        :stimulusPrompt="generatedPrompt"
        @evaluateInput="evaluateUserInput"
      />
    </div>
  </TrainingBase>
</template>

<style scoped>
/* Add any component-specific styles here */
</style>
