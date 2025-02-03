<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";
import LangSwitcher from "~/components/LangSwitcher.vue";
const { toggleContentSearch } = useUIState();
const { t } = useI18n();
const localePath = useLocalePath();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
  console.log("Signed out");
  navigateTo(localePath("/auth"));
};

const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation()
);
const { data: files } = useLazyFetch<ParsedContent[]>("/api/search.json", {
  default: () => [],
  server: true,
});

const links = computed(() => [
  {
    label: t("nav.docs"),
    to: localePath("/docs"),
    icon: "i-ph-book",
  },
  {
    label: t("nav.train"),
    to: localePath("/train"),
    icon: "i-ph-yin-yang",
  },

  {
    label: t("nav.result"),
    to: localePath("/result"),
    icon: "i-ph-chart-bar",
  },
]);

const items = [
  [
    {
      slot: "account",
      label: user?.value?.user_metadata.full_name,
      disabled: true,
    },
  ],
  [
    {
      label: "Dashboard",
      icon: "i-ph-speedometer",
      to: localePath("/dashboard"),
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-ph-arrow-line-up-right",
      click: signOut,
      color: "red",
    },
  ],
];

provide("navigation", navigation);
provide("files", files);
provide("signOut", signOut);
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink :to="localePath('/')">
        <Logo class="h-6 hover:opacity-90" />
      </NuxtLink>
      <UHeaderLinks :links="links" class="hidden sm:flex" />
    </template>

    <template #right>
      <UButton
        class="block md:hidden"
        variant="ghost"
        color="gray"
        square
        icon="i-ph-magnifying-glass"
        aria-label="Search documentation"
        @click="toggleContentSearch"
      ></UButton>
      <UContentSearchButton
        class="hidden w-full md:flex md:max-w-48 lg:max-w-56 text-zinc-600 dark:text-zinc-300"
        size="sm"
        :label="t('search.placeholder')"
      />

      <client-only>
        <UButton
          label="Sign in"
          color="black"
          variant="ghost"
          trailing-icon="i-ph-arrow-right"
          class="hidden lg:flex"
          :to="localePath('/auth')"
          v-if="!user"
        />
        <UDropdown
          :items="items"
          :popper="{ placement: 'bottom-start' }"
          v-else
        >
          <UAvatar :src="user?.user_metadata.avatar_url" alt="Avatar" />
          <template #account="{ item }">
            <div class="text-left">
              <p>Signed in as</p>
              <p class="truncate font-medium text-gray-900 dark:text-white">
                {{ item.label }}
              </p>
            </div>
          </template>

          <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>

            <UIcon
              :name="item.icon"
              class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
          </template>
        </UDropdown>
      </client-only>
    </template>

    <template #panel>
      <span class="sm:hidden">
        <ClientOnly>
          <UButtonGroup orientation="horizontal" class="w-full">
            <UColorModeSelect class="w-full" />
            <LangSwitcher class="w-full" />
          </UButtonGroup>
        </ClientOnly>
        <UDivider class="my-3" />

        <UNavigationLinks :links="links" />
        <UDivider class="my-3" />
      </span>
      <DocsNav />
    </template>
  </UHeader>

  <UMain>
    <slot />
  </UMain>

  <AppFooter />

  <ClientOnly>
    <LazyUContentSearch
      :files="files"
      :navigation="navigation ?? undefined"
      :links="links"
    />
  </ClientOnly>
</template>
