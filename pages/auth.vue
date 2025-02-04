<template>
  <div class="w-full min-h-screen flex justify-center">
    <UAuthForm
      class="h-fit my-16"
      :title="t('auth.title')"
      :description="t('auth.description')"
      :providers="[
        {
          label: t('auth.OAuth.google'),
          icon: 'i-logos-google-icon',
          color: 'gray',
          click: () => {
            signInWithGoogle();
          },
        },
      ]"
      :loading="false"
    />
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();

const supabase = useSupabaseClient();

const { t } = useI18n();

const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}${localePath("/confirm")}`,
    },
  });
  if (error) console.log(error);
};
</script>
