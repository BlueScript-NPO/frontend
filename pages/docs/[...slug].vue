<script setup lang="ts">
import { withoutTrailingSlash } from "ufo";
import type { NavItem } from "@nuxt/content";

const { t } = useI18n();
const route = useRoute();
const navigation = inject<Ref<NavItem[]>>("navigation", ref([]));

const { data: page } = await useAsyncData(route.path, () =>
  queryContent(route.path).findOne()
);

const breadcrumb = computed(() =>
  mapContentNavigation(findPageBreadcrumb(navigation.value, page.value))
);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { data: surround } = await useAsyncData(
  `${route.path}-surround`,
  () =>
    queryContent("/docs")
      .where({ _extension: "md", navigation: { $ne: false } })
      .only(["title", "description", "_path"])
      .findSurround(withoutTrailingSlash(route.path)),
  { default: () => [] }
);

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
});
</script>

<template>
  <UPage v-if="page">
    <UPageHeader UPageHeader v-bind="page">
      <template #headline>
        <UBreadcrumb :links="breadcrumb" />
      </template>
    </UPageHeader>

    <UPageBody prose>
      <ContentRenderer v-if="page.body" :value="page" />
      <hr v-if="surround?.length" />
      <UContentSurround :surround="surround" />
    </UPageBody>

    <template v-if="page.toc !== false" #right>
      <UContentToc :links="page.body?.toc?.links" :title="t('docs.toc')">
        <template #bottom> </template>
      </UContentToc>
    </template>
  </UPage>
</template>
