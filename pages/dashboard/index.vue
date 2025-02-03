<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const modelOpen = ref(false);

definePageMeta({
  layout: "dashboard",
});

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

const signOut = inject<() => void>("signOut");
</script>

<template>
  <UModal v-model="modelOpen" :ui="{ width: 'w-full sm:max-w-sm' }">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Sign Out</h2>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-ph-x"
            class="-my-1"
            @click="modelOpen = false"
          />
        </div>
        <div class="space-y-4">Are you sure you want to sign out?</div>
      </template>

      <template #footer>
        <div class="flex justify-end space-x-4">
          <UButton
            color="red"
            label="Sign Out
          "
            @click="signOut"
          />
          <UButton color="white" label="Cancel" @click="modelOpen = false" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
