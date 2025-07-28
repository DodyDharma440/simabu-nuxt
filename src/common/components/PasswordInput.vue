<script setup lang="ts">
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import type { InputSlots } from "./TextInput.vue";
import TextInput from "./TextInput.vue";
import type { InputHTMLAttributes } from "vue";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PasswordInputProps extends /* @vue-ignore */ InputHTMLAttributes {}

defineProps<PasswordInputProps>();
const slots = defineSlots<Pick<InputSlots, "leading">>();

const showPassword = ref(false);

const handleToggleShow = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <TextInput :type="showPassword ? 'text' : 'password'" v-bind="$attrs">
    <template v-if="slots.leading" #leading>
      <slot name="leading" />
    </template>

    <template #trailing>
      <button type="button" @click="handleToggleShow">
        <EyeIcon v-if="showPassword" class="size-4" />
        <EyeSlashIcon v-else class="size-4" />
      </button>
    </template>
  </TextInput>
</template>
