<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  jsonToTrainingResult,
  TrainingResult,
  RapidVisualPerceptionResult,
} from "~/types/result";

// Vue Router
const route = useRoute();
const router = useRouter();

// Ref Variables
const trainingData = ref<TrainingResult | null>(null);

// Compute the accordion items
const accordionItems = computed(() => {
  if (!trainingData.value) return [];

  return trainingData.value.procedure.parameters.map((param) => ({
    label: param.displayName,
    description: param.getValue().toString(),
    icon: "i-heroicons-light-bulb",
    defaultOpen: false,
  }));
});

const parseRouteData = () => {
  try {
    let data = route.query.data
      ? decodeURIComponent(route.query.data as string)
      : null;
    data = data ? JSON.parse(data) : null;

    if (data) {
      const result = jsonToTrainingResult(data);
      trainingData.value = result;

      console.log("Parsed training data:", trainingData.value);
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
      <h2 class="text-lg h-8 flex items-center">
        Training Results
        <UBadge color="primary" variant="outline" class="ml-2">
          {{ trainingData?.procedure.name }}
        </UBadge>
      </h2>
    </template>

    <h3 class="h-10 w-full text-md">
      <span>
        Accuracy:
        {{ (trainingData as RapidVisualPerceptionResult)?.accuracy.value }}%
        <span class="font-light">
          ({{
            (trainingData as RapidVisualPerceptionResult)?.correctCount.value
          }}/{{
            (trainingData as RapidVisualPerceptionResult)?.trialCount.value
          }})
        </span>

        <UTooltip
          v-if="(trainingData as RapidVisualPerceptionResult)?.accuracy.description"
        >
          <template #text>
            <span>{{
              (trainingData as RapidVisualPerceptionResult)?.accuracy
                .description
            }}</span>
          </template>
          <UIcon name="i-heroicons-light-bulb" />
        </UTooltip>
      </span>
    </h3>

    <UMeter
      size="md"
      :value="(trainingData as RapidVisualPerceptionResult)?.accuracy.value"
      class="pb-4"
    />

    <h3 class="h-8 w-full text-md">
      <span>
        Trials:
        {{ (trainingData as RapidVisualPerceptionResult)?.trialCount.value }}
        <UTooltip
          v-if="(trainingData as RapidVisualPerceptionResult)?.trialCount.description"
        >
          <template #text>
            <span>{{
              (trainingData as RapidVisualPerceptionResult)?.trialCount
                .description
            }}</span>
          </template>
          <UIcon name="i-heroicons-light-bulb" />
        </UTooltip>
      </span>
    </h3>

    <h3 class="h-8 w-full text-md">
      <span>
        Time:
        {{ (trainingData as RapidVisualPerceptionResult)?.elepsedTime.value }}s
        <UTooltip
          v-if="(trainingData as RapidVisualPerceptionResult)?.elepsedTime.description"
        >
          <template #text>
            <span>{{
              (trainingData as RapidVisualPerceptionResult)?.elepsedTime
                .description
            }}</span>
          </template>
          <UIcon name="i-heroicons-light-bulb" />
        </UTooltip>
      </span>
    </h3>

    <UAccordion
      class="pt-4"
      :items="[
        {
          label: 'Training Parameters',

          icon: 'i-heroicons-wrench-screwdriver',
          defaultOpen: false,
        },
      ]"
    >
      <template #item>
        <div class="px-4">
          <ul>
            <li
              v-for="param in trainingData?.procedure.parameters"
              :key="param.jsonKey"
            >
              {{ param.displayName }}: {{ param.getValue() }}
            </li>
          </ul>
        </div>
      </template>
    </UAccordion>

    <template #footer>
      <div class="flex justify-center space-x-4">
        <UButton @click="router.push('/train')">Back</UButton>
      </div>
    </template>
  </UCard>

  <!-- Accordion for training parameters -->
  <div class="mt-8"></div>
</template>

<style scoped>
/* Write your styles here */
</style>

<style scoped>
/* Write your styles here */
</style>
