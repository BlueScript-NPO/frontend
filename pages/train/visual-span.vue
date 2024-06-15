<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { VisualSpanProcedure, VisualSpanTrainingResult } from "~/types/types";

const route = useRoute();
const router = useRouter();

const procedure = new VisualSpanProcedure();
const trainingData = ref<Record<string, any>>({});
const totalTrainingTime = ref(0);
const pauseTimer = ref(true);
const characterPool = ref("");
const numberOfStimuli = ref(0);
const currentTrainingStep = ref(0);
const generatedPrompt = ref("");
const shwonPromptChar = ref("");
const distractionTime = ref(0);
const userInstruction = ref("");
const mainText = ref("");
const subText = ref("");
const stimulusType = ref("");
const isUsingKoreanChars = ref(false);
const totalElapsedTime = ref(0);
const currentTrialCount = ref(0);
const trialResults = ref<Record<number, boolean>>({});

const characterSets: Record<string, string> = {
  Numbers: "0123456789",
  Alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "Korean Alphabet": "ㅁㅠㅊㅇㄷㄹㅎㅗㅑㅓㅏㅣㅡㅜㅐㅔㅂㄱㄴㅅㅕㅍㅈㅋㅛㅋ",
  "Codes (Alphanumeric)": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
};

const trainingAccuracy = computed(() => {
  const correctResponses = Object.values(trialResults.value).filter(
    Boolean
  ).length;
  return Number(
    ((correctResponses / currentTrialCount.value) * 100).toFixed(2)
  );
});

const waitForMilliseconds = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const parseRouteData = () => {
  try {
    const data = route.query.data
      ? JSON.parse(decodeURIComponent(route.query.data as string))
      : null;
    if (data) {
      trainingData.value = data;
      totalTrainingTime.value = data.trainingTime;
      numberOfStimuli.value = data.stimuliLength;
      stimulusType.value = data.stimuliType;
      characterPool.value = characterSets[stimulusType.value] || "";
      distractionTime.value = data.delayTime * 1000;

      isUsingKoreanChars.value = ["Korean Alphabet", "Codes (Korean)"].includes(
        stimulusType.value
      );
    } else {
      router.push("/train");
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    router.push("/train");
  }
};

const generateStimulusPrompt = () => {
  generatedPrompt.value = Array.from({ length: numberOfStimuli.value }, () =>
    characterPool.value.charAt(
      Math.floor(Math.random() * characterPool.value.length)
    )
  ).join("");
  currentTrainingStep.value = 2;
};

const displayReadyMessage = () => {
  mainText.value = "Get Ready!";
  subText.value = `Trial #${currentTrialCount.value} | Elapsed Time: ${totalElapsedTime.value}`;
  currentTrainingStep.value = 1;
};

const startTraining = async () => {
  if (totalElapsedTime.value >= totalTrainingTime.value) {
    saveTrainingResults();
    return;
  }

  userInstruction.value = "";
  currentTrialCount.value += 1;
  pauseTimer.value = false;

  await displayReadyMessage();
  await waitForMilliseconds(1500);
  currentTrainingStep.value = 0;
  await waitForMilliseconds(1000);
  generateStimulusPrompt();

  for (let i = 0; i < numberOfStimuli.value; i++) {
    shwonPromptChar.value = generatedPrompt.value[i];
    await waitForMilliseconds(500);
    shwonPromptChar.value = "";
    await waitForMilliseconds(700);
  }

  if (distractionTime.value > 0) {
    currentTrainingStep.value = 3;
    await waitForMilliseconds(distractionTime.value);
  }

  userInstruction.value =
    "Please type the characters you saw\n(Press Enter or space to submit)";
  currentTrainingStep.value = 4;
};

const evaluateUserInput = async (input: string) => {
  console.log("User input:", input);
  currentTrainingStep.value = 5;

  trialResults.value[currentTrialCount.value] = input === generatedPrompt.value;
  userInstruction.value = trialResults.value[currentTrialCount.value]
    ? "Correct!\n(Press Enter or space to continue)"
    : "Incorrect!\n(Press Enter or space to continue)";

  console.log("Current accuracy:", `${trainingAccuracy.value}%`);

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

const saveTrainingResults = () => {
  const result = new VisualSpanTrainingResult(
    new Date(),
    totalElapsedTime.value,
    "0",
    "0",
    trainingAccuracy.value,
    currentTrialCount.value,
    procedure
  );

  const resultJson = JSON.stringify(result.toJSON());
  console.log(resultJson);

  router.push({
    name: "result",
    query: { data: encodeURIComponent(resultJson) },
  });
};

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
        :prompt="shwonPromptChar"
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
