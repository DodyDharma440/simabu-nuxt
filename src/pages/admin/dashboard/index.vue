<script setup lang="ts">
import BaseButton from "~/common/components/BaseButton.vue";
import { useMutation } from "~/common/composables/mutation";

definePageMeta({
  middleware: ["auth"],
});

const { mutate, isLoading } = useMutation<any, boolean>({
  mutationFn: () => {
    return $fetch("/api/auth/logout");
  },
  onSuccess: () => {
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
    <BaseButton :is-loading="isLoading" @click="handleLogout">
      Logout
    </BaseButton>
  </div>
</template>
