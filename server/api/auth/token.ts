import { createResponse } from "~/common/utils/api-response";

export default defineEventHandler((event) => {
  const cookies = parseCookies(event);
  const token = cookies[process.env.AUTH_COOKIE_NAME!];

  return createResponse({ token: token ?? null });
});
