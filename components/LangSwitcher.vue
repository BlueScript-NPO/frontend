<template #right>
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
          :alt="selectedLang"
        />
      </span>
    </template>
    <template #option="{ option }">
      <NuxtImg
        class="h-4 w-auto"
        :src="'/flags/' + option.code + '.svg'"
        :alt="option.code"
      />
      <span class="truncate">{{ option.label }}</span>
    </template>
  </USelectMenu>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();

const selectedLang = ref<string>(locale.value);

// watch lang change
watch(selectedLang, (val) => {
  setLocale(val);
});

const langItems = computed(() => {
  const items = [];

  for (let i in locales.value) {
    items.push({
      label: locales.value[i].name,
      code: locales.value[i].code,
    });
  }
  return items;
});
</script>
