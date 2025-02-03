<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const modelOpen = ref(false);

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

  <ClientOnly>
    <div class="flex flex-col items-center justify-center h-screen">
      <UCard class="max-w-sm w-full">
        <h1 class="text-2xl font-bold">Dashboard</h1>

        <p>Welcome, {{ user?.user_metadata.full_name }}</p>

        <div class="flex justify-end">
          <UButton type="button" color="red" @click="modelOpen = true"
            >Sign Out</UButton
          >
        </div>
      </UCard>
    </div>
  </ClientOnly>
</template>
