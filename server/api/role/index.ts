import { createResponse } from "~/common/utils/api-response";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async () => {
  const roles = await prisma.role.findMany();
  return createResponse(roles);
});
