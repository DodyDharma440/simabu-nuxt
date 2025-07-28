export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.server) return;
  if (to.path !== "/") {
    const token = useCookie(process.env.AUTH_COOKIE_NAME!);
    if (!token.value) {
      return navigateTo("/", { replace: true });
    }
    return;
  }
});
