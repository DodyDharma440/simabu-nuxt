import { createResponse } from "~/common/utils/api-response";
import type { IUserStaffInput } from "~/modules/user/interfaces";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody<Omit<IUserStaffInput, "password">>(event);
  const id = getRouterParam(event, "id");

  const user = await prisma.petugas.findUnique({ where: { id: Number(id) } });

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

  const { username, roleId, ...petugasBody } = body;
  const usernameExist = await prisma.user.findUnique({
    where: { username },
    include: { Petugas: true },
  });

  if (usernameExist && usernameExist.Petugas?.id !== Number(id)) {
    throw createError({
      statusMessage: "Username already exists",
      status: 400,
    });
  }

  const petugas = await prisma.petugas.update({
    data: {
      ...petugasBody,
      updatedAt: new Date().toISOString(),
      user: {
        update: {
          username,
          roleId: Number(roleId),
        },
      },
    },
    where: { id: Number(id) },
  });

  return createResponse(petugas);
});
