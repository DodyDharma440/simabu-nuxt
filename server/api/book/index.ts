import {
  createResponse,
  paginationResponse,
  parseParams,
} from "~/common/utils/api-response";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const searchFields = [
    "judul",
    "kodeBuku",
    "penerbit",
    "tahunTerbit",
    "jumlahHalaman",
    "penulis",
    "kategori.nama",
  ];
  const searchParams = parseParams(event, "search", {
    search: { fields: searchFields },
  });
  const count = await prisma.buku.count(searchParams);

  const results = await prisma.buku.findMany({
    ...parseParams(event, "pagination"),
    ...searchParams,
    include: {
      kategori: true,
    },
  });

  return createResponse(paginationResponse(results, count));
});
