<script setup lang="ts">
import { motion } from "motion-v";

type ButtonSlots = {
  leftIcon(): any;
  rightIcon(): any;
  default(): any;
};

type ButtonColor = "default" | "primary" | "secondary";
type ButtonVariant = "solid" | "outline" | "light" | "subtle";

type ButtonProps = {
  color?: ButtonColor;
  variant?: ButtonVariant;
  isLoading?: boolean;
  loaderPosition?: "left" | "right";
};

const colorVariantsClasses: Record<`${ButtonColor}-${ButtonVariant}`, string> =
  {
    "default-solid":
      "bg-gray-100 border-gray-100 hover:bg-gray-300 focus:ring-gray-300 focus:ring-2",
    "default-outline":
      "border-gray-300 bg-transparent hover:bg-gray-300/50 focus:ring-gray-300 focus:ring-2",
    "default-light":
      "bg-gray-50 border-transparent hover:bg-gray-300 focus:ring-gray-300 focus:ring-2",
    "default-subtle":
      "bg-transparent border-transparent hover:bg-gray-300 focus:ring-gray-300 focus:ring-2 shadow-md",
    "primary-solid":
      "bg-indigo-500 border-indigo-500 hover:bg-indigo-600 focus:ring-indigo-300 focus:ring-2 text-white",
    "primary-outline":
      "border-indigo-500 bg-transparent hover:bg-indigo-500/20 focus:ring-indigo-300 focus:ring-2 text-indigo-600",
    "primary-light":
      "bg-indigo-500/20 border-transparent hover:bg-indigo-500/30 focus:ring-indigo-300 focus:ring-2 text-indigo-600",
    "primary-subtle":
      "bg-transparent border-transparent hover:bg-indigo-500/30 focus:ring-gray-300 focus:ring-2 text-indigo-600 shadow-md",
    "secondary-solid":
      "bg-amber-500 border-amber-500 hover:bg-amber-600 focus:ring-amber-300 focus:ring-2 text-white",
    "secondary-outline":
      "border-amber-500 bg-transparent hover:bg-amber-500/20 focus:ring-amber-300 focus:ring-2 text-amber-600",
    "secondary-light":
      "bg-amber-500/20 border-transparent hover:bg-amber-500/30 focus:ring-amber-300 focus:ring-2 text-amber-600",
    "secondary-subtle":
      "bg-transparent border-transparent hover:bg-amber-500/30 focus:ring-gray-300 focus:ring-2 text-amber-600 shadow-md",
  };

defineSlots<ButtonSlots>();
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "solid",
  color: "primary",
  loaderPosition: "left",
});
const { variant, color, isLoading } = toRefs(props);

const variantClass = computed(
  () =>
    colorVariantsClasses[
      `${color.value}-${variant.value}` as keyof typeof colorVariantsClasses
    ]
);
</script>

<template>
  <motion.button
    v-tw-merge
    class="px-7 py-3 rounded-lg text-center flex items-center justify-center gap-2 cursor-pointer border disabled:cursor-not-allowed font-medium transform transition-all duration-300 active:translate-y-0.5"
    :class="[
      variantClass,
      {
        'disabled:opacity-50': isLoading,
        'disabled:bg-gray-300 disabled:text-gray-600 disabled:border-transparent':
          !isLoading,
      },
    ]"
    type="button"
    :disabled="isLoading"
  >
    <slot name="leftIcon" />
    <slot />
    <slot name="rightIcon" />
  </motion.button>
</template>
