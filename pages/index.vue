<template>
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
    :headline="t('landing.features.headline')"
  >
    <UPageGrid
      id="features"
      class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
    >
      <ULandingCard
        :title="t(`landing.features.items.card1.title`)"
        :description="t(`landing.features.items.card1.description`)"
        icon="i-ph-user-check"
      />
      <ULandingCard
        :title="t(`landing.features.items.card2.title`)"
        :description="t(`landing.features.items.card2.description`)"
        icon="i-ph-money"
      />
      <ULandingCard
        :title="t(`landing.features.items.card3.title`)"
        :description="t(`landing.features.items.card3.description`)"
        icon="i-ph-code-block"
      />
      <ULandingCard
        :title="t(`landing.features.items.card4.title`)"
        :description="t(`landing.features.items.card4.description`)"
        icon="i-ph-shield-check"
      />
      <ULandingCard
        :title="t(`landing.features.items.card5.title`)"
        :description="t(`landing.features.items.card5.description`)"
        icon="i-ph-person-simple-circle"
      />
      <ULandingCard
        :title="t(`landing.features.items.card6.title`)"
        :description="t(`landing.features.items.card6.description`)"
        icon="i-ph-check-square"
      />
    </UPageGrid>
  </ULandingSection>
</template>

<script setup>
const { t } = useI18n();

const actionLinks = computed(() => [
  {
    label: t("landing.cta"),
    icon: "i-ph-arrow-right",
    trailing: true,
    to: "/train",
    size: "xl",
  },
  {
    label: t("landing.github"),
    icon: "i-simple-icons-github",
    to: "https://github.com/BlueScript-NPO/",
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
