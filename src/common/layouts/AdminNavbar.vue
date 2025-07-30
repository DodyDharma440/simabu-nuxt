<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import UserAvatar from "../components/UserAvatar.vue";
import ColorModeSwitch from "./ColorModeSwitch.vue";

const userStore = useUserStore();
const { userData } = storeToRefs(userStore);
</script>

<template>
  <nav
    class="shadow-lg bg-white dark:bg-gray-900 px-6 py-5 fixed top-0 right-0 left-[280px] flex items-center justify-end gap-4"
  >
    <ColorModeSwitch />
    <div class="flex items-center gap-3">
      <div class="text-right">
        <p class="leading-normal">{{ userData?.nama }}</p>
        <p class="text-gray-400 text-xs">{{ userData?.user.username }}</p>
      </div>
      <UserAvatar :size="40" :user-name="userData?.nama" />
      <button @click="() => {}">
        <ChevronDownIcon class="size-5" />
      </button>
    </div>
  </nav>
</template>
