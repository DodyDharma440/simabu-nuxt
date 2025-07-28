// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  srcDir: "src/",
  serverDir: "server/",
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "@prisma/nuxt",
    "@nuxt/eslint",
    "motion-v/nuxt",
    "@vee-validate/nuxt",
  ],
  plugins: ["~/plugins/tw-merge", "~/plugins/vue3-toastify"],
});
