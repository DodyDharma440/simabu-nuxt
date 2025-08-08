<script setup lang="ts">
import AdminContent from "~/common/layouts/AdminContent.vue";

useHead({ title: "User Management - Simabu" });
</script>

<template>
  <AdminContent
    title="User Management"
    :breadcrumbs="[{ text: 'User Management', isActive: true }]"
  >
    USER MANAGEMENT
  </AdminContent>
</template>
