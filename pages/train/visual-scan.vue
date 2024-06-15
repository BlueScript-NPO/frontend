<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { VisualScanProcedure } from "~/types/types";

const route = useRoute();
const router = useRouter();

const trainingData = ref<Record<string, any>>({});
const totalTrainingTime = ref(0);

const stimulusType = ref("");
const characterPool = ref("");
const isUsingKoreanChars = ref(false);

const parseRouteData = () => {
  try {
    const data = route.query.data
      ? JSON.parse(decodeURIComponent(route.query.data as string))
      : null;
    if (data) {
      trainingData.value = data;
      totalTrainingTime.value = data.trainingTime;
      stimulusType.value = data.stimuliType;
      characterPool.value = characterSets[stimulusType.value] || "";

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
</script>

<template>
  <Head>
    <Title>Training - Visual Sequencing</Title>
  </Head>
</template>
