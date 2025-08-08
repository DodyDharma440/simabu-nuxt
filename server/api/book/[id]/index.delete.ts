import { createResponse } from "~/common/utils/api-response";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));

  const book = await prisma.buku.findUnique({
    where: { id },
  });

  if (!book) {
    throw createError({
      statusMessage: "Buku not found",
      status: 404,
    });
  }

  await prisma.buku.delete({
    where: { id },
  });

  createResponse(true);
});
