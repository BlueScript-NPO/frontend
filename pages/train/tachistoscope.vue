<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  TachistoscopeProcedure,
  TachistoscopeTrainingResult,
} from "~/types/types";

// Vue Router
const route = useRoute();
const router = useRouter();

// Ref Variables
const trainingPreset = ref<Record<string, any>>({});
const isValid = ref(true);
const trainingTime = ref(0);
const charPool = ref("");
const stimuliLength = ref(0);
const presentationTime = ref(0);
const trainingStep = ref(0);
const prompt = ref("");
const instruction = ref("");
const centerText = ref("");
const centeTextSub = ref("");
const stimuliType = ref("");
const isKorean = ref(false);
const elapsedTime = ref(0);
const trialCount = ref(0);
const trialData = ref<Record<number, boolean>>({});

// Character Sets
const charSets: Record<string, string> = {
  Numbers: "0123456789",
  Alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "Korean Alphabet": "ㅁㅠㅊㅇㄷㄹㅎㅗㅑㅓㅏㅣㅡㅜㅐㅔㅂㄱㄴㅅㅕㅍㅈㅋㅛㅋ",
  "Codes (Alphanumeric)": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
};

// Computed Property for Accuracy
const accuracy = computed(() => {
  const correct = Object.values(trialData.value).filter(Boolean).length;
  return Number(((correct / trialCount.value) * 100).toFixed(2));
});

// Utility Function: Wait for specified milliseconds
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Function: Parse Data from Route Query
const parseData = () => {
  try {
    const data = route.query.data
      ? JSON.parse(decodeURIComponent(route.query.data as string))
      : null;
    if (data) {
      const procedure = new TachistoscopeProcedure();
      isValid.value = procedure.validateParameters(data);

      if (isValid.value) {
        trainingPreset.value = data;
        trainingTime.value = data.trainingTime; // trainingTime is already in seconds
        presentationTime.value = data.presentationTime * 1000; // convert to milliseconds
        stimuliLength.value = data.stimuliLength;
        stimuliType.value = data.stimuliType;
        charPool.value = charSets[stimuliType.value] || "";

        isKorean.value = ["Korean Alphabet", "Codes (Korean)"].includes(
          stimuliType.value
        );
      } else {
        router.push("/train");
      }
    } else {
      router.push("/train");
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    router.push("/train");
  }
};

// Function: Generate Prompt
const generatePrompt = () => {
  prompt.value = Array.from({ length: stimuliLength.value }, () =>
    charPool.value.charAt(Math.floor(Math.random() * charPool.value.length))
  ).join("");
  trainingStep.value = 2;
};

// Function: Display Ready Message
const displayReadyMessage = () => {
  centerText.value = "Get Ready!";
  centeTextSub.value = `Trial #${trialCount.value} | Elapsed Time: ${elapsedTime.value}`;
  trainingStep.value = 1;
};

// Function: Train Process
const train = async () => {
  if (elapsedTime.value >= trainingTime.value) {
    saveResult();
    return;
  }

  trialCount.value += 1;
  displayReadyMessage();
  await wait(1500);
  await wait(1000); // Blank screen duration
  generatePrompt();
  await wait(presentationTime.value);
  instruction.value =
    "Please type the characters you saw\n(Press Enter or space to submit)";
  trainingStep.value = 3;
};

// Function: Evaluate User Input
const evaluateInput = async (input: string) => {
  console.log("User input:", input);
  trainingStep.value = 4;

  trialData.value[trialCount.value] = input === prompt.value;
  instruction.value = trialData.value[trialCount.value]
    ? "Correct!\n(Press Enter or space to continue)"
    : "Incorrect!\n(Press Enter or space to continue)";

  console.log("Current accuracy:", `${accuracy.value}%`);

  await wait(1000);

  const handleKeydown = (event: KeyboardEvent) => {
    if (["Enter", " "].includes(event.key)) {
      window.removeEventListener("keydown", handleKeydown);
      train();
    }
  };

  window.addEventListener("keydown", handleKeydown);
};

// Function: Save Training Result
const saveResult = () => {
  const result = new TachistoscopeTrainingResult(
    new Date(),
    elapsedTime.value,
    "0",
    "0",
    accuracy.value,
    trialCount.value
  );

  const resultJson = result.toJSON();
  console.log(resultJson); // Replace with actual save logic
};

// Lifecycle Hook: On Component Mounted
onMounted(() => {
  parseData();
  train();
});
</script>

<template>
  <Head>
    <Title>Training - Tachistoscope</Title>
  </Head>

  <TrainingBase
    :trainingTime="trainingTime"
    :top="instruction"
    v-model="elapsedTime"
  >
    <div class="flex flex-col justify-center items-center h-full space-y-10">
      <TitleHud
        :title="centerText"
        :subtitle="centeTextSub"
        v-if="trainingStep === 1"
      />
      <CenterPrompt v-if="trainingStep === 2" :prompt="prompt" />
      <UserInputHandler
        v-if="trainingStep >= 3"
        :allowInput="trainingStep === 3"
        :stimuliLength="stimuliLength"
        :prompt="prompt"
        :hidePrompt="trainingStep !== 4"
        :isKorean="isKorean"
        @evaluate="evaluateInput"
      />
    </div>
  </TrainingBase>
</template>

<style scoped>
/* Add any component-specific styles here */
</style>
