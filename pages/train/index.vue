<script setup lang="ts">
import {ref, computed, watch} from "vue";
import {useRouter} from "vue-router";
import {
  RapidVisualPerceptionProcedure,
  SequentialVisualMemoryProcedure,
  CharacterSequencingProcedure,
  CharacterMatchingProcedure,
  CharacterGuesstimateProcedure,
  Procedure,
} from "~/types/procedure";
import {Parameter, NumParameter, SelectParameter} from "~/types/parameter";
import type {FormError, FormErrorEvent} from "#ui/types";

const {t} = useI18n();

const router = useRouter();

// Initialize procedures
const trainingProcedures: Procedure[] = [
  new RapidVisualPerceptionProcedure(),
  new SequentialVisualMemoryProcedure(),
  new CharacterSequencingProcedure(),
  new CharacterMatchingProcedure(),
  new CharacterGuesstimateProcedure(),
];

// Track selected procedure name
const selectedProcedureName = ref<string>(trainingProcedures[0].name);

// Track selected training procedure parameters
const selectedTrainingParameters = ref<Parameter[]>(
    trainingProcedures[0].parameters
);

// Compute selected training procedure
const selectedTrainingProcedure = computed<Procedure | undefined>(() =>
    trainingProcedures.find(
        (procedure) => procedure.name === selectedProcedureName.value
    )
);

// Watch for changes in selectedProcedureName to update parameters
watch(selectedProcedureName, (newProcedureName) => {
  const procedure = trainingProcedures.find(
      (procedure) => procedure.name === newProcedureName
  );
  if (procedure) {
    selectedTrainingParameters.value = procedure.parameters;
  }
});

// Validate form data
const validateForm = (state: { parameters: Parameter[] }): FormError[] => {
  const errors: FormError[] = [];
  state.parameters.forEach((parameter) => {
    if (parameter instanceof SelectParameter && !parameter.selected) {
      errors.push({path: parameter.displayName, message: "Required"});
    }
    if (parameter instanceof NumParameter) {
      if (parameter.value == null) {
        errors.push({path: parameter.displayName, message: "Required"});
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
      query: {data: encodeURIComponent(jsonString)},
    });
  }
};

// Handle form errors
const handleFormError = async (event: FormErrorEvent) => {
  const element = document.getElementById(event.errors[0].id);
  element?.focus();
  element?.scrollIntoView({behavior: "smooth", block: "center"});
};
</script>

<template>
  <Head>
    <Title>{{ t("nav.train") }}</Title>
  </Head>
  <UForm
      v-if="selectedTrainingProcedure"
      :validate="validateForm"
      :state="{ parameters: selectedTrainingParameters }"
      class="space-y-4"
      @submit="handleFormSubmit"
      @error="handleFormError"
  >
    <UCard class="mx-auto mt-8 max-w-md">
      <template #header>
        <h2 class="text-lg font-semibold pb-2">
          {{ $t("train.title") }}
        </h2>
        <USelectMenu
            v-model="selectedProcedureName"
            :options="
            trainingProcedures.map((p) => ({
              label: $t('procedure.' + p.name),
              value: p.name,
            }))
          "
            option-attribute="label"
            value-attribute="value"
        />
      </template>

      <div
          v-for="parameter in selectedTrainingParameters"
          :key="parameter.displayName"
          class="py-2"
      >
        <UFormGroup
            :label="t(parameter.displayName)"
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

          <USelectMenu
              v-else-if="parameter instanceof SelectParameter"
              v-model="parameter.selected"
              :options="
              parameter.options.map((option) => ({
                label: $t('parameter.' + option),
                value: option,
              }))
            "
              option-attribute="label"
              value-attribute="value"
          />
        </UFormGroup>
      </div>

      <template #footer>
        <div class="flex justify-center space-x-4 pb-4">
          <UButton color="primary" type="submit">{{
              $t("train.start")
            }}
          </UButton>
        </div>
        <!-- <UAlert
          icon="i-heroicons-shield-exclamation"
          color="red"
          variant="subtle"
          title="Heads up!"
          description="You are training as a
        guest. Make sure to record you results separately. Sign in to save your
        progress."
        /> -->
      </template>
    </UCard>
  </UForm>
</template>
