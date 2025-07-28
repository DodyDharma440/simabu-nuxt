import type { ApiResponse } from "../interfaces/api";

export const createResponse = <T>(
  data: T,
  status: number = 200
): ApiResponse<T> => {
  return {
    ok: true,
    statusCode: status,
    message: "Success",
    data,
  };
};
