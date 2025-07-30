<script setup lang="ts">
import type { ISidebarMenu } from "../interfaces/menu";

interface SidebarItemProps {
  item: ISidebarMenu;
}

const props = defineProps<SidebarItemProps>();
const { item } = toRefs(props);

const route = useRoute();

const isActive = computed(() => {
  return (
    item.value.path === route.path ||
    item.value.pathnames?.includes(route.name?.toString() ?? "")
  );
});
</script>

<template>
  <div
    class="px-4 py-3 rounded-md hover:bg-white/5 transition-all duration-300 flex items-center gap-3 text-gray-400"
    :class="{ 'bg-white/10 text-white': isActive }"
  >
    <component :is="item.iconName" class="size-6"></component>
    <span>
      {{ item.label }}
    </span>
  </div>
</template>
