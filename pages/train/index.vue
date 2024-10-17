<template>
  <Head>
    <Title>{{ t("nav.train") }}</Title>
  </Head>
  <UModal v-model="isParameterOpen">
    <UForm
      :validate="validateForm"
      :state="{ parameters: selectedTrainingParameters }"
      @submit="handleFormSubmit"
      @error="handleFormError"
    >
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">
              {{ $t("train.title") }}:
              {{ $t("procedure." + selectedProcedure?.name) }}
            </h2>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isParameterOpen = false"
            />
          </div>
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
                parameter.options.map((option: string) => ({
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
            <UButton
              color="white"
              @click="copyLink"
              trailing
              :icon="linkCopied ? 'i-ph-check' : 'i-ph-clipboard'"
              >{{ $t("train.link") }}
            </UButton>
            <UButton
              color="primary"
              type="submit"
              icon="i-ph-arrow-right"
              trailing
              >{{ $t("train.start") }}
            </UButton>
          </div>
        </template>
      </UCard>
    </UForm>
  </UModal>

  <div class="p-4 py-12 flex w-full justify-center">
    <UCard class="w-full max-w-screen-lg">
      <UTabs :items="items">
        <template #item="{ item }">
          <div
            v-if="item.key === 'visual'"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6"
          >
            <div
              v-for="procedure in visualProcedures"
              :key="procedure.name"
              class="relative bg-white dark:bg-zinc-950 shadow-lg rounded-xl overflow-hidden ring-1 ring-gray-200 dark:ring-gray-800 hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
              @click="openParameterModel(procedure)"
              style="cursor: pointer"
            >
              <!-- Placeholder Images -->
              <NuxtImg
                :src="'/procedure/' + procedure.name + '.png'"
                alt="Procedure preview image"
                width="960"
                height="540"
                format="webp"
              />

              <div class="px-4 py-4">
                <!-- Procedure title -->
                <span class="flex justify-between items-center mb-2">
                  <h3
                    class="text-lg font-semibold text-gray-800 dark:text-gray-200"
                  >
                    {{ $t("procedure." + procedure.name) }}
                  </h3>
                  <!-- Documentation Link (inline) -->

                  <UButton
                    size="xs"
                    color="white"
                    variant="outline"
                    icon="i-ph-book"
                    @click.stop=""
                    :to="
                      '/docs/training/visual/' +
                      procedure.name.toLowerCase().replace(/\s+/g, '-')
                    "
                  >
                    {{ $t("train.docs") }}
                  </UButton>
                </span>

                <!-- Procedure description -->
                <p
                  class="text-sm mb-2 text-gray-600 dark:text-gray-300 line-clamp-2"
                >
                  {{ $t(procedure.name + ".description") }}
                </p>
              </div>
            </div>
          </div>
          <div v-else-if="item.key === 'audition'">Coming Soon</div>
        </template>
      </UTabs>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { Parameter, NumParameter, SelectParameter } from "~/types/parameter";
import type { FormError, FormErrorEvent } from "#ui/types";
import { preloadAudioFiles, audioFiles } from "~/utils/playSound";

import {
  RapidVisualPerceptionProcedure,
  SequentialVisualMemoryProcedure,
  CharacterSequencingProcedure,
  CharacterMatchingProcedure,
  CharacterGuesstimateProcedure,
  Procedure,
} from "~/types/procedure";

const { t } = useI18n();
const toast = useToast();
const router = useRouter();

const items = ref([
  {
    label: t("train.visual"),
    key: "visual",
    icon: "i-ph-eye",
  },
  {
    label: t("train.audition"),
    key: "audition",
    icon: "i-ph-user-sound",
  },
]);

watchEffect(() => {
  items.value = [
    {
      label: t("train.visual"),
      key: "visual",
      icon: "i-ph-eye",
    },
    {
      label: t("train.audition"),
      key: "audition",
      icon: "i-ph-user-sound",
    },
  ];
});

const visualProcedures: Procedure[] = [
  new RapidVisualPerceptionProcedure(),
  new SequentialVisualMemoryProcedure(),
  new CharacterSequencingProcedure(),
  new CharacterMatchingProcedure(),
  new CharacterGuesstimateProcedure(),
];

// Page state variables
const isParameterOpen = ref(false);
const linkCopied = ref(false);
const isAudioLoaded = ref(false);
const selectedProcedure = ref<Procedure | null>(null);
const selectedTrainingParameters = ref<Parameter[]>([]);

// Handle start training
const openParameterModel = (procedure: Procedure) => {
  selectedProcedure.value = procedure;
  selectedTrainingParameters.value = procedure.parameters;
  isParameterOpen.value = true;
};

// Validate form data
const validateForm = (state: { parameters: Parameter[] }): FormError[] => {
  const errors: FormError[] = [];
  state.parameters.forEach((parameter) => {
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
  });
  return errors;
};

const getTrainingLink = (procedure: Procedure) => {
  const jsonString = JSON.stringify(procedure.toJson());
  const routeName = procedure.name.toLowerCase().replace(/ /g, "-");
  return {
    path: `/train/${routeName}`, // Use `path` instead of `name`
    query: { data: encodeURIComponent(jsonString) },
  };
};

const handleFormSubmit = async () => {
  if (!isAudioLoaded.value) {
    try {
      const totalFiles = audioFiles.length;
      let loadedFiles = 0;
      const progressToastId = "progress-toast";

      const updateToast = () => {
        toast.remove(progressToastId);
        toast.add({
          id: progressToastId,
          title: t("notification.loadingAsset.title", {
            loaded: loadedFiles,
            total: totalFiles,
          }),
          description: t("notification.loadingAsset.description"),
          timeout: 0, // No timeout
        });
      };

      updateToast();

      await preloadAudioFiles((loaded, total) => {
        loadedFiles = loaded;
        updateToast();
        if (loadedFiles === total) {
          toast.remove(progressToastId);
        }
      });

      isAudioLoaded.value = true;
    } catch (error: Error) {
      console.error(error);
      toast.add({
        title: t("notification.loadingAsset.error.title"),
        description: t("notification.loadingAsset.error.description", {
          error: error.message,
        }),
        color: "red",
      });
      // remove the progress toast
      toast.remove("progress-toast");
      return; // Stop if error in loading audio
    }
  }

  // Proceed with form submission
  if (selectedProcedure.value) {
    console.log(
      "Starting training with data:",
      JSON.stringify(selectedProcedure.value.toJson())
    );
    const link = getTrainingLink(selectedProcedure.value);
    router.push(link);
  }
};

const copyLink = async () => {
  if (selectedProcedure.value) {
    const link = getTrainingLink(selectedProcedure.value);
    // Construct the full URL using `path`
    const fullLink = `${window.location.origin}${link.path}?data=${link.query.data}`;
    await navigator.clipboard.writeText(fullLink);
    toast.add({
      title: t("notification.copied.title"),
      description: t("notification.copied.description"),
      callback: () => (linkCopied.value = false),
    });
    linkCopied.value = true;
  }
};

// Handle form errors
const handleFormError = async (event: FormErrorEvent) => {
  const element = document.getElementById(event.errors[0].id);
  element?.focus();
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
};
</script>
