import { createResponse } from "~/common/utils/api-response";

export default defineEventHandler((event) => {
  deleteCookie(event, process.env.AUTH_COOKIE_NAME!);

  return createResponse(true);
});
