<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { stimuliCharactorSets } from "~/types/util";
import { playSound } from "~/utils/playSound";
import {
  jsonToProcedure,
  CharactorSequenceingProcedure,
} from "~/types/procedure";

// Vue Router
const route = useRoute();
const router = useRouter();

// Ref Variables
const trainingParameter = ref<CharactorSequenceingProcedure>(
  new CharactorSequenceingProcedure()
);
const totalTrainingTime = ref(0);
const pauseTimer = ref(true);
const stimulusType = ref("");
const characterPool = ref("");
const userInstruction = ref("");
const totalElapsedTime = ref(0);

const promptLength = ref(0);
const isPromptsequential = ref(false);

// Function: Parse Data from Route Query
const parseRouteData = () => {
  try {
    const data = route.query.data
      ? JSON.parse(decodeURIComponent(route.query.data as string))
      : null;
    if (data) {
      trainingParameter.value = jsonToProcedure(
        data
      ) as CharactorSequenceingProcedure;

      totalTrainingTime.value = data.parameters.duration * 60;
      stimulusType.value = data.parameters.stimuliType;
      characterPool.value = stimuliCharactorSets[stimulusType.value] || "";
      isPromptsequential.value = data.parameters.promptType === "Sequential";
      promptLength.value = data.parameters.promptLength;
    } else {
      router.push("/train");
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    router.push("/train");
  }
};

// Function: gemerate a prompt
const generatePrompt = () => {
  const prompt = [];

  if (isPromptsequential.value) {
    // prompr is generated sequentially
    const startIndex = 26 - promptLength.value;
    const endIndex = 26;
    for (let i = startIndex; i < endIndex; i++) {
      prompt.push(characterPool.value[i]);
    }
  } else {
    // random
    for (let i = 0; i < promptLength.value; i++) {
      const randomIndex = Math.floor(
        Math.random() * characterPool.value.length
      );
      prompt.push(characterPool.value[randomIndex]);
    }
  }
};

onMounted(() => {
  parseRouteData();

  console.log("Charset:", characterPool.value);
});
</script>

<template>
  <Head>
    <Title>Training - Charactor Sequenceing</Title>
  </Head>
  <TrainingBase
    :totalTrainingTime="totalTrainingTime"
    :pause-timer="pauseTimer"
    :instruction-text="userInstruction"
    v-model="totalElapsedTime"
  />
</template>

<style></style>
