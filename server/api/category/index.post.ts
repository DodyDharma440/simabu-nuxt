import { createResponse } from "~/common/utils/api-response";
import type { IBookCategoryInput } from "~/modules/book/interfaces";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody<IBookCategoryInput>(event);

  const nameExist = await prisma.kategori.findFirst({
    where: { nama: body.nama },
  });

  if (nameExist) {
    throw createError({
      statusMessage: "Category with this name already exists",
      status: 400,
    });
  }

  const category = await prisma.kategori.create({
    data: body,
  });

  return createResponse(category, 201);
});
