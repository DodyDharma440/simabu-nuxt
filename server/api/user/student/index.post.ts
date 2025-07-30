import { createResponse } from "~/common/utils/api-response";
import type { IUserStudentInput } from "~/modules/user/interfaces";
import bcrypt from "bcrypt";
import prisma from "~~/lib/prisma";

const SALT = 10;

export default defineEventHandler(async (event) => {
  const body = await readBody<IUserStudentInput>(event);
  //   const validations = zodCreateSchema.safeParse(body);

  //   if (!validations.success) {
  //     const { errors } = validations.error;
  //     createErrResponse(res, { message: "Invalid request", errors }, 400);

  //     return;
  //   }

  const { nim, password, programStudiId, ...mahasiswaBody } = body;
  const usernameExist = await prisma.user.findUnique({
    where: { username: nim },
  });

  if (usernameExist) {
    throw createError({
      statusMessage: "NIM already exists",
      status: 400,
    });
  }

  const role = await prisma.role.findFirst({
    where: { name: "Mahasiswa" },
  });
  if (!role) {
    throw createError({ statusMessage: "Role tidak ditemukan", status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password || "", SALT);
  const mahasiswa = await prisma.mahasiswa.create({
    data: {
      ...mahasiswaBody,
      nim,
      programStudi: {
        connect: { id: Number(programStudiId) },
      },
      user: {
        create: {
          username: nim,
          password: hashedPassword,
          roleId: Number(role.id),
        },
      },
    },
  });

  return createResponse(mahasiswa, 201);
});
