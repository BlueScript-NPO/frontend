<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { jsonToProcedure, TachistoscopeProcedure } from "~/types/procedure";
import { stimuliCharactorSets } from "~/types/util";
import { TachistoscopeTrainingResult } from "~/types/result";
import { playSound } from "~/utils/playSound";

// Vue Router
const route = useRoute();
const router = useRouter();

// Ref Variables
const trainingParameter = ref<TachistoscopeProcedure>(
  new TachistoscopeProcedure()
);
const totalTrainingTime = ref(0);
const pauseTimer = ref(true);
const characterPool = ref("");
const numberOfStimuli = ref(0);
const stimulusPresentationTime = ref(0);
const currentTrainingStep = ref(0);
const generatedPrompt = ref("");
const userInstruction = ref("");
const mainText = ref("");
const subText = ref("");
const stimulusType = ref("");
const isUsingKoreanChars = ref(false);
const totalElapsedTime = ref(0);
const currentTrialCount = ref(0);
const trialResults = ref<Record<number, boolean>>({});

// Computed Property for Accuracy
const trainingAccuracy = computed(() => {
  const correctResponses = Object.values(trialResults.value).filter(
    Boolean
  ).length;
  return Number(
    ((correctResponses / currentTrialCount.value) * 100).toFixed(2)
  );
});

// Utility Function: Wait for specified milliseconds
const waitForMilliseconds = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Function: Parse Data from Route Query
const parseRouteData = () => {
  try {
    const data = route.query.data
      ? JSON.parse(decodeURIComponent(route.query.data as string))
      : null;
    if (data) {
      trainingParameter.value = jsonToProcedure(data) as TachistoscopeProcedure;

      totalTrainingTime.value = data.parameters.duration; // totalTrainingTime is already in seconds
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

  currentTrialCount.value += 1;
  userInstruction.value = "";
  pauseTimer.value = false;

  displayReadyMessage();
  await waitForMilliseconds(1500);
  currentTrainingStep.value = 0;
  await waitForMilliseconds(1000); // Blank screen duration
  generateStimulusPrompt();
  await waitForMilliseconds(stimulusPresentationTime.value);
  userInstruction.value =
    "Please type the characters you saw\n(Press Enter or space to submit)";
  currentTrainingStep.value = 3;
};

// Function: Evaluate User Input
const evaluateUserInput = async (input: string) => {
  currentTrainingStep.value = 4;

  trialResults.value[currentTrialCount.value] = input === generatedPrompt.value;
  if (trialResults.value[currentTrialCount.value]) {
    playSound("correct");
    userInstruction.value = "Correct!\n(Press Enter or space to continue)";
  } else {
    playSound("incorrect");
    userInstruction.value = "Incorrect!\n(Press Enter or space to continue)";
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
  const result = new TachistoscopeTrainingResult(
    trainingAccuracy.value,
    totalElapsedTime.value,
    currentTrialCount.value,
    "DOCTOR",
    "PATIENT",
    "Example Note",
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
    <Title>Training - Tachistoscope</Title>
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
