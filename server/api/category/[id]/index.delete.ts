import { createResponse } from "~/common/utils/api-response";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));

  const category = await prisma.kategori.findUnique({
    where: { id },
  });

  if (!category) {
    throw createError({
      statusMessage: "Category not found",
      statusCode: 404,
    });
  }

  await prisma.kategori.delete({
    where: { id },
  });

  return createResponse(true);
});
