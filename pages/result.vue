<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TableValue } from "~/types/value";
import {
  jsonToTrainingResult,
  TrainingResult,
  RapidVisualPerceptionResult,
} from "~/types/result";

// Vue Router
const route = useRoute();
const router = useRouter();

// computed formatted date
const formattedDate = computed(() => {
  return trainingData.value?.date
    ? new Date(trainingData.value.date).toLocaleString()
    : "";
});

// Ref Variables
const trainingData = ref<TrainingResult | null>(null);

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
      console.log("Parsed training data:", trainingData.value?.toJson());
    }
  } catch (error) {
    console.error("Error parsing route data:", error);
  }
};

const loadResultPrompt = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = loadResult;
  input.click();
};

const loadResult = () => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (result) {
        try {
          const data = JSON.parse(result as string);
          const trainingResult = jsonToTrainingResult(data);
          trainingData.value = trainingResult;
        } catch (error) {
          console.error("Error loading result:", error);
        }
      }
    };
    reader.readAsText(file);
  }
};

const saveResult = () => {
  console.log("Saving result...");
  var json = JSON.stringify(trainingData.value?.toJson());

  var blob = new Blob([json], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;

  // crate concise timestamp (2024-01-01-12-00) + procedure name
  const timestamp = new Date().toISOString().slice(0, 16).replace(/[-:]/g, "");
  a.download = `${timestamp}-${trainingData.value?.procedure.name}.json`;

  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
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
  <UCard v-if="trainingData" class="mx-auto mt-8 max-w-md">
    <template #header>
      <div class="flex justify-between">
        <div>
          <h2 class="text-lg h-8 flex items-center">
            Training Results
            <UBadge color="primary" variant="outline" class="ml-2">
              {{ trainingData?.procedure.name }}
            </UBadge>
          </h2>
        </div>
        <div>
          <UButton
            icon="i-heroicons-arrow-down-on-square"
            size="sm"
            square
            variant="ghost"
            @click="loadResultPrompt"
          />
        </div>
      </div>

      <div class="py-2">
        <p class="font-light">Date: {{ formattedDate }}</p>
        <p class="font-light text-xs">Doctor: {{ trainingData?.doctorID }}</p>
        <p class="font-light text-xs">Patient: {{ trainingData?.patientID }}</p>
      </div>
    </template>

    <div v-for="value in trainingData?.values" class="px-1 py-1">
      <!-- check if the value is instance of TableValue -->

      <div v-if="value.type === 'table'">
        <UCard class="mt-4">
          <div class="flex justify-center items-center -mt-3">
            <div class="font-semibold">
              {{ value.displayName }}

              <UTooltip>
                <template #text>
                  <span>{{ value.description }}</span>
                </template>
                <UIcon name="i-heroicons-light-bulb" class="mx-1 h-4" />
              </UTooltip>
            </div>
          </div>
          <UTable class="-mb-4" :rows="value.getValue()"> </UTable>
        </UCard>
      </div>
      <div v-else>
        <span class="font-semibold"> {{ value.displayName }} </span>:
        {{ value.getValue() }}
        <UTooltip>
          <template #text>
            <span>{{ value.description }}</span>
          </template>
          <UIcon name="i-heroicons-light-bulb" class="mx-1 h-4" />
        </UTooltip>
      </div>
    </div>

    <UAccordion
      color="gray"
      variant="soft"
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

    <UTextarea
      class="pt-4"
      autoresize
      placeholder="Write your notes here..."
      v-model="trainingData.notes"
    />

    <template #footer>
      <div class="flex justify-center space-x-4">
        <UButton color="gray" @click="saveResult"> Download Result </UButton>
        <UButton color="primary" @click="router.push('/train')"
          >Go Training
        </UButton>
      </div>
    </template>
  </UCard>

  <!-- When no data is loaded -->

  <UCard v-else class="mx-auto mt-8 max-w-md">
    <template #header>
      <h2 class="text-lg h-8 flex items-center">No Data Loaded</h2>
      <p class="font-light">Please load a training result to view it.</p>
    </template>

    <UInput
      type="file"
      size="sm"
      icon="i-heroicons-folder"
      @change="loadResult"
      class="mt-4"
    />

    <template #footer>
      <div class="flex justify-center">
        <UButton color="primary" @click="router.push('/train')">
          Go Training
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<style scoped>
/* Write your styles here */
</style>
