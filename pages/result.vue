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

    console.log("Data:", data);

    data = data ? JSON.parse(data) : null;

    console.log("Parsed Data:", data);

    if (data) {
      const result = TachistoscopeTrainingResult.fromJSON(data);
      console.log("Training data:", result);
      trainingData.value = result;
      processingData.value = false;
    } else {
      console.error("No training data found in route query.");
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
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
          {{ trainingData.procedureName }}
        </UBadge>
      </h2>
    </template>

    <div v-if="processingData" class="h-10 w-full">
      <USkeleton class="h-6 w-full" />
    </div>
    <h3 class="h-10 w-full text-md font-semibold" v-else>
      Accuracy: {{ trainingData.accurecy }}%
    </h3>

    <UMeter size="md" :value="trainingData.accurecy" class="pb-4" />

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
