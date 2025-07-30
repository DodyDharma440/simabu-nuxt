import { createResponse } from "~/common/utils/api-response";
import { decodeToken } from "~/common/utils/token";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const userData = decodeToken(event);
  const id = Number(getRouterParam(event, "id"));

  const mahasiswa = await prisma.mahasiswa.findUnique({ where: { id } });

  if (!mahasiswa) {
    throw createError({ statusMessage: "User not found", status: 404 });
  }

  if (userData?.id === mahasiswa.userId) {
    throw createError({
      statusMessage: "Can't delete your own user here",
      status: 400,
    });
  }

  await prisma.$transaction([
    prisma.mahasiswa.delete({ where: { id: mahasiswa.id } }),
    prisma.user.delete({ where: { id: mahasiswa.userId } }),
  ]);

  return createResponse("Success");
});
