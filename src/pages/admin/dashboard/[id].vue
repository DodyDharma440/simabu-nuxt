<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <pre>{{ JSON.stringify(route, null, 2) }}</pre>
</template>
