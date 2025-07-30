import { createResponse } from "~/common/utils/api-response";
import { decodeToken } from "~/common/utils/token";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const userData = decodeToken(event);
  const id = Number(getRouterParam(event, "id"));

  const petugas = await prisma.petugas.findUnique({ where: { id } });

  if (!petugas) {
    throw createError({ statusMessage: "User not found", status: 404 });
  }

  if (userData?.id === petugas.userId) {
    throw createError({
      statusMessage: "Can't delete your own user here",
      status: 400,
    });
  }

  await prisma.$transaction([
    prisma.petugas.delete({ where: { id: petugas.id } }),
    prisma.user.delete({ where: { id: petugas.userId } }),
  ]);

  return createResponse("Success");
});
