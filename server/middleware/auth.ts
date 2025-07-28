import { verifyToken } from "~/common/utils/token";

const ignoredApiPaths = ["/api/auth/login", "/api/auth/logout"];

export default defineEventHandler((event) => {
  if (event.path.startsWith("/api") && !ignoredApiPaths.includes(event.path)) {
    const token = parseCookies(event)[process.env.AUTH_COOKIE_NAME!];

    if (!token) {
      throw createError({
        status: 401,
        message: "Unauthorized",
      });
    }

    const isVerified = verifyToken(token);
    if (!isVerified) {
      throw createError({
        status: 401,
        message: "Unauthorized",
      });
    }
  }
});
