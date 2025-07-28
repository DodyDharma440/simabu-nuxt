<script setup lang="ts">
import BaseButton from "~/common/components/BaseButton.vue";
import { useMutation } from "~/common/composables/mutation";

definePageMeta({
  middleware: ["auth"],
});

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

const store = useUserStore();
await callOnce("user-login", () => store.fetchUser());
</script>

<template>
  <div>
    <p>Dashboard</p>
    <pre>{{ JSON.stringify(store.userData, null, 2) }}</pre>
    <BaseButton :is-loading="isLoading" @click="handleLogout">
      Logout
    </BaseButton>
  </div>
</template>
