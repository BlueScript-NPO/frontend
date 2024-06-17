<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  RapidVisualPerception,
  SequentialVisualMemoryProcedure,
} from "~/types/procedure";
import { Parameter, NumParameter, SelectParameter } from "~/types/parameter";
import type { FormError, FormErrorEvent } from "#ui/types";

// Initialize procedures
const trainingProcedures = [
  new RapidVisualPerception(),
  new SequentialVisualMemoryProcedure(),
];

// Track selected procedure name
const selectedProcedureName = ref(trainingProcedures[0].name);

// Compute selected training procedure
const selectedTrainingProcedure = computed(() =>
  trainingProcedures.find(
    (procedure) => procedure.name === selectedProcedureName.value
  )
);

// Validate form data
const validateForm = (state: any): FormError[] => {
  const errors: FormError[] = [];
  state.parameters.forEach((parameter: any) => {
    if (parameter instanceof Parameter) {
      if (parameter instanceof SelectParameter && !parameter.selected) {
        errors.push({ path: parameter.displayName, message: "Required" });
      }
      if (parameter instanceof NumParameter) {
        if (parameter.value == null) {
          errors.push({ path: parameter.displayName, message: "Required" });
        }
        if (parameter.min !== undefined && parameter.value < parameter.min) {
          errors.push({
            path: parameter.displayName,
            message: `Value must be at least ${parameter.min}`,
          });
        }
        if (parameter.max !== undefined && parameter.value > parameter.max) {
          errors.push({
            path: parameter.displayName,
            message: `Value must be at most ${parameter.max}`,
          });
        }
      }
    }
  });
  return errors;
};

// Handle form submission
const handleFormSubmit = async () => {
  if (selectedTrainingProcedure.value) {
    const jsonString = JSON.stringify(selectedTrainingProcedure.value.toJson());
    console.log("Starting training with data:", jsonString);
    const routeName = selectedTrainingProcedure.value.name
      .toLowerCase()
      .replace(/ /g, "-");
    router.push({
      name: `train-${routeName}`,
      query: { data: encodeURIComponent(jsonString) },
    });
  }
};

// Handle form errors
const handleFormError = async (event: FormErrorEvent) => {
  const element = document.getElementById(event.errors[0].id);
  element?.focus();
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
};

const router = useRouter();
</script>

<template>
  <Head>
    <Title>Training</Title>
  </Head>
  <TopMenu />
  <UForm
    v-if="selectedTrainingProcedure && selectedTrainingProcedure"
    :validate="validateForm"
    :state="selectedTrainingProcedure"
    class="space-y-4"
    @submit="handleFormSubmit"
    @error="handleFormError"
  >
    <UCard class="mx-auto mt-8 max-w-md">
      <template #header>
        <h2 class="text-lg font-semibold pb-2">Configure Training</h2>
        <USelect
          v-model="selectedProcedureName"
          :options="trainingProcedures.map((p) => p.name)"
          label="Procedure"
        />
      </template>

      <div
        v-for="parameter in selectedTrainingProcedure.parameters"
        :key="parameter.displayName"
      >
        <UFormGroup
          :label="parameter.displayName"
          :name="parameter.displayName"
        >
          <UInput
            v-if="parameter instanceof NumParameter"
            v-model="parameter.value"
            type="number"
            :min="parameter.min"
            :max="parameter.max"
            :step="parameter.step"
          />
          <USelect
            v-else-if="parameter instanceof SelectParameter"
            v-model="parameter.selected"
            :options="parameter.options"
          />
        </UFormGroup>
      </div>

      <template #footer>
        <div class="flex justify-center space-x-4">
          <UButton type="submit">Start Training</UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>
