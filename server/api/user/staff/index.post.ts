import { createResponse } from "~/common/utils/api-response";
import type { IUserStaffInput } from "~/modules/user/interfaces";
import bcrypt from "bcrypt";
import prisma from "~~/lib/prisma";

const SALT = 10;

export default defineEventHandler(async (event) => {
  const body = await readBody<IUserStaffInput>(event);
  //   const validations = zodCreateSchema.safeParse(body);

  //   if (!validations.success) {
  //     const { errors } = validations.error;
  //     createErrResponse(res, { message: "Invalid request", errors }, 400);

  //     return;
  //   }

  const { username, password, roleId, ...petugasBody } = body;
  const usernameExist = await prisma.user.findUnique({
    where: { username },
  });

  if (usernameExist) {
    throw createError({
      statusMessage: "Username already exists",
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password || "", SALT);
  const petugas = await prisma.petugas.create({
    data: {
      ...petugasBody,
      user: {
        create: {
          username,
          password: hashedPassword,
          roleId: Number(roleId),
        },
      },
    },
  });

  return createResponse(petugas, 201);
});
