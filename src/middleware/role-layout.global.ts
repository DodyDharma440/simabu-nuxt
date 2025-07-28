export default defineNuxtRouteMiddleware((to) => {
  const store = useUserStore();
  const { userData } = storeToRefs(store);
  const role = userData.value?.user.role.name.toLowerCase();
  if (
    ["admin", "petugas"].includes(role ?? "") &&
    to.path.startsWith("/admin")
  ) {
    to.meta.layout = "admin";
  } else if (role === "student" && to.path.startsWith("/student")) {
    to.meta.layout = "student";
  }
});
