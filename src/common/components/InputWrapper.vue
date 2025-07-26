<script setup lang="ts">
import { ExclamationCircleIcon } from "@heroicons/vue/24/outline";
import { motion } from "motion-v";

export type InputWrapperProps = {
  label: string;
  labelId?: string;
  isError?: boolean;
};

export type InputWrapperSlots = {
  error(props?: any): any;
  default(props?: any): any;
};

const props = defineProps<InputWrapperProps>();
const slots = defineSlots<InputWrapperSlots>();

const { isError } = toRefs(props);
provide("isInputError", isError);
</script>

<template>
  <div>
    <label :id="props.labelId" class="block mb-2.5">{{ props.label }}</label>
    <slot />
    <AnimatePresence>
      <motion.div
        v-if="slots.error && isError"
        class="flex items-center gap-1 text-red-500 mt-2.5"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.1 }"
      >
        <ExclamationCircleIcon class="size-4" />
        <div class="text-sm">
          <slot name="error" />
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
