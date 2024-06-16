<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TachistoscopeTrainingResult } from "~/types/types";

// Vue Router
const route = useRoute();
const router = useRouter();

// Ref Variables
const trainingData = ref<Record<string, any>>({});
const processingData = ref(true);

const parseRouteData = () => {
  try {
    let data = route.query.data
      ? decodeURIComponent(route.query.data as string)
      : null;
    data = data ? JSON.parse(data) : null;

    if (data) {
      const result = TachistoscopeTrainingResult.fromJSON(data);
      trainingData.value = result;
      processingData.value = false;

      console.log(trainingData);

      const minifiedJSON = JSON.stringify(result.toJSON());
      console.log("Minified JSON:", minifiedJSON);

      // Save JSON file
      // const blob = new Blob([minifiedJSON], { type: "application/json" });
      // const url = URL.createObjectURL(blob);
      // const link = document.createElement("a");
      // link.href = url;
      // link.download = "result.json";
      // link.click();
      // URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error("Error parsing route data:", error);
  }
};

onMounted(() => {
  parseRouteData();
});
</script>

<template>
  <Head>
    <Title>Result</Title>
  </Head>
  <TopMenu />
  <UCard class="mx-auto mt-8 max-w-md">
    <template #header>
      <USkeleton class="h-8 w-full" v-if="processingData" />
      <h2 class="text-lg font-semibold h-8" v-else>
        Training Results

        <UBadge color="white" variant="solid">
          {{ trainingData.procedureParameters.name }}
        </UBadge>
      </h2>
    </template>

    <div v-if="processingData" class="h-10 w-full">
      <USkeleton class="h-6 w-full" />
    </div>
    <h3 class="h-10 w-full text-md font-semibold" v-else>
      Accuracy: {{ trainingData.accuracy }}%
    </h3>

    <UMeter size="md" :value="trainingData.accuracy" class="pb-4" />

    <div v-if="processingData" class="h-8 w-full">
      <USkeleton class="h-6 w-full" />
    </div>
    <h3 class="h-8 w-full text-md font-semibold" v-else>
      Trials: {{ trainingData.trialCount }}
    </h3>
    <div v-if="processingData" class="h-8 w-full">
      <USkeleton class="h-6 w-full" />
    </div>
    <h3 class="h-8 w-full text-md font-semibold" v-else>
      Time: {{ trainingData.duration }}s
    </h3>

    <template #footer>
      <div class="flex justify-center space-x-4">
        <UButton @click="router.push('/train')">Back</UButton>
      </div>
    </template>
  </UCard>
</template>

<style scoped>
/* Write */
</style>
