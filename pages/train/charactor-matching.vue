<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
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

// Function: Display Ready Message
const displayReadyMessage = () => {
  playSound("ready");
  currentTrialCount.value++;

  mainText.value = "Get Ready!";
  subText.value = `Trial #${currentTrialCount.value} | Elapsed Time: ${totalElapsedTime.value}`;
  currentTrainingStep.value = 1;
};

// Utility Function: Wait for specified milliseconds
const waitForMilliseconds = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const startTraining = async () => {
  currentTrainingStep.value = 0;

  displayReadyMessage();
  await waitForMilliseconds(1500);
};

onMounted(() => {
  parseRouteData();
  startTraining();
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
      v-if="currentTrainingStep === 1"
    >
      <TitleHud :title="mainText" :subtitle="subText" />
    </div>
  </TrainingBase>
</template>

<style>
/*  */
</style>
