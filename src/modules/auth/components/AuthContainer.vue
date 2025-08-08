<script setup lang="ts">
import LoginForm from "./LoginForm.vue";
</script>

<template>
  <div
    class="bg-gradient-to-r from-indigo-600 to-indigo-400 dark:from-indigo-800 dark:to-indigo-600"
  >
    <div
      class="grid grid-cols-12 gap-6 container mx-auto w-full h-screen items-center"
    >
      <div class="col-span-6 text-white">
        <h3 class="font-semibold text-[2.5rem] mb-10 tracking-wider">LOGO</h3>
        <h2 class="font-semibold text-7xl mb-8 tracking-wide">Hey, Hello</h2>
        <h5 class="text-2xl mb-5">Lorem ipsum dolor sit amet</h5>
        <p class="text-lg text-gray-200 font-light">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>
      </div>
      <div class="col-span-6 h-full flex items-end justify-center">
        <div
          class="bg-white dark:bg-gray-800 px-14 py-12 rounded-t-4xl mt-auto w-full h-[85%] max-w-xl mx-auto"
        >
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
</template>
