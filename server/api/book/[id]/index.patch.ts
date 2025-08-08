import { createResponse } from "~/common/utils/api-response";
import { decodeToken } from "~/common/utils/token";
import type { IBookInput } from "~/modules/book/interfaces";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));

  const existedBook = await prisma.buku.findUnique({
    where: { id },
  });
  if (!existedBook) {
    throw createError({
      statusMessage: "Buku not found",
      statusCode: 404,
    });
  }

  const body = await readBody<IBookInput>(event);
  body.tahunTerbit = Number(body.tahunTerbit);
  body.nomorRak = Number(body.nomorRak);
  body.jumlahHalaman = Number(body.jumlahHalaman);
  body.stok = Number(body.stok);
  body.kategoriId = Number(body.kategoriId);

  //   const validations = zodSchema.safeParse(body);

  //   if (!validations.success) {
  //     const { errors } = validations.error;
  //     createErrResponse(res, { message: "Invalid request", errors }, 422);
  //     return;
  //   }

  const existCode = await prisma.buku.findUnique({
    where: { kodeBuku: body.kodeBuku },
  });
  if (existCode && existCode.id !== id) {
    throw createError({
      statusMessage: "Kode buku sudah ada",
      statusCode: 400,
    });
  }

  const token = decodeToken(event);
  const officer = await prisma.petugas.findUnique({
    where: { userId: token?.id },
  });

  //   if (req.imageUrl) {
  //     body.imageUrl = req.imageUrl;
  //   }

  const book = await prisma.buku.update({
    data: {
      ...body,
      updatedAt: new Date().toISOString(),
      updatedBy: officer?.nama || null,
    },
    where: { id },
  });

  return createResponse(book);
});
