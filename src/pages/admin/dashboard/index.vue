<script setup lang="ts">
import BaseButton from "~/common/components/BaseButton.vue";
import { useMutation } from "~/common/composables/mutation";

useHead({
  title: "Admin Dashboard - Simabu",
});

definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();
const userStore = useUserStore();

const { mutate, isLoading } = useMutation<any, boolean>({
  mutationFn: () => {
    // @ts-ignore
    return $fetch("/api/auth/logout");
  },
  onSuccess: () => {
    userStore.$reset();
    navigateTo("/");
  },
});

const handleLogout = () => {
  mutate({});
};
</script>

<template>
  <div>
    <p>Dashboard</p>
    <pre>{{ JSON.stringify(route, null, 2) }}</pre>

    <BaseButton :is-loading="isLoading" @click="handleLogout">
      Logout
    </BaseButton>
  </div>
</template>
