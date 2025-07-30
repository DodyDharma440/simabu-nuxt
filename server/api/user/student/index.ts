import {
  createResponse,
  paginationResponse,
  parseParams,
} from "~/common/utils/api-response";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const searchFields = [
    "nama",
    "nip",
    "alamat",
    "noTelp",
    "user.username",
    "user.role.name",
  ];

  const searchParam = parseParams(event, "search", {
    search: { fields: searchFields },
  });

  const count = await prisma.mahasiswa.count(searchParam);

  const results = await prisma.mahasiswa.findMany({
    ...parseParams(event, "pagination"),
    ...searchParam,
    include: {
      user: {
        select: {
          id: true,
          username: true,
          roleId: true,
          role: true,
        },
      },
    },
  });

  return createResponse(paginationResponse(results, count));
});
