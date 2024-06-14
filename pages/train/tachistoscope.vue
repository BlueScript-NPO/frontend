<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  TachistoscopeProcedure,
  TachistoscopeTrainingResult,
} from "~/types/types";

const route = useRoute();
const router = useRouter();
const trainingPreset = ref({});
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

const charSets: Record<string, string> = {
  Numbers: "0123456789",
  Alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "Korean Alphabet": "ㅁㅠㅊㅇㄷㄹㅎㅗㅑㅓㅏㅣㅡㅜㅐㅔㅂㄱㄴㅅㅕㅍㅈㅋㅛㅋ",
  "Codes (Alphanumeric)": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  "Codes (Korean)":
    "ㅁㅠㅊㅇㄷㄹㅎㅗㅑㅓㅏㅣㅡㅜㅐㅔㅂㄱㄴㅅㅕㅍㅈㅋㅛㅋ0123456789",
};

const trialCount = ref(0);
// boolean array represents the trial number and the user's response is correct or not
const trialData: Record<number, boolean> = {};

// computed property, percentage of correct responses
const accuracy = computed(() => {
  const correct = Object.values(trialData).filter((value) => value).length;
  return Number(((correct / trialCount.value) * 100).toFixed(2));
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const parseData = () => {
  try {
    if (route.query.data) {
      const data = JSON.parse(decodeURIComponent(route.query.data as string));
      const procedure = new TachistoscopeProcedure();
      isValid.value = procedure.validateParameters(data);
      if (isValid.value) {
        trainingPreset.value = data;
        trainingTime.value = data.trainingTime; // trainingTime is already in seconds, no need to multiply by 1000
        presentationTime.value = data.presentationTime * 1000; // convert to milliseconds
        stimuliLength.value = data.stimuliLength;
        stimuliType.value = data.stimuliType;
        charPool.value = charSets[stimuliType.value];

        if (
          stimuliType.value === "Korean Alphabet" ||
          stimuliType.value === "Codes (Korean)"
        ) {
          isKorean.value = true;
        }
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

const generatePrompt = () => {
  let chars = [];
  for (let i = 0; i < stimuliLength.value; i++) {
    chars.push(
      charPool.value.charAt(Math.floor(Math.random() * charPool.value.length))
    );
  }
  prompt.value = chars.join("");
  trainingStep.value = 2;
};

const askForInput = () => {
  instruction.value =
    "Please type the characters you saw\n (Press Enter or space to submit)";
  trainingStep.value = 3;
};

const redyMessage = () => {
  centerText.value = "Get Ready!";
  centeTextSub.value =
    "Trial #" + trialCount.value + " | Elapsed Time: " + elapsedTime.value;
  trainingStep.value = 1;
};

const reset = () => {
  trainingStep.value = 0;
  prompt.value = "";
  instruction.value = "";
  centerText.value = "";
};

const showBlankScreen = async (time: number) => {
  trainingStep.value = 0;
  await wait(time);
};

const train = async () => {
  // check if training time is up
  if (elapsedTime.value >= trainingTime.value) {
    saveResult();
    return;
  }

  reset();
  trialCount.value += 1;
  redyMessage();
  await wait(1500);

  await showBlankScreen(1000);

  generatePrompt();
  await wait(presentationTime.value);
  askForInput();
};

const evaluateInput = async (input: string) => {
  console.log("User input:", input);
  trainingStep.value = 4;

  if (input === prompt.value) {
    instruction.value = "Correct!\n(Press Enter or space to continue)";
    trialData[trialCount.value] = true;
  } else {
    instruction.value = "Incorrect!\n(Press Enter or space to continue)";
    trialData[trialCount.value] = false;
  }

  console.log("Current accuracy:", accuracy.value + "%");

  // Wait for the user to release the enter or space key
  await wait(1000);

  // Add a single event listener for keydown
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      window.removeEventListener("keydown", handleKeydown);
      train();
    }
  };

  window.addEventListener("keydown", handleKeydown);
};

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
  console.log(resultJson); // Example of handling, replace with actual save logic
};

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
      <!-- center text -->
      <TitleHud
        :title="centerText"
        :subtitle="centeTextSub"
        v-if="trainingStep === 1"
      />

      <!-- display the prompt -->
      <CenterPrompt v-if="trainingStep === 2" :prompt="prompt" />

      <!-- display the user input handler -->
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
/* Add */
</style>
