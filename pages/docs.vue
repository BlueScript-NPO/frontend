<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))
const links = computed(() => navigation.value.find(item => item._path === '/docs')?.children ?? [])
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside>
          <template #top>
            <UContentSearchButton
                size="sm"
                :label="t('search.placeholder')"
            />
          </template>

          <UNavigationTree :links="mapContentNavigation(links)"/>
        </UAside>
      </template>

      <NuxtPage/>
    </UPage>
  </UContainer>
</template>
