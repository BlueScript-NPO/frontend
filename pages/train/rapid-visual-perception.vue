<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { jsonToProcedure, RapidVisualPerception } from "~/types/procedure";
import { stimuliCharactorSets } from "~/utils/util";
import { RapidVisualPerceptionResult } from "~/types/result";
import { playSound } from "~/utils/playSound";

// Vue Router
const route = useRoute();
const router = useRouter();

const { t } = useI18n();

// Ref Variables
const trainingParameter = ref<RapidVisualPerception>(
  new RapidVisualPerception()
);
const totalTrainingTime = ref<number>(0);
const pauseTimer = ref<boolean>(true);
const characterPool = ref<string>("");
const numberOfStimuli = ref<number>(0);
const stimulusPresentationTime = ref<number>(0);
const currentTrainingStep = ref<number>(0);
const generatedPrompt = ref<string>("");
const userInstruction = ref<string>("");
const mainText = ref<string>("");
const subText = ref<string>("");
const stimulusType = ref<string>("");
const isUsingKoreanChars = ref<boolean>(false);
const totalElapsedTime = ref<number>(0);
const currentTrialCount = ref<number>(0);
const correctCount = ref<number>(0);
const trialResults = ref<Record<number, boolean>>({});

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
      trainingParameter.value = jsonToProcedure(data) as RapidVisualPerception;

      totalTrainingTime.value = data.parameters.duration * 60;
      stimulusPresentationTime.value = data.parameters.presentationTime * 1000; // convert to milliseconds
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

  currentTrialCount.value++;
  userInstruction.value = "";
  pauseTimer.value = false;

  displayReadyMessage();
  await waitForMilliseconds(1500);
  currentTrainingStep.value = 0;
  await waitForMilliseconds(1000); // Blank screen duration
  generateStimulusPrompt();
  await waitForMilliseconds(stimulusPresentationTime.value);

  userInstruction.value = t("training.typeAnswer");
  currentTrainingStep.value = 3;
};

// Function: Evaluate User Input
const evaluateUserInput = async (input: string) => {
  currentTrainingStep.value = 4;

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
  const result = new RapidVisualPerceptionResult(
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
    <Title>Training - Quick Visual Perception</Title>
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
        :prompt="generatedPrompt"
      />
      <UserInputHandler
        v-if="currentTrainingStep >= 3"
        :numberOfStimuli="numberOfStimuli"
        :inputEnabled="currentTrainingStep === 3"
        :hidePromptText="currentTrainingStep !== 4"
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
