<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/16/solid";
import type { InputHTMLAttributes } from "vue";

interface CheckboxInputProps extends /* @vue-ignore */ InputHTMLAttributes {
  id: string;
}

const model = defineModel<any>();

const { id } = defineProps<CheckboxInputProps>();
</script>

<template>
  <div class="flex items-center gap-2">
    <input
      :id="id"
      v-model="model"
      v-tw-merge
      class="appearance-none relative peer shrink-0 size-4 border-2 border-indigo-500 rounded-sm bg-transparent checked:bg-indigo-500 transition-all duration-300"
      type="checkbox"
      v-bind="$attrs"
    />
    <label :for="id">
      <slot />
    </label>
    <CheckIcon
      class="size-4 text-white transition-all duration-300 opacity-0 peer-checked:opacity-100 absolute pointer-events-none"
    />
  </div>
</template>
