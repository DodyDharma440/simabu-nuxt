<script setup lang="ts">
const { data } = await useFetch("/api/auth/login");
console.log("🚀 ~ data:", data.value);
</script>

<template>
  <h1>{{ JSON.stringify(data) }}</h1>
</template>
