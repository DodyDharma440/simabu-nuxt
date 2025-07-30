<script setup lang="ts">
import { MoonIcon, SunIcon } from "@heroicons/vue/24/outline";
import { useColorMode } from "../composables/color-mode";

const { theme, toggleTheme } = useColorMode();
</script>

<template>
  <label>
    <input
      type="radio"
      class="hidden"
      :checked="theme === 'dark'"
      @click="toggleTheme"
    />
    <div
      class="rounded-full border-2 border-gray-300 dark:border-gray-700 p-[2px] cursor-pointer"
    >
      <div class="w-[52px] h-6 relative">
        <div
          class="rounded-full size-6 bg-indigo-500 dark:bg-indigo-200 transform transition-all duration-300"
          :class="{ 'translate-x-[calc(100%+4px)]': theme === 'dark' }"
        />

        <div class="absolute inset-0 flex items-center gap-1">
          <div class="flex-1 flex items-center justify-center">
            <SunIcon
              class="size-4"
              :class="{
                'text-white': theme !== 'dark',
                'text-gray-500': theme === 'dark',
              }"
            />
          </div>
          <div class="flex-1 flex items-center justify-center">
            <MoonIcon
              class="size-4 text-gray-400"
              :class="{ 'text-indigo-700': theme === 'dark' }"
            />
          </div>
        </div>
      </div>
    </div>
  </label>
</template>
