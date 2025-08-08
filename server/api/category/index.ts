import {
  createResponse,
  paginationResponse,
  parseParams,
} from "~/common/utils/api-response";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const searchFields = ["nama"];
  const searchParams = parseParams(event, "search", {
    search: { fields: searchFields },
  });
  const count = await prisma.kategori.count(searchParams);

  const results = await prisma.kategori.findMany({
    ...parseParams(event, "pagination"),
    ...searchParams,
  });

  return createResponse(paginationResponse(results, count));
});
