<script setup lang="ts">
import { HomeIcon } from "@heroicons/vue/24/outline";

interface BreadcrumbsProps {
  items: Array<{ text: string; href?: string; isActive?: boolean }>;
}

defineProps<BreadcrumbsProps>();
</script>

<template>
  <div class="flex items-center gap-3">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="flex items-center gap-2"
    >
      <div class="flex items-center gap-2">
        <HomeIcon
          v-if="index === 0 && items[0].text === 'Home'"
          class="size-4 text-gray-600 dark:text-gray-400"
        />

        <span v-if="!item.isActive">
          <NuxtLink :to="item.href" class="text-gray-700 dark:text-gray-400">
            {{ item.text }}
          </NuxtLink>
        </span>
        <span v-else class="text-indigo-500 dark:text-indigo-300">{{
          item.text
        }}</span>
      </div>
      <span v-if="index < items.length - 1">/</span>
    </div>
  </div>
</template>
