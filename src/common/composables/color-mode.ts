export const useColorMode = () => {
  const isDark = ref(false);

  const applyTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      isDark.value = savedTheme === "dark";
    } else {
      isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    applyTheme(isDark.value);
  });

  watch(isDark, (newVal) => {
    applyTheme(newVal);
  });

  const currentTheme = computed(() => (isDark.value ? "dark" : "light"));

  return {
    theme: currentTheme,
    toggleTheme,
  };
};
