<script setup lang="ts">
import { ToastifyContainer } from "vue3-toastify";

const token = useCookie(process.env.AUTH_COOKIE_NAME!);
const store = useUserStore();

if (token.value) {
  await callOnce("user-login", () => store.fetchUser());
}

useHead({
  script: [
    {
      innerHTML: `if (localStorage.theme === "dark" || (!('theme' in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }`,
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <ToastifyContainer />
  </NuxtLayout>
</template>
