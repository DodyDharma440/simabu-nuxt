import { createResponse } from "~/common/utils/api-response";
import type { IUserStudentInput } from "~/modules/user/interfaces";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody<Omit<IUserStudentInput, "password">>(event);
  const id = getRouterParam(event, "id");

  const user = await prisma.mahasiswa.findUnique({ where: { id: Number(id) } });

  if (!user) {
    throw createError({
      statusMessage: "User not found",
      status: 404,
    });
  }

  //   const validations = zodUpdateSchema.safeParse(body);

  //   if (!validations.success) {
  //     const { errors } = validations.error;
  //     createErrResponse(res, { message: "Invalid request", errors }, 422);
  //     return;
  //   }

  const usernameExist = await prisma.user.findUnique({
    where: { username: body.nim },
    include: { Mahasiswa: true },
  });

  if (usernameExist && usernameExist.Mahasiswa?.id !== Number(id)) {
    throw createError({
      statusMessage: "NIM already exists",
      status: 400,
    });
  }

  const { programStudiId, ...mhsBody } = body;
  const mahasiswa = await prisma.mahasiswa.update({
    data: {
      ...mhsBody,
      updatedAt: new Date().toISOString(),
      programStudi: {
        connect: { id: Number(programStudiId) },
      },
      user: {
        update: {
          username: body.nim,
        },
      },
    },
    where: { id: Number(id) },
  });

  return createResponse(mahasiswa);
});
