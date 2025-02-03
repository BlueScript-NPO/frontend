<template>
  <div class="w-full min-h-screen flex justify-center">
    <UAuthForm
      class="h-fit my-16"
      title="Login"
      description="Enter your credentials to access your account."
      :providers="[
        {
          label: 'Google',
          icon: 'i-simple-icons-google',
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

const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: localePath("/confirm"),
    },
  });
  if (error) console.log(error);
};
</script>
