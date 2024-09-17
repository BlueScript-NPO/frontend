<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PercentAccuracyValue } from "~/types/value";
import { jsonToTrainingResult, TrainingResult } from "~/types/result";
import { SelectParameter } from "~/types/parameter";

// Vue Router
const route = useRoute();
const router = useRouter();

const { t } = useI18n();

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
    <Title>{{ $t("result.title") }}</Title>
  </Head>

  <div class="space-y-4 p-4">
    <UCard v-if="trainingData" class="mx-auto mt-8 max-w-md">
      <template #header>
        <div class="flex justify-between">
          <div>
            <h2
              class="text-xl h-8 flex items-center align-middle font-semibold"
            >
              {{ $t("result.title") }}
              <UBadge color="primary" variant="outline" class="ml-2">
                {{ $t("procedure." + (trainingData?.procedure.name ?? "")) }}
              </UBadge>
            </h2>
          </div>
          <div>
            <UButton
              icon="i-ph-upload"
              size="sm"
              square
              variant="ghost"
              @click="loadResultPrompt"
            />
          </div>
        </div>

        <div class="py-2">
          <p class="font-light">{{ $t("result.date") }}: {{ formattedDate }}</p>
          <p class="font-light text-xs">
            {{ $t("result.trainer") }}: {{ trainingData?.trainerID }}
          </p>
          <p class="font-light text-xs">
            {{ $t("result.trainee") }}: {{ trainingData?.traineeID }}
          </p>
        </div>
      </template>

      <div
        v-for="value in trainingData?.values"
        :key="value.jsonKey"
        class="px-1 py-1"
      >
        <!-- check if the value is instance of TableValue -->
        <div v-if="value.type === 'table'">
          <UCard class="mt-4">
            <div class="flex justify-center items-center -mt-3">
              <div class="font-semibold">
                {{ $t(value.displayName ?? "") }}
              </div>
            </div>
            <UTable class="-mb-4" :rows="value.getValue()"></UTable>
          </UCard>
        </div>
        <div v-else-if="value.type === 'percentage'">
          <UCard class="mb-4">
            <p class="font-semibold m-0 -mt-1">
              {{ $t(value.displayName ?? "") }}
              <UTooltip>
                <template #text>
                  <span>{{ $t(value.description ?? "") }}</span>
                </template>
                <UIcon name="i-ph-lightbulb" class="mx-1 h-4" />
              </UTooltip>
            </p>
            <UMeter :value="value.getValue()" indicator></UMeter>
          </UCard>
        </div>

        <div v-else-if="value.type === 'ComputedPercentage'">
          <UCard class="mb-4">
            <div class="flex justify-between -mt-1">
              <div>
                <p class="font-semibold m-0">
                  {{ $t(value.displayName ?? "") }}
                  <UTooltip>
                    <template #text>
                      <span>{{ $t(value.description ?? "") }}</span>
                    </template>
                    <UIcon name="i-ph-lightbulb" class="mx-1 h-4" />
                  </UTooltip>
                </p>
              </div>
              <div>
                {{ (value as PercentAccuracyValue).getCounted() }}
                /
                {{ (value as PercentAccuracyValue).getTotal() }}
              </div>
            </div>

            <UMeter
              :value="(value as PercentAccuracyValue).getPercentage()"
              indicator
            >
            </UMeter>
          </UCard>
        </div>

        <div v-else-if="value.type === 'time'" class="px-4">
          <span class="font-semibold"> {{ $t(value.displayName ?? "") }} </span
          >:
          <span v-if="value.getValue() < 60">
            {{ value.getValue() % 60 }}{{ $t("unit.sec") }}
          </span>
          <span v-else>
            {{ Math.floor(value.getValue() / 60) }}{{ $t("unit.min") }}
            {{ value.getValue() % 60 }}{{ $t("unit.sec") }}
          </span>
          <UTooltip>
            <template #text>
              <span>{{ $t(value.description ?? "") }}</span>
            </template>
            <UIcon name="i-ph-lightbulb" class="mx-1 h-4" />
          </UTooltip>
        </div>

        <div v-else class="px-4">
          <span class="font-semibold"> {{ $t(value.displayName ?? "") }} </span
          >:
          {{ value.getValue() }}
          <UTooltip>
            <template #text>
              <span>{{ $t(value.description ?? "") }}</span>
            </template>
            <UIcon name="i-ph-lightbulb" class="mx-1 h-4" />
          </UTooltip>
        </div>
      </div>

      <UAccordion
        variant="ghost"
        class="mt-4 pt-1.5 rounded-lg ring-1 ring-gray-200 dark:ring-gray-800"
        :items="[
          {
            label: $t('result.trainingParameters'),
            icon: 'i-ph-wrench',
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
                <span class="font-semibold">
                  {{ $t(param.displayName ?? "") }} </span
                >:
                <span v-if="param instanceof SelectParameter">
                  {{ $t("parameter." + param.selected) }}
                </span>
                <span v-else>
                  {{ param.getValue() }}
                </span>
              </li>
            </ul>
          </div>
        </template>
      </UAccordion>

      <UTextarea
        class="pt-4"
        autoresize
        :placeholder="$t('result.notesPlaceholder')"
        v-model="trainingData.notes"
      />

      <template #footer>
        <div class="flex justify-center space-x-4">
          <UButton color="gray" @click="saveResult">
            {{ $t("result.download") }}
          </UButton>
          <UButton color="primary" @click="router.push('/train')">
            {{ $t("result.goTrain") }}
          </UButton>
        </div>
      </template>
    </UCard>

    <!-- When no data is loaded -->

    <UCard v-else class="mx-auto mt-8 max-w-md">
      <template #header>
        <h2 class="text-lg h-8 flex items-center">
          {{ $t("result.noData") }}
        </h2>
        <p class="font-light">
          {{ $t("result.noDataDesc") }}
        </p>
      </template>

      <UInput
        type="file"
        size="sm"
        icon="i-ph-upload"
        @change="loadResult"
        class="mt-4"
      />

      <template #footer>
        <div class="flex justify-center">
          <UButton color="primary" @click="router.push('/train')">
            {{ $t("result.goTrain") }}
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>
