<template>
  <TopMenu />
  <ULandingHero
    :title="t('landing.title')"
    :description="t('landing.description')"
    :links="actionLinks"
  >
  </ULandingHero>

  <div class="sm:px-8 px-2 flex w-screen justify-center">
    <div class="max-w-4xl w-full">
      <ImagePlaceholder />
    </div>
  </div>

  <ULandingSection
    :title="t('landing.features.title')"
    :description="t('landing.features.description')"
    :headline="t('landing.features.headline')"
  >
    <UPageGrid
      id="features"
      class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
    >
      <ULandingCard
        :title="t(`landing.features.items.card1.title`)"
        :description="t(`landing.features.items.card1.description`)"
        icon="i-heroicons-light-bulb"
      />
      <ULandingCard
        :title="t(`landing.features.items.card2.title`)"
        :description="t(`landing.features.items.card2.description`)"
        icon="i-heroicons-currency-dollar"
      />
      <ULandingCard
        :title="t(`landing.features.items.card3.title`)"
        :description="t(`landing.features.items.card3.description`)"
        icon="i-heroicons-globe-alt"
      />
      <ULandingCard
        :title="t(`landing.features.items.card4.title`)"
        :description="t(`landing.features.items.card4.description`)"
        icon="i-heroicons-shield-check"
      />
      <ULandingCard
        :title="t(`landing.features.items.card5.title`)"
        :description="t(`landing.features.items.card5.description`)"
        icon="i-heroicons-user-circle"
      />
      <ULandingCard
        :title="t(`landing.features.items.card6.title`)"
        :description="t(`landing.features.items.card6.description`)"
        icon="i-heroicons-clipboard-document-check"
      />
    </UPageGrid>
  </ULandingSection>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const actionLinks = computed(() => [
  {
    label: t("landing.cta"),
    icon: "i-heroicons-arrow-right-20-solid",
    trailing: true,
    to: "/train",
    size: "xl",
  },
]);

useSeoMeta({
  title: t("landing.title"),
  ogTitle: t("landing.title"),
  description: t("landing.description"),
  ogDescription: t("landing.description"),
});
</script>
