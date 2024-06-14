<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  TachistoscopeProcedure,
  VisualSpanProcedure,
  VisualScanProcedure,
} from "~/types/types";
import type { Parameter } from "~/types/types";
import type { FormError, FormErrorEvent } from "#ui/types";

const trainingProcedures = [
  new TachistoscopeProcedure(),
  new VisualSpanProcedure(),
  new VisualScanProcedure(),
];

const selectedProcedureName = ref(trainingProcedures[0].name);
const selectedTrainingProcedure = computed(
  () =>
    trainingProcedures.find(
      (procedure) => procedure.name === selectedProcedureName.value
    ) || null
);

const validateForm = (state: any): FormError[] => {
  const errors: FormError[] = [];
  state.parameters.forEach(
    ({ label, parameter }: { label: string; parameter: any }) => {
      if (parameter.type === "select" && !parameter.value) {
        errors.push({ path: label, message: "Required" });
      }
      if (parameter.type === "number") {
        if (parameter.value == null) {
          errors.push({ path: label, message: "Required" });
        }
        if (hasRange(parameter) && parameter.value < parameter.min) {
          errors.push({
            path: label,
            message: `Value must be at least ${parameter.min}`,
          });
        }
        if (hasRange(parameter) && parameter.value > parameter.max) {
          errors.push({
            path: label,
            message: `Value must be at most ${parameter.max}`,
          });
        }
      }
    }
  );
  return errors;
};

const handleFormSubmit = async () => {
  const formData = selectedTrainingProcedure.value?.parameters.reduce(
    (acc, { key, parameter }) => {
      acc[key] = parameter.value;
      return acc;
    },
    {} as Record<string, any>
  );

  if (formData) {
    const jsonString = JSON.stringify(formData);
    const routeName =
      selectedTrainingProcedure.value?.name.toLowerCase().replace(/ /g, "-") ||
      "train";
    router.push({
      name: `train-${routeName}`,
      query: { data: encodeURIComponent(jsonString) },
    });
  }
};

const handleFormError = async (event: FormErrorEvent) => {
  const element = document.getElementById(event.errors[0].id);
  element?.focus();
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
};

const hasOptions = (
  param: Parameter
): param is Parameter & { options: string[] } => "options" in param;

const hasRange = (
  param: Parameter
): param is Parameter & { min: number; max: number } =>
  "min" in param && "max" in param;

const hasStep = (param: Parameter): param is Parameter & { step: number } =>
  "step" in param;

const router = useRouter();
</script>

<template>
  <Head>
    <Title>Training</Title>
  </Head>
  <TopMenu />
  <UCard class="mx-auto mt-8 max-w-md">
    <template #header>
      <h2 class="text-lg font-semibold pb-2">Configure Training</h2>
      <USelect
        v-model="selectedProcedureName"
        :options="trainingProcedures.map((p) => p.name)"
        label="Procedure"
      />
    </template>

    <UForm
      v-if="selectedTrainingProcedure"
      :validate="validateForm"
      :state="selectedTrainingProcedure"
      class="space-y-4"
      @submit="handleFormSubmit"
      @error="handleFormError"
    >
      <div
        v-for="{ label, parameter } in selectedTrainingProcedure.parameters"
        :key="label"
      >
        <UFormGroup :label="label" :name="label">
          <UInput
            v-if="parameter.type === 'number'"
            v-model="parameter.value"
            type="number"
            :min="hasRange(parameter) ? parameter.min : undefined"
            :max="hasRange(parameter) ? parameter.max : undefined"
            :step="hasStep(parameter) ? parameter.step : 0.1"
          />
          <USelect
            v-else-if="parameter.type === 'select' && hasOptions(parameter)"
            v-model="parameter.value"
            :options="parameter.options"
          />
        </UFormGroup>
      </div>
      <div class="flex justify-center">
        <UButton type="submit">Start Training</UButton>
      </div>
    </UForm>
  </UCard>
</template>
