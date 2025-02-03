<script setup lang="ts">
const localePath = useLocalePath();

const links = [
  {
    label: "Home",
    icon: "i-heroicons-home",
  },
  {
    label: "Inbox",
    icon: "i-heroicons-inbox",
    badge: "4",
  },
  {
    label: "Users",
    icon: "i-heroicons-user-group",
  },
  {
    label: "Settings",
    icon: "i-heroicons-cog-8-tooth",
    children: [
      {
        label: "General",
      },
      {
        label: "Members",
      },
      {
        label: "Notifications",
      },
    ],
  },
];
</script>

<template>
  <AppHeader />
  <UDashboardPage>
    <UDashboardPanel :width="300" collapsible class="h-[100svh]">
      <UDashboardSidebar>
        <UDashboardSidebarLinks :links="links" />
      </UDashboardSidebar>
    </UDashboardPanel>

    <UMain>
      <slot />
    </UMain>
  </UDashboardPage>

  <AppFooter />
</template>
