import { createResponse } from "~/common/utils/api-response";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  const body = await readBody<{ stok: number }>(event);

  const existedBook = await prisma.buku.findUnique({
    where: { id },
  });
  if (!existedBook) {
    throw createError({
      statusMessage: "Buku not found",
      statusCode: 404,
    });
  }

  const book = await prisma.buku.update({
    data: {
      stok: body.stok,
      updatedAt: new Date(),
    },
    where: { id },
  });

  return createResponse(book);
});
