<template>
  <USelectMenu
    :options="langItems"
    v-model="selectedLang"
    option-attribute="label"
    value-attribute="code"
  >
    <template #leading>
      <span class="mr-2">
        <NuxtImg
          class="h-4 w-auto"
          :src="'/flags/' + selectedLang + '.svg'"
          loading="lazy"
          :alt="selectedLang"
        />
      </span>
    </template>
    <template #option="{ option }">
      <NuxtImg
        class="h-4 w-auto"
        :src="'/flags/' + option.code + '.svg'"
        loading="lazy"
        :alt="option.code"
      />
      <span class="truncate">{{ option.label }}</span>
    </template>
  </USelectMenu>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useNuxtApp } from "#imports";

const { $getLocale, $switchLocale, $getLocales } = useNuxtApp();

const selectedLang = ref<string>($getLocale());

// Watch for language changes and update the locale
watch(selectedLang, (val) => {
  $switchLocale(val);
});

// Generate language options from available locales
const langItems = computed(() => {
  return $getLocales().map((locale) => ({
    label: locale.name, // Assuming $getLocales provides `name` for label
    code: locale.code,
  }));
});
</script>
