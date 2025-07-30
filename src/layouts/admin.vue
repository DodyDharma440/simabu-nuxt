<script setup lang="ts">
import AdminNavbar from "~/common/layouts/AdminNavbar.vue";
import AdminSidebar from "~/common/layouts/AdminSidebar.vue";
</script>

<template>
  <main>
    <AdminSidebar />
    <div class="ml-[280px] pt-[72px]">
      <AdminNavbar />
      <div class="p-6">
        <slot />
      </div>
    </div>
  </main>
</template>
