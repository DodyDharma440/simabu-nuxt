export default defineNuxtRouteMiddleware((to) => {
  const store = useUserStore();
  const role = store.userData?.user.role.name.toLowerCase();
  if (
    ["admin", "petugas"].includes(role ?? "") &&
    to.path.startsWith("/admin")
  ) {
    to.meta.layout = "admin";
  } else if (role === "student" && to.path.startsWith("/student")) {
    to.meta.layout = "student";
  }
});
