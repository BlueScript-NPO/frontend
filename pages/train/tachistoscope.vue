<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TachistoscopeProcedure } from "~/types/types";
import UserInputHandler from "~/components/UserInputHandler.vue";

const route = useRoute();
const router = useRouter();
const trainingPreset = ref({});
const isValid = ref(true);
const trainingTime = ref(0);
const charPool = ref("");
const stimuliLength = ref(0);
const presentationTime = ref(0);
const distractionTime = ref(0);
const charUpper = ref(false);

const trainingStep = ref(0);
const prompt = ref("");
const instruction = ref("");
const centerText = ref("");
const centeTextSub = ref("");

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
        distractionTime.value = data.distractionTime * 1000; // convert to milliseconds
        stimuliLength.value = data.stimuliLength;

        switch (data.stimuliType) {
          case "Numbers":
            charPool.value = "0123456789";
            break;
          case "Upper Case Letters":
            charPool.value = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            charUpper.value = true;
            break;
          case "Lower Case Letters":
            charPool.value = "abcdefghijklmnopqrstuvwxyz";
            break;
          case "Codes":
            charPool.value = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            charUpper.value = true;
            break;
          default:
            charPool.value = "";
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

const showDistraction = async () => {
  if (distractionTime.value > 0) {
    console.log("Showing distraction");
    trainingStep.value = 3;
    await wait(distractionTime.value); // Ensure the wait is awaited
  }
  // await showBlankScreen(500); // Ensure this is awaited as well
  trainingStep.value = 4;
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

  await showDistraction();

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

  console.log("distractionTime", distractionTime.value);
  train();
});
</script>

<template>
  <Head>
    <Title>Training - Tachistoscope</Title>
  </Head>

  <TrainingBase :trainingTime="trainingTime" :top="instruction">
    <div class="flex flex-col justify-center items-center h-full space-y-10">
      <!-- display the center text -->
      <div
        v-if="trainingStep === 1"
        class="flex flex-col items-center space-y-8"
      >
        <div class="text-6xl font-light text-center text-white font-mono">
          {{ centerText }}
        </div>
        <div class="text-xl font-light text-center text-white font-mono">
          {{ centeTextSub }}
        </div>
      </div>

      <!-- display the prompt -->
      <div class="text-main" v-if="trainingStep === 2">
        {{ prompt }}
      </div>

      <!-- display the distractor -->
      <BouncingChars v-if="trainingStep === 3" :charCount="stimuliLength * 2" />

      <!-- display the user input handler -->
      <div class="flex flex-col items-center space-y-16">
        <div class="w-full">
          <UserInputHandler
            v-if="trainingStep >= 4"
            :allowInput="trainingStep === 4"
            :stimuliLength="stimuliLength"
            :charUpper="charUpper"
            @evaluate="evaluateInput"
          />
        </div>

        <div class="w-full">
          <div class="text-main" :class="{ invisible: trainingStep !== 5 }">
            {{ prompt }}
          </div>
        </div>
      </div>
    </div>
  </TrainingBase>
</template>

<style scoped>
/* Additional styles if needed */
</style>
