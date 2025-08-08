import { createResponse } from "~/common/utils/api-response";
import { decodeToken } from "~/common/utils/token";
import type { IBookInput } from "~/modules/book/interfaces";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody<IBookInput>(event);
  body.tahunTerbit = Number(body.tahunTerbit);
  body.nomorRak = Number(body.nomorRak);
  body.jumlahHalaman = Number(body.jumlahHalaman);
  body.stok = Number(body.stok);
  body.kategoriId = Number(body.kategoriId);

  //  const validations = zodSchema.safeParse(body);

  //  if (!validations.success) {
  //    const { errors } = validations.error;
  //    createErrResponse(res, { message: "Invalid request", errors }, 422);
  //    return;
  //  }

  const existCode = await prisma.buku.findUnique({
    where: { kodeBuku: body.kodeBuku },
  });
  if (existCode) {
    throw createError({
      statusMessage: "Kode buku sudah ada",
      statusCode: 400,
    });
  }

  const token = decodeToken(event);
  const officer = await prisma.petugas.findUnique({
    where: { userId: token?.id },
  });

  const book = await prisma.buku.create({
    data: {
      ...body,
      createdBy: officer?.nama || null,
      updatedBy: officer?.nama || null,
    },
  });

  return createResponse(book, 201);
});
