import { createResponse } from "~/common/utils/api-response";
import type { IBookCategoryInput } from "~/modules/book/interfaces";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  const body = await readBody<IBookCategoryInput>(event);

  const existedCategory = await prisma.kategori.findUnique({
    where: { id },
  });

  if (!existedCategory) {
    throw createError({
      statusMessage: "Category not found",
      statusCode: 404,
    });
  }

  const nameExist = await prisma.kategori.findFirst({
    where: { nama: body.nama },
  });

  if (nameExist) {
    throw createError({
      statusMessage: "Category with this name already exists",
      statusCode: 400,
    });
  }

  const category = await prisma.kategori.update({
    data: { ...body, updatedAt: new Date() },
    where: { id },
  });

  return createResponse(category);
});
