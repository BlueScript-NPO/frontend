<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { TachistoscopeProcedure } from "~/types/types";

const route = useRoute();
const router = useRouter();
const trainingPreset = ref({});
const isValid = ref(true);
const trainingTime = ref(0);

onMounted(() => {
  try {
    if (route.query.data) {
      const data = JSON.parse(decodeURIComponent(route.query.data as string));
      const procedure = new TachistoscopeProcedure();
      isValid.value = procedure.validateParameters(data);
      if (isValid.value) {
        trainingPreset.value = data;
        trainingTime.value = data.trainingTime;
        // router.replace({ query: {} });
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
});
</script>

<template>
  <Head>
    <Title>Training - Tachistoscope</Title>
  </Head>

  <TrainingBase :trainingTime="trainingTime">
    <!-- center text box -->
    <div class="flex justify-center items-center h-full">
      <div
        class="text-8xl font-light text-center text-red-500 font-mono"
        style="letter-spacing: 0.5em"
      >
        AIO
      </div>
    </div>
  </TrainingBase>
</template>

<style scoped>
/* Additional styles if needed */
</style>
