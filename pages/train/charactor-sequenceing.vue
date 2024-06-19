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

const prompt = ref("");
const cursorIndex = ref(1);

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
  const temp = [];

  if (isPromptsequential.value) {
    const startIndex = Math.floor(Math.random() * (26 - promptLength.value));
    const endIndex = startIndex + promptLength.value;

    for (let i = startIndex; i < endIndex; i++) {
      temp.push(characterPool.value[i]);
    }
  } else {
    // random
    for (let i = 0; i < promptLength.value; i++) {
      const randomIndex = Math.floor(
        Math.random() * characterPool.value.length
      );
      temp.push(characterPool.value[randomIndex]);
    }
  }
  return temp.join("");
};

onMounted(() => {
  parseRouteData();

  prompt.value = generatePrompt();

  console.log("Prompt:", prompt.value);
});

// Function: Handle Keydown Event
const handleKeydown = (event: KeyboardEvent) => {
  // when pressing right arrow, incroment the cursor index
  if (event.key === "ArrowRight") {
    playSound("click", 30);
    cursorIndex.value++;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
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
  >
    <div class="flex flex-col justify-center items-center h-full training-text">
      <div class="flex">
        <div
          class="flex justify-center w-8"
          v-for="(char, index) in prompt"
          :key="index"
        >
          <span class="block text-center text-4xl">
            {{ char }}
          </span>
        </div>
      </div>

      <UDivider class="pt-4 pb-10" />

      <div class="flex justify-center">
        <div class="grid grid-cols-16">
          <div
            v-for="i in 160"
            :class="[
              'w-14 h-16 rounded-md flex justify-center items-center',
              {
                'outline-yellow-500 outline outline-2': i === cursorIndex,
              },
            ]"
          >
            <span class="block text-center text-5xl w-full"> W </span>
          </div>
        </div>
      </div>
    </div>
  </TrainingBase>
</template>

<style></style>
