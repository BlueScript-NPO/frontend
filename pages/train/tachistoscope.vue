<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import { TachistoscopeProcedure } from "~/types/types";

const route = useRoute();
const router = useRouter();
const trainingPreset = ref({});
const isValid = ref(true);
const startTime = ref<number | null>(null);
const elapsedTime = ref(0);
let timerInterval: number | null = null;
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

        // Start the timer
        startTime.value = Date.now();
        timerInterval = window.setInterval(() => {
          if (startTime.value !== null) {
            elapsedTime.value = Math.floor(
              (Date.now() - startTime.value) / 1000
            );
          }
        }, 1000);
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

onUnmounted(() => {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
  }
});
</script>

<style scoped>
/* Disable text selection */
* {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

/* Disable dragging */
* {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}
</style>

<template>
  <Head>
    <Title>Training - Tachistoscope</Title>
  </Head>

  <div
    class="fixed inset-0 bg-black h-screen w-screen overflow-hidden"
    @click.right.stop.prevent
  >
    <!-- Timer on the bottom -->
    <div
      class="absolute bottom-0 right-0 text-lg p-4 px-8"
      :style="{ color: elapsedTime > trainingTime ? 'yellow' : 'white' }"
    >
      {{ Math.floor(elapsedTime / 60) }}:{{
        (elapsedTime % 60).toString().padStart(2, "0")
      }}
    </div>
  </div>
</template>
