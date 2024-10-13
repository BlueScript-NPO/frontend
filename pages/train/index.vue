<template>
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
              @click="startTraining(procedure)"
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
                    :to="
                      '/docs/training/' +
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
const isParameterOpen = ref(false);

import {
  RapidVisualPerceptionProcedure,
  SequentialVisualMemoryProcedure,
  CharacterSequencingProcedure,
  CharacterMatchingProcedure,
  CharacterGuesstimateProcedure,
  Procedure,
} from "~/types/procedure";

// Initialize procedures
const visualProcedures: Procedure[] = [
  new RapidVisualPerceptionProcedure(),
  new SequentialVisualMemoryProcedure(),
  new CharacterSequencingProcedure(),
  new CharacterMatchingProcedure(),
  new CharacterGuesstimateProcedure(),
];

// Handle start training
const startTraining = (procedure: Procedure) => {
  // Function to open modal and enter parameters for training
  console.log("Starting training for:", procedure.name);
  isParameterOpen.value = true;
};

const items = [
  {
    label: "Visual",
    key: "visual",
    icon: "i-ph-eye",
  },
  {
    label: "Audition",
    key: "audition",
    icon: "i-ph-user-sound",
  },
];
</script>
