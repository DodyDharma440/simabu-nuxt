import { createResponse } from "~/common/utils/api-response";
import { decodeToken } from "~/common/utils/token";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const userData = decodeToken(event);
  try {
    const key = userData?.role?.name === "Mahasiswa" ? "mahasiswa" : "petugas";
    const user = await prisma[key as "petugas"].findUnique({
      where: {
        userId: userData?.id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw createError({
        status: 404,
        message: "user not found",
      });
    }

    return createResponse(user);
  } catch (error: any) {
    throw createError({ status: 500, message: error?.message });
  }
});
