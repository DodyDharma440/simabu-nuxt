<script setup lang="ts">
const store = useUserStore();
await callOnce("user-login", () => store.fetchUser(), { mode: "navigation" });
</script>

<template>
  <main>
    <p>ADMIN LAYOUT</p>
    <pre>{{ JSON.stringify(store.userData, null, 2) }}</pre>
    <slot />
  </main>
</template>
