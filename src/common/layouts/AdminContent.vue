<script setup lang="ts">
import BaseBreadcrumbs from "../components/BaseBreadcrumbs.vue";

interface AdminContentProps {
  title?: string;
  breadcrumbs?: Array<{ text: string; href?: string; isActive?: boolean }>;
}

defineProps<AdminContentProps>();
</script>

<template>
  <div class="flex items-center justify-between">
    <h3 class="flex-1 text-3xl font-semibold">{{ title }}</h3>
    <BaseBreadcrumbs
      v-if="breadcrumbs"
      :items="[{ text: 'Home', href: '/admin/dashboard' }, ...breadcrumbs]"
    />
  </div>

  <div class="mt-8">
    <slot />
  </div>
</template>
