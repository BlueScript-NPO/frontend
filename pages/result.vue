<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TachistoscopeTrainingResult } from "~/types/types";

// Vue Router
const route = useRoute();
const router = useRouter();

// Ref Variables
const trainingData = ref<Record<string, any>>({});

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
  {{ trainingData.value }}
</template>

<style scoped>
/* Write */
</style>
