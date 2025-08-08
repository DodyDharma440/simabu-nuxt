import { createResponse } from "~/common/utils/api-response";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async () => {
  const studyPrograms = await prisma.programStudi.findMany();
  return createResponse(studyPrograms);
});
