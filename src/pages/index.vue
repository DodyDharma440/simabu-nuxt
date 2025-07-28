<script setup lang="ts">
import AuthContainer from "~/modules/auth/components/AuthContainer.vue";

useHead({
  title: "Login - Simabu",
});

definePageMeta({
  middleware: [
    () => {
      const token = useCookie(process.env.AUTH_COOKIE_NAME!);
      if (token.value) {
        return navigateTo("/admin/dashboard", { replace: true });
      }
    },
  ],
});
</script>

<template>
  <AuthContainer />
</template>
