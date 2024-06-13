<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  TachistoscopeProcedure,
  VisualSpanProcedure,
  VisualScanProcedure,
} from "~/types/types";
import type { Procedure, Parameter } from "~/types/types";
import type { FormError, FormErrorEvent, FormSubmitEvent } from "#ui/types";

const procedures = [
  new TachistoscopeProcedure(),
  new VisualSpanProcedure(),
  new VisualScanProcedure(),
];

// first procedure is selected by default
const selectedProcedureName = ref<string>(procedures[0].name);
const selectedProcedure = computed(() => {
  return (
    procedures.find(
      (procedure) => procedure.name === selectedProcedureName.value
    ) || null
  );
});

const validate = (state: any): FormError[] => {
  const errors: FormError[] = [];
  state.parameters.forEach(
    ({ label, parameter }: { label: string; parameter: any }) => {
      if (parameter.type === "select" && !parameter.value) {
        errors.push({ path: label, message: "Required" });
      }
      if (parameter.type === "number") {
        if (parameter.value === null || parameter.value === undefined) {
          errors.push({ path: label, message: "Required" });
        }
        if (hasRange(parameter) && parameter.value < parameter.min!) {
          errors.push({
            path: label,
            message: `Value must be at least ${parameter.min}`,
          });
        }
        if (hasRange(parameter) && parameter.value > parameter.max!) {
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

async function onSubmit(event: FormSubmitEvent<any>) {
  const data = selectedProcedure.value?.parameters.reduce(
    (acc, { key, parameter }) => {
      acc[key] = parameter.value;
      return acc;
    },
    {} as Record<string, any>
  );
  const jsonString = JSON.stringify(data);
  console.log(jsonString);

  // Navigate to the specific procedure page with state
  const routeName =
    selectedProcedure.value?.name.toLowerCase().replace(/ /g, "-") || "train";
  router.push({
    name: `train-${routeName}`,
    query: { data: encodeURIComponent(jsonString) },
  });
}

async function onError(event: FormErrorEvent) {
  const element = document.getElementById(event.errors[0].id);
  element?.focus();
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function hasOptions(
  param: Parameter
): param is Parameter & { options: string[] } {
  return (param as any).options !== undefined;
}

function hasRange(
  param: Parameter
): param is Parameter & { min: number; max: number } {
  return (param as any).min !== undefined && (param as any).max !== undefined;
}

function hasStep(param: Parameter): param is Parameter & { step: number } {
  return (param as any).step !== undefined;
}

const router = useRouter();
</script>

<template>
  <Head>
    <Title>Training</Title>
  </Head>
  <TopMenu />
  <UCard class="mx-auto mt-8 max-w-md">
    <template #header>
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white pb-2">
        Configure Training
      </h2>
      <USelect
        v-model="selectedProcedureName"
        :options="procedures.map((p) => p.name)"
        label="Procedure"
      />
    </template>

    <UForm
      v-if="selectedProcedure"
      :validate="validate"
      :state="selectedProcedure"
      class="space-y-4"
      @submit="onSubmit"
      @error="onError"
    >
      <div
        v-for="{ label, parameter } in selectedProcedure.parameters"
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
