<script setup lang="ts">
import { UserIcon } from "@heroicons/vue/24/outline";

interface UserAvatarProps {
  size: number;
  src?: string;
  userName?: string;
}

const props = withDefaults(defineProps<UserAvatarProps>(), {
  src: "",
  userName: "",
});
const { userName } = toRefs(props);

const initial = computed(() => {
  const [first, sec] = (userName.value ?? "").split(" ");
  return `${first?.[0] ?? ""}${sec?.[0] ?? ""}`;
});
</script>

<template>
  <div
    :style="{ width: `${size}px`, height: `${size}px` }"
    class="rounded-full bg-indigo-100 text-indigo-500 font-semibold text-center flex items-center justify-center overflow-hidden"
  >
    <div v-if="src">
      <NuxtImg :src="src" class="object-cover size-full" />
    </div>
    <span v-else-if="userName">
      {{ initial }}
    </span>
    <div v-else>
      <UserIcon class="size-6" />
    </div>
  </div>
</template>
