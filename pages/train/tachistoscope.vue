<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TachistoscopeProcedure } from "~/types/types";

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

const charSets: Record<string, string> = {
  Numbers: "0123456789",
  Alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "Korean Alphabet": "ㅁㅠㅊㅇㄷㄹㅎㅗㅑㅓㅏㅣㅡㅜㅐㅔㅂㄱㄴㅅㅕㅍㅈㅋㅛㅋ",
  "Codes (Alphanumeric)": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  "Codes (Korean)":
    "ㅁㅠㅊㅇㄷㄹㅎㅗㅑㅓㅏㅣㅡㅜㅐㅔㅂㄱㄴㅅㅕㅍㅈㅋㅛㅋ0123456789",
};

const trialCount = ref(0);

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
  trainingStep.value = 4;
};

const redyMessage = () => {
  centerText.value = "Get Ready!";
  centeTextSub.value = "Trial #" + trialCount.value;
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
  reset();
  trialCount.value += 1;
  redyMessage();
  await wait(1500);

  await showBlankScreen(2000);

  generatePrompt();
  await wait(presentationTime.value);

  await showBlankScreen(1000);

  askForInput();
};

const evaluateInput = async (input: string) => {
  console.log("User input:", input);
  trainingStep.value = 5;

  if (input === prompt.value) {
    instruction.value = "Correct!\n(Press Enter or space to continue)";
  } else {
    instruction.value = "Incorrect!\n(Press Enter or space to continue)";
  }

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

onMounted(() => {
  parseData();
  train();
});
</script>

<template>
  <Head>
    <Title>Training - Tachistoscope</Title>
  </Head>

  <TrainingBase :trainingTime="trainingTime" :top="instruction">
    <div class="flex flex-col justify-center items-center h-full space-y-10">
      <!-- center text -->
      <TitleHud
        :title="centerText"
        :subtitle="centeTextSub"
        v-if="trainingStep === 1"
      />

      <!-- display the prompt -->
      <CenterPrompt v-if="trainingStep === 2" :prompt="prompt" />

      <!-- display the distractor -->
      <BouncingChars v-if="trainingStep === 3" :charCount="stimuliLength * 2" />

      <!-- display the user input handler -->
      <UserInputHandler
        v-if="trainingStep >= 4"
        :allowInput="trainingStep === 4"
        :stimuliLength="stimuliLength"
        :prompt="prompt"
        :hidePrompt="trainingStep !== 5"
        :isKorean="isKorean"
        @evaluate="evaluateInput"
      />
    </div>
  </TrainingBase>
</template>

<style scoped>
/* Additional styles if needed */
</style>
