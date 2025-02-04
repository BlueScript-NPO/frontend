<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import type { FormError, FormSubmitEvent } from "#ui/types";
// Supabase composables from your Nuxt Supabase module
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const { t } = useI18n();

definePageMeta({
  layout: "dashboard",
});

const signOut = inject<() => void>("signOut");

const state = reactive({
  name: "",
  email: "",
});

const toast = useToast();

// When the authenticated user is available, populate the form.
watchEffect(() => {
  if (user.value) {
    state.name = user.value.user_metadata?.full_name || "";
    state.email = user.value.email || "";
  }
});

// Simple client-side validation.
function validate(state: any): FormError[] {
  const errors: FormError[] = [];
  if (!state.name) {
    errors.push({
      path: "name",
      message: t("dashboard.settings.validate.name"),
    });
  }
  if (!state.email) {
    errors.push({
      path: "email",
      message: t("dashboard.settings.validate.email"),
    });
  }
  return errors;
}

// On submit, update the user's profile (metadata) via Supabase.
async function onSubmit(event: FormSubmitEvent<any>) {
  const { error } = await supabase.auth.updateUser({
    data: { full_name: state.name },
  });
  if (error) {
    toast.add({
      title: t("dashboard.settings.updateError"),
      message: error.message,
      icon: "i-ph-x",
    });
    return;
  }
  toast.add({
    title: t("dashboard.settings.updateSuccess"),
    icon: "i-ph-check",
  });
}
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <!-- Theme Section -->
    <UDashboardSection
      :title="t('dashboard.settings.theme.title')"
      :description="t('dashboard.settings.theme.description')"
    >
      <template #links>
        <UColorModeSelect />
      </template>
    </UDashboardSection>

    <UDivider class="mb-4" />

    <!-- Profile Form -->
    <UForm
      :state="state"
      :validate="validate"
      :validate-on="['submit']"
      @submit="onSubmit"
    >
      <UDashboardSection
        :title="t('dashboard.settings.account.title')"
        :description="t('dashboard.settings.account.description')"
      >
        <template #links>
          <UButton
            type="submit"
            :label="t('dashboard.settings.account.save')"
            color="black"
          />
        </template>
        <!-- Name Field -->
        <UFormGroup
          name="name"
          :label="t('dashboard.settings.name.title')"
          :description="t('dashboard.settings.name.description')"
          required
          class="grid grid-cols-2 gap-2 items-center"
        >
          <UInput
            v-model="state.name"
            autocomplete="off"
            icon="i-ph-pencil-simple-line"
            size="md"
          />
        </UFormGroup>

        <!-- Email Field (Read-Only) -->
        <UFormGroup
          name="email"
          :label="t('dashboard.settings.email.title')"
          :description="t('dashboard.settings.email.description')"
          required
          class="grid grid-cols-2 gap-2"
        >
          <UInput
            v-model="state.email"
            type="email"
            autocomplete="off"
            icon="i-ph-envelope-simple"
            size="md"
            disabled
          />
        </UFormGroup>
      </UDashboardSection>

      <UDashboardSection
        :title="t('dashboard.settings.signOut.title')"
        :description="t('dashboard.settings.signOut.description')"
      >
        <template #links>
          <UButton
            :label="t('dashboard.settings.signOut.button')"
            color="red"
            @click="signOut"
          />
        </template>
      </UDashboardSection>
    </UForm>
  </UDashboardPanelContent>
</template>
