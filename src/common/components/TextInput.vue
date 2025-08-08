<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";

export interface InputSlots {
  leading(props?: any): any;
  trailing(props?: any): any;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface TextInputProps extends /* @vue-ignore */ InputHTMLAttributes {}

defineProps<TextInputProps>();
const model = defineModel<any>();
const slots = defineSlots<InputSlots>();
const isError = inject<boolean>("isInputError");
</script>

<template>
  <div class="flex items-center relative">
    <div
      v-if="slots.leading"
      class="absolute left-4 flex items-center justify-center"
    >
      <slot name="leading"></slot>
    </div>

    <input
      v-model="model"
      v-tw-merge
      class="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-600 pl-5 pr-5 py-3 focus:outline-0 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-800 focus:border-indigo-500 dark:focus:border-indigo-800 transition-all duration-200 flex-1"
      :class="{
        'pl-10': slots.leading,
        'border-red-500 focus:border-red-500 focus:ring-red-600 dark:border-red-600 dark:focus:border-red-600 dark:focus:ring-red-600':
          isError,
      }"
      v-bind="$attrs"
    />

    <div
      v-if="slots.trailing"
      class="absolute right-4 flex items-center justify-center"
    >
      <slot name="trailing"></slot>
    </div>
  </div>
</template>
