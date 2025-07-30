<script setup lang="ts">
import UserAvatar from "../components/UserAvatar.vue";
import { adminMenus } from "../constants/menu";
import type { ISidebarMenu } from "../interfaces/menu";

const route = useRoute();
const userStore = useUserStore();

const { userData } = storeToRefs(userStore);

const isActive = (item: ISidebarMenu) => {
  return (
    item.path === route.path ||
    item.pathnames?.includes(route.name?.toString() ?? "")
  );
};
</script>

<template>
  <div
    class="fixed inset-y-0 left-0 w-[280px] bg-gray-900 dark:bg-slate-800 text-white flex flex-col"
  >
    <NuxtLink to="/admin/dashboard">
      <div class="flex items-center gap-4 px-6 pb-6 pt-8">
        <div class="rounded-full p-3 bg-indigo-600 size-12">
          <div class="rounded-full p-3 bg-indigo-300 size-full"></div>
        </div>
        <h2 class="text-4xl font-medium">Simabu</h2>
      </div>
    </NuxtLink>

    <div class="flex-1 p-6">
      <div
        v-for="({ title, items }, index) in adminMenus"
        :key="index"
        class="mb-7"
      >
        <h3 class="text-gray-300 mb-4 text-sm">{{ title }}</h3>
        <ul class="flex flex-col gap-2">
          <li v-for="menu in items" :key="menu.path">
            <NuxtLink
              :to="menu.path"
              class="px-4 py-3 rounded-md hover:bg-white/5 transition-all duration-300 flex items-center gap-3 text-gray-400"
              :class="{ 'bg-white/10 text-white': isActive(menu) }"
            >
              <component :is="menu.iconName" class="size-6"></component>
              <span>
                {{ menu.label }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-t-gray-600 p-6">
      <div class="flex items-center gap-3">
        <UserAvatar :size="40" :user-name="userData?.nama" />

        <div>
          <p>{{ userData?.nama }}</p>
          <p class="text-gray-400 text-sm">{{ userData?.user.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
